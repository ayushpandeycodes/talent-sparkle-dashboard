import { Link } from "react-router-dom";
import {
  Briefcase,
  Users,
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle,
  ArrowUpRight,
  Sparkles,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useApp } from "@/contexts/AppContext";
import { Progress } from "@/components/ui/progress";

export default function Dashboard() {
  const { jobs, candidates, interviews, activities } = useApp();

  const activeJobs = jobs.filter((j) => j.status === "open").length;
  const totalApplicants = jobs.reduce((sum, job) => sum + job.applicantCount, 0);
  const upcomingInterviews = interviews.filter((i) => i.status === "scheduled").length;
  const verifiedCandidates = candidates.filter((c) => c.verifiedTalent).length;

  const recentActivities = activities.slice(0, 5);

  // Calculate some metrics
  const avgTimeToHire = 12; // days - simulated
  const conversionRate = 15; // % - simulated
  
  // Get top performing jobs
  const topJobs = [...jobs]
    .sort((a, b) => b.applicantCount - a.applicantCount)
    .slice(0, 3);

  // Simulated funnel data
  const funnelData = [
    { stage: "Views", count: 2340, percentage: 100 },
    { stage: "Applications", count: 456, percentage: 19 },
    { stage: "Interviews", count: 89, percentage: 19 },
    { stage: "Offers", count: 24, percentage: 27 },
    { stage: "Hires", count: 18, percentage: 75 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
            Welcome back! 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with your hiring pipeline today
          </p>
        </div>
        <div className="flex gap-3">
          <Link to="/jobs/new">
            <Button className="gap-2 shadow-lg hover:shadow-xl transition-shadow">
              <Plus className="h-4 w-4" />
              Post New Job
            </Button>
          </Link>
          <Link to="/candidates">
            <Button variant="outline" className="gap-2">
              <Sparkles className="h-4 w-4" />
              Discover Talent
            </Button>
          </Link>
        </div>
      </div>

      {/* AI Insights Banner */}
      <Card className="glass-card border-primary/20 bg-gradient-to-br from-primary/5 via-background to-background">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Your talent pool is ready!</h3>
                <p className="text-muted-foreground">
                  24 new AI-matched candidates since last night. 15 are Verified Talent with 85%+ match scores.
                </p>
                <Link to="/candidates">
                  <Button variant="link" className="px-0 mt-2">
                    View recommendations
                    <ArrowUpRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glass-card hover-lift">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Jobs
            </CardTitle>
            <Briefcase className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{activeJobs}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-success">+2</span> from last week
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card hover-lift">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Applicants
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalApplicants}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-success">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card hover-lift">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Upcoming Interviews
            </CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{upcomingInterviews}</div>
            <p className="text-xs text-muted-foreground mt-1">
              This week
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card hover-lift">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Verified Talent
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{verifiedCandidates}</div>
            <p className="text-xs text-muted-foreground mt-1">
              In your pipeline
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Hiring Funnel */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Hiring Funnel</CardTitle>
            <CardDescription>Your recruitment pipeline at a glance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {funnelData.map((item, index) => (
              <div key={item.stage} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{item.stage}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">{item.count}</span>
                    {index > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        {item.percentage}%
                      </Badge>
                    )}
                  </div>
                </div>
                <Progress
                  value={item.percentage}
                  className="h-2"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Performing Jobs */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Top Performing Jobs</CardTitle>
            <CardDescription>Jobs with the most applicants</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topJobs.map((job) => (
              <Link key={job.id} to={`/jobs/${job.id}`}>
                <div className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex-1">
                    <div className="font-medium">{job.title}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                      <span>{job.city}</span>
                      <span>•</span>
                      <Badge variant="secondary" className="text-xs">
                        {job.location}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-primary">{job.applicantCount}</div>
                    <div className="text-xs text-muted-foreground">applicants</div>
                  </div>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Key Metrics</CardTitle>
            <CardDescription>Your hiring performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <span className="font-medium">Avg. Time to Hire</span>
              </div>
              <span className="text-2xl font-bold">{avgTimeToHire}d</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span className="font-medium">Conversion Rate</span>
              </div>
              <span className="text-2xl font-bold">{conversionRate}%</span>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No recent activity
                </p>
              ) : (
                recentActivities.map((activity) => (
                  <div key={activity.id} className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                    <div className="flex-1">
                      <p className="text-sm">{activity.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(activity.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
