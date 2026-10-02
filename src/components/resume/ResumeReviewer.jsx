import { Sparkles, CheckCircle2 } from 'lucide-react'

export default function ResumeReviewer() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Resume review</p>
          <h3 className="mt-1 text-xl font-bold text-slate-900">ATS score</h3>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[10px] font-semibold text-amber-700">
          <Sparkles size={12} /> ATS check
        </span>
      </div>

      <div className="grid gap-5 lg:grid-cols-[140px_1fr]">
        <div className="flex items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex h-24 w-24 items-center justify-center rounded-full border-[8px] border-emerald-100 border-r-emerald-500 border-b-emerald-500 bg-white">
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-900">92</p>
              <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Score</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="mb-1 flex items-center justify-between text-[11px] text-slate-600">
              <span>Keyword match</span>
              <span className="font-semibold text-slate-800">88%</span>
            </div>
            <div className="h-2.5 rounded-full bg-slate-100">
              <div className="h-2.5 w-[88%] rounded-full bg-blue-500" />
            </div>
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between text-[11px] text-slate-600">
              <span>Skills alignment</span>
              <span className="font-semibold text-slate-800">94%</span>
            </div>
            <div className="h-2.5 rounded-full bg-slate-100">
              <div className="h-2.5 w-[94%] rounded-full bg-emerald-500" />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">Detected</p>
              <ul className="mt-2 space-y-2 text-[11px] text-slate-600">
                <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-emerald-600" /> Product strategy</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-emerald-600" /> Design systems</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-emerald-600" /> User research</li>
              </ul>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">Suggestions</p>
              <ul className="mt-2 space-y-2 text-[11px] text-slate-600">
                <li>Replace “team player” with “cross-functional collaboration”</li>
                <li>Highlight product metrics from the last role</li>
                <li>Reduce paragraph length in experience summary</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
