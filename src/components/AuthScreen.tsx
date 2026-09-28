import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function AuthScreen() {
  const { signIn, signUp, signInWithGoogle } = useAuth();

  const [mode,          setMode]          = useState<'login' | 'signup'>('login');
  const [email,         setEmail]         = useState('');
  const [password,      setPassword]      = useState('');
  const [error,         setError]         = useState<string | null>(null);
  const [loading,       setLoading]       = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [success,       setSuccess]       = useState(false);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (mode === 'login') {
      const { error } = await signIn(email, password);
      if (error) setError(error);
    } else {
      const { error } = await signUp(email, password);
      if (error) setError(error);
      else setSuccess(true);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="mb-8 text-center">
        <h1 className="font-heading text-3xl font-bold text-foreground">English Flow</h1>
        <p className="text-muted-foreground mt-1">Learn English with spaced repetition</p>
      </div>
      <Card className="w-full max-w-sm p-6 space-y-5">
        {success ? (
          <div className="text-center space-y-3">
            <h2 className="font-semibold text-foreground">Check your email</h2>
            <p className="text-sm text-muted-foreground">
              We sent a confirmation link to <strong>{email}</strong>.<br />
              Click it to activate your account, then come back and log in.
            </p>
            <Button variant="outline" className="w-full" onClick={() => { setSuccess(false); setMode('login'); }}>
              Back to login
            </Button>
          </div>
        ) : (
          <>
            <div className="flex rounded-lg border border-border overflow-hidden">
              <button
                onClick={() => { setMode('login'); setError(null); }}
                className={`flex-1 py-2 text-sm font-semibold transition-colors ${mode === 'login' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Log in
              </button>
              <button
                onClick={() => { setMode('signup'); setError(null); }}
                className={`flex-1 py-2 text-sm font-semibold transition-colors ${mode === 'signup' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Sign up
              </button>
            </div>

            <button
              onClick={async () => {
                setGoogleLoading(true);
                setError(null);
                const { error } = await signInWithGoogle();
                if (error) {
                  setError(`Google sign-in failed: ${error}`);
                  setGoogleLoading(false);
                }
                // on success the page redirects — no need to reset loading
              }}
              disabled={googleLoading || loading}
              className="w-full flex items-center justify-center gap-3 rounded-md border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {googleLoading ? (
                <svg className="animate-spin h-4 w-4 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
              )}
              {googleLoading ? 'Redirecting…' : 'Continue with Google'}
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">or</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <form onSubmit={handle} className="space-y-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Password</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              {error && (
                <p className="text-xs text-destructive bg-destructive/10 rounded-md px-3 py-2">{error}</p>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Please wait…' : mode === 'login' ? 'Log in' : 'Create account'}
              </Button>
            </form>


            <p className="text-center text-xs text-muted-foreground">
              {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <button
                onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(null); }}
                className="text-primary underline underline-offset-2"
              >
                {mode === 'login' ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </>
        )}
      </Card>
    </div>
  );
}
