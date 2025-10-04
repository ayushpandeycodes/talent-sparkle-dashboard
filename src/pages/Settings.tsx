import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Building2, Mail, Bell, Lock, Users, Download, Trash2, Save } from "lucide-react";
import { toast } from "sonner";

export default function Settings() {
  const [companyName, setCompanyName] = useState("Jobplexity Inc.");
  const [companyEmail, setCompanyEmail] = useState("hr@jobplexity.com");
  const [notifications, setNotifications] = useState({
    emailApplications: true,
    emailInterviews: true,
    emailMessages: true,
    pushNotifications: false,
  });
  const [privacy, setPrivacy] = useState({
    showCompanyProfile: true,
    allowCandidateContact: true,
    dataRetention: "90",
  });

  const handleSaveCompany = () => {
    toast.success("Company settings saved successfully");
  };

  const handleSaveNotifications = () => {
    toast.success("Notification preferences updated");
  };

  const handleExportData = () => {
    toast.success("Data export started. You'll receive an email when ready.");
  };

  const handleDeleteAccount = () => {
    toast.error("Account deletion requires confirmation. Contact support.");
  };

  const teamMembers = [
    { id: "1", name: "John Doe", email: "john@jobplexity.com", role: "Admin" },
    { id: "2", name: "Jane Smith", email: "jane@jobplexity.com", role: "Recruiter" },
    { id: "3", name: "Bob Wilson", email: "bob@jobplexity.com", role: "Interviewer" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account, team, and preferences
        </p>
      </div>

      <Tabs defaultValue="company" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>

        {/* Company Settings */}
        <TabsContent value="company" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Company Profile</CardTitle>
              <CardDescription>
                Update your company information and branding
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="w-20 h-20">
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                    J
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">
                    Upload Logo
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    Recommended: 400x400px, PNG or JPG
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div>
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input
                    id="company-name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="company-email">Company Email</Label>
                  <Input
                    id="company-email"
                    type="email"
                    value={companyEmail}
                    onChange={(e) => setCompanyEmail(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="company-website">Website</Label>
                  <Input
                    id="company-website"
                    placeholder="https://yourcompany.com"
                  />
                </div>

                <div>
                  <Label htmlFor="company-description">Company Description</Label>
                  <textarea
                    id="company-description"
                    className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Tell candidates about your company..."
                  />
                </div>
              </div>

              <Button onClick={handleSaveCompany}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Team Settings */}
        <TabsContent value="team" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription>
                    Manage team access and roles
                  </CardDescription>
                </div>
                <Button>
                  <Users className="h-4 w-4 mr-2" />
                  Invite Member
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-border"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {member.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{member.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {member.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="outline">{member.role}</Badge>
                      <Button size="sm" variant="ghost">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <h4 className="font-semibold">Available Seats</h4>
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div>
                    <p className="font-medium">3 of 5 seats used</p>
                    <p className="text-sm text-muted-foreground">
                      Premium Plan - Upgrade for more seats
                    </p>
                  </div>
                  <Button variant="outline">Upgrade Plan</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose what notifications you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-applications">New Applications</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when candidates apply
                    </p>
                  </div>
                  <Switch
                    id="email-applications"
                    checked={notifications.emailApplications}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, emailApplications: checked })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-interviews">Interview Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive reminders before scheduled interviews
                    </p>
                  </div>
                  <Switch
                    id="email-interviews"
                    checked={notifications.emailInterviews}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, emailInterviews: checked })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-messages">Candidate Messages</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified of new messages from candidates
                    </p>
                  </div>
                  <Switch
                    id="email-messages"
                    checked={notifications.emailMessages}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, emailMessages: checked })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive push notifications in your browser
                    </p>
                  </div>
                  <Switch
                    id="push-notifications"
                    checked={notifications.pushNotifications}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, pushNotifications: checked })
                    }
                  />
                </div>
              </div>

              <Button onClick={handleSaveNotifications}>
                <Save className="h-4 w-4 mr-2" />
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your account security and authentication
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label>Change Password</Label>
                  <div className="space-y-2 mt-2">
                    <Input type="password" placeholder="Current password" />
                    <Input type="password" placeholder="New password" />
                    <Input type="password" placeholder="Confirm new password" />
                  </div>
                  <Button className="mt-4">Update Password</Button>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Button variant="outline">Enable 2FA</Button>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Single Sign-On (SSO)</Label>
                    <p className="text-sm text-muted-foreground">
                      Available on Enterprise plan
                    </p>
                  </div>
                  <Badge variant="outline">Enterprise</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy */}
        <TabsContent value="privacy" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Privacy & Data</CardTitle>
              <CardDescription>
                Control your data and privacy settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="show-profile">Show Company Profile</Label>
                    <p className="text-sm text-muted-foreground">
                      Make your company profile visible to candidates
                    </p>
                  </div>
                  <Switch
                    id="show-profile"
                    checked={privacy.showCompanyProfile}
                    onCheckedChange={(checked) =>
                      setPrivacy({ ...privacy, showCompanyProfile: checked })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="candidate-contact">Allow Candidate Contact</Label>
                    <p className="text-sm text-muted-foreground">
                      Let candidates message you directly
                    </p>
                  </div>
                  <Switch
                    id="candidate-contact"
                    checked={privacy.allowCandidateContact}
                    onCheckedChange={(checked) =>
                      setPrivacy({ ...privacy, allowCandidateContact: checked })
                    }
                  />
                </div>

                <Separator />

                <div>
                  <Label>Data Retention Period</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    How long to keep candidate data after rejection
                  </p>
                  <select
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={privacy.dataRetention}
                    onChange={(e) =>
                      setPrivacy({ ...privacy, dataRetention: e.target.value })
                    }
                  >
                    <option value="30">30 days</option>
                    <option value="90">90 days</option>
                    <option value="180">180 days</option>
                    <option value="365">1 year</option>
                  </select>
                </div>

                <Separator />

                <div>
                  <Label>Export Your Data</Label>
                  <p className="text-sm text-muted-foreground mb-4">
                    Download a copy of all your account data
                  </p>
                  <Button variant="outline" onClick={handleExportData}>
                    <Download className="h-4 w-4 mr-2" />
                    Request Data Export
                  </Button>
                </div>

                <Separator />

                <div>
                  <Label>Delete Account</Label>
                  <p className="text-sm text-muted-foreground mb-4">
                    Permanently delete your account and all associated data
                  </p>
                  <Button variant="destructive" onClick={handleDeleteAccount}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
