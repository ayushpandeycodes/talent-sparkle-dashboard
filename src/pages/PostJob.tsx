import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, X, Upload, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useApp } from "@/contexts/AppContext";
import { Job, JobLocation, JobStatus } from "@/types";
import { toast } from "sonner";

export default function PostJob() {
  const navigate = useNavigate();
  const { addJob, jobs } = useApp();
  const [activeTab, setActiveTab] = useState("details");
  const [posting, setPosting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "hybrid" as JobLocation,
    city: "",
    country: "India",
    salaryMin: "",
    salaryMax: "",
    seniority: "mid",
    description: "",
    requirements: "",
    benefits: "",
    tags: [] as string[],
    screeningQuestions: [] as string[],
    deadline: "",
    targetCampuses: [] as string[],
    enableCampusDrive: false,
  });

  const [tagInput, setTagInput] = useState("");
  const [questionInput, setQuestionInput] = useState("");

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      handleChange("tags", [...formData.tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    handleChange("tags", formData.tags.filter((t) => t !== tag));
  };

  const addQuestion = () => {
    if (questionInput.trim()) {
      handleChange("screeningQuestions", [...formData.screeningQuestions, questionInput.trim()]);
      setQuestionInput("");
    }
  };

  const removeQuestion = (index: number) => {
    handleChange("screeningQuestions", formData.screeningQuestions.filter((_, i) => i !== index));
  };

  const handleSubmit = async (status: JobStatus) => {
    // Validation
    if (!formData.title || !formData.department || !formData.city || !formData.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    setPosting(true);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const newJob: Job = {
      id: `job-${Date.now()}`,
      title: formData.title,
      department: formData.department,
      location: formData.location,
      city: formData.city,
      country: formData.country,
      salaryRange: formData.salaryMin && formData.salaryMax 
        ? `₹${formData.salaryMin} - ₹${formData.salaryMax}` 
        : "Competitive",
      seniority: formData.seniority,
      description: formData.description,
      requirements: formData.requirements.split("\n").filter((r) => r.trim()),
      benefits: formData.benefits.split("\n").filter((b) => b.trim()),
      status,
      postedDate: new Date().toISOString(),
      applicantCount: 0,
      viewCount: 0,
      tags: formData.tags,
    };

    addJob(newJob);
    setPosting(false);
    
    toast.success(
      status === "open" ? "Job posted successfully!" : "Job saved as draft",
      {
        description: `Your job "${formData.title}" is now ${status === "open" ? "live" : "in drafts"}.`,
      }
    );

    navigate("/jobs");
  };

  const isFormValid = formData.title && formData.department && formData.city && formData.description;

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/jobs")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Post a New Job</h1>
          <p className="text-muted-foreground mt-1">
            Create a new job posting to attract top talent
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
              <CardDescription>Enter the basic information about the position</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-4 mb-6">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="screening">Screening</TabsTrigger>
                  <TabsTrigger value="campus">Campus</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4">
                  <div>
                    <Label htmlFor="title">Job Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Senior Software Engineer"
                      value={formData.title}
                      onChange={(e) => handleChange("title", e.target.value)}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="department">Department *</Label>
                      <Input
                        id="department"
                        placeholder="e.g., Engineering"
                        value={formData.department}
                        onChange={(e) => handleChange("department", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="seniority">Seniority Level</Label>
                      <Select value={formData.seniority} onValueChange={(value) => handleChange("seniority", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="intern">Intern</SelectItem>
                          <SelectItem value="entry">Entry Level</SelectItem>
                          <SelectItem value="mid">Mid Level</SelectItem>
                          <SelectItem value="senior">Senior</SelectItem>
                          <SelectItem value="lead">Lead</SelectItem>
                          <SelectItem value="executive">Executive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <Label htmlFor="location">Work Type</Label>
                      <Select value={formData.location} onValueChange={(value: JobLocation) => handleChange("location", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="remote">Remote</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                          <SelectItem value="onsite">Onsite</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        placeholder="e.g., Bangalore"
                        value={formData.city}
                        onChange={(e) => handleChange("city", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        value={formData.country}
                        onChange={(e) => handleChange("country", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="salaryMin">Salary Min (₹/year)</Label>
                      <Input
                        id="salaryMin"
                        type="number"
                        placeholder="e.g., 800000"
                        value={formData.salaryMin}
                        onChange={(e) => handleChange("salaryMin", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="salaryMax">Salary Max (₹/year)</Label>
                      <Input
                        id="salaryMax"
                        type="number"
                        placeholder="e.g., 1500000"
                        value={formData.salaryMax}
                        onChange={(e) => handleChange("salaryMax", e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="tags">Tags (Skills, Technologies)</Label>
                    <div className="flex gap-2 mb-2">
                      <Input
                        id="tags"
                        placeholder="Add a tag"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                      />
                      <Button type="button" onClick={addTag} size="icon">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="gap-1">
                          {tag}
                          <button onClick={() => removeTag(tag)} className="hover:text-destructive">
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="deadline">Application Deadline</Label>
                    <Input
                      id="deadline"
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => handleChange("deadline", e.target.value)}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="description" className="space-y-4">
                  <div>
                    <Label htmlFor="description">Job Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the role, responsibilities, and what the candidate will be doing..."
                      rows={8}
                      value={formData.description}
                      onChange={(e) => handleChange("description", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="requirements">Requirements (one per line)</Label>
                    <Textarea
                      id="requirements"
                      placeholder="• 5+ years of experience in React&#10;• Strong TypeScript skills&#10;• Experience with REST APIs"
                      rows={6}
                      value={formData.requirements}
                      onChange={(e) => handleChange("requirements", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="benefits">Benefits & Perks (one per line)</Label>
                    <Textarea
                      id="benefits"
                      placeholder="• Health insurance&#10;• Flexible work hours&#10;• Learning stipend"
                      rows={6}
                      value={formData.benefits}
                      onChange={(e) => handleChange("benefits", e.target.value)}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="screening" className="space-y-4">
                  <div>
                    <Label>Screening Questions (up to 10)</Label>
                    <p className="text-sm text-muted-foreground mb-4">
                      Ask candidates custom questions to pre-screen applicants
                    </p>
                    <div className="flex gap-2 mb-4">
                      <Input
                        placeholder="Enter a screening question"
                        value={questionInput}
                        onChange={(e) => setQuestionInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addQuestion())}
                      />
                      <Button
                        type="button"
                        onClick={addQuestion}
                        disabled={formData.screeningQuestions.length >= 10}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add
                      </Button>
                    </div>

                    <div className="space-y-2">
                      {formData.screeningQuestions.map((question, index) => (
                        <div key={index} className="flex items-start gap-2 p-3 rounded-lg bg-muted/30">
                          <span className="font-medium text-sm">{index + 1}.</span>
                          <p className="flex-1 text-sm">{question}</p>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeQuestion(index)}
                            className="h-6 w-6"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>

                    {formData.screeningQuestions.length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-8">
                        No screening questions added yet
                      </p>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="campus" className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                    <div>
                      <Label htmlFor="campus-drive">Enable Campus Drive</Label>
                      <p className="text-sm text-muted-foreground">
                        Make this job available for campus placements
                      </p>
                    </div>
                    <Switch
                      id="campus-drive"
                      checked={formData.enableCampusDrive}
                      onCheckedChange={(checked) => handleChange("enableCampusDrive", checked)}
                    />
                  </div>

                  {formData.enableCampusDrive && (
                    <div>
                      <Label>Target Universities</Label>
                      <p className="text-sm text-muted-foreground mb-3">
                        Select which universities to target for this position
                      </p>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {["IIT Bombay", "IIT Delhi", "BITS Pilani", "NIT Trichy", "IIIT Hyderabad", "VIT Vellore"].map((uni) => (
                          <div key={uni} className="flex items-center gap-2 p-2 rounded hover:bg-muted/30">
                            <input
                              type="checkbox"
                              id={`uni-${uni}`}
                              checked={formData.targetCampuses.includes(uni)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  handleChange("targetCampuses", [...formData.targetCampuses, uni]);
                                } else {
                                  handleChange("targetCampuses", formData.targetCampuses.filter((c) => c !== uni));
                                }
                              }}
                            />
                            <Label htmlFor={`uni-${uni}`} className="cursor-pointer flex-1">
                              {uni}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Preview */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Live Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-bold text-xl mb-2">
                    {formData.title || "Job Title"}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="secondary">{formData.department || "Department"}</Badge>
                    <Badge variant="secondary">{formData.location}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    📍 {formData.city || "City"}, {formData.country}
                  </p>
                  {formData.salaryMin && formData.salaryMax && (
                    <p className="text-sm font-medium text-primary">
                      💰 ₹{formData.salaryMin} - ₹{formData.salaryMax}/year
                    </p>
                  )}
                </div>

                {formData.tags.length > 0 && (
                  <div>
                    <p className="text-xs font-medium mb-2">Skills Required</p>
                    <div className="flex flex-wrap gap-1">
                      {formData.tags.slice(0, 5).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {formData.tags.length > 5 && (
                        <Badge variant="outline" className="text-xs">
                          +{formData.tags.length - 5}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {formData.description && (
                  <div>
                    <p className="text-xs font-medium mb-2">Description</p>
                    <p className="text-xs text-muted-foreground line-clamp-4">
                      {formData.description}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardContent className="p-4 space-y-2">
                <Button
                  className="w-full"
                  onClick={() => handleSubmit("open")}
                  disabled={!isFormValid || posting}
                >
                  {posting ? "Publishing..." : "Publish Job"}
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleSubmit("closed")}
                  disabled={!isFormValid || posting}
                >
                  Save as Draft
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
