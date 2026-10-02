import { BriefcaseBusiness, Building2, Clock3, TrendingUp } from 'lucide-react'
import StatCard from '../components/dashboard/StatCard'
import RecentApplications from '../components/dashboard/RecentApplications'
import ApplicationTable from '../components/applications/ApplicationTable'
import { applications } from '../data/applications'
import { overviewStats, reminderItems } from '../data/analytics'

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">Overview</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Your job search dashboard</h1>
        </div>
        <button className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-600">
          Export summary
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {overviewStats.map((item) => (
          <StatCard key={item.label} label={item.label} value={item.value} change={item.change} tone={item.tone} />
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_0.9fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">Analytics</p>
              <h2 className="mt-1 text-lg font-bold text-slate-900">Applications over time</h2>
            </div>
            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-semibold text-blue-700">Updated weekly</span>
          </div>

          <div className="flex h-52 items-end gap-2 sm:gap-3">
            {[28, 36, 44, 52, 48, 62, 74, 68, 82, 70, 90, 96].map((height, index) => (
              <div key={index} className="flex h-full flex-1 flex-col justify-end">
                <div className="rounded-t-2xl bg-gradient-to-t from-blue-600 via-blue-500 to-blue-300" style={{ height: `${height}%` }} />
                <span className="mt-2 text-center text-[10px] text-slate-400">{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][index]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">Insights</p>
              <h2 className="mt-1 text-lg font-bold text-slate-900">Channel mix</h2>
            </div>
            <TrendingUp className="text-blue-600" size={18} />
          </div>

          <div className="mt-5 space-y-4">
            {[
              { label: 'Company site', value: 42, color: 'bg-blue-500' },
              { label: 'LinkedIn', value: 31, color: 'bg-emerald-500' },
              { label: 'Referral', value: 18, color: 'bg-amber-500' },
              { label: 'Other', value: 9, color: 'bg-violet-500' },
            ].map((item) => (
              <div key={item.label}>
                <div className="mb-1 flex items-center justify-between text-[11px] text-slate-500">
                  <span>{item.label}</span>
                  <span className="font-semibold text-slate-700">{item.value}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-slate-100">
                  <div className={`h-2.5 rounded-full ${item.color}`} style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[0.95fr_1.65fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">Reminders</p>
              <h3 className="mt-1 text-lg font-bold text-slate-900">Upcoming actions</h3>
            </div>
            <Clock3 size={18} className="text-blue-600" />
          </div>

          <div className="space-y-3">
            {reminderItems.map((item) => (
              <div key={item.title} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <div className={`mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl ${item.tone === 'blue' ? 'bg-blue-100 text-blue-600' : item.tone === 'green' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                  <BriefcaseBusiness size={14} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-slate-700">{item.title}</p>
                    <span className="rounded-full bg-slate-200 px-2 py-1 text-[10px] font-semibold text-slate-600">{item.status}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-[11px] text-slate-500">
                    <Building2 size={12} />
                    <span>{item.company}</span>
                    <span className="h-1 w-1 rounded-full bg-slate-300" />
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <RecentApplications items={applications.slice(0, 4)} />
        </div>
      </div>

      <div className="mt-6">
        <ApplicationTable />
      </div>
    </div>
  )
}
