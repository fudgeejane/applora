import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getAuthErrorMessage, resendVerificationEmail } from '../../services/authService';
import useAuth from '../../hooks/useAuth';

export default function ProtectedRoute({ children }) {
  const { user, loading, refreshUser, signOut } = useAuth();
  const location = useLocation();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  if (loading) {
    return <div className="grid min-h-screen place-items-center text-sm text-slate-500" role="status">Loading your account…</div>;
  }

  if (!user) {
    return <Navigate to="/" replace state={{ from: location, openAuth: true }} />;
  }

  if (user.emailVerified) return children;

  const resend = async () => {
    setBusy(true);
    setError('');
    setMessage('');
    try {
      const result = await resendVerificationEmail(user);
      await refreshUser();
      setMessage(result.alreadyVerified
        ? 'Your email is verified. You can continue to the workspace.'
        : 'Verification email sent. Open the link, then return here.');
    } catch (resendError) {
      setError(getAuthErrorMessage(resendError));
    } finally {
      setBusy(false);
    }
  };

  const refresh = async () => {
    setError('');
    try {
      await refreshUser();
      setMessage(user.emailVerified
        ? 'Your email is verified. Loading your workspace…'
        : 'Your account is still waiting for email verification.');
    } catch (refreshError) {
      setError(getAuthErrorMessage(refreshError));
    }
  };

  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 px-4 py-10">
      <section className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-7 text-center shadow-sm" aria-labelledby="verify-required-title">
        <h1 id="verify-required-title" className="text-2xl font-bold text-slate-900">Verify your email to continue</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">We sent a verification link to <strong>{user.email}</strong>. The workspace stays locked until Firebase confirms your email.</p>
        {message && <p className="mt-4 text-sm text-emerald-700" role="status">{message}</p>}
        {error && <p className="mt-4 text-sm text-red-700" role="alert">{error}</p>}
        <div className="mt-6 grid gap-3">
          <button type="button" onClick={resend} disabled={busy} className="rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60">{busy ? 'Please wait…' : 'Resend verification email'}</button>
          <button type="button" onClick={refresh} className="rounded-md border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700">I verified my email</button>
          <button type="button" onClick={signOut} className="px-4 py-2 text-sm font-semibold text-slate-500 hover:text-slate-800">Sign out</button>
        </div>
      </section>
    </main>
  );
}