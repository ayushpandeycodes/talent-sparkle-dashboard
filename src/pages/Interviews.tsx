import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock, Video, Plus, CheckCircle, XCircle, Users } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { format, addDays, startOfWeek } from "date-fns";

const interviewTemplates = [
  { id: "phone", name: "Phone Screen", duration: 30, type: "phone" },
  { id: "technical", name: "Technical Interview", duration: 60, type: "video" },
  { id: "behavioral", name: "Behavioral Interview", duration: 45, type: "video" },
  { id: "onsite", name: "Onsite Panel", duration: 180, type: "onsite" },
];

export default function Interviews() {
  const { interviews, addInterview, candidates, jobs } = useApp();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showNewInterviewDialog, setShowNewInterviewDialog] = useState(false);
  const [rescheduleDialog, setRescheduleDialog] = useState(false);
  const [rescheduleInterview, setRescheduleInterview] = useState<any>(null);
  const [newRescheduleData, setNewRescheduleData] = useState({
    date: "",
    time: "",
    reason: "",
  });
  const [newInterview, setNewInterview] = useState({
    candidateId: "",
    jobId: "",
    scheduledAt: "",
    duration: 60,
    type: "video",
    interviewers: "",
    notes: "",
  });

  // Generate week view
  const weekStart = startOfWeek(selectedDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  // Filter interviews for current week
  const weekInterviews = interviews.filter((interview) => {
    const interviewDate = new Date(interview.scheduledAt);
    return interviewDate >= weekStart && interviewDate < addDays(weekStart, 7);
  });

  const handleScheduleInterview = () => {
    if (!newInterview.candidateId || !newInterview.jobId || !newInterview.scheduledAt) {
      toast.error("Please fill in all required fields");
      return;
    }

    const candidate = candidates.find((c) => c.id === newInterview.candidateId);
    const job = jobs.find((j) => j.id === newInterview.jobId);

    addInterview({
      id: `interview-${Date.now()}`,
      candidateId: newInterview.candidateId,
      jobId: newInterview.jobId,
      date: newInterview.scheduledAt,
      scheduledAt: newInterview.scheduledAt,
      duration: newInterview.duration,
      type: newInterview.type as "phone" | "video" | "technical" | "onsite",
      interviewers: newInterview.interviewers.split(",").map((i) => i.trim()),
      status: "scheduled",
      notes: newInterview.notes,
    });

    toast.success(`Interview scheduled with ${candidate?.name} for ${job?.title}`);
    setShowNewInterviewDialog(false);
    setNewInterview({
      candidateId: "",
      jobId: "",
      scheduledAt: "",
      duration: 60,
      type: "video",
      interviewers: "",
      notes: "",
    });
  };

  const handleReschedule = (interview: any) => {
    const interviewDate = new Date(interview.scheduledAt);
    setRescheduleInterview(interview);
    setNewRescheduleData({
      date: interviewDate.toISOString().split('T')[0],
      time: format(interviewDate, 'HH:mm'),
      reason: "",
    });
    setRescheduleDialog(true);
  };

  const confirmReschedule = () => {
    if (!newRescheduleData.date || !newRescheduleData.time) {
      toast.error("Please select a new date and time");
      return;
    }
    
    const candidate = candidates.find((c) => c.id === rescheduleInterview?.candidateId);
    toast.success(`Interview rescheduled with ${candidate?.name}`, {
      description: `New time: ${format(new Date(`${newRescheduleData.date}T${newRescheduleData.time}`), 'MMM dd, yyyy hh:mm a')}`,
    });
    setRescheduleDialog(false);
    setRescheduleInterview(null);
  };

  const upcomingInterviews = interviews
    .filter((i) => new Date(i.scheduledAt) > new Date() && i.status === "scheduled")
    .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime());

  const todayInterviews = interviews.filter((i) => {
    const interviewDate = new Date(i.scheduledAt);
    const today = new Date();
    return (
      interviewDate.toDateString() === today.toDateString() &&
      i.status === "scheduled"
    );
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Interview Scheduler</h1>
          <p className="text-muted-foreground mt-1">
            Schedule and manage interviews with candidates
          </p>
        </div>
        <Dialog open={showNewInterviewDialog} onOpenChange={setShowNewInterviewDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Schedule Interview
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Schedule New Interview</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label>Candidate *</Label>
                <Select
                  value={newInterview.candidateId}
                  onValueChange={(value) =>
                    setNewInterview({ ...newInterview, candidateId: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select candidate" />
                  </SelectTrigger>
                  <SelectContent>
                    {candidates.map((candidate) => (
                      <SelectItem key={candidate.id} value={candidate.id}>
                        {candidate.name} - {candidate.headline}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Job Position *</Label>
                <Select
                  value={newInterview.jobId}
                  onValueChange={(value) =>
                    setNewInterview({ ...newInterview, jobId: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select job" />
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
                <Label>Interview Template</Label>
                <Select
                  onValueChange={(value) => {
                    const template = interviewTemplates.find((t) => t.id === value);
                    if (template) {
                      setNewInterview({
                        ...newInterview,
                        duration: template.duration,
                        type: template.type,
                      });
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select template" />
                  </SelectTrigger>
                  <SelectContent>
                    {interviewTemplates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name} ({template.duration}min)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Date & Time *</Label>
                <Input
                  type="datetime-local"
                  value={newInterview.scheduledAt}
                  onChange={(e) =>
                    setNewInterview({ ...newInterview, scheduledAt: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Interviewers (comma-separated)</Label>
                <Input
                  placeholder="John Doe, Jane Smith"
                  value={newInterview.interviewers}
                  onChange={(e) =>
                    setNewInterview({ ...newInterview, interviewers: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Notes</Label>
                <Textarea
                  placeholder="Add any special instructions or notes..."
                  value={newInterview.notes}
                  onChange={(e) =>
                    setNewInterview({ ...newInterview, notes: e.target.value })
                  }
                />
              </div>

              <Button className="w-full" onClick={handleScheduleInterview}>
                Schedule Interview
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
                <CalendarIcon className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">{todayInterviews.length}</div>
                <div className="text-sm text-muted-foreground">Today</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">{upcomingInterviews.length}</div>
                <div className="text-sm text-muted-foreground">Upcoming</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {interviews.filter((i) => i.status === "completed").length}
                </div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                <XCircle className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {interviews.filter((i) => i.status === "cancelled").length}
                </div>
                <div className="text-sm text-muted-foreground">Cancelled</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Interviews */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Upcoming Interviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingInterviews.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No upcoming interviews scheduled
              </div>
            ) : (
              upcomingInterviews.slice(0, 5).map((interview) => {
                const candidate = candidates.find((c) => c.id === interview.candidateId);
                const job = jobs.find((j) => j.id === interview.jobId);

                return (
                  <div
                    key={interview.id}
                    className="flex items-center justify-between p-4 rounded-xl border border-border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Video className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{candidate?.name}</h4>
                        <p className="text-sm text-muted-foreground">{job?.title}</p>
                        <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <CalendarIcon className="h-3 w-3" />
                            {format(new Date(interview.scheduledAt), "MMM dd, yyyy")}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {format(new Date(interview.scheduledAt), "hh:mm a")}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {interview.interviewers.length} interviewer(s)
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Video className="h-4 w-4 mr-2" />
                        Join
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleReschedule(interview)}>
                        Reschedule
                      </Button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>

      {/* Reschedule Dialog */}
      <Dialog open={rescheduleDialog} onOpenChange={setRescheduleDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Reschedule Interview</DialogTitle>
          </DialogHeader>
          {rescheduleInterview && (
            <div className="space-y-4 mt-4">
              <div>
                <Label>Current Date & Time</Label>
                <Input
                  value={format(new Date(rescheduleInterview.scheduledAt), 'MMM dd, yyyy hh:mm a')}
                  disabled
                  className="mt-2"
                />
              </div>
              <div>
                <Label>New Date</Label>
                <Input
                  type="date"
                  className="mt-2"
                  value={newRescheduleData.date}
                  onChange={(e) => setNewRescheduleData({ ...newRescheduleData, date: e.target.value })}
                />
              </div>
              <div>
                <Label>New Time</Label>
                <Input
                  type="time"
                  className="mt-2"
                  value={newRescheduleData.time}
                  onChange={(e) => setNewRescheduleData({ ...newRescheduleData, time: e.target.value })}
                />
              </div>
              <div>
                <Label>Reason (Optional)</Label>
                <Textarea
                  placeholder="Provide a reason for rescheduling..."
                  className="mt-2"
                  rows={3}
                  value={newRescheduleData.reason}
                  onChange={(e) => setNewRescheduleData({ ...newRescheduleData, reason: e.target.value })}
                />
              </div>
              <Button className="w-full" onClick={confirmReschedule}>
                Confirm Reschedule
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
