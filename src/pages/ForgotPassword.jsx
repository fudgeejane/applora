import { useState } from 'react'
import { ArrowLeft, Lock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getAuthErrorMessage, requestPasswordReset } from '../services/authService'

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const submit = async (event) => {
    event.preventDefault()
    const email = String(new FormData(event.currentTarget).get('email') || '').trim()
    setLoading(true)
    setError('')
    try {
      await requestPasswordReset(email)
      setSent(true)
    } catch (requestError) {
      if (requestError.code === 'auth/user-not-found') {
        setSent(true)
      } else {
        setError(getAuthErrorMessage(requestError))
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <Link to="/" state={{ openAuth: true }} className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600">
          <ArrowLeft size={15} /> Back to home
        </Link>

        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          <Lock size={18} />
        </div>

        {sent ? (
          <>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Check your email</h1>
            <p className="mt-3 text-sm leading-7 text-slate-600">If an account exists for this email address, you’ll receive instructions to reset your password.</p>
            <Link to="/" state={{ openAuth: true }} className="mt-6 inline-flex min-h-10 items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2">Back to sign in</Link>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Forgot password</h1>
            <p className="mt-3 text-sm leading-7 text-slate-600">Enter the email address linked to your account and we’ll send a reset link.</p>
            <form className="mt-6 space-y-4" onSubmit={submit}>
              <label className="block text-sm font-medium text-slate-700">
                Email address
                <input name="email" type="email" required autoComplete="email" disabled={loading} placeholder="you@example.com" className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-300 focus:bg-white" />
              </label>
              {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
              <button type="submit" disabled={loading} className="inline-flex min-h-10 w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60">{loading ? 'Sending…' : 'Send reset link'}</button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
