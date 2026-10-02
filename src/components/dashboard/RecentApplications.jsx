import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const statuses = {
  Interview: 'bg-emerald-100 text-emerald-700',
  Screening: 'bg-amber-100 text-amber-700',
  Assessment: 'bg-violet-100 text-violet-700',
  Offer: 'bg-blue-100 text-blue-700',
}

export default function RecentApplications({ items = [] }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">Recent</p>
          <h3 className="mt-1 text-lg font-bold text-slate-900">Applications</h3>
        </div>
        <Link to="/app/applications" className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700">
          View all <ChevronRight size={14} />
        </Link>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-slate-800">{item.company}</p>
                <p className="mt-1 text-xs text-slate-500">{item.position}</p>
              </div>
              <span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${statuses[item.status] || 'bg-slate-100 text-slate-600'}`}>
                {item.status}
              </span>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
              <span>{item.appliedDate}</span>
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              <span>{item.location}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
