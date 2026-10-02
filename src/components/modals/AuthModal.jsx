import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import {
  getAuthErrorMessage,
  registerUser,
  resendVerificationEmail,
  retryRegistrationProfile,
  signInUser,
} from '../../services/authService';

export default function AuthModal({ open, onClose, defaultMode = 'signin', returnTo }) {
  const [mode, setMode] = useState(defaultMode);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [profileSetupPending, setProfileSetupPending] = useState(false);
  const [registrationProfile, setRegistrationProfile] = useState({ firstName: '', lastName: '' });
  const [verificationSent, setVerificationSent] = useState(false);
  const [resending, setResending] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { refreshUser } = useAuth();
  const isSignUp = mode === 'signup';

  if (!open) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setNotice('');

    const formData = new FormData(event.currentTarget);
    const firstName = String(formData.get('firstName') || '').trim();
    const lastName = String(formData.get('lastName') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const password = String(formData.get('password') || '');

    if (!email || !password || (isSignUp && (!firstName || !lastName))) {
      setError('Complete all required fields.');
      return;
    }

    if (isSignUp) {
      if (password.length < 6) {
        setError('Choose a password with at least 6 characters.');
        return;
      }
      if (password !== formData.get('confirmPassword')) {
        setError('The passwords do not match.');
        return;
      }
      if (formData.get('terms') !== 'on') {
        setError('Accept the Terms and Privacy Policy to create an account.');
        return;
      }
    }

    setLoading(true);
    try {
      if (isSignUp) {
        setRegistrationProfile({ firstName, lastName });
        const result = await registerUser(firstName, lastName, email, password);
        setPendingVerification(true);
        setProfileSetupPending(!result.profileSaved);
        setVerificationSent(result.verificationSent);
        setNotice(
          result.verificationSent
            ? `Account created. Check ${email} for the verification link before entering the workspace.`
            : 'Your account was created, but the verification email could not be sent. You can try again below.',
        );
        if (result.profileError) setError(getAuthErrorMessage(result.profileError));
      } else {
        const credential = await signInUser(email, password, rememberMe);
        await refreshUser();
        if (!credential.user.emailVerified) {
          setPendingVerification(true);
          setNotice('Verify your email address before entering the workspace.');
        } else {
          const destination = returnTo || location.state?.from?.pathname;
          onClose();
          navigate(destination?.startsWith('/app') ? destination : '/app', { replace: true });
        }
      }
    } catch (submitError) {
      if (submitError.accountCreated) {
        setProfileSetupPending(true);
        setNotice('Your Firebase account was created, but its Firestore profile could not be confirmed. Restore your connection and retry profile setup. Do not submit registration again.');
      } else {
        setError(getAuthErrorMessage(submitError));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRetryProfile = async () => {
    setLoading(true);
    setError('');
    try {
      await retryRegistrationProfile(registrationProfile);
      await refreshUser().catch(() => {});
      setProfileSetupPending(false);
      setPendingVerification(true);
      setError('');
      setNotice(verificationSent
        ? 'Your profile is saved. Check your email for the verification link before entering the workspace.'
        : 'Your profile is saved, but a verification email still needs to be sent. Use the resend option below.');
    } catch (retryError) {
      setError(getAuthErrorMessage(retryError.cause || retryError));
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setError('');
    try {
      const result = await resendVerificationEmail();
      setVerificationSent(!result.alreadyVerified);
      setNotice(result.alreadyVerified
        ? 'Your email is verified. Refresh the page or continue to the workspace.'
        : 'A new verification email has been sent.');
      await refreshUser();
    } catch (resendError) {
      setError(getAuthErrorMessage(resendError));
    } finally {
      setResending(false);
    }
  };

  return (
    <div 
      className="modal-overlay" 
      role="presentation" 
      onMouseDown={(event) => event.target === event.currentTarget && !loading && onClose()}
      >
      <div className="relative  w-full max-w-[540px] overflow-y-auto rounded-lg border border-slate-200 bg-white p-8 shadow-2xl max-sm:max-h-[91vh] max-sm:max-w-none max-sm:rounded-b-none max-sm:rounded-t-xl max-sm:p-6" role="dialog" aria-modal="true" aria-labelledby="auth-title">
        <div className="mb-2 flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold text-slate-400">Applora account</p>
            <h2 id="auth-title" className="text-[23px] leading-tight font-semibold text-slate-800">{pendingVerification ? 'Verify your email' : profileSetupPending ? 'Finish account setup' : isSignUp ? 'Create your account' : 'Sign in to Applora'}</h2>
          </div>
          <button type="button" onClick={onClose} disabled={loading} aria-label="Close sign-in dialog" className="grid size-9 place-items-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 disabled:opacity-60">
            <X size={18} />
          </button>
        </div>

        {profileSetupPending ? (
          <div className="grid justify-items-center px-2 pb-1 pt-6 text-center" role="status">
            <p className="mt-2 max-w-sm text-lg leading-6 text-slate-600">{notice}</p>
            {error && <p role="alert" className="mt-3 text-sm text-red-700">{error}</p>}
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <button type="button" disabled={loading} onClick={handleRetryProfile} className="inline-flex min-h-9 items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60">
                <span className="text-white">{loading ? 'Retrying…' : 'Retry profile setup'}</span>
              </button>
              {!verificationSent && 
                <button   
                  type="button" 
                  disabled={resending} 
                  onClick={handleResend} 
                  className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white px-3 py-4 text-xs font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <span className="text-slate-700">{resending ? 'Sending…' : 'Resend verification email'}</span>
                    </button>}
              <button type="button" onClick={onClose} disabled={loading} className="inline-flex min-h-9 items-center justify-center rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60">Close</button>
            </div>
          </div>
        ) : pendingVerification ? (
          <div className="grid justify-items-center px-2 pb-1 pt-6 text-center" role="status">
            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-600">{notice}</p>
            {error && <p role="alert" className="mt-3 text-sm text-red-700">{error}</p>}
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <button type="button" disabled={resending} onClick={handleResend} className="inline-flex min-h-9 items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60">
                <span className="text-white">{resending ? 'Sending…' : 'Resend verification email'}</span>
              </button>
              <button type="button" onClick={onClose} className="inline-flex min-h-9 items-center justify-center rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2">Close</button>
            </div>
          </div>
        ) : (
          <>
            <p className="mb-5 mt-2 text-sm leading-6 text-slate-500">{isSignUp ? 'Create an account to keep your application search organized.' : 'Welcome back. Sign in to continue to your workspace.'}</p>
            <form className="grid gap-5" onSubmit={handleSubmit} noValidate>
              {isSignUp && (
                <div className="grid grid-cols-2 gap-3">
                  <label className="grid gap-2 text-[13px] font-semibold text-slate-600">First name
                    <input
                      className="h-12 w-full min-w-0 rounded border border-slate-200 px-3.5 text-sm font-normal text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                      name="firstName"
                      autoComplete="given-name"
                      type="text"
                      required
                      disabled={loading}
                      placeholder="Alex" />
                  </label>
                  <label className="grid gap-2 text-[13px] font-semibold text-slate-600">Last name
                    <input
                      className="h-12 w-full min-w-0 rounded border border-slate-200 px-3.5 text-sm font-normal text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                      name="lastName"
                      autoComplete="family-name"
                      type="text"
                      required
                      disabled={loading}
                      placeholder="Carter" />
                  </label>
                </div>
              )}
              <label className="grid gap-2 text-[13px] font-semibold text-slate-600">Email address
                <input 
                  className="h-12 w-full rounded border border-slate-200 px-3.5 text-sm font-normal text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  name="email" 
                  autoComplete="email" 
                  type="email" 
                  required 
                  disabled={loading} 
                  placeholder="you@example.com" />
                </label>
              <label className="grid gap-2 text-[13px] font-semibold text-slate-600">Password<input className="h-12 w-full rounded border border-slate-200 px-3.5 text-sm font-normal text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100" name="password" autoComplete={isSignUp ? 'new-password' : 'current-password'} type="password" required disabled={loading} minLength={6} placeholder="At least 6 characters" /></label>
              {isSignUp && <label className="grid gap-2 text-[13px] font-semibold text-slate-600">Confirm password<input className="h-12 w-full rounded border border-slate-200 px-3.5 text-sm font-normal text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100" name="confirmPassword" autoComplete="new-password" type="password" required disabled={loading} minLength={6} placeholder="Enter your password again" /></label>}

              {!isSignUp && (
                <div className="-mt-1 flex items-center justify-between">
                  <label className="inline-flex items-center gap-2 text-xs text-slate-600"><input className="size-4 accent-blue-600" type="checkbox" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} disabled={loading} />Remember me</label>
                  <Link className="text-xs font-semibold text-blue-600 hover:text-blue-700" to="/forgot-password" onClick={onClose}>Forgot password?</Link>
                </div>
              )}

              {isSignUp && (
                <label className="flex items-start gap-2 text-xs text-slate-600">
                  <input className="mt-0.5 size-4 shrink-0 accent-blue-600" name="terms" type="checkbox" checked={termsAccepted} onChange={(event) => setTermsAccepted(event.target.checked)} required disabled={loading} />
                  <span className="text-xs">I agree to the <Link className="font-medium text-blue-600 underline underline-offset-2 hover:text-blue-700" to="/terms" onClick={onClose}>Terms</Link> and <Link className="font-medium text-blue-600 underline underline-offset-2 hover:text-blue-700" to="/privacy-policy" onClick={onClose}>Privacy Policy</Link>.</span>
                </label>
              )}

              {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
              {notice && <p role="status" className="text-sm text-emerald-700">{notice}</p>}
              <button type="submit" className="inline-flex min-h-12 w-full cursor-pointer items-center justify-center rounded-md bg-blue-600 px-4 py-2.5 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60" disabled={loading || (isSignUp && !termsAccepted)}>
               <span className='text-white'> {loading ? 'Please wait…' : isSignUp ? 'Create account' : 'Sign in'}</span>
              </button>
            </form>

            <p className="mt-1 text-center text-xs text-slate-500">
              {isSignUp ? 'Already have an account?' : 'Need an account?'}{' '}
              <button type="button" disabled={loading} onClick={() => { setMode(isSignUp ? 'signin' : 'signup'); setTermsAccepted(false); setError(''); setNotice(''); }}>
                {isSignUp ? 'Sign in' : 'Sign up'}
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
