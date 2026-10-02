import { useEffect, useState } from 'react'
import { ArrowRight, CheckCircle2, CircleAlert } from 'lucide-react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { getAuthErrorMessage, resendVerificationEmail } from '../services/authService'

export default function EmailVerified() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { user, refreshUser } = useAuth()
  const status = searchParams.get('status') || 'invalid'
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (user && (status === 'success' || status === 'already-used')) {
      refreshUser().catch((refreshError) => setError(getAuthErrorMessage(refreshError)))
    }
  }, [user, status, refreshUser])

  const continueToApp = async () => {
    setBusy(true)
    setError('')
    try {
      const currentUser = await refreshUser()
      if (currentUser?.emailVerified) {
        navigate('/app', { replace: true })
      } else {
        navigate('/', { replace: true, state: { openAuth: true } })
      }
    } catch (refreshError) {
      setError(getAuthErrorMessage(refreshError))
    } finally {
      setBusy(false)
    }
  }

  const resend = async () => {
    setBusy(true)
    setError('')
    try {
      if (!user) {
        navigate('/', { replace: true, state: { openAuth: true } })
        return
      }
      const result = await resendVerificationEmail(user)
      await refreshUser()
      setMessage(result.alreadyVerified ? 'Your email is already verified.' : 'A new verification email has been sent.')
    } catch (resendError) {
      setError(getAuthErrorMessage(resendError))
    } finally {
      setBusy(false)
    }
  }

  const state = {
    success: {
      title: 'Email verified',
      description: 'Your email has been successfully verified. You can now access Applora and manage your job applications.',
      icon: <CheckCircle2 size={30} />,
    },
    expired: {
      title: 'Verification link expired',
      description: 'This verification link has expired. Sign in to request a new verification email.',
      icon: <CircleAlert size={28} />,
    },
    invalid: {
      title: 'Invalid verification link',
      description: 'This verification link is invalid or cannot be processed. Sign in to request a new verification email.',
      icon: <CircleAlert size={28} />,
    },
    'already-used': {
      title: 'Email already verified',
      description: 'This verification link has already been used. Check your account status to continue.',
      icon: <CheckCircle2 size={30} />,
    },
  }[status] || {
    title: 'Invalid verification link',
    description: 'This verification link is invalid or cannot be processed.',
    icon: <CircleAlert size={28} />,
  }
  const verified = status === 'success' || (status === 'already-used' && user?.emailVerified)

  return (
    <div className="grid min-h-screen place-items-center bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-8">
        <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${verified ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-700'}`}>
          {state.icon}
        </div>

        <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900">{state.title}</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">{state.description}</p>
        {message && <p className="mt-4 text-sm text-emerald-700" role="status">{message}</p>}
        {error && <p className="mt-4 text-sm text-red-700" role="alert">{error}</p>}

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {verified ? (
            <button type="button" disabled={busy} onClick={continueToApp} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60">{busy ? 'Checking…' : <>Access Applora <ArrowRight size={16} /></>}</button>
          ) : (
            <>
              {user && <button type="button" disabled={busy} onClick={resend} className="inline-flex min-h-10 items-center justify-center rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60">{busy ? 'Please wait…' : 'Resend verification email'}</button>}
              <Link to="/" state={{ openAuth: true }} className="inline-flex min-h-10 items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2">{user ? 'Sign in to continue' : 'Sign in'}</Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
