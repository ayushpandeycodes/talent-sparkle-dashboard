import { useState } from "react";
import { Play, BookOpen, Video, MessageCircle, Search, ChevronRight, Download, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const tutorials = [
  {
    id: 1,
    title: "Getting Started with Jobplexity",
    description: "Learn the basics of posting jobs and managing applicants",
    duration: "8:45",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop",
    category: "Basics",
    views: "12.4K",
  },
  {
    id: 2,
    title: "Advanced Candidate Filtering & AI Matching",
    description: "Master the art of finding perfect candidates with AI",
    duration: "12:20",
    thumbnail: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=225&fit=crop",
    category: "Advanced",
    views: "8.2K",
  },
  {
    id: 3,
    title: "Setting Up Campus Drives",
    description: "Connect with universities and recruit fresh talent",
    duration: "10:15",
    thumbnail: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=225&fit=crop",
    category: "Campus",
    views: "6.8K",
  },
  {
    id: 4,
    title: "Managing the Interview Pipeline",
    description: "Schedule, conduct, and track interviews efficiently",
    duration: "9:30",
    thumbnail: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=225&fit=crop",
    category: "Workflow",
    views: "5.9K",
  },
  {
    id: 5,
    title: "Understanding Analytics & Reports",
    description: "Make data-driven hiring decisions",
    duration: "11:05",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop",
    category: "Analytics",
    views: "7.1K",
  },
  {
    id: 6,
    title: "Messaging & Outreach Best Practices",
    description: "Engage candidates effectively with templates",
    duration: "7:50",
    thumbnail: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=400&h=225&fit=crop",
    category: "Communication",
    views: "4.5K",
  },
];

const guides = [
  {
    title: "Quick Start Guide",
    description: "Get up and running in 5 minutes",
    icon: "🚀",
    readTime: "5 min",
  },
  {
    title: "Job Posting Best Practices",
    description: "Write compelling job descriptions",
    icon: "📝",
    readTime: "8 min",
  },
  {
    title: "ATS Pipeline Management",
    description: "Organize your hiring funnel",
    icon: "📊",
    readTime: "10 min",
  },
  {
    title: "Verified Talent Explained",
    description: "Understand our verification system",
    icon: "✅",
    readTime: "6 min",
  },
  {
    title: "Team Collaboration",
    description: "Work together with your hiring team",
    icon: "👥",
    readTime: "7 min",
  },
  {
    title: "Billing & Plans FAQ",
    description: "Everything about pricing and features",
    icon: "💳",
    readTime: "4 min",
  },
];

const faqs = [
  {
    question: "How do I post my first job?",
    answer: 'Click "Post New Job" from the Jobs page, fill in the details, and publish. You can save drafts and preview before publishing.',
  },
  {
    question: "What is Verified Talent?",
    answer: "Verified Talent are candidates who have connected their GitHub, passed assessments, or been validated through our verification system.",
  },
  {
    question: "How does AI matching work?",
    answer: "Our AI analyzes job requirements, candidate skills, experience, and compatibility to suggest the best matches with explainable scoring.",
  },
  {
    question: "Can I invite candidates directly?",
    answer: "Yes! Use the Discover Talent page to find candidates and send direct invitations to apply for your positions.",
  },
  {
    question: "How do campus drives work?",
    answer: "Enable campus mode for a job, select target universities, and students from those institutions can apply during placement season.",
  },
  {
    question: "What are screening questions?",
    answer: "Custom questions you can add to job applications to pre-filter candidates based on specific criteria.",
  },
  {
    question: "Can I export applicant data?",
    answer: "Yes, you can export candidate lists and application data as CSV from the Applications page.",
  },
  {
    question: "How do I upgrade my plan?",
    answer: "Go to Billing, select your desired plan, and complete the payment. Upgrades are instant and you only pay the difference.",
  },
];

export default function Help() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  const filteredTutorials = tutorials.filter(
    (t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePlayVideo = (id: number) => {
    setSelectedVideo(id);
    toast.success("Loading video player...", {
      description: "Video tutorial will start shortly",
    });
    // Simulate video player loading
    setTimeout(() => {
      toast.info("Video player loaded", {
        description: "In production, this would open the video player",
      });
    }, 800);
  };

  const handleRunDemo = () => {
    toast.success("Starting demo scenario...", {
      description: "Watch as we simulate a complete hiring workflow",
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-3">Help & Learning Center</h1>
        <p className="text-muted-foreground text-lg">
          Master Jobplexity with video tutorials, guides, and interactive demos
        </p>
      </div>

      {/* Search */}
      <Card className="glass-card max-w-2xl mx-auto">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search tutorials, guides, or FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3 max-w-5xl mx-auto">
        <Card className="glass-card hover-lift cursor-pointer" onClick={handleRunDemo}>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Play className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-1">Run Demo</h3>
            <p className="text-sm text-muted-foreground">
              Interactive walkthrough
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card hover-lift cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-1">Documentation</h3>
            <p className="text-sm text-muted-foreground">
              Detailed guides
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card hover-lift cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <MessageCircle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-1">Support Chat</h3>
            <p className="text-sm text-muted-foreground">
              Get instant help
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="videos" className="max-w-7xl mx-auto">
        <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
          <TabsTrigger value="videos">Video Tutorials</TabsTrigger>
          <TabsTrigger value="guides">Guides</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>

        <TabsContent value="videos" className="mt-8">
          {/* Video Tutorials */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredTutorials.map((tutorial) => (
              <Card key={tutorial.id} className="glass-card hover-lift group overflow-hidden">
                <div className="relative">
                  <img
                    src={tutorial.thumbnail}
                    alt={tutorial.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-center justify-center">
                    <Button
                      size="icon"
                      className="h-14 w-14 rounded-full"
                      onClick={() => handlePlayVideo(tutorial.id)}
                    >
                      <Play className="h-6 w-6" />
                    </Button>
                  </div>
                  <Badge className="absolute top-3 right-3 bg-black/70 text-white border-0">
                    {tutorial.duration}
                  </Badge>
                  <Badge className="absolute top-3 left-3 bg-primary/90 text-white border-0">
                    {tutorial.category}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 line-clamp-1">{tutorial.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {tutorial.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{tutorial.views} views</span>
                    <Button variant="ghost" size="sm" className="h-7">
                      Watch Now
                      <ChevronRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTutorials.length === 0 && (
            <Card className="glass-card">
              <CardContent className="p-12 text-center">
                <Video className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No tutorials found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search query
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="guides" className="mt-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide, index) => (
              <Card key={index} className="glass-card hover-lift cursor-pointer group">
                <CardContent className="p-6">
                  <div className="text-4xl mb-3">{guide.icon}</div>
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {guide.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      📖 {guide.readTime} read
                    </span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="glass-card mt-6">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <h3 className="font-semibold mb-1">Download Complete Guide PDF</h3>
                <p className="text-sm text-muted-foreground">
                  All guides in one comprehensive document
                </p>
              </div>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Download
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faq" className="mt-8">
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="glass-card hover-lift">
                <CardHeader>
                  <CardTitle className="text-base">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="glass-card mt-8 max-w-3xl mx-auto">
            <CardContent className="p-8 text-center">
              <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Still have questions?</h3>
              <p className="text-muted-foreground mb-4">
                Our support team is here to help you 24/7
              </p>
              <div className="flex gap-3 justify-center">
                <Button variant="outline" className="gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Live Chat
                </Button>
                <Button variant="outline" className="gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Email Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
