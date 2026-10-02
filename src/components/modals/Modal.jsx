export default function Modal({ open, onClose, children, className = '' }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/55 p-4 backdrop-blur-sm">
      <div className={`w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl ${className}`}>
        {children}
      </div>
    </div>
  )
}
