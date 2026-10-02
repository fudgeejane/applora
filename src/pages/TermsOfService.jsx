import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">Legal</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Terms of Service</h1>
          </div>
          <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:border-blue-200 hover:text-blue-600">
            <ArrowLeft size={14} /> Home
          </Link>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-amber-900">
          This is a prototype UI and not final legal advice or approved policy text.
        </div>

        <div className="mt-8 space-y-8 text-slate-600">
          <section>
            <h2 className="mb-3 text-xl font-bold text-slate-900">1. Acceptance of terms</h2>
            <p className="leading-7">By using Applora, you agree to the terms and conditions described in this prototype presentation. These terms are illustrative and subject to change before launch.</p>
          </section>
          <section>
            <h2 className="mb-3 text-xl font-bold text-slate-900">2. Service overview</h2>
            <p className="leading-7">Applora is a job-search management platform designed to help users track applications, organize documents, and review career goals in a single workspace.</p>
          </section>
          <section>
            <h2 className="mb-3 text-xl font-bold text-slate-900">3. User responsibilities</h2>
            <p className="leading-7">Users are responsible for keeping profile details accurate, using the platform in line with local laws, and maintaining secure access to their account credentials.</p>
          </section>
          <section>
            <h2 className="mb-3 text-xl font-bold text-slate-900">4. Contact and support</h2>
            <p className="leading-7">Support inquiries can be sent to support@applora.app. This prototype does not implement real support automation or legal workflows.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
