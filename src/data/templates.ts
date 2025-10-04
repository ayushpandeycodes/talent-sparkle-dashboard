import { MessageTemplate } from "@/types";

export const messageTemplates: MessageTemplate[] = [
  {
    id: "template-1",
    name: "Initial Outreach",
    subject: "Exciting opportunity at {{company_name}}",
    body: `Hi {{first_name}},

I came across your profile and was impressed by your experience with {{top_skill}}. We have an exciting {{job_title}} position that I think would be a great fit for your background.

Would you be interested in learning more about this opportunity? I'd love to schedule a brief call to discuss how your skills align with what we're looking for.

Best regards,
{{recruiter_name}}`,
    category: "outreach"
  },
  {
    id: "template-2",
    name: "Interview Invitation",
    subject: "Interview invitation for {{job_title}}",
    body: `Hi {{first_name}},

Thank you for applying to the {{job_title}} position at {{company_name}}! We were impressed by your application and would like to invite you for an interview.

The interview will be {{interview_duration}} minutes and will cover:
- Your technical background
- Past projects and experiences
- Cultural fit and team dynamics

Please use the link below to schedule a time that works best for you:
{{scheduling_link}}

We look forward to speaking with you!

Best regards,
{{recruiter_name}}`,
    category: "interview"
  },
  {
    id: "template-3",
    name: "Rejection with Feedback",
    subject: "Update on your {{job_title}} application",
    body: `Hi {{first_name}},

Thank you for your interest in the {{job_title}} position and for taking the time to interview with us. After careful consideration, we've decided to move forward with other candidates whose experience more closely aligns with our current needs.

We were particularly impressed by {{positive_feedback}}, and we encourage you to apply for future positions that match your skillset.

Thank you again for your interest in {{company_name}}, and we wish you the best in your job search.

Best regards,
{{recruiter_name}}`,
    category: "rejection"
  },
  {
    id: "template-4",
    name: "Campus Drive Invitation",
    subject: "{{company_name}} Campus Recruitment Drive",
    body: `Dear {{first_name}},

We're excited to announce that {{company_name}} will be visiting {{university_name}} for our annual campus recruitment drive!

Event Details:
- Date: {{event_date}}
- Location: {{event_location}}
- Positions: {{job_titles}}

This is a great opportunity to learn about {{company_name}}, meet our team, and interview for multiple positions. We'll also be hosting an information session and networking event.

To register, please visit: {{registration_link}}

We look forward to meeting you!

Best regards,
{{recruiter_name}}
Campus Recruitment Team`,
    category: "campus"
  },
  {
    id: "template-5",
    name: "Follow-up After Interview",
    subject: "Thank you for interviewing with us",
    body: `Hi {{first_name}},

Thank you for taking the time to interview for the {{job_title}} position yesterday. It was great learning more about your experience and discussing how you could contribute to our team.

We're currently reviewing all candidates and will be making a decision within the next {{timeline}}. We'll be in touch soon with an update.

If you have any questions in the meantime, please don't hesitate to reach out.

Best regards,
{{recruiter_name}}`,
    category: "interview"
  },
  {
    id: "template-6",
    name: "Offer Extended",
    subject: "Job Offer - {{job_title}} at {{company_name}}",
    body: `Hi {{first_name}},

We're thrilled to extend an offer for the {{job_title}} position at {{company_name}}!

Offer Details:
- Position: {{job_title}}
- Salary: {{salary_range}}
- Start Date: {{start_date}}
- Benefits: Comprehensive health insurance, 401(k) matching, unlimited PTO, and more

Please find the detailed offer letter attached. We'd love to have you join our team! Please let us know your decision by {{deadline}}.

Congratulations, and we look forward to working with you!

Best regards,
{{recruiter_name}}`,
    category: "interview"
  },
  {
    id: "template-7",
    name: "Application Received",
    subject: "We received your application for {{job_title}}",
    body: `Hi {{first_name}},

Thank you for applying to the {{job_title}} position at {{company_name}}! We've received your application and our team is currently reviewing it.

We receive a high volume of applications, so please allow {{review_timeline}} for us to review yours. If your background is a good match, we'll reach out to schedule an interview.

In the meantime, feel free to explore more about {{company_name}} and our culture on our website and social media channels.

Best regards,
{{recruiter_name}}`,
    category: "outreach"
  },
  {
    id: "template-8",
    name: "Request for Additional Information",
    subject: "Additional information needed for your application",
    body: `Hi {{first_name}},

Thank you for your application for the {{job_title}} position. We're interested in moving forward, but we need some additional information:

{{information_needed}}

Please send us the requested information at your earliest convenience. We'll resume our review once we receive it.

Best regards,
{{recruiter_name}}`,
    category: "outreach"
  },
  {
    id: "template-9",
    name: "Referral Request",
    subject: "Know anyone great for {{job_title}}?",
    body: `Hi {{first_name}},

We're currently hiring for a {{job_title}} position and thought you might know someone who'd be a great fit!

We're looking for someone with:
{{key_requirements}}

If you know anyone who matches this profile, we'd appreciate an introduction. We offer a {{referral_bonus}} referral bonus for successful hires.

Thanks for helping us build an amazing team!

Best regards,
{{recruiter_name}}`,
    category: "outreach"
  },
  {
    id: "template-10",
    name: "Second Round Interview",
    subject: "Second round interview invitation",
    body: `Hi {{first_name}},

Great news! We'd like to invite you to a second round interview for the {{job_title}} position.

This interview will be {{interview_duration}} and will include:
- Technical deep-dive with the engineering team
- Meeting with the hiring manager
- Team lunch (if onsite)

Please use the link below to schedule:
{{scheduling_link}}

Congratulations on making it to this stage! We're excited to continue getting to know you.

Best regards,
{{recruiter_name}}`,
    category: "interview"
  },
  {
    id: "template-11",
    name: "Assessment Invitation",
    subject: "Complete your assessment for {{job_title}}",
    body: `Hi {{first_name}},

As the next step in our hiring process for the {{job_title}} position, we'd like you to complete a brief assessment.

Assessment Details:
- Duration: {{assessment_duration}}
- Type: {{assessment_type}}
- Deadline: {{deadline}}

Link to assessment: {{assessment_link}}

The assessment will help us better understand your skills and how you approach problems. There are no tricks - we're just looking to see how you think!

Good luck!

Best regards,
{{recruiter_name}}`,
    category: "interview"
  },
  {
    id: "template-12",
    name: "Welcome to the Team",
    subject: "Welcome to {{company_name}}!",
    body: `Hi {{first_name}},

We're so excited to officially welcome you to the {{company_name}} team!

Here's what to expect before your first day:
- You'll receive your equipment {{equipment_timeline}}
- Please complete the onboarding paperwork by {{paperwork_deadline}}
- Your first day is {{start_date}} at {{start_time}}

We'll be sending more details about your first week soon. If you have any questions, don't hesitate to reach out!

We can't wait for you to get started!

Best regards,
{{recruiter_name}} and the {{company_name}} team`,
    category: "interview"
  }
];
