import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LearningProvider } from "@/context/LearningContext";
import DashboardPage from "./pages/DashboardPage";
import NotFound from "./pages/NotFound";
import { AIChat } from "@/components/AIChat";
import { VoiceSettings } from "@/components/VoiceSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LearningProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <VoiceSettings />
        <AIChat />
      </LearningProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
