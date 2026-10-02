import { useState } from 'react'
import { Bell, Mail, ShieldCheck, UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import SettingsSection from '../components/settings/SettingsSection'
import useAuth from '../hooks/useAuth'
import { getAuthErrorMessage, requestPasswordReset, updateUserProfile } from '../services/authService'

export default function SettingsPage() {
  const { user, profile } = useAuth()
  const [name, setName] = useState(profile?.name || user?.displayName || '')
  const [saving, setSaving] = useState(false)
  const [sendingReset, setSendingReset] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const saveProfile = async (event) => {
    event.preventDefault()
    const trimmedName = name.trim()
    if (!trimmedName) {
      setError('Enter your name before saving.')
      return
    }
    setSaving(true)
    setError('')
    setMessage('')
    try {
      await updateUserProfile(user, trimmedName)
      setMessage('Profile updated.')
    } catch (saveError) {
      setError(getAuthErrorMessage(saveError))
    } finally {
      setSaving(false)
    }
  }

  const sendPasswordReset = async () => {
    setSendingReset(true)
    setError('')
    setMessage('')
    try {
      await requestPasswordReset(user.email)
      setMessage('If your account can reset its password, instructions will arrive by email.')
    } catch (resetError) {
      setError(getAuthErrorMessage(resetError))
    } finally {
      setSendingReset(false)
    }
  }

  const displayName = profile?.name || user?.displayName || user?.email || 'Applora user'
  const initials = displayName.split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase()

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">Account</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Settings</h1>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_0.85fr]">
        <div className="space-y-6">
          <SettingsSection icon={<UserRound size={16} />} title="Profile" description="Update the name associated with your Applora account">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-lg font-bold text-blue-700">{initials}</div>
              <div>
                <p className="text-base font-semibold text-slate-800">{displayName}</p>
                <p className="text-sm text-slate-500">{user?.email}</p>
              </div>
            </div>

            <form className="mt-5 space-y-4" onSubmit={saveProfile}>
              <label className="block text-[11px] font-semibold text-slate-600">Full name<input value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-300 focus:bg-white" /></label>
              {message && <p role="status" className="text-sm text-emerald-700">{message}</p>}
              {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
              <button type="submit" disabled={saving} className="inline-flex min-h-10 items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60">{saving ? 'Saving…' : 'Save profile'}</button>
            </form>
          </SettingsSection>

          <SettingsSection icon={<ShieldCheck size={16} />} title="Security" description="Manage your login, password, and account access">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <p className="text-sm font-semibold text-slate-700">Password</p>
                  <p className="mt-1 text-xs text-slate-500">Send a secure password reset link to {user?.email}</p>
                </div>
                <button type="button" onClick={sendPasswordReset} disabled={sendingReset} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-blue-200 hover:text-blue-600 disabled:opacity-60">{sendingReset ? 'Sending…' : 'Send link'}</button>
              </div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <p className="text-sm font-semibold text-slate-700">Email verification</p>
                  <p className="mt-1 text-xs text-slate-500">{user?.emailVerified ? 'Your email address is verified.' : 'Verify your email to protect workspace access.'}</p>
                </div>
                <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${user?.emailVerified ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{user?.emailVerified ? 'Verified' : 'Pending'}</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-700">Account email</p>
                  <p className="mt-1 text-xs text-slate-500">Managed securely by Firebase Authentication</p>
                </div>
                <span className="text-xs text-slate-500">{user?.email}</span>
              </div>
            </div>
          </SettingsSection>
        </div>

        <div className="space-y-6">
          <SettingsSection icon={<Bell size={16} />} title="Preferences" description="Adjust your notifications and workspace setup">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-700">Daily application reminders</p>
                  <p className="mt-1 text-xs text-slate-500">Follow-ups and deadlines</p>
                </div>
                <button className="h-6 w-11 rounded-full bg-blue-600 p-1"><span className="block h-4 w-4 translate-x-5 rounded-full bg-white" /></button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-700">Interview summary emails</p>
                  <p className="mt-1 text-xs text-slate-500">Weekly career digest</p>
                </div>
                <button className="h-6 w-11 rounded-full bg-slate-200 p-1"><span className="block h-4 w-4 rounded-full bg-white" /></button>
              </div>
            </div>
          </SettingsSection>

          <SettingsSection icon={<Mail size={16} />} title="Email & contact" description="Update addresses, status, and verification details">
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
                <div>
                  <p className="font-medium text-slate-700">Primary email</p>
                  <p className="text-xs text-slate-500">{user?.email}</p>
                </div>
                <span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${user?.emailVerified ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{user?.emailVerified ? 'Verified' : 'Unverified'}</span>
              </div>
              <Link to="/change-email" className="inline-flex text-xs font-semibold text-blue-600 hover:text-blue-700">Change email address</Link>
            </div>
          </SettingsSection>
        </div>
      </div>
    </div>
  )
}
