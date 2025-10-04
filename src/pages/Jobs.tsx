import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, MoreVertical, Edit, Copy, Archive, Eye, MapPin, Calendar, Users, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useApp } from "@/contexts/AppContext";
import { JobStatus, JobLocation } from "@/types";

export default function Jobs() {
  const { jobs, updateJob, deleteJob } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<JobStatus | "all">("all");
  const [locationFilter, setLocationFilter] = useState<JobLocation | "all">("all");

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    const matchesLocation = locationFilter === "all" || job.location === locationFilter;
    return matchesSearch && matchesStatus && matchesLocation;
  });

  const getStatusColor = (status: JobStatus) => {
    switch (status) {
      case "open":
        return "bg-success/10 text-success border-success/20";
      case "paused":
        return "bg-warning/10 text-warning border-warning/20";
      case "closed":
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getLocationIcon = (location: JobLocation) => {
    switch (location) {
      case "remote":
        return "🌍";
      case "hybrid":
        return "🏢🏠";
      case "onsite":
        return "🏢";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Jobs</h1>
          <p className="text-muted-foreground mt-1">
            Manage your job postings and view applicants
          </p>
        </div>
        <Link to="/jobs/new">
          <Button className="gap-2 shadow-lg">
            <Plus className="h-4 w-4" />
            Post New Job
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card className="glass-card">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs by title, location, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={locationFilter} onValueChange={(value: any) => setLocationFilter(value)}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
                <SelectItem value="onsite">Onsite</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Total Jobs</div>
            <div className="text-2xl font-bold mt-1">{jobs.length}</div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Active Jobs</div>
            <div className="text-2xl font-bold mt-1 text-success">
              {jobs.filter((j) => j.status === "open").length}
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Total Applicants</div>
            <div className="text-2xl font-bold mt-1 text-primary">
              {jobs.reduce((sum, job) => sum + job.applicantCount, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Jobs Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="glass-card hover-lift group">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <Badge className={getStatusColor(job.status)}>
                  {job.status}
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="h-4 w-4 mr-2" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Archive className="h-4 w-4 mr-2" />
                      Archive
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <Link to={`/jobs/${job.id}`}>
                <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors">
                  {job.title}
                </h3>
              </Link>

              <div className="space-y-2 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {job.city}
                  <span className="ml-2">{getLocationIcon(job.location)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Posted {new Date(job.postedDate).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span className="font-semibold text-foreground">{job.applicantCount}</span> applicants
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {job.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {job.tags.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{job.tags.length - 3}
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-border">
                <Eye className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {job.viewCount} views
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <Card className="glass-card">
          <CardContent className="p-12 text-center">
            <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your filters or create a new job posting
            </p>
            <Link to="/jobs/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Post New Job
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
