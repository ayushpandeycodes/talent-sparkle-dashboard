import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Job, Candidate, Interview, ActivityLog, CampusDrive, ApplicationStage } from "@/types";
import { sampleJobs } from "@/data/jobs";
import { sampleCandidates } from "@/data/candidates";
import { sampleUniversities } from "@/data/universities";

interface AppContextType {
  jobs: Job[];
  candidates: Candidate[];
  interviews: Interview[];
  activities: ActivityLog[];
  campusDrives: CampusDrive[];
  addJob: (job: Job) => void;
  updateJob: (id: string, updates: Partial<Job>) => void;
  deleteJob: (id: string) => void;
  updateCandidateStage: (candidateId: string, jobId: string, stage: ApplicationStage) => void;
  addInterview: (interview: Interview) => void;
  addActivity: (activity: Omit<ActivityLog, "id" | "timestamp">) => void;
  addCampusDrive: (drive: CampusDrive) => void;
  getJobById: (id: string) => Job | undefined;
  getCandidateById: (id: string) => Candidate | undefined;
  getCandidatesForJob: (jobId: string) => Candidate[];
  demoMode: boolean;
  setDemoMode: (enabled: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>(() => {
    const stored = localStorage.getItem("jobplexity_jobs");
    return stored ? JSON.parse(stored) : sampleJobs;
  });

  const [candidates, setCandidates] = useState<Candidate[]>(() => {
    const stored = localStorage.getItem("jobplexity_candidates");
    return stored ? JSON.parse(stored) : sampleCandidates;
  });

  const [interviews, setInterviews] = useState<Interview[]>(() => {
    const stored = localStorage.getItem("jobplexity_interviews");
    return stored ? JSON.parse(stored) : [];
  });

  const [activities, setActivities] = useState<ActivityLog[]>(() => {
    const stored = localStorage.getItem("jobplexity_activities");
    return stored ? JSON.parse(stored) : [];
  });

  const [campusDrives, setCampusDrives] = useState<CampusDrive[]>(() => {
    const stored = localStorage.getItem("jobplexity_campus_drives");
    return stored ? JSON.parse(stored) : [];
  });

  const [demoMode, setDemoMode] = useState(false);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("jobplexity_jobs", JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem("jobplexity_candidates", JSON.stringify(candidates));
  }, [candidates]);

  useEffect(() => {
    localStorage.setItem("jobplexity_interviews", JSON.stringify(interviews));
  }, [interviews]);

  useEffect(() => {
    localStorage.setItem("jobplexity_activities", JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem("jobplexity_campus_drives", JSON.stringify(campusDrives));
  }, [campusDrives]);

  const addJob = (job: Job) => {
    setJobs((prev) => [job, ...prev]);
    addActivity({
      type: "job_posted",
      description: `Posted new job: ${job.title}`,
      jobId: job.id,
    });
  };

  const updateJob = (id: string, updates: Partial<Job>) => {
    setJobs((prev) => prev.map((job) => (job.id === id ? { ...job, ...updates } : job)));
  };

  const deleteJob = (id: string) => {
    const job = jobs.find((j) => j.id === id);
    setJobs((prev) => prev.filter((job) => job.id !== id));
    if (job) {
      addActivity({
        type: "job_deleted",
        description: `Deleted job: ${job.title}`,
        jobId: id,
      });
    }
  };

  const updateCandidateStage = (candidateId: string, jobId: string, stage: ApplicationStage) => {
    setCandidates((prev) =>
      prev.map((candidate) => {
        if (candidate.id === candidateId) {
          return {
            ...candidate,
            currentStage: {
              ...candidate.currentStage,
              [jobId]: stage,
            },
          };
        }
        return candidate;
      })
    );

    const candidate = candidates.find((c) => c.id === candidateId);
    if (candidate) {
      addActivity({
        type: "stage_change",
        description: `${candidate.name} moved to ${stage} stage`,
        candidateId,
        jobId,
      });
    }
  };

  const addInterview = (interview: Interview) => {
    setInterviews((prev) => [...prev, interview]);
    const candidate = candidates.find((c) => c.id === interview.candidateId);
    if (candidate) {
      addActivity({
        type: "interview_scheduled",
        description: `Interview scheduled with ${candidate.name}`,
        candidateId: interview.candidateId,
        jobId: interview.jobId,
      });
    }
  };

  const addActivity = (activity: Omit<ActivityLog, "id" | "timestamp">) => {
    const newActivity: ActivityLog = {
      ...activity,
      id: `activity-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
    };
    setActivities((prev) => [newActivity, ...prev].slice(0, 100)); // Keep last 100
  };

  const addCampusDrive = (drive: CampusDrive) => {
    setCampusDrives((prev) => [...prev, drive]);
    addActivity({
      type: "campus_drive_created",
      description: `Created campus drive`,
    });
  };

  const getJobById = (id: string) => jobs.find((job) => job.id === id);

  const getCandidateById = (id: string) => candidates.find((candidate) => candidate.id === id);

  const getCandidatesForJob = (jobId: string) => {
    return candidates.filter((candidate) => candidate.appliedJobIds.includes(jobId));
  };

  const value: AppContextType = {
    jobs,
    candidates,
    interviews,
    activities,
    campusDrives,
    addJob,
    updateJob,
    deleteJob,
    updateCandidateStage,
    addInterview,
    addActivity,
    addCampusDrive,
    getJobById,
    getCandidateById,
    getCandidatesForJob,
    demoMode,
    setDemoMode,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
