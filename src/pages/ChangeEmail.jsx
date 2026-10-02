import { useState } from 'react'
import { ArrowLeft, CheckCircle2, MailCheck } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { getAuthErrorMessage, requestEmailChange } from '../services/authService'

export default function ChangeEmail() {
  const [searchParams] = useSearchParams()
  const status = searchParams.get('status')
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [requested, setRequested] = useState(false)
  const [error, setError] = useState('')

  const submit = async (event) => {
    event.preventDefault()
    const email = String(new FormData(event.currentTarget).get('email') || '').trim()
    setLoading(true)
    setError('')
    try {
      await requestEmailChange(user, email)
      setRequested(true)
    } catch (requestError) {
      setError(getAuthErrorMessage(requestError))
    } finally {
      setLoading(false)
    }
  }

  const result = {
    success: ['Email address updated', 'Your email address has been successfully updated. Use your new email address the next time you sign in.', 'Continue to Applora'],
    expired: ['Email change link expired', 'This confirmation link has expired. Sign in and request another email change.', 'Return to sign in'],
    invalid: ['Invalid email change link', 'This link is invalid or cannot be processed. Sign in to request a new email change.', 'Return to sign in'],
    'already-used': ['Email change already completed', 'This link has already been used. Sign in to confirm your current email address.', 'Continue to Applora'],
  }[status]

  if (result) {
    const wasSuccessful = status === 'success' || status === 'already-used'
    return (
      <div className="min-h-[calc(100vh-80px)] bg-slate-50 px-4 py-10">
        <section className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-8">
          <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${wasSuccessful ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
            {wasSuccessful ? <CheckCircle2 size={24} /> : <MailCheck size={24} />}
          </div>
          <h1 className="mt-5 text-2xl font-bold text-slate-900">{result[0]}</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">{result[1]}</p>
          <Link to={wasSuccessful && user?.emailVerified ? '/app' : '/'} state={wasSuccessful && user?.emailVerified ? undefined : { openAuth: true }} className="mt-6 inline-flex min-h-10 items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2">{result[2]}</Link>
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
          <MailCheck size={18} />
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900">{requested ? 'Check your new email' : 'Change email'}</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">{requested ? `A confirmation link was sent to the new address. Your current email remains active until you confirm the change.` : 'Enter a new email address. Firebase will send a confirmation link before changing your account.'}</p>

        {requested ? (
          <div role="status" className="mt-6 flex items-center gap-2 text-sm text-emerald-700"><CheckCircle2 size={18} /> Confirmation email sent.</div>
        ) : user ? (
          <form className="mt-6 space-y-4" onSubmit={submit}>
            <label className="block text-sm font-medium text-slate-700">Current email<input type="email" readOnly value={user.email || ''} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-100 px-3 py-2.5 text-sm text-slate-500" /></label>
            <label className="block text-sm font-medium text-slate-700">New email<input name="email" type="email" required autoComplete="email" disabled={loading} placeholder="new@email.com" className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-300 focus:bg-white" /></label>
            {!user.emailVerified && <p className="text-sm text-amber-700">Verify your current email address before changing it.</p>}
            {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
            <button type="submit" disabled={loading || !user.emailVerified} className="inline-flex min-h-10 w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60">{loading ? 'Sending…' : 'Send confirmation link'}</button>
          </form>
        ) : (
          <div className="mt-6"><p className="mb-4 text-sm text-slate-600">Sign in to request an email change.</p><Link to="/" state={{ openAuth: true }} className="inline-flex min-h-10 items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2">Sign in</Link></div>
        )}
      </div>
    </div>
  )
}
