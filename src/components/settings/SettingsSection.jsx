export default function SettingsSection({ icon, title, description, children }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">{icon}</div>
        <div>
          <h3 className="text-base font-bold text-slate-800">{title}</h3>
          <p className="text-[11px] text-slate-500">{description}</p>
        </div>
      </div>
      {children}
    </section>
  )
}
