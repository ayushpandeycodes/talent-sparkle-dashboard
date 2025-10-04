import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Sparkles, Github, ExternalLink, MapPin, Briefcase, Award, Filter, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useApp } from "@/contexts/AppContext";
import { Progress } from "@/components/ui/progress";

export default function Candidates() {
  const { candidates } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [minExperience, setMinExperience] = useState<number>(0);
  const [skillFilter, setSkillFilter] = useState("");

  // Calculate match score (simulated)
  const calculateMatchScore = (candidate: any) => {
    let score = candidate.credibilityScore;
    if (candidate.verifiedTalent) score += 10;
    if (candidate.githubUrl) score += 5;
    return Math.min(100, score);
  };

  const filteredCandidates = candidates
    .filter((candidate) => {
      const matchesSearch =
        candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesVerified = !verifiedOnly || candidate.verifiedTalent;
      const matchesExperience = candidate.yearsExperience >= minExperience;
      const matchesSkill =
        !skillFilter ||
        candidate.skills.some((skill) => skill.toLowerCase().includes(skillFilter.toLowerCase()));
      return matchesSearch && matchesVerified && matchesExperience && matchesSkill;
    })
    .map((candidate) => ({
      ...candidate,
      matchScore: calculateMatchScore(candidate),
    }))
    .sort((a, b) => b.matchScore - a.matchScore);

  // Get top skills for filtering
  const allSkills = Array.from(
    new Set(candidates.flatMap((c) => c.skills))
  ).sort();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Candidate Discovery</h1>
          <p className="text-muted-foreground mt-1">
            AI-powered talent matching and search
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Sparkles className="h-4 w-4" />
          AI Recommendations
        </Button>
      </div>

      {/* AI Match Banner */}
      <Card className="glass-card border-primary/20 bg-gradient-to-br from-primary/5 via-background to-background">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">Smart Match Active</h3>
              <p className="text-muted-foreground text-sm">
                Candidates are ranked by AI-generated match scores based on skills, experience, and verification status.
                Use filters below to refine your search.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card className="glass-card">
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, skills, or headline..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={skillFilter} onValueChange={setSkillFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="All Skills" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Skills</SelectItem>
                  {allSkills.slice(0, 10).map((skill) => (
                    <SelectItem key={skill} value={skill}>
                      {skill}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={minExperience.toString()}
                onValueChange={(value) => setMinExperience(Number(value))}
              >
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Any Experience</SelectItem>
                  <SelectItem value="1">1+ years</SelectItem>
                  <SelectItem value="3">3+ years</SelectItem>
                  <SelectItem value="5">5+ years</SelectItem>
                  <SelectItem value="7">7+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="verified"
                checked={verifiedOnly}
                onCheckedChange={(checked) => setVerifiedOnly(checked as boolean)}
              />
              <Label htmlFor="verified" className="flex items-center gap-2 cursor-pointer">
                <Award className="h-4 w-4 text-primary" />
                Show only Verified Talent
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{filteredCandidates.length}</span> candidates
        </p>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Sorted by Match Score</span>
        </div>
      </div>

      {/* Candidates Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {filteredCandidates.map((candidate) => (
          <Card key={candidate.id} className="glass-card hover-lift group">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <Avatar className="h-16 w-16 border-2 border-primary/20">
                  <AvatarFallback className="text-lg bg-gradient-to-br from-primary/20 to-primary/10">
                    {candidate.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Link to={`/candidate/${candidate.id}`}>
                      <h3 className="font-semibold text-lg hover:text-primary transition-colors truncate">
                        {candidate.name}
                      </h3>
                    </Link>
                    {candidate.verifiedTalent && (
                      <Badge className="bg-primary/10 text-primary border-primary/20 flex-shrink-0">
                        <Award className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">{candidate.headline}</p>

                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {candidate.location}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Briefcase className="h-4 w-4" />
                      {candidate.yearsExperience} years experience
                    </div>
                  </div>

                  {/* Match Score */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Match Score</span>
                      <span className="font-semibold text-primary">{candidate.matchScore}%</span>
                    </div>
                    <Progress value={candidate.matchScore} className="h-2" />
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {candidate.skills.slice(0, 4).map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {candidate.skills.length > 4 && (
                      <Badge variant="secondary" className="text-xs">
                        +{candidate.skills.length - 4}
                      </Badge>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-4 border-t border-border">
                    {candidate.githubUrl && (
                      <a
                        href={candidate.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                    {candidate.portfolioUrl && (
                      <a
                        href={candidate.portfolioUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                    <div className="flex-1" />
                    <Button variant="outline" size="sm">
                      Message
                    </Button>
                    <Link to={`/candidate/${candidate.id}`}>
                      <Button size="sm">View Profile</Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Match Reasons */}
              {candidate.matchScore >= 80 && (
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-xs font-medium text-muted-foreground mb-2">Why this match:</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• {candidate.verifiedTalent ? "Verified Talent with strong GitHub activity" : "Strong technical background"}</li>
                    <li>• {candidate.yearsExperience >= 5 ? "Senior" : "Mid-level"} experience in {candidate.skills[0]}</li>
                    <li>• High credibility score ({candidate.credibilityScore}/100)</li>
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCandidates.length === 0 && (
        <Card className="glass-card">
          <CardContent className="p-12 text-center">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No candidates found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters to see more candidates
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
