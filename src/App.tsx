import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import JobDetail from "./pages/JobDetail";
import Candidates from "./pages/Candidates";
import CandidateProfile from "./pages/CandidateProfile";
import Analytics from "./pages/Analytics";
import Billing from "./pages/Billing";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";
import { Calendar, FileText, MessageSquare, GraduationCap, Settings, HelpCircle } from "lucide-react";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/jobs/:id" element={<JobDetail />} />
              <Route path="/candidates" element={<Candidates />} />
              <Route path="/candidate/:id" element={<CandidateProfile />} />
              <Route path="/applications" element={
                <PlaceholderPage
                  title="Applications"
                  description="View and manage all applications across jobs"
                  icon={<FileText className="h-8 w-8 text-primary" />}
                />
              } />
              <Route path="/interviews" element={
                <PlaceholderPage
                  title="Interview Scheduler"
                  description="Schedule and manage interviews with candidates"
                  icon={<Calendar className="h-8 w-8 text-primary" />}
                />
              } />
              <Route path="/messages" element={
                <PlaceholderPage
                  title="Messages"
                  description="Communicate with candidates using templates and bulk messaging"
                  icon={<MessageSquare className="h-8 w-8 text-primary" />}
                />
              } />
              <Route path="/campus" element={
                <PlaceholderPage
                  title="Campus Drives"
                  description="Connect with universities and manage campus recruitment"
                  icon={<GraduationCap className="h-8 w-8 text-primary" />}
                />
              } />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/billing" element={<Billing />} />
              <Route path="/settings" element={
                <PlaceholderPage
                  title="Settings"
                  description="Manage your account, team, and preferences"
                  icon={<Settings className="h-8 w-8 text-primary" />}
                />
              } />
              <Route path="/help" element={
                <PlaceholderPage
                  title="Help & Demo"
                  description="Learn how to use Jobplexity with interactive demos"
                  icon={<HelpCircle className="h-8 w-8 text-primary" />}
                />
              } />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
