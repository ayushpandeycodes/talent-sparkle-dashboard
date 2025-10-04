import { MessageTemplate } from "@/types";

export const messageTemplates: MessageTemplate[] = [
  {
    id: "template-1",
    name: "Initial Outreach",
    subject: "Exciting opportunity at {{company_name}}",
    body: `Hi {{first_name}},

I came across your profile and was impressed by your experience with {{top_skill}}. We have an exciting {{job_title}} position that I think would be a great fit for your background.`,
    content: `Hi {{first_name}},

I came across your profile and was impressed by your experience with {{top_skill}}. We have an exciting {{job_title}} position that I think would be a great fit for your background.`,
    category: "outreach"
  },
  {
    id: "template-2",
    name: "Interview Invitation",
    subject: "Interview invitation for {{job_title}}",
    body: `Hi {{first_name}},

Thank you for applying to the {{job_title}} position at {{company_name}}! We were impressed by your application and would like to invite you for an interview.`,
    content: `Hi {{first_name}},

Thank you for applying to the {{job_title}} position at {{company_name}}! We were impressed by your application and would like to invite you for an interview.`,
    category: "interview"
  },
  {
    id: "template-3",
    name: "Rejection with Feedback",
    subject: "Update on your {{job_title}} application",
    body: `Hi {{first_name}},

Thank you for your interest in the {{job_title}} position. After careful consideration, we've decided to move forward with other candidates.`,
    content: `Hi {{first_name}},

Thank you for your interest in the {{job_title}} position. After careful consideration, we've decided to move forward with other candidates.`,
    category: "rejection"
  },
  {
    id: "template-4",
    name: "Campus Drive Invitation",
    subject: "{{company_name}} Campus Recruitment Drive",
    body: `Dear {{first_name}},

We're excited to announce that {{company_name}} will be visiting {{university_name}} for our annual campus recruitment drive!`,
    content: `Dear {{first_name}},

We're excited to announce that {{company_name}} will be visiting {{university_name}} for our annual campus recruitment drive!`,
    category: "campus"
  }
];
