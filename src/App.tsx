import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { LearningProvider } from "@/context/LearningContext";
import { AuthScreen } from "@/components/AuthScreen";
import { AppOnboarding, APP_ONBOARDING_KEY } from "@/components/AppOnboarding";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import DashboardPage from "./pages/DashboardPage";
import NotFound from "./pages/NotFound";
import { AIChat } from "@/components/AIChat";
import React, { useState, useEffect } from "react";

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error: Error) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-6">
          <div className="max-w-lg w-full space-y-4">
            <h1 className="text-xl font-bold text-destructive">Something went wrong</h1>
            <pre className="text-xs bg-secondary p-4 rounded-lg overflow-auto whitespace-pre-wrap">
              {this.state.error.message}
              {import.meta.env.DEV && "\n\n"}
              {import.meta.env.DEV && this.state.error.stack}
            </pre>
            <button
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm"
              onClick={() => window.location.reload()}
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ─── Email verification gate ──────────────────────────────────────────────────
// Shown when a user signed up with email/password but hasn't clicked the link yet.
// Google OAuth users are auto-verified by Supabase and never see this.

function EmailVerificationGate() {
  const { user, signOut } = useAuth();
  const [resent, setResent] = useState(false);
  const [resending, setResending] = useState(false);

  const resend = async () => {
    if (!user?.email) return;
    setResending(true);
    await supabase.auth.resend({ type: 'signup', email: user.email });
    setResent(true);
    setResending(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="mb-8 text-center">
        <h1 className="font-heading text-3xl font-bold text-foreground">English Flow</h1>
        <p className="text-muted-foreground mt-1">Learn English with spaced repetition</p>
      </div>
      <Card className="w-full max-w-sm p-6 space-y-5 text-center">
        <div className="h-16 w-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-3xl">✉️</span>
        </div>
        <div className="space-y-2">
          <h2 className="font-heading font-semibold text-foreground">Check your inbox</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We sent a verification link to{' '}
            <strong className="text-foreground">{user?.email}</strong>.
            Click it to activate your account, then come back here.
          </p>
        </div>
        {resent ? (
          <p className="text-xs font-medium text-green-600">Email sent — check your inbox (and spam folder).</p>
        ) : (
          <Button variant="outline" className="w-full" onClick={resend} disabled={resending}>
            {resending ? 'Sending…' : 'Resend verification email'}
          </Button>
        )}
        <button
          onClick={signOut}
          className="text-xs text-muted-foreground underline underline-offset-2"
        >
          Sign out and use a different email
        </button>
      </Card>
    </div>
  );
}

// ─── App content ──────────────────────────────────────────────────────────────

const queryClient = new QueryClient();

function AppContent() {
  const { user, loading } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Show onboarding on first login after email is confirmed
  useEffect(() => {
    if (user?.email_confirmed_at && !localStorage.getItem(APP_ONBOARDING_KEY)) {
      setShowOnboarding(true);
    }
  }, [user]);

  // Listen for replay trigger dispatched from MeView
  useEffect(() => {
    const handler = () => {
      localStorage.removeItem(APP_ONBOARDING_KEY);
      setShowOnboarding(true);
    };
    window.addEventListener('show-app-tour', handler);
    return () => window.removeEventListener('show-app-tour', handler);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-3">
          <p className="text-muted-foreground text-sm">Loading…</p>
        </div>
      </div>
    );
  }

  if (!user) return <AuthScreen />;

  // Only block email/password users who haven't confirmed their email.
  // Google OAuth users are always verified by Google — don't gate them.
  const isEmailProvider = (user.app_metadata?.provider ?? 'email') === 'email';
  if (isEmailProvider && !user.email_confirmed_at) return <EmailVerificationGate />;

  return (
    <LearningProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <AIChat />
      {showOnboarding && (
        <AppOnboarding onDone={() => setShowOnboarding(false)} />
      )}
    </LearningProvider>
  );
}

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <ErrorBoundary>
            <AppContent />
          </ErrorBoundary>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
