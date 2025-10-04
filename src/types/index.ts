export type JobStatus = "open" | "paused" | "closed";
export type JobLocation = "remote" | "hybrid" | "onsite";
export type Seniority = "intern" | "entry" | "mid" | "senior" | "lead";
export type ApplicationStage = "applied" | "phone_screen" | "interview" | "offer" | "hired" | "rejected";
export type Priority = "low" | "medium" | "high";

export interface Job {
  id: string;
  title: string;
  location: JobLocation;
  city: string;
  salaryRange: string;
  seniority: Seniority;
  team: string;
  tags: string[];
  description: string;
  screeningQuestions: ScreeningQuestion[];
  deadline: string;
  campuses: string[];
  status: JobStatus;
  postedDate: string;
  applicantCount: number;
  viewCount: number;
}

export interface ScreeningQuestion {
  id: string;
  question: string;
  type: "text" | "multiselect";
  options?: string[];
  required: boolean;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  headline: string;
  location: string;
  skills: string[];
  yearsExperience: number;
  education: string;
  resumeText: string;
  coverLetterText: string;
  githubUrl?: string;
  portfolioUrl?: string;
  portfolioPreview?: string;
  verifiedTalent: boolean;
  credibilityScore: number;
  assessmentScores: Record<string, number>;
  availability: string;
  appliedJobIds: string[];
  currentStage: Record<string, ApplicationStage>;
  photo?: string;
  bio?: string;
  appliedDate: Record<string, string>;
}

export interface University {
  id: string;
  name: string;
  domain: string;
  cohortSize: number;
  location: string;
}

export interface MessageTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  category: "outreach" | "interview" | "rejection" | "campus";
}

export interface Interview {
  id: string;
  candidateId: string;
  jobId: string;
  date: string;
  duration: number;
  type: "phone" | "technical" | "onsite";
  interviewers: string[];
  status: "scheduled" | "completed" | "cancelled";
  notes?: string;
  rating?: number;
}

export interface CampusDrive {
  id: string;
  universityId: string;
  jobIds: string[];
  deadline: string;
  seatsAvailable: number;
  applicants: number;
  interviewed: number;
  offered: number;
  status: "draft" | "active" | "closed";
}

export interface ActivityLog {
  id: string;
  type: string;
  description: string;
  timestamp: string;
  userId?: string;
  candidateId?: string;
  jobId?: string;
}
