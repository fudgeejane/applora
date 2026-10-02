import { ArrowRight, Upload } from 'lucide-react'
import ResumeList from '../components/resume/ResumeList'
import ResumeReviewer from '../components/resume/ResumeReviewer'
import { resumes } from '../data/resumes'

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">Resume library</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Manage your resumes</h1>
        </div>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
          <Upload size={15} />
          Upload resume
          <input type="file" className="hidden" />
        </label>
      </div>

      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">Overview</p>
            <h2 className="mt-1 text-lg font-bold text-slate-900">Resume pipeline</h2>
          </div>
          <div className="flex flex-wrap gap-3 text-[11px] text-slate-500">
            <span className="rounded-full bg-blue-50 px-3 py-1.5 font-semibold text-blue-700">3 active resumes</span>
            <span className="rounded-full bg-emerald-50 px-3 py-1.5 font-semibold text-emerald-700">10 tailored applications</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">Library</p>
              <h2 className="mt-1 text-lg font-bold text-slate-900">Your resumes</h2>
            </div>
            <button className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700">
              View all <ArrowRight size={14} />
            </button>
          </div>
          <ResumeList resumes={resumes} />
        </div>

        <div className="space-y-6">
          <ResumeReviewer />
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">Usage</p>
            <h3 className="mt-2 text-lg font-bold text-slate-900">Resume performance</h3>
            <div className="mt-5 space-y-4">
              {[
                { label: 'Product Design Resume', value: 87, color: 'bg-blue-500' },
                { label: 'Research Resume', value: 72, color: 'bg-emerald-500' },
                { label: 'Analyst Resume', value: 68, color: 'bg-amber-500' },
              ].map((item) => (
                <div key={item.label}>
                  <div className="mb-1 flex items-center justify-between text-[11px] text-slate-600">
                    <span>{item.label}</span>
                    <span className="font-semibold text-slate-800">{item.value}%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-100">
                    <div className={`h-2.5 rounded-full ${item.color}`} style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
