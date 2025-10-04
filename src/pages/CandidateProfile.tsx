import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Github, ExternalLink, MapPin, Briefcase, Award, Mail, Calendar, FileText, MessageSquare, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useApp } from "@/contexts/AppContext";

export default function CandidateProfile() {
  const { id } = useParams();
  const { getCandidateById, jobs } = useApp();

  const candidate = getCandidateById(id || "");

  if (!candidate) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Candidate not found</h2>
          <Link to="/candidates">
            <Button>Back to Candidates</Button>
          </Link>
        </div>
      </div>
    );
  }

  const appliedJobs = jobs.filter((job) => candidate.appliedJobIds.includes(job.id));

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/candidates">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Candidate Profile</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Profile Summary */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 border-4 border-primary/20">
                  <AvatarFallback className="text-2xl bg-gradient-to-br from-primary/20 to-primary/10">
                    {candidate.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <h2 className="text-2xl font-bold mt-4">{candidate.name}</h2>
                <p className="text-muted-foreground mt-1">{candidate.headline}</p>

                {candidate.verifiedTalent && (
                  <Badge className="mt-3 bg-primary/10 text-primary border-primary/20">
                    <Award className="h-3 w-3 mr-1" />
                    Verified Talent
                  </Badge>
                )}

                <Separator className="my-6" />

                <div className="w-full space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{candidate.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span>{candidate.yearsExperience} years experience</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="truncate">{candidate.email}</span>
                  </div>
                  {candidate.githubUrl && (
                    <a
                      href={candidate.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-primary hover:underline"
                    >
                      <Github className="h-4 w-4" />
                      <span>GitHub Profile</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                  {candidate.portfolioUrl && (
                    <a
                      href={candidate.portfolioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-primary hover:underline"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Portfolio</span>
                    </a>
                  )}
                </div>

                <Separator className="my-6" />

                <div className="w-full space-y-2">
                  <Button className="w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Interview
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Credibility Score */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-sm">Credibility Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {candidate.credibilityScore}
                    <span className="text-xl text-muted-foreground">/100</span>
                  </div>
                  <Progress value={candidate.credibilityScore} className="h-3" />
                </div>

                {candidate.verifiedTalent && (
                  <div className="space-y-2 text-sm">
                    <p className="font-medium">Verification Factors:</p>
                    <ul className="space-y-1 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-3 w-3 text-success" />
                        GitHub contributions verified
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-3 w-3 text-success" />
                        Public projects reviewed
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-3 w-3 text-success" />
                        Assessment completed
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Assessment Scores */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-sm">Assessment Scores</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(candidate.assessmentScores).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="capitalize">{key}</span>
                    <span className="font-semibold">{value}%</span>
                  </div>
                  <Progress value={value} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Detailed Info */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="resume">Resume</TabsTrigger>
              <TabsTrigger value="cover-letter">Cover Letter</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Bio */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{candidate.bio}</p>
                </CardContent>
              </Card>

              {/* Skills */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="px-3 py-1">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Education */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Education</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{candidate.education}</p>
                </CardContent>
              </Card>

              {/* Applied Jobs */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Applications</CardTitle>
                  <CardDescription>Jobs this candidate has applied to</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {appliedJobs.map((job) => (
                    <Link key={job.id} to={`/jobs/${job.id}`}>
                      <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <div>
                          <h4 className="font-medium">{job.title}</h4>
                          <p className="text-sm text-muted-foreground">{job.city}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary">
                            {candidate.currentStage[job.id] || "applied"}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">
                            Applied {new Date(candidate.appliedDate[job.id]).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                  {appliedJobs.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No applications yet
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resume">
              <Card className="glass-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Resume</CardTitle>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <pre className="whitespace-pre-wrap text-sm text-muted-foreground font-sans">
                    {candidate.resumeText}
                  </pre>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cover-letter">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Cover Letter</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-wrap text-muted-foreground">
                    {candidate.coverLetterText}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Activity Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {appliedJobs.map((job) => (
                      <div key={job.id} className="flex gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                        <div>
                          <p className="text-sm">Applied to {job.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(candidate.appliedDate[job.id]).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                    {appliedJobs.length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No activity yet
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
