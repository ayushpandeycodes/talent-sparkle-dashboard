import { Candidate } from "@/types";

const firstNames = ["Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Sai", "Reyansh", "Ayaan", "Krishna", "Ishaan", "Shaurya", "Atharv", "Advait", "Pranav", "Aadhya", "Ananya", "Saanvi", "Diya", "Kiara", "Isha", "Kavya", "Priya", "Riya", "Nisha", "Shreya"];
const lastNames = ["Sharma", "Patel", "Kumar", "Singh", "Gupta", "Reddy", "Mehta", "Verma", "Iyer", "Nair", "Malhotra", "Desai", "Joshi", "Rao", "Agarwal", "Shah", "Kapoor", "Kulkarni", "Chopra", "Banerjee", "Chatterjee", "Pillai", "Bhat", "Shetty", "Menon"];
const cities = ["Mumbai", "Bangalore", "Delhi", "Hyderabad", "Pune", "Chennai", "Kolkata", "Ahmedabad", "Gurgaon", "Noida"];
const skillSets = [
  ["React", "TypeScript", "Node.js", "PostgreSQL"],
  ["Python", "Django", "AWS", "Docker"],
  ["Product Strategy", "User Research", "Analytics", "Roadmapping"],
  ["Content Marketing", "SEO", "Social Media", "Copywriting"],
  ["SQL", "Python", "Tableau", "Statistics"],
  ["Figma", "Sketch", "User Research", "Prototyping"],
  ["Kubernetes", "Terraform", "CI/CD", "AWS"],
  ["B2B Sales", "Prospecting", "Salesforce", "CRM"],
  ["React", "Next.js", "Tailwind", "JavaScript"],
  ["Technical Writing", "Documentation", "SEO"],
  ["TensorFlow", "PyTorch", "Python", "MLOps"],
  ["Account Management", "Customer Success", "SaaS"],
  ["Penetration Testing", "Security Audits", "Compliance"],
  ["Test Automation", "Selenium", "API Testing"],
  ["Business Intelligence", "Requirements Analysis", "Agile"],
  ["Swift", "SwiftUI", "iOS Development"],
  ["Recruitment", "Employee Relations", "HRIS"],
  ["Leadership", "Team Management", "Agile"],
  ["Growth Hacking", "A/B Testing", "Analytics"],
  ["Full Stack", "Node.js", "React", "PostgreSQL"]
];

const educationOptions = [
  "B.Tech Computer Science, IIT Bombay",
  "B.Tech Engineering, IIT Delhi",
  "B.E. Computer Science, BITS Pilani",
  "M.Tech Data Science, IIT Madras",
  "B.Com Business Administration, Delhi University",
  "B.Tech Information Technology, NIT Trichy",
  "MBA, IIM Ahmedabad",
  "B.Sc Mathematics, St. Xavier's College Mumbai",
  "B.Des Design, NID Ahmedabad",
  "B.Tech Computer Engineering, IIT Kanpur"
];

function generateResumeText(name: string, skills: string[], experience: number): string {
  return `${name}

PROFESSIONAL SUMMARY
Highly motivated professional with ${experience} years of experience in ${skills[0]} and ${skills[1]}. Proven track record of delivering high-quality projects and collaborating with cross-functional teams.

SKILLS
${skills.join(", ")}

EXPERIENCE
${experience > 3 ? "Senior Developer" : experience > 1 ? "Mid-Level Developer" : "Junior Developer"} | Tech Company (${2025 - experience} - Present)
- Led development of key features using ${skills[0]} and ${skills[1]}
- Collaborated with product and design teams
- Mentored junior team members
- Improved system performance by 40%

EDUCATION
Bachelor's Degree in Computer Science

CERTIFICATIONS
- AWS Certified Developer
- Certified Scrum Master`;
}

function generateCoverLetter(name: string, jobTitle: string): string {
  return `Dear Hiring Manager,

I am writing to express my strong interest in the ${jobTitle} position. With my background in technology and passion for innovation, I am confident I would be a valuable addition to your team.

Throughout my career, I have consistently demonstrated my ability to quickly learn new technologies and adapt to changing environments. I am particularly excited about this opportunity because it aligns perfectly with my career goals and interests.

I would welcome the opportunity to discuss how my skills and experience could contribute to your team's success. Thank you for your consideration.

Best regards,
${name}`;
}

export function generateCandidates(count: number = 100): Candidate[] {
  const candidates: Candidate[] = [];
  const jobIds = Array.from({ length: 20 }, (_, i) => `job-${i + 1}`);
  
  for (let i = 0; i < count; i++) {
    const firstName = firstNames[i % firstNames.length];
    const lastName = lastNames[i % lastNames.length];
    const name = `${firstName} ${lastName}`;
    const skills = skillSets[i % skillSets.length];
    const yearsExperience = Math.floor(Math.random() * 10) + 1;
    const verifiedTalent = Math.random() > 0.5;
    const credibilityScore = Math.floor(Math.random() * 40) + (verifiedTalent ? 60 : 30);
    
    // Each candidate applies to 1-3 random jobs
    const numApplications = Math.floor(Math.random() * 3) + 1;
    const appliedJobIds: string[] = [];
    const currentStage: Record<string, any> = {};
    const appliedDate: Record<string, string> = {};
    
    for (let j = 0; j < numApplications; j++) {
      const randomJobId = jobIds[Math.floor(Math.random() * jobIds.length)];
      if (!appliedJobIds.includes(randomJobId)) {
        appliedJobIds.push(randomJobId);
        const stages: any[] = ["applied", "phone_screen", "interview", "offer", "hired", "rejected"];
        currentStage[randomJobId] = stages[Math.floor(Math.random() * 3)]; // Most are in early stages
        
        // Generate application date in the last 30 days
        const daysAgo = Math.floor(Math.random() * 30);
        const date = new Date();
        date.setDate(date.getDate() - daysAgo);
        appliedDate[randomJobId] = date.toISOString();
      }
    }
    
    const candidate: Candidate = {
      id: `candidate-${i + 1}`,
      name,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`,
      headline: `${skills[0]} Developer`,
      location: `${cities[i % cities.length]}, India`,
      skills,
      yearsExperience,
      education: educationOptions[i % educationOptions.length],
      resumeText: generateResumeText(name, skills, yearsExperience),
      coverLetterText: generateCoverLetter(name, "this position"),
      githubUrl: verifiedTalent ? `https://github.com/${firstName.toLowerCase()}${lastName.toLowerCase()}` : undefined,
      portfolioUrl: Math.random() > 0.6 ? `https://portfolio.${firstName.toLowerCase()}${lastName.toLowerCase()}.com` : undefined,
      portfolioPreview: Math.random() > 0.6 ? "Beautiful portfolio showcasing projects" : undefined,
      verifiedTalent,
      credibilityScore,
      assessmentScores: {
        technical: Math.floor(Math.random() * 30) + 70,
        communication: Math.floor(Math.random() * 30) + 70,
        problemSolving: Math.floor(Math.random() * 30) + 70
      },
      availability: Math.random() > 0.7 ? "Immediate" : "2 weeks notice",
      appliedJobIds,
      currentStage,
      appliedDate,
      bio: `Passionate about technology and innovation. I love building products that make a difference. When I'm not coding, you can find me hiking or reading about the latest tech trends.`
    };
    
    candidates.push(candidate);
  }
  
  return candidates;
}

export const sampleCandidates = generateCandidates(100);
