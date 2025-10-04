import { Job } from "@/types";

export const sampleJobs: Job[] = [
  {
    id: "job-1",
    title: "Software Engineer Intern",
    location: "hybrid",
    city: "San Francisco, CA",
    salaryRange: "$30-40/hr",
    seniority: "intern",
    team: "Engineering",
    tags: ["React", "TypeScript", "Node.js"],
    description: "We're looking for a passionate software engineering intern to join our team and work on cutting-edge web applications.",
    screeningQuestions: [
      { id: "sq1", question: "What interests you most about this role?", type: "text", required: true },
      { id: "sq2", question: "Are you available for a full-time internship?", type: "multiselect", options: ["Yes", "No"], required: true }
    ],
    deadline: "2025-12-31",
    campuses: ["uni-1", "uni-2"],
    status: "open",
    postedDate: "2025-09-15",
    applicantCount: 47,
    viewCount: 342
  },
  {
    id: "job-2",
    title: "Backend Engineer (Mid-Level)",
    location: "remote",
    city: "Remote",
    salaryRange: "$120k-150k",
    seniority: "mid",
    team: "Engineering",
    tags: ["Python", "Django", "PostgreSQL", "AWS"],
    description: "Join our backend team to build scalable microservices and APIs that power our platform.",
    screeningQuestions: [
      { id: "sq3", question: "Describe your experience with microservices architecture.", type: "text", required: true }
    ],
    deadline: "2025-11-30",
    campuses: [],
    status: "open",
    postedDate: "2025-09-20",
    applicantCount: 32,
    viewCount: 218
  },
  {
    id: "job-3",
    title: "Product Manager (Associate)",
    location: "onsite",
    city: "New York, NY",
    salaryRange: "$100k-130k",
    seniority: "entry",
    team: "Product",
    tags: ["Product Strategy", "User Research", "Analytics"],
    description: "Work with cross-functional teams to define product vision and drive execution.",
    screeningQuestions: [
      { id: "sq4", question: "Tell us about a product you've shipped or contributed to.", type: "text", required: true }
    ],
    deadline: "2025-12-15",
    campuses: ["uni-3"],
    status: "open",
    postedDate: "2025-09-10",
    applicantCount: 28,
    viewCount: 167
  },
  {
    id: "job-4",
    title: "Marketing Coordinator",
    location: "hybrid",
    city: "Austin, TX",
    salaryRange: "$60k-75k",
    seniority: "entry",
    team: "Marketing",
    tags: ["Content Marketing", "Social Media", "SEO"],
    description: "Help us grow our brand presence through creative marketing campaigns and content.",
    screeningQuestions: [
      { id: "sq5", question: "Share a marketing campaign you're proud of.", type: "text", required: true }
    ],
    deadline: "2025-11-20",
    campuses: [],
    status: "open",
    postedDate: "2025-09-25",
    applicantCount: 19,
    viewCount: 145
  },
  {
    id: "job-5",
    title: "Data Analyst",
    location: "remote",
    city: "Remote",
    salaryRange: "$80k-100k",
    seniority: "mid",
    team: "Data",
    tags: ["SQL", "Python", "Tableau", "Statistics"],
    description: "Transform data into actionable insights to drive business decisions.",
    screeningQuestions: [
      { id: "sq6", question: "Describe your experience with data visualization tools.", type: "text", required: true }
    ],
    deadline: "2025-12-10",
    campuses: ["uni-1"],
    status: "open",
    postedDate: "2025-09-18",
    applicantCount: 24,
    viewCount: 189
  },
  {
    id: "job-6",
    title: "UI/UX Designer",
    location: "hybrid",
    city: "Seattle, WA",
    salaryRange: "$90k-120k",
    seniority: "mid",
    team: "Design",
    tags: ["Figma", "User Research", "Prototyping", "Design Systems"],
    description: "Create delightful user experiences through thoughtful design and research.",
    screeningQuestions: [
      { id: "sq7", question: "Share your portfolio link.", type: "text", required: true },
      { id: "sq8", question: "What's your design process?", type: "text", required: true }
    ],
    deadline: "2025-11-25",
    campuses: [],
    status: "open",
    postedDate: "2025-09-22",
    applicantCount: 36,
    viewCount: 256
  },
  {
    id: "job-7",
    title: "DevOps Engineer",
    location: "remote",
    city: "Remote",
    salaryRange: "$130k-160k",
    seniority: "senior",
    team: "Engineering",
    tags: ["Kubernetes", "Docker", "CI/CD", "AWS", "Terraform"],
    description: "Build and maintain our infrastructure and deployment pipelines.",
    screeningQuestions: [
      { id: "sq9", question: "Describe your experience with container orchestration.", type: "text", required: true }
    ],
    deadline: "2025-12-20",
    campuses: [],
    status: "open",
    postedDate: "2025-09-12",
    applicantCount: 15,
    viewCount: 134
  },
  {
    id: "job-8",
    title: "Sales Development Representative",
    location: "onsite",
    city: "Boston, MA",
    salaryRange: "$55k-70k + commission",
    seniority: "entry",
    team: "Sales",
    tags: ["B2B Sales", "Prospecting", "CRM"],
    description: "Generate and qualify leads to fuel our sales pipeline.",
    screeningQuestions: [
      { id: "sq10", question: "Why are you interested in sales?", type: "text", required: true }
    ],
    deadline: "2025-11-15",
    campuses: ["uni-2", "uni-3"],
    status: "open",
    postedDate: "2025-09-28",
    applicantCount: 41,
    viewCount: 298
  },
  {
    id: "job-9",
    title: "Frontend Developer",
    location: "hybrid",
    city: "Los Angeles, CA",
    salaryRange: "$110k-140k",
    seniority: "mid",
    team: "Engineering",
    tags: ["React", "Next.js", "TypeScript", "Tailwind"],
    description: "Build beautiful and performant user interfaces for our web applications.",
    screeningQuestions: [
      { id: "sq11", question: "What's your favorite frontend technology and why?", type: "text", required: true }
    ],
    deadline: "2025-12-05",
    campuses: [],
    status: "open",
    postedDate: "2025-09-17",
    applicantCount: 52,
    viewCount: 387
  },
  {
    id: "job-10",
    title: "Content Writer",
    location: "remote",
    city: "Remote",
    salaryRange: "$65k-85k",
    seniority: "mid",
    team: "Marketing",
    tags: ["Technical Writing", "SEO", "Blogging"],
    description: "Create engaging technical content for our blog and documentation.",
    screeningQuestions: [
      { id: "sq12", question: "Share 2-3 writing samples.", type: "text", required: true }
    ],
    deadline: "2025-11-28",
    campuses: [],
    status: "open",
    postedDate: "2025-09-24",
    applicantCount: 31,
    viewCount: 201
  },
  {
    id: "job-11",
    title: "Machine Learning Engineer",
    location: "hybrid",
    city: "San Francisco, CA",
    salaryRange: "$150k-180k",
    seniority: "senior",
    team: "Engineering",
    tags: ["Python", "TensorFlow", "PyTorch", "MLOps"],
    description: "Develop and deploy machine learning models at scale.",
    screeningQuestions: [
      { id: "sq13", question: "Describe a challenging ML problem you've solved.", type: "text", required: true }
    ],
    deadline: "2025-12-18",
    campuses: ["uni-1"],
    status: "open",
    postedDate: "2025-09-14",
    applicantCount: 22,
    viewCount: 178
  },
  {
    id: "job-12",
    title: "Customer Success Manager",
    location: "remote",
    city: "Remote",
    salaryRange: "$75k-95k",
    seniority: "mid",
    team: "Customer Success",
    tags: ["Account Management", "SaaS", "Customer Support"],
    description: "Ensure our customers achieve their goals and remain satisfied with our product.",
    screeningQuestions: [
      { id: "sq14", question: "How do you handle difficult customer situations?", type: "text", required: true }
    ],
    deadline: "2025-11-30",
    campuses: [],
    status: "open",
    postedDate: "2025-09-21",
    applicantCount: 27,
    viewCount: 193
  },
  {
    id: "job-13",
    title: "Security Engineer",
    location: "remote",
    city: "Remote",
    salaryRange: "$140k-170k",
    seniority: "senior",
    team: "Security",
    tags: ["Penetration Testing", "Security Audits", "Compliance"],
    description: "Protect our infrastructure and ensure security best practices.",
    screeningQuestions: [
      { id: "sq15", question: "What security certifications do you hold?", type: "text", required: true }
    ],
    deadline: "2025-12-22",
    campuses: [],
    status: "open",
    postedDate: "2025-09-11",
    applicantCount: 13,
    viewCount: 118
  },
  {
    id: "job-14",
    title: "QA Engineer",
    location: "hybrid",
    city: "Chicago, IL",
    salaryRange: "$85k-110k",
    seniority: "mid",
    team: "Quality",
    tags: ["Test Automation", "Selenium", "API Testing"],
    description: "Ensure product quality through comprehensive testing strategies.",
    screeningQuestions: [
      { id: "sq16", question: "Describe your approach to test automation.", type: "text", required: true }
    ],
    deadline: "2025-11-18",
    campuses: ["uni-2"],
    status: "open",
    postedDate: "2025-09-26",
    applicantCount: 18,
    viewCount: 142
  },
  {
    id: "job-15",
    title: "Business Analyst",
    location: "onsite",
    city: "Dallas, TX",
    salaryRange: "$70k-90k",
    seniority: "entry",
    team: "Operations",
    tags: ["Business Intelligence", "Requirements Analysis", "Stakeholder Management"],
    description: "Bridge the gap between business needs and technical solutions.",
    screeningQuestions: [
      { id: "sq17", question: "How do you gather and document requirements?", type: "text", required: true }
    ],
    deadline: "2025-12-08",
    campuses: ["uni-3"],
    status: "open",
    postedDate: "2025-09-19",
    applicantCount: 25,
    viewCount: 176
  },
  {
    id: "job-16",
    title: "Mobile Developer (iOS)",
    location: "remote",
    city: "Remote",
    salaryRange: "$120k-150k",
    seniority: "mid",
    team: "Engineering",
    tags: ["Swift", "SwiftUI", "iOS", "Mobile Development"],
    description: "Build native iOS applications with excellent user experience.",
    screeningQuestions: [
      { id: "sq18", question: "Share your App Store portfolio.", type: "text", required: true }
    ],
    deadline: "2025-11-22",
    campuses: [],
    status: "open",
    postedDate: "2025-09-23",
    applicantCount: 29,
    viewCount: 207
  },
  {
    id: "job-17",
    title: "HR Coordinator",
    location: "onsite",
    city: "Miami, FL",
    salaryRange: "$50k-65k",
    seniority: "entry",
    team: "Human Resources",
    tags: ["Recruitment", "Employee Relations", "HR Operations"],
    description: "Support our growing team with HR operations and recruitment.",
    screeningQuestions: [
      { id: "sq19", question: "What experience do you have with HRIS systems?", type: "text", required: true }
    ],
    deadline: "2025-11-12",
    campuses: [],
    status: "open",
    postedDate: "2025-09-27",
    applicantCount: 34,
    viewCount: 241
  },
  {
    id: "job-18",
    title: "Engineering Manager",
    location: "hybrid",
    city: "San Francisco, CA",
    salaryRange: "$170k-210k",
    seniority: "lead",
    team: "Engineering",
    tags: ["Leadership", "Team Management", "Technical Strategy"],
    description: "Lead a team of talented engineers and drive technical excellence.",
    screeningQuestions: [
      { id: "sq20", question: "Describe your leadership philosophy.", type: "text", required: true }
    ],
    deadline: "2025-12-25",
    campuses: [],
    status: "open",
    postedDate: "2025-09-13",
    applicantCount: 11,
    viewCount: 95
  },
  {
    id: "job-19",
    title: "Growth Marketer",
    location: "remote",
    city: "Remote",
    salaryRange: "$95k-125k",
    seniority: "mid",
    team: "Marketing",
    tags: ["Growth Hacking", "Analytics", "A/B Testing", "Acquisition"],
    description: "Drive user acquisition and retention through data-driven experiments.",
    screeningQuestions: [
      { id: "sq21", question: "Share a successful growth experiment you've run.", type: "text", required: true }
    ],
    deadline: "2025-11-27",
    campuses: [],
    status: "open",
    postedDate: "2025-09-16",
    applicantCount: 38,
    viewCount: 265
  },
  {
    id: "job-20",
    title: "Full Stack Developer",
    location: "hybrid",
    city: "Denver, CO",
    salaryRange: "$115k-145k",
    seniority: "mid",
    team: "Engineering",
    tags: ["React", "Node.js", "PostgreSQL", "TypeScript"],
    description: "Work across the entire stack to deliver end-to-end features.",
    screeningQuestions: [
      { id: "sq22", question: "What's your preferred tech stack and why?", type: "text", required: true }
    ],
    deadline: "2025-12-12",
    campuses: ["uni-1", "uni-2"],
    status: "open",
    postedDate: "2025-09-20",
    applicantCount: 44,
    viewCount: 312
  }
];
