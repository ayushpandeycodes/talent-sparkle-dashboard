import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Edit, Share2, MoreVertical, MapPin, Calendar, DollarSign, Users, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useApp } from "@/contexts/AppContext";
import { ApplicationStage } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const stageOrder: ApplicationStage[] = ["applied", "phone_screen", "interview", "offer", "hired", "rejected"];
const stageLabels: Record<ApplicationStage, string> = {
  applied: "Applied",
  phone_screen: "Phone Screen",
  interview: "Interview",
  offer: "Offer",
  hired: "Hired",
  rejected: "Rejected",
};

const stageColors: Record<ApplicationStage, string> = {
  applied: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  phone_screen: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  interview: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  offer: "bg-green-500/10 text-green-600 border-green-500/20",
  hired: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  rejected: "bg-gray-500/10 text-gray-600 border-gray-500/20",
};

export default function JobDetail() {
  const { id } = useParams();
  const { getJobById, getCandidatesForJob, updateCandidateStage } = useApp();
  const [draggedCandidate, setDraggedCandidate] = useState<string | null>(null);

  const job = getJobById(id || "");
  const candidates = getCandidatesForJob(id || "");

  if (!job) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Job not found</h2>
          <Link to="/jobs">
            <Button>Back to Jobs</Button>
          </Link>
        </div>
      </div>
    );
  }

  const candidatesByStage: Record<ApplicationStage, typeof candidates> = {
    applied: [],
    phone_screen: [],
    interview: [],
    offer: [],
    hired: [],
    rejected: [],
  };

  candidates.forEach((candidate) => {
    const stage = candidate.currentStage[job.id] || "applied";
    candidatesByStage[stage].push(candidate);
  });

  const handleDragStart = (candidateId: string) => {
    setDraggedCandidate(candidateId);
  };

  const handleDrop = (stage: ApplicationStage) => {
    if (draggedCandidate) {
      updateCandidateStage(draggedCandidate, job.id, stage);
      setDraggedCandidate(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/jobs">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{job.title}</h1>
          <div className="flex items-center gap-4 mt-2 text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {job.city}
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              {job.salaryRange}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Posted {new Date(job.postedDate).toLocaleDateString()}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuItem>Archive</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Total Applicants</div>
            <div className="text-2xl font-bold mt-1">{job.applicantCount}</div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">In Interview</div>
            <div className="text-2xl font-bold mt-1 text-primary">
              {candidatesByStage.interview.length}
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Offers Extended</div>
            <div className="text-2xl font-bold mt-1 text-success">
              {candidatesByStage.offer.length}
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Hired</div>
            <div className="text-2xl font-bold mt-1 text-emerald-600">
              {candidatesByStage.hired.length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="pipeline" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
          <TabsTrigger value="details">Job Details</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="pipeline" className="space-y-4">
          {/* Kanban Board */}
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-4 min-w-max">
              {stageOrder.map((stage) => (
                <div
                  key={stage}
                  className="flex-shrink-0 w-80"
                  onDrop={() => handleDrop(stage)}
                  onDragOver={handleDragOver}
                >
                  <Card className={`glass-card ${draggedCandidate ? "border-primary/50" : ""}`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium">
                          {stageLabels[stage]}
                        </CardTitle>
                        <Badge variant="secondary">
                          {candidatesByStage[stage].length}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3 max-h-[600px] overflow-y-auto">
                      {candidatesByStage[stage].map((candidate) => (
                        <Card
                          key={candidate.id}
                          draggable
                          onDragStart={() => handleDragStart(candidate.id)}
                          className="cursor-move hover:shadow-lg transition-shadow bg-card"
                        >
                          <CardContent className="p-4">
                            <div className="flex gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback className="text-sm bg-primary/10">
                                  {candidate.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <Link to={`/candidate/${candidate.id}`}>
                                  <h4 className="font-medium text-sm hover:text-primary transition-colors truncate">
                                    {candidate.name}
                                  </h4>
                                </Link>
                                <p className="text-xs text-muted-foreground truncate">
                                  {candidate.headline}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Badge variant="secondary" className="text-xs">
                                    Score: {candidate.credibilityScore}
                                  </Badge>
                                  {candidate.verifiedTalent && (
                                    <Badge className="text-xs bg-primary/10 text-primary">
                                      Verified
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex gap-1 mt-2">
                                  <Button variant="ghost" size="sm" className="h-7 text-xs">
                                    View
                                  </Button>
                                  <Button variant="ghost" size="sm" className="h-7 text-xs">
                                    Message
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      {candidatesByStage[stage].length === 0 && (
                        <div className="text-center py-8 text-muted-foreground text-sm">
                          No candidates yet
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="details" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p className="text-muted-foreground">{job.description}</p>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Location</span>
                    <span className="text-sm font-medium">{job.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Seniority</span>
                    <Badge variant="secondary">{job.seniority}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Team</span>
                    <span className="text-sm font-medium">{job.team}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Deadline</span>
                    <span className="text-sm font-medium">
                      {new Date(job.deadline).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Skills Required</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {job.campuses.length > 0 && (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Campus Targeting
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This job is being promoted to {job.campuses.length} universities
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Application Funnel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Views</span>
                    <span className="font-bold">{job.viewCount}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Applications</span>
                    <span className="font-bold">{job.applicantCount}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Conversion Rate</span>
                    <span className="font-bold text-primary">
                      {((job.applicantCount / job.viewCount) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Stage Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stageOrder.slice(0, 5).map((stage) => (
                    <div key={stage} className="flex items-center justify-between text-sm">
                      <span>{stageLabels[stage]}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{candidatesByStage[stage].length}</span>
                        <Badge variant="secondary" className="text-xs">
                          {job.applicantCount > 0
                            ? ((candidatesByStage[stage].length / job.applicantCount) * 100).toFixed(0)
                            : 0}
                          %
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
