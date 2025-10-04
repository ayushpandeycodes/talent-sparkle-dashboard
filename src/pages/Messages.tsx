import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Mail, Send, Users, TrendingUp, Copy, Plus } from "lucide-react";
import { toast } from "sonner";
import { messageTemplates } from "@/data/templates";

export default function Messages() {
  const { candidates, jobs } = useApp();
  const [selectedTemplate, setSelectedTemplate] = useState(messageTemplates[0]);
  const [messageContent, setMessageContent] = useState(messageTemplates[0].content);
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [showComposeDialog, setShowComposeDialog] = useState(false);

  const [campaigns] = useState([
    {
      id: "1",
      name: "Engineering Outreach Q1",
      sent: 45,
      opened: 32,
      replied: 12,
      date: "2024-03-15",
    },
    {
      id: "2",
      name: "Campus Drive Invitations",
      sent: 120,
      opened: 98,
      replied: 54,
      date: "2024-03-10",
    },
    {
      id: "3",
      name: "Interview Confirmations",
      sent: 28,
      opened: 28,
      replied: 24,
      date: "2024-03-18",
    },
  ]);

  const handleSendEmail = () => {
    if (selectedCandidates.length === 0) {
      toast.error("Please select at least one candidate");
      return;
    }

    setTimeout(() => {
      toast.success(`Email sent to ${selectedCandidates.length} candidate(s)`, {
        description: "Emails are being delivered...",
      });
      setShowComposeDialog(false);
      setSelectedCandidates([]);
    }, 1000);
  };

  const handleCopyTemplate = () => {
    navigator.clipboard.writeText(messageContent);
    toast.success("Template copied to clipboard");
  };

  const personalizeMessage = (content: string, candidateName: string, jobTitle: string) => {
    return content
      .replace("{{first_name}}", candidateName.split(" ")[0])
      .replace("{{job_title}}", jobTitle)
      .replace("{{company_name}}", "Jobplexity");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Messages & Outreach</h1>
          <p className="text-muted-foreground mt-1">
            Communicate with candidates using templates and bulk messaging
          </p>
        </div>
        <Dialog open={showComposeDialog} onOpenChange={setShowComposeDialog}>
          <DialogTrigger asChild>
            <Button>
              <Mail className="h-4 w-4 mr-2" />
              Compose Email
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Compose Email</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label>Template</Label>
                <Select
                  value={selectedTemplate.id}
                  onValueChange={(value) => {
                    const template = messageTemplates.find((t) => t.id === value);
                    if (template) {
                      setSelectedTemplate(template);
                      setMessageContent(template.content);
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {messageTemplates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Recipients</Label>
                <Select
                  value={selectedCandidates[0] || ""}
                  onValueChange={(value) => setSelectedCandidates([value])}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select candidates" />
                  </SelectTrigger>
                  <SelectContent>
                    {candidates.slice(0, 20).map((candidate) => (
                      <SelectItem key={candidate.id} value={candidate.id}>
                        {candidate.name} - {candidate.headline}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  Selected: {selectedCandidates.length} candidate(s)
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Message Content</Label>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleCopyTemplate}
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>
                </div>
                <Textarea
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  rows={10}
                  placeholder="Write your message..."
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Available variables: {"{"}
                  {"{first_name}}"}, {"{"}
                  {"{job_title}}"}, {"{"}
                  {"{company_name}}"}
                </p>
              </div>

              {selectedCandidates.length > 0 && (
                <div className="p-4 rounded-lg bg-muted">
                  <p className="text-sm font-medium mb-2">Preview:</p>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {personalizeMessage(
                      messageContent,
                      candidates.find((c) => c.id === selectedCandidates[0])
                        ?.name || "Candidate",
                      jobs[0]?.title || "Position"
                    )}
                  </p>
                </div>
              )}

              <Button className="w-full" onClick={handleSendEmail}>
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Send className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">193</div>
                <div className="text-sm text-muted-foreground">Sent</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                <Mail className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">158</div>
                <div className="text-sm text-muted-foreground">Opened</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">81.9%</div>
                <div className="text-sm text-muted-foreground">Open Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">90</div>
                <div className="text-sm text-muted-foreground">Replied</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Message Templates */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Message Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {messageTemplates.map((template) => (
              <div
                key={template.id}
                className="p-4 rounded-xl border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => {
                  setSelectedTemplate(template);
                  setMessageContent(template.content);
                  setShowComposeDialog(true);
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold">{template.name}</h4>
                  <Badge variant="outline">{template.category}</Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {template.content}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Campaign History */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Recent Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="flex items-center justify-between p-4 rounded-xl border border-border hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">{campaign.name}</h4>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <span>Sent: {campaign.sent}</span>
                    <span>
                      Opened: {campaign.opened} (
                      {Math.round((campaign.opened / campaign.sent) * 100)}%)
                    </span>
                    <span>
                      Replied: {campaign.replied} (
                      {Math.round((campaign.replied / campaign.sent) * 100)}%)
                    </span>
                    <span>{new Date(campaign.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
