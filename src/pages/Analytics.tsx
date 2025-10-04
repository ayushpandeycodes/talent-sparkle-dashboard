import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Users, Briefcase, Calendar, Award, Clock, Target } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

export default function Analytics() {
  const { jobs, candidates, interviews } = useApp();

  // Calculate metrics
  const activeJobs = jobs.filter((j) => j.status === "open").length;
  const totalApplicants = jobs.reduce((sum, job) => sum + job.applicantCount, 0);
  const avgApplicantsPerJob = activeJobs > 0 ? Math.round(totalApplicants / activeJobs) : 0;
  const verifiedCandidates = candidates.filter((c) => c.verifiedTalent).length;
  const verifiedPercentage = Math.round((verifiedCandidates / candidates.length) * 100);

  // Funnel data
  const views = jobs.reduce((sum, job) => sum + job.viewCount, 0);
  const applications = totalApplicants;
  const interviewsCount = interviews.length;
  const offers = Math.floor(interviewsCount * 0.27); // Simulated
  const hires = Math.floor(offers * 0.75); // Simulated

  const funnelData = [
    { stage: "Job Views", count: views, percentage: 100, color: "bg-blue-500" },
    { stage: "Applications", count: applications, percentage: Math.round((applications / views) * 100), color: "bg-purple-500" },
    { stage: "Interviews", count: interviewsCount, percentage: Math.round((interviewsCount / applications) * 100), color: "bg-amber-500" },
    { stage: "Offers", count: offers, percentage: Math.round((offers / interviewsCount) * 100), color: "bg-green-500" },
    { stage: "Hires", count: hires, percentage: Math.round((hires / offers) * 100), color: "bg-emerald-500" },
  ];

  // Top sources (simulated)
  const sources = [
    { name: "AI Matches", count: Math.floor(applications * 0.35), percentage: 35 },
    { name: "Job Boards", count: Math.floor(applications * 0.28), percentage: 28 },
    { name: "Campus Drives", count: Math.floor(applications * 0.22), percentage: 22 },
    { name: "Direct Apply", count: Math.floor(applications * 0.15), percentage: 15 },
  ];

  // Time metrics (simulated)
  const avgTimeToHire = 12; // days
  const avgTimeToInterview = 5; // days
  const avgResponseTime = 2; // days

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Analytics & Reports</h1>
        <p className="text-muted-foreground mt-1">
          Track your hiring performance and metrics
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glass-card hover-lift">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
              Total Applications
              <Briefcase className="h-4 w-4 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalApplicants}</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-success" />
              <span className="text-success">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card hover-lift">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
              Avg per Job
              <Target className="h-4 w-4 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{avgApplicantsPerJob}</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-success" />
              <span className="text-success">+8%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card hover-lift">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
              Verified Talent
              <Award className="h-4 w-4 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{verifiedPercentage}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              {verifiedCandidates} out of {candidates.length} candidates
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card hover-lift">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
              Avg Time to Hire
              <Clock className="h-4 w-4 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{avgTimeToHire}d</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <TrendingDown className="h-3 w-3 text-success" />
              <span className="text-success">-2 days</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Hiring Funnel */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Hiring Funnel</CardTitle>
            <CardDescription>Your complete recruitment pipeline</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {funnelData.map((item, index) => (
              <div key={item.stage} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{item.stage}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">{item.count.toLocaleString()}</span>
                    {index > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        {item.percentage}%
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} transition-all duration-500`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Sources */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Application Sources</CardTitle>
            <CardDescription>Where your candidates come from</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {sources.map((source) => (
              <div key={source.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{source.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">{source.count}</span>
                    <Badge variant="secondary" className="text-xs">
                      {source.percentage}%
                    </Badge>
                  </div>
                </div>
                <Progress value={source.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Time Metrics */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Time Metrics</CardTitle>
            <CardDescription>Average time for key milestones</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-primary/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Time to Hire</p>
                  <p className="text-xs text-muted-foreground">From application to offer</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-primary">{avgTimeToHire}d</div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Time to Interview</p>
                  <p className="text-xs text-muted-foreground">From application to first interview</p>
                </div>
              </div>
              <div className="text-2xl font-bold">{avgTimeToInterview}d</div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Response Time</p>
                  <p className="text-xs text-muted-foreground">Average response to candidates</p>
                </div>
              </div>
              <div className="text-2xl font-bold">{avgResponseTime}d</div>
            </div>
          </CardContent>
        </Card>

        {/* Candidate Quality */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Candidate Quality Metrics</CardTitle>
            <CardDescription>Verified vs Non-Verified conversion</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-primary" />
                  Verified Talent
                </span>
                <span className="font-semibold text-primary">34% higher hire rate</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Verified candidates are 34% more likely to receive offers
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-primary/5">
                <p className="text-xs text-muted-foreground mb-1">Verified</p>
                <p className="text-2xl font-bold text-primary">{verifiedCandidates}</p>
                <p className="text-xs text-muted-foreground mt-1">{verifiedPercentage}% of pool</p>
              </div>
              <div className="p-4 rounded-xl bg-muted/30">
                <p className="text-xs text-muted-foreground mb-1">Non-Verified</p>
                <p className="text-2xl font-bold">{candidates.length - verifiedCandidates}</p>
                <p className="text-xs text-muted-foreground mt-1">{100 - verifiedPercentage}% of pool</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
