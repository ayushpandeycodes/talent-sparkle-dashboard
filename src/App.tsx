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
import Applications from "./pages/Applications";
import Interviews from "./pages/Interviews";
import Messages from "./pages/Messages";
import Campus from "./pages/Campus";
import Settings from "./pages/Settings";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";
import { HelpCircle } from "lucide-react";

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
              <Route path="/applications" element={<Applications />} />
              <Route path="/interviews" element={<Interviews />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/campus" element={<Campus />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/billing" element={<Billing />} />
              <Route path="/settings" element={<Settings />} />
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
