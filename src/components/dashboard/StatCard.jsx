import { ArrowUpRight } from 'lucide-react'

export default function StatCard({ label, value, change, tone = 'blue' }) {
  const toneClasses = {
    blue: 'text-blue-600 bg-blue-50',
    green: 'text-emerald-600 bg-emerald-50',
    amber: 'text-amber-600 bg-amber-50',
    violet: 'text-violet-600 bg-violet-50',
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">{label}</p>
          <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">{value}</p>
        </div>
        <div className={`rounded-xl p-2 ${toneClasses[tone] || toneClasses.blue}`}>
          <ArrowUpRight size={15} />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 text-[11px] font-medium text-slate-500">
        <span className="text-emerald-600">{change}</span>
        <span>from previous period</span>
      </div>
    </div>
  )
}
