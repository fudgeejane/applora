import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">Legal</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Privacy Policy</h1>
          </div>
          <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:border-blue-200 hover:text-blue-600">
            <ArrowLeft size={14} /> Home
          </Link>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-amber-900">
          This page is placeholder content for a static prototype and not final legal or compliance language.
        </div>

        <div className="mt-8 space-y-8 text-slate-600">
          <section>
            <h2 className="mb-3 text-xl font-bold text-slate-900">1. Information we collect</h2>
            <p className="leading-7">Applora may collect basic profile information, account details, resume metadata, application tracking data, and support communications when users interact with the prototype.</p>
          </section>
          <section>
            <h2 className="mb-3 text-xl font-bold text-slate-900">2. How information is used</h2>
            <p className="leading-7">Data may be used to organize job applications, tailor resume workflows, personalize dashboard insights, and improve support experiences.</p>
          </section>
          <section>
            <h2 className="mb-3 text-xl font-bold text-slate-900">3. Data sharing</h2>
            <p className="leading-7">This prototype does not implement third-party integrations or real data storage. Any future implementation would require explicit consent and documented security controls.</p>
          </section>
          <section>
            <h2 className="mb-3 text-xl font-bold text-slate-900">4. Your rights</h2>
            <p className="leading-7">Users should be able to access, correct, or request deletion of personal information once production systems are implemented and privacy controls are in place.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
