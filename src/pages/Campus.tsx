import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, Plus, Calendar, Users, MapPin, Building2, Mail } from "lucide-react";
import { toast } from "sonner";
import { sampleUniversities } from "@/data/universities";

export default function Campus() {
  const { campusDrives, addCampusDrive, jobs } = useApp();
  const [showNewDriveDialog, setShowNewDriveDialog] = useState(false);
  const [newDrive, setNewDrive] = useState({
    universityId: "",
    jobIds: [] as string[],
    scheduledDate: "",
    slots: 20,
    location: "",
    requirements: "",
  });

  const handleCreateDrive = () => {
    if (!newDrive.universityId || newDrive.jobIds.length === 0 || !newDrive.scheduledDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    const university = sampleUniversities.find((u) => u.id === newDrive.universityId);
    
    addCampusDrive({
      id: `drive-${Date.now()}`,
      universityId: newDrive.universityId,
      jobIds: newDrive.jobIds,
      deadline: newDrive.scheduledDate,
      scheduledDate: newDrive.scheduledDate,
      seatsAvailable: newDrive.slots,
      slots: newDrive.slots,
      applicants: 0,
      interviewed: 0,
      offered: 0,
      location: newDrive.location,
      status: "scheduled",
    });

    toast.success(`Campus drive created at ${university?.name}`);
    setShowNewDriveDialog(false);
    setNewDrive({
      universityId: "",
      jobIds: [],
      scheduledDate: "",
      slots: 20,
      location: "",
      requirements: "",
    });
  };

  const handleSendInvite = (universityId: string) => {
    const university = sampleUniversities.find((u) => u.id === universityId);
    toast.success(`Invitation sent to ${university?.name} Placement Cell`);
  };

  const activeDrives = campusDrives.filter((d) => d.status === "scheduled");
  const completedDrives = campusDrives.filter((d) => d.status === "completed");

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Campus Drives</h1>
          <p className="text-muted-foreground mt-1">
            Connect with universities and manage campus recruitment
          </p>
        </div>
        <Dialog open={showNewDriveDialog} onOpenChange={setShowNewDriveDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Campus Drive
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Campus Drive</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label>University *</Label>
                <Select
                  value={newDrive.universityId}
                  onValueChange={(value) =>
                    setNewDrive({ ...newDrive, universityId: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select university" />
                  </SelectTrigger>
                  <SelectContent>
                    {sampleUniversities.map((university) => (
                      <SelectItem key={university.id} value={university.id}>
                        {university.name} - {university.location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Target Job Positions *</Label>
                <Select
                  value={newDrive.jobIds[0] || ""}
                  onValueChange={(value) =>
                    setNewDrive({ ...newDrive, jobIds: [value] })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select job positions" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobs.map((job) => (
                      <SelectItem key={job.id} value={job.id}>
                        {job.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Drive Date *</Label>
                <Input
                  type="date"
                  value={newDrive.scheduledDate}
                  onChange={(e) =>
                    setNewDrive({ ...newDrive, scheduledDate: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Available Slots</Label>
                <Input
                  type="number"
                  value={newDrive.slots}
                  onChange={(e) =>
                    setNewDrive({ ...newDrive, slots: parseInt(e.target.value) })
                  }
                  min={1}
                />
              </div>

              <div>
                <Label>Location / Venue</Label>
                <Input
                  placeholder="e.g., Main Auditorium, Block A"
                  value={newDrive.location}
                  onChange={(e) =>
                    setNewDrive({ ...newDrive, location: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Requirements & Instructions</Label>
                <Textarea
                  placeholder="Add eligibility criteria, required documents, etc."
                  value={newDrive.requirements}
                  onChange={(e) =>
                    setNewDrive({ ...newDrive, requirements: e.target.value })
                  }
                  rows={4}
                />
              </div>

              <Button className="w-full" onClick={handleCreateDrive}>
                Create Campus Drive
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
                <Building2 className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">{sampleUniversities.length}</div>
                <div className="text-sm text-muted-foreground">Partner Universities</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">{activeDrives.length}</div>
                <div className="text-sm text-muted-foreground">Active Drives</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {campusDrives.reduce((sum, d) => sum + d.applicants, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Total Applicants</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">{completedDrives.length}</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Partner Universities */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Partner Universities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sampleUniversities.map((university) => (
              <div
                key={university.id}
                className="p-4 rounded-xl border border-border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{university.name}</h4>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {university.location}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm mb-3">
                  <span className="text-muted-foreground">
                    {university.studentCount.toLocaleString()} students
                  </span>
                  <Badge variant="outline">{university.tier}</Badge>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleSendInvite(university.id)}
                  >
                    <Mail className="h-3 w-3 mr-1" />
                    Invite
                  </Button>
                  <Button size="sm" className="flex-1">
                    Create Drive
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Campus Drives */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Active Campus Drives</CardTitle>
        </CardHeader>
        <CardContent>
          {activeDrives.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No active campus drives. Create one to get started!
            </div>
          ) : (
            <div className="space-y-4">
              {activeDrives.map((drive) => {
                const university = sampleUniversities.find(
                  (u) => u.id === drive.universityId
                );
                const targetJobs = drive.jobIds.map((jobId) =>
                  jobs.find((j) => j.id === jobId)
                );

                return (
                  <div
                    key={drive.id}
                    className="flex items-center justify-between p-4 rounded-xl border border-border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold">{university?.name}</h4>
                        <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                          {drive.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(drive.scheduledDate).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {drive.location || university?.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {drive.applicants}/{drive.slots} applicants
                        </span>
                      </div>
                      <div className="flex gap-2 mt-2">
                        {targetJobs.map((job) => (
                          <Badge key={job?.id} variant="outline">
                            {job?.title}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        View Applicants
                      </Button>
                      <Button size="sm">
                        Manage
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
