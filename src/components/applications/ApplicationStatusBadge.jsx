export default function ApplicationStatusBadge({ status }) {
  const styles = {
    Saved: 'bg-slate-100 text-slate-700',
    Applied: 'bg-blue-100 text-blue-700',
    Screening: 'bg-amber-100 text-amber-700',
    Interview: 'bg-emerald-100 text-emerald-700',
    Assessment: 'bg-violet-100 text-violet-700',
    Offer: 'bg-emerald-100 text-emerald-700',
    Rejected: 'bg-rose-100 text-rose-700',
    Withdrawn: 'bg-slate-200 text-slate-700',
  }

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold ${styles[status] || 'bg-slate-100 text-slate-700'}`}>
      {status}
    </span>
  )
}
