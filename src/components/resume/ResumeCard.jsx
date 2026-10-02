import { Download, Eye, PencilLine, Trash2 } from 'lucide-react'

export default function ResumeCard({ resume, active = false }) {
  const tone = {
    blue: 'bg-blue-50 text-blue-700',
    green: 'bg-emerald-50 text-emerald-700',
    amber: 'bg-amber-50 text-amber-700',
  }

  return (
    <div className={`rounded-2xl border p-4 shadow-sm ${active ? 'border-blue-200 bg-blue-50/40' : 'border-slate-200 bg-white'}`}>
      <div className="flex items-start justify-between gap-3">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${tone[resume.color] || tone.blue}`}>
          <span className="text-lg font-bold">{resume.fileType}</span>
        </div>
        <button className="rounded-full border border-slate-200 bg-white p-1.5 text-slate-500 hover:text-blue-600">
          <PencilLine size={14} />
        </button>
      </div>

      <div className="mt-4">
        <p className="text-sm font-semibold text-slate-800">{resume.name}</p>
        <p className="mt-1 text-[11px] text-slate-500">Uploaded {resume.uploadedAt}</p>
      </div>

      <div className="mt-4 space-y-2 text-[11px] text-slate-500">
        <div className="flex items-center justify-between">
          <span>Last updated</span>
          <span className="font-medium text-slate-700">{resume.updatedAt}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Used in</span>
          <span className="font-medium text-slate-700">{resume.usedInApplications} apps</span>
        </div>
        <div className="flex items-center justify-between">
          <span>File</span>
          <span className="font-medium text-slate-700">{resume.fileType}</span>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-[11px] font-semibold text-slate-600 hover:border-blue-200 hover:text-blue-600">
          <Eye size={13} /> View
        </button>
        <button className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2 text-slate-500 hover:border-red-200 hover:text-red-600">
          <Trash2 size={13} />
        </button>
      </div>
    </div>
  )
}
