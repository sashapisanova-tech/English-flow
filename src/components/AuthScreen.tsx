import { useState } from 'react';
import { BrandLogo } from '@/components/BrandLogo';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

/** Small London skyline (Big Ben, terraces, the Eye, a red bus) drawn in line art. */
function LoginSkyline() {
  return (
    <svg
      viewBox="0 0 360 120"
      width="100%"
      height="110"
      preserveAspectRatio="xMidYMax meet"
      className="mt-1 block lg:mt-4 lg:h-[180px]"
      aria-hidden="true"
    >
      <g className="fill-primary/10 stroke-foreground/40" strokeWidth="1.4" strokeLinejoin="round">
        <path d="M300 104V44h-4V26h4V16l10-14 10 14v10h4v18h-4v60" />
        <path d="M200 104V70h6v-8h6v8h16v-8h6v8h16v-8h6v8h14v-8h6v8h24v34" />
        <path d="M320 104V74h10v-8h6v8h18v30" />
      </g>
      <circle cx="310" cy="35" r="6" className="fill-background stroke-foreground/40" strokeWidth="1.4" />
      <path d="M310 35v-3.5M310 35l2.5 1.5" className="stroke-foreground/40" strokeWidth="1.2" strokeLinecap="round" />
      <g className="fill-foreground/40">
        <rect x="216" y="80" width="5" height="10" rx="1" />
        <rect x="232" y="80" width="5" height="10" rx="1" />
        <rect x="248" y="80" width="5" height="10" rx="1" />
        <rect x="264" y="80" width="5" height="10" rx="1" />
        <rect x="280" y="80" width="5" height="10" rx="1" />
        <rect x="306" y="54" width="8" height="10" rx="1" />
        <rect x="306" y="72" width="8" height="10" rx="1" />
      </g>
      <circle cx="146" cy="58" r="40" fill="none" className="stroke-foreground/40" strokeWidth="1.4" />
      <circle cx="146" cy="58" r="4" className="fill-foreground/40" />
      <path d="M146 18v80M106 58h80M118 30l56 56M174 30l-56 56" className="stroke-foreground/40" strokeWidth="0.9" />
      <path d="M146 58l-14 46M146 58l14 46" className="stroke-foreground/40" strokeWidth="1.4" />
      <path d="M20 104h340" className="stroke-foreground/40" strokeWidth="1.4" />
      <rect x="226" y="84" width="40" height="20" rx="3" className="fill-highlight" />
      <path d="M226 93h40" className="stroke-background" strokeWidth="1.4" />
      <circle cx="235" cy="105" r="3" className="fill-foreground" />
      <circle cx="258" cy="105" r="3" className="fill-foreground" />
      <path d="M40 114h60M150 117h110M290 112h50" className="stroke-foreground/40" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

const inputClass =
  'h-[50px] w-full rounded-xl border border-border bg-card px-3.5 text-[15px] text-foreground lg:bg-background ' +
  'placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-[0.5px] focus:ring-primary';

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

  const handleGoogle = async () => {
    setGoogleLoading(true);
    setError(null);
    const { error } = await signInWithGoogle();
    if (error) {
      setError(`Google sign-in failed: ${error}`);
      setGoogleLoading(false);
    }
    // on success the page redirects — no need to reset loading
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Phones: one column (brand, skyline, spacer, form).
          Laptops: brand panel on the left, form card on the right, centred on the page. */}
      <div className="mx-auto flex min-h-screen w-full max-w-sm flex-col gap-3 px-6 pt-8 pb-8 lg:grid lg:max-w-[1000px] lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center lg:gap-20 lg:px-10 lg:py-16">
        <div className="flex flex-col gap-3 lg:gap-5">
        {/* Wordmark + tagline */}
        <div className="flex items-center gap-3">
          <BrandLogo size={48} />
          <div className="flex flex-col">
            <h1 className="font-heading text-[26px] font-semibold leading-tight tracking-[-0.015em] lg:text-[34px]">English Flow</h1>
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">by LingoFlow</span>
          </div>
        </div>
        <p className="text-base leading-normal text-muted-foreground text-pretty lg:max-w-[420px] lg:font-heading lg:text-[22px] lg:leading-snug lg:text-foreground">
          British English through short, funny stories. Ten minutes a day.
        </p>
        <LoginSkyline />
        </div>

        <div className="flex-1 min-h-6 lg:hidden" />

        <div className="flex flex-col gap-3 lg:rounded-xl lg:border lg:border-border lg:bg-card lg:p-8">

        {success ? (
          <div className="flex flex-col gap-3">
            <h2 className="font-heading text-[22px] font-semibold">Check your email</h2>
            <p className="text-[15px] leading-normal text-muted-foreground">
              We sent a confirmation link to <strong className="text-foreground">{email}</strong>.
              Click it to activate your account, then come back and log in.
            </p>
            <Button
              variant="outline"
              className="h-[50px] w-full rounded-xl border-border bg-card text-[15px] font-semibold"
              onClick={() => { setSuccess(false); setMode('login'); }}
            >
              Back to login
            </Button>
          </div>
        ) : (
          <>
            <h2 className="font-heading text-[22px] font-semibold">
              {mode === 'login' ? 'Welcome back' : 'Create your account'}
            </h2>

            <form onSubmit={handle} className="flex flex-col gap-3">
              <label className="flex flex-col gap-1.5">
                <span className="text-[13px] font-semibold">Email</span>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-[13px] font-semibold">Password</span>
                <input
                  type="password"
                  required
                  minLength={6}
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className={inputClass}
                />
              </label>

              {error && (
                <p className="rounded-xl bg-destructive/10 px-3.5 py-2.5 text-[13px] text-destructive">{error}</p>
              )}

              <Button
                type="submit"
                className="h-[50px] w-full rounded-xl text-[15px] font-semibold"
                disabled={loading}
              >
                {loading ? 'Please wait…' : mode === 'login' ? 'Log in' : 'Create account'}
              </Button>
            </form>

            <div className="flex items-center gap-3 text-[13px] text-muted-foreground">
              <div className="h-px flex-1 bg-border" />
              or
              <div className="h-px flex-1 bg-border" />
            </div>

            <button
              type="button"
              onClick={handleGoogle}
              disabled={googleLoading || loading}
              className="flex h-[50px] w-full items-center justify-center gap-2.5 rounded-xl border border-border bg-card text-[15px] font-semibold text-foreground transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-60"
            >
              {googleLoading ? (
                <svg className="h-4 w-4 animate-spin text-muted-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
              )}
              {googleLoading ? 'Redirecting…' : 'Continue with Google'}
            </button>

            <p className="mt-1 text-center text-sm text-muted-foreground">
              {mode === 'login' ? 'New here? ' : 'Already have an account? '}
              <button
                type="button"
                onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(null); }}
                className="font-semibold text-highlight-ink hover:underline underline-offset-2"
              >
                {mode === 'login' ? 'Create an account' : 'Log in'}
              </button>
            </p>
          </>
        )}
        </div>
      </div>
    </div>
  );
}
