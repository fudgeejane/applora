import { useEffect, useState } from 'react'
import { ArrowLeft, Eye, EyeOff, KeyRound } from 'lucide-react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { completePasswordReset, getAuthErrorMessage, validatePasswordResetCode } from '../services/authService'

export default function ChangePassword() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const code = searchParams.get('oobCode')
  const initialStatus = searchParams.get('status')
  const [linkStatus, setLinkStatus] = useState(initialStatus || (code ? 'checking' : 'invalid'))
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (!code || initialStatus) return undefined
    let active = true
    validatePasswordResetCode(code)
      .then(() => active && setLinkStatus('ready'))
      .catch((validationError) => active && setLinkStatus(validationError.code === 'auth/expired-action-code' ? 'expired' : 'invalid'))
    return () => { active = false }
  }, [code, initialStatus])

  const submit = async (event) => {
    event.preventDefault()
    const values = new FormData(event.currentTarget)
    const password = String(values.get('password') || '')
    if (password.length < 6) {
      setError('Choose a password with at least 6 characters.')
      return
    }
    if (password !== values.get('confirmPassword')) {
      setError('The passwords do not match.')
      return
    }

    setLoading(true)
    setError('')
    try {
      await completePasswordReset(code, password)
      setLinkStatus('success')
      navigate('/change-password?status=success', { replace: true })
    } catch (resetError) {
      setError(getAuthErrorMessage(resetError))
      if (resetError.code === 'auth/expired-action-code' || resetError.code === 'auth/invalid-action-code') {
        setLinkStatus(resetError.code === 'auth/expired-action-code' ? 'expired' : 'invalid')
      }
    } finally {
      setLoading(false)
    }
  }

  if (linkStatus === 'success') {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-slate-50 px-4 py-10">
        <section className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"><KeyRound size={20} /></div>
          <h1 className="mt-5 text-3xl font-bold text-slate-900">Password reset successful</h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">Your password has been updated. You can now sign in with your new password.</p>
          <Link to="/" state={{ openAuth: true }} className="mt-6 inline-flex min-h-10 items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2">Sign in</Link>
        </section>
      </div>
    )
  }

  if (linkStatus === 'expired' || linkStatus === 'invalid') {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-slate-50 px-4 py-10">
        <section className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-8">
          <h1 className="text-3xl font-bold text-slate-900">Reset link expired or invalid</h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">This password reset link is no longer valid. Request a new link to reset your password.</p>
          <Link to="/forgot-password" className="mt-6 inline-flex min-h-10 items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2">Request new reset link</Link>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600">
          <ArrowLeft size={15} /> Back to home
        </Link>

        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          <KeyRound size={18} />
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Reset your password</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">Choose a new password to secure your account.</p>

        {linkStatus === 'checking' ? <p className="mt-6 text-sm text-slate-500" role="status">Validating your secure reset link…</p> : (
          <form className="mt-6 space-y-4" onSubmit={submit}>
            <label className="block text-sm font-medium text-slate-700">
              New password
              <span className="relative mt-1.5 block">
                <input name="password" type={showPassword ? 'text' : 'password'} required minLength={6} autoComplete="new-password" disabled={loading} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 pr-11 text-sm text-slate-700 outline-none focus:border-blue-300 focus:bg-white" />
                <button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Hide password' : 'Show password'} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button>
              </span>
            </label>
            <label className="block text-sm font-medium text-slate-700">Confirm password<input name="confirmPassword" type={showPassword ? 'text' : 'password'} required minLength={6} autoComplete="new-password" disabled={loading} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-300 focus:bg-white" /></label>
            {error && <p role="alert" className="text-sm text-red-700">{error || getAuthErrorMessage()}</p>}
            <button type="submit" disabled={loading || linkStatus !== 'ready'} className="inline-flex min-h-10 w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60">{loading ? 'Updating…' : 'Reset password'}</button>
          </form>
        )}
      </div>
    </div>
  )
}
