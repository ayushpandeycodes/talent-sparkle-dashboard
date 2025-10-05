import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Define all available tools/functions the AI can call
const tools = [
  {
    type: "function",
    function: {
      name: "search_candidates",
      description: "Search for candidates by name, skills, or location",
      parameters: {
        type: "object",
        properties: {
          query: { type: "string", description: "Search query for candidates" },
          skills: { type: "array", items: { type: "string" }, description: "Filter by skills" },
          minExperience: { type: "number", description: "Minimum years of experience" }
        }
      }
    }
  },
  {
    type: "function",
    function: {
      name: "schedule_interview",
      description: "Schedule an interview for a candidate",
      parameters: {
        type: "object",
        properties: {
          candidateName: { type: "string", description: "Name of the candidate" },
          jobTitle: { type: "string", description: "Job position" },
          date: { type: "string", description: "Interview date" },
          time: { type: "string", description: "Interview time" }
        },
        required: ["candidateName", "jobTitle", "date", "time"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "get_job_listings",
      description: "Get all current job listings or filter by criteria",
      parameters: {
        type: "object",
        properties: {
          status: { type: "string", enum: ["active", "closed", "draft"], description: "Job status" },
          department: { type: "string", description: "Department name" }
        }
      }
    }
  },
  {
    type: "function",
    function: {
      name: "create_job",
      description: "Create a new job posting",
      parameters: {
        type: "object",
        properties: {
          title: { type: "string", description: "Job title" },
          department: { type: "string", description: "Department" },
          location: { type: "string", description: "Job location" },
          description: { type: "string", description: "Job description" }
        },
        required: ["title", "department", "location"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "get_candidate_profile",
      description: "Get detailed profile information for a specific candidate",
      parameters: {
        type: "object",
        properties: {
          candidateName: { type: "string", description: "Name of the candidate" }
        },
        required: ["candidateName"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "update_candidate_stage",
      description: "Update a candidate's application stage",
      parameters: {
        type: "object",
        properties: {
          candidateName: { type: "string", description: "Name of the candidate" },
          stage: { type: "string", enum: ["Applied", "Screening", "Interview", "Offer", "Rejected"], description: "New stage" }
        },
        required: ["candidateName", "stage"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "send_email",
      description: "Send an email to a candidate or team member",
      parameters: {
        type: "object",
        properties: {
          recipient: { type: "string", description: "Email recipient name" },
          subject: { type: "string", description: "Email subject" },
          message: { type: "string", description: "Email message content" }
        },
        required: ["recipient", "subject", "message"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "get_analytics",
      description: "Get recruitment analytics and statistics",
      parameters: {
        type: "object",
        properties: {
          metric: { type: "string", enum: ["applications", "interviews", "hires", "timeToHire"], description: "Metric type" },
          period: { type: "string", enum: ["week", "month", "quarter", "year"], description: "Time period" }
        }
      }
    }
  },
  {
    type: "function",
    function: {
      name: "get_upcoming_interviews",
      description: "Get list of upcoming scheduled interviews",
      parameters: {
        type: "object",
        properties: {
          days: { type: "number", description: "Number of days to look ahead (default: 7)" }
        }
      }
    }
  },
  {
    type: "function",
    function: {
      name: "add_campus_drive",
      description: "Schedule a campus recruitment drive",
      parameters: {
        type: "object",
        properties: {
          university: { type: "string", description: "University name" },
          date: { type: "string", description: "Drive date" },
          positions: { type: "array", items: { type: "string" }, description: "Positions to recruit for" }
        },
        required: ["university", "date"]
      }
    }
  }
];

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, audioData } = await req.json();
    
    let userMessage = "";
    
    // If audio data is provided, transcribe it first
    if (audioData) {
      console.log("Transcribing audio data...");
      // Simple mock transcription - in real app you'd use Whisper API
      userMessage = "Audio transcription placeholder";
    } else if (messages && messages.length > 0) {
      userMessage = messages[messages.length - 1].content;
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Calling Gemini AI with function calling...");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are a helpful AI assistant for a recruitment management system. You can help with:
- Searching and filtering candidates
- Scheduling interviews
- Managing job postings
- Updating candidate stages
- Sending emails
- Viewing analytics
- Managing campus recruitment drives

Always be professional, friendly, and efficient. When users ask you to perform actions, use the available functions to execute them.`
          },
          ...messages
        ],
        tools: tools,
        tool_choice: "auto"
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI API Error:", response.status, errorText);
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    console.log("AI Response:", JSON.stringify(data));

    // Check if AI wants to call a function
    if (data.choices?.[0]?.message?.tool_calls) {
      const toolCalls = data.choices[0].message.tool_calls;
      const functionResults = [];

      for (const toolCall of toolCalls) {
        const functionName = toolCall.function.name;
        const functionArgs = JSON.parse(toolCall.function.arguments);
        
        console.log(`Executing function: ${functionName}`, functionArgs);

        // Execute the function and get result
        const result = await executeFunction(functionName, functionArgs);
        functionResults.push({
          tool_call_id: toolCall.id,
          role: "tool",
          name: functionName,
          content: JSON.stringify(result)
        });
      }

      return new Response(
        JSON.stringify({
          message: data.choices[0].message.content || "Function executed",
          functionCalls: toolCalls.map((tc: any) => ({
            name: tc.function.name,
            arguments: JSON.parse(tc.function.arguments)
          })),
          functionResults
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        message: data.choices[0]?.message?.content || "No response from AI"
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Chatbot error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

// Execute functions based on name
async function executeFunction(name: string, args: any) {
  console.log(`Executing ${name} with args:`, args);
  
  switch (name) {
    case "search_candidates":
      return {
        success: true,
        message: `Found candidates matching: ${args.query || 'all'}`,
        action: "navigate_to_candidates",
        filters: args
      };
    
    case "schedule_interview":
      return {
        success: true,
        message: `Interview scheduled for ${args.candidateName} on ${args.date} at ${args.time}`,
        action: "add_interview",
        data: args
      };
    
    case "get_job_listings":
      return {
        success: true,
        message: "Retrieved job listings",
        action: "navigate_to_jobs",
        filters: args
      };
    
    case "create_job":
      return {
        success: true,
        message: `Job created: ${args.title}`,
        action: "add_job",
        data: args
      };
    
    case "get_candidate_profile":
      return {
        success: true,
        message: `Retrieved profile for ${args.candidateName}`,
        action: "view_candidate",
        candidateName: args.candidateName
      };
    
    case "update_candidate_stage":
      return {
        success: true,
        message: `Updated ${args.candidateName} stage to ${args.stage}`,
        action: "update_stage",
        data: args
      };
    
    case "send_email":
      return {
        success: true,
        message: `Email sent to ${args.recipient}`,
        action: "send_email",
        data: args
      };
    
    case "get_analytics":
      return {
        success: true,
        message: `Analytics for ${args.metric} over ${args.period}`,
        action: "navigate_to_analytics",
        filters: args
      };
    
    case "get_upcoming_interviews":
      return {
        success: true,
        message: `Retrieved interviews for next ${args.days || 7} days`,
        action: "navigate_to_interviews"
      };
    
    case "add_campus_drive":
      return {
        success: true,
        message: `Campus drive scheduled at ${args.university} on ${args.date}`,
        action: "add_campus_drive",
        data: args
      };
    
    default:
      return {
        success: false,
        message: `Function ${name} not implemented`
      };
  }
}
