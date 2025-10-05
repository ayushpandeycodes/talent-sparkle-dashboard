import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Mic, MicOff, Send, X, Bot, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useApp } from "@/contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { ApplicationStage } from "@/types";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm your AI recruitment assistant. I can help you search candidates, schedule interviews, manage jobs, and much more. What would you like to do?" }
  ]);
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { addJob, addInterview, updateCandidateStage, addCampusDrive } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        await processAudio(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      toast({
        title: "Recording started",
        description: "Speak now...",
      });
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast({
        title: "Error",
        description: "Could not access microphone",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const processAudio = async (audioBlob: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(audioBlob);
    reader.onloadend = async () => {
      const base64Audio = reader.result?.toString().split(",")[1];
      if (base64Audio) {
        await sendMessage("", base64Audio);
      }
    };
  };

  const sendMessage = async (text?: string, audioData?: string) => {
    const messageText = text || input;
    if (!messageText.trim() && !audioData) return;

    const userMessage: Message = { role: "user", content: messageText };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("ai-chatbot", {
        body: {
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
          audioData
        }
      });

      if (error) throw error;

      const assistantMessage: Message = {
        role: "assistant",
        content: data.message
      };
      setMessages([...newMessages, assistantMessage]);

      // Execute actions based on function calls
      if (data.functionResults) {
        for (const result of data.functionResults) {
          const resultData = JSON.parse(result.content);
          await executeAction(resultData);
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const executeAction = async (result: any) => {
    if (!result.success) return;

    switch (result.action) {
      case "navigate_to_candidates":
        navigate("/candidates");
        toast({
          title: "Navigation",
          description: "Opening candidates page...",
        });
        break;

      case "navigate_to_jobs":
        navigate("/jobs");
        toast({
          title: "Navigation",
          description: "Opening jobs page...",
        });
        break;

      case "navigate_to_interviews":
        navigate("/interviews");
        toast({
          title: "Navigation",
          description: "Opening interviews page...",
        });
        break;

      case "navigate_to_analytics":
        navigate("/analytics");
        toast({
          title: "Navigation",
          description: "Opening analytics page...",
        });
        break;

      case "add_interview":
        addInterview({
          id: `int-${Date.now()}`,
          candidateId: "1",
          jobId: "1",
          date: result.data.date,
          scheduledAt: `${result.data.date}T${result.data.time}`,
          duration: 60,
          type: "technical",
          interviewers: ["Interviewer"],
          status: "scheduled",
          notes: `Interview for ${result.data.jobTitle}`
        });
        toast({
          title: "Interview Scheduled",
          description: result.message,
        });
        break;

      case "add_job":
        addJob({
          id: `job-${Date.now()}`,
          title: result.data.title,
          location: "remote",
          city: result.data.location,
          salaryRange: "$80,000 - $120,000",
          seniority: "mid",
          department: result.data.department,
          tags: [],
          description: result.data.description || "",
          requirements: [],
          benefits: [],
          status: "open",
          postedDate: new Date().toISOString().split("T")[0],
          applicantCount: 0,
          viewCount: 0
        });
        toast({
          title: "Job Created",
          description: result.message,
        });
        break;

      case "update_stage":
        updateCandidateStage("1", "1", result.data.stage as ApplicationStage);
        toast({
          title: "Stage Updated",
          description: result.message,
        });
        break;

      case "add_campus_drive":
        addCampusDrive({
          id: `campus-${Date.now()}`,
          universityId: "1",
          jobIds: result.data.positions || [],
          deadline: result.data.date,
          scheduledDate: result.data.date,
          seatsAvailable: 50,
          slots: 10,
          applicants: 0,
          interviewed: 0,
          offered: 0,
          status: "scheduled"
        });
        toast({
          title: "Campus Drive Added",
          description: result.message,
        });
        break;

      case "send_email":
        toast({
          title: "Email Sent",
          description: result.message,
        });
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
        size="icon"
      >
        <Bot className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[600px] flex flex-col shadow-2xl">
      <div className="flex items-center justify-between p-4 border-b bg-primary text-primary-foreground rounded-t-lg">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          <h3 className="font-semibold">AI Assistant</h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="h-8 w-8 text-primary-foreground hover:bg-primary/90"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.role === "assistant" && (
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
              {message.role === "user" && (
                <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-2 justify-start">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <Bot className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="bg-muted rounded-lg p-3">
                <div className="flex gap-1">
                  <div className="h-2 w-2 bg-foreground/40 rounded-full animate-bounce" />
                  <div className="h-2 w-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                  <div className="h-2 w-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="p-4 border-t bg-background">
        <div className="flex gap-2">
          <Button
            type="button"
            size="icon"
            variant={isRecording ? "destructive" : "outline"}
            onClick={isRecording ? stopRecording : startRecording}
            disabled={isLoading}
          >
            {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading || isRecording}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={isLoading || isRecording || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </Card>
  );
}
