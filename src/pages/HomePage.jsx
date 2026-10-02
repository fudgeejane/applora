import { BriefcaseBusiness, Building2, Clock3, TrendingUp } from 'lucide-react'
import StatCard from '../components/dashboard/StatCard'
import RecentApplications from '../components/dashboard/RecentApplications'
import ApplicationTable from '../components/applications/ApplicationTable'
import { overviewStats, reminderItems } from '../data/analytics'

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Your job search dashboard</h1>
          </div>
        
        </div>

        <div className="grid gap-2.5 md:grid-cols-2 lg:grid-cols-4">
          {overviewStats.map((item) => (
            <StatCard 
              key={item.label} 
              label={item.label} 
              value={item.value} 
            change={item.change} 
            tone={item.tone} 
          />
        ))}
      </div>

     

      <div className="mt-6">
        <ApplicationTable />
      </div>
    </div>
  )
}
