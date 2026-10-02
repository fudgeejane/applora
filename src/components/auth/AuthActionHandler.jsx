import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  applyEmailChangeCode,
  applyEmailVerificationCode,
  validatePasswordResetCode,
} from '../../services/authService';

function errorStatus(error) {
  return error?.code === 'auth/expired-action-code' ? 'expired' : 'invalid';
}

async function resolveAction(mode, code) {
  if (!mode || !code) return '/auth-action-error?reason=missing';

  try {
    if (mode === 'resetPassword') {
      await validatePasswordResetCode(code);
      return `/change-password?oobCode=${encodeURIComponent(code)}`;
    }

    if (mode === 'verifyEmail') {
      await applyEmailVerificationCode(code);
      return '/email-verified?status=success';
    }

    if (mode === 'verifyAndChangeEmail') {
      await applyEmailChangeCode(code);
      return '/change-email?status=success';
    }

    return `/auth-action-error?mode=${encodeURIComponent(mode)}`;
  } catch (error) {
    const status = errorStatus(error);
    if (mode === 'resetPassword') return `/change-password?status=${status}`;
    if (mode === 'verifyEmail') return `/email-verified?status=${status}`;
    if (mode === 'verifyAndChangeEmail') return `/change-email?status=${status}`;
    return '/auth-action-error?reason=invalid';
  }
}

export default function AuthActionHandler() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const mode = searchParams.get('mode');
  const code = searchParams.get('oobCode');
  const actionRef = useRef({ key: null, promise: null });

  useEffect(() => {
    let cancelled = false;
    const key = `${mode || ''}:${code || ''}`;
    if (actionRef.current.key !== key) {
      actionRef.current = { key, promise: resolveAction(mode, code) };
    }
    actionRef.current.promise.then((path) => {
      if (!cancelled) navigate(path, { replace: true });
    });
    return () => { cancelled = true; };
  }, [mode, code, navigate]);

  return (
    <main className="grid min-h-[calc(100vh-80px)] place-items-center bg-slate-50 px-4" role="status" aria-live="polite">
      <p className="text-sm text-slate-600">Checking your secure account link…</p>
    </main>
  );
}