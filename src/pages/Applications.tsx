import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Download, Mail, UserCheck, UserX, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ApplicationStage, Candidate } from "@/types";
import { toast } from "sonner";

const stageColors: Record<ApplicationStage, string> = {
  applied: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  screening: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  phone_screen: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
  interview: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  assessment: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  offer: "bg-green-500/10 text-green-500 border-green-500/20",
  hired: "bg-primary/10 text-primary border-primary/20",
  rejected: "bg-red-500/10 text-red-500 border-red-500/20",
};

export default function Applications() {
  const { candidates, jobs, getCandidatesForJob, updateCandidateStage } = useApp();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState<string>("all");
  const [selectedStage, setSelectedStage] = useState<string>("all");
  const [selectedCandidates, setSelectedCandidates] = useState<Set<string>>(new Set());

  // Get all applications across jobs
  const allApplications = candidates.filter((c) => c.appliedJobIds.length > 0);

  const filteredApplications = allApplications.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.headline.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesJob =
      selectedJob === "all" || candidate.appliedJobIds.includes(selectedJob);

    const matchesStage =
      selectedStage === "all" ||
      Object.values(candidate.currentStage).includes(selectedStage as ApplicationStage);

    return matchesSearch && matchesJob && matchesStage;
  });

  // Group by stage
  const applicationsByStage = filteredApplications.reduce((acc, candidate) => {
    candidate.appliedJobIds.forEach((jobId) => {
      const stage = candidate.currentStage[jobId] || "applied";
      if (!acc[stage]) acc[stage] = [];
      acc[stage].push({ candidate, jobId });
    });
    return acc;
  }, {} as Record<string, Array<{ candidate: Candidate; jobId: string }>>);

  const handleBulkAction = (action: string) => {
    if (selectedCandidates.size === 0) {
      toast.error("Please select candidates first");
      return;
    }

    setTimeout(() => {
      if (action === "message") {
        toast.success(`Message sent to ${selectedCandidates.size} candidates`);
      } else if (action === "shortlist") {
        toast.success(`${selectedCandidates.size} candidates shortlisted`);
      } else if (action === "reject") {
        toast.success(`${selectedCandidates.size} candidates rejected`);
      }
      setSelectedCandidates(new Set());
    }, 800);
  };

  const handleExport = () => {
    toast.success("Exporting applications to CSV...");
  };

  const toggleSelect = (candidateId: string) => {
    const newSelected = new Set(selectedCandidates);
    if (newSelected.has(candidateId)) {
      newSelected.delete(candidateId);
    } else {
      newSelected.add(candidateId);
    }
    setSelectedCandidates(newSelected);
  };

  const stageStats = Object.keys(stageColors).map((stage) => ({
    stage,
    count: applicationsByStage[stage]?.length || 0,
  }));

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Applications</h1>
          <p className="text-muted-foreground mt-1">
            Track and manage all applications across your job postings
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-7">
        {stageStats.map(({ stage, count }) => (
          <Card key={stage} className="glass-card">
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{count}</div>
              <div className="text-xs text-muted-foreground capitalize mt-1">
                {stage}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="glass-card">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="relative flex-1 min-w-[300px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedJob} onValueChange={setSelectedJob}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="All Jobs" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Jobs</SelectItem>
                {jobs.map((job) => (
                  <SelectItem key={job.id} value={job.id}>
                    {job.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStage} onValueChange={setSelectedStage}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Stages" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                <SelectItem value="applied">Applied</SelectItem>
                <SelectItem value="screening">Screening</SelectItem>
                <SelectItem value="interview">Interview</SelectItem>
                <SelectItem value="assessment">Assessment</SelectItem>
                <SelectItem value="offer">Offer</SelectItem>
                <SelectItem value="hired">Hired</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedCandidates.size > 0 && (
        <Card className="glass-card border-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {selectedCandidates.size} candidate(s) selected
              </span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleBulkAction("message")}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Message
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleBulkAction("shortlist")}
                >
                  <UserCheck className="h-4 w-4 mr-2" />
                  Shortlist
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleBulkAction("reject")}
                >
                  <UserX className="h-4 w-4 mr-2" />
                  Reject
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Applications Table */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>All Applications ({filteredApplications.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredApplications.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No applications found matching your filters
              </div>
            ) : (
              filteredApplications.map((candidate) => (
                <div
                  key={candidate.id}
                  className="flex items-center gap-4 p-4 rounded-xl border border-border hover:bg-muted/50 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedCandidates.has(candidate.id)}
                    onChange={() => toggleSelect(candidate.id)}
                    className="w-4 h-4 rounded border-border"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-semibold">{candidate.name}</h4>
                      {candidate.verifiedTalent && (
                        <Badge className="bg-primary/10 text-primary border-primary/20">
                          ✓ Verified
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-xs">
                        Score: {candidate.credibilityScore}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {candidate.headline} • {candidate.location}
                    </p>
                    <div className="flex gap-2 mt-2">
                      {candidate.appliedJobIds.map((jobId) => {
                        const job = jobs.find((j) => j.id === jobId);
                        const stage = candidate.currentStage[jobId] || "applied";
                        return (
                          <Badge
                            key={jobId}
                            className={stageColors[stage]}
                          >
                            {job?.title}: {stage}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate(`/candidate/${candidate.id}`)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
