import { ArrowUpDown, Eye, MoreHorizontal } from 'lucide-react'
import ApplicationStatusBadge from './ApplicationStatusBadge'

const rows = [
  { company: 'Northstar Labs', role: 'Senior Product Designer', location: 'Remote', workplace: 'Remote', status: 'Interview', date: 'Sep 12', resume: 'Primary' },
  { company: 'Flux Commerce', role: 'UX Researcher', location: 'New York', workplace: 'Hybrid', status: 'Screening', date: 'Sep 06', resume: 'Research' },
  { company: 'Summit Studio', role: 'Product Analyst', location: 'Boston', workplace: 'On-site', status: 'Assessment', date: 'Aug 29', resume: 'Analyst' },
  { company: 'Harbor Health', role: 'Frontend Engineer', location: 'Remote', workplace: 'Remote', status: 'Offer', date: 'Aug 21', resume: 'Frontend' },
  { company: 'Beacon Door', role: 'Operations Coordinator', location: 'Chicago', workplace: 'Hybrid', status: 'Applied', date: 'Sep 14', resume: 'Operations' },
]

export default function ApplicationTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <span>Applications</span>
          <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] text-slate-600">{rows.length}</span>
        </div>
        <button className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2 py-1.5 text-[10px] font-semibold text-slate-600">
          <ArrowUpDown size={12} /> Sort
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-slate-50 text-[10px] uppercase tracking-[0.14em] text-slate-400">
            <tr>
              <th className="px-4 py-3 font-semibold">Company</th>
              <th className="px-4 py-3 font-semibold">Position</th>
              <th className="px-4 py-3 font-semibold">Location</th>
              <th className="px-4 py-3 font-semibold">Workplace</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Applied</th>
              <th className="px-4 py-3 font-semibold">Resume</th>
              <th className="px-4 py-3 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.company} className="border-t border-slate-200 hover:bg-slate-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-[10px] font-bold text-blue-700">
                      {row.company.slice(0, 2).toUpperCase()}
                    </div>
                    <span className="text-sm font-semibold text-slate-700">{row.company}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">{row.role}</td>
                <td className="px-4 py-3 text-sm text-slate-500">{row.location}</td>
                <td className="px-4 py-3 text-sm text-slate-500">{row.workplace}</td>
                <td className="px-4 py-3"><ApplicationStatusBadge status={row.status} /></td>
                <td className="px-4 py-3 text-sm text-slate-500">{row.date}</td>
                <td className="px-4 py-3 text-sm text-slate-500">{row.resume}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:border-blue-200 hover:text-blue-600">
                      <Eye size={13} />
                    </button>
                    <button className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:border-blue-200 hover:text-blue-600">
                      <MoreHorizontal size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
