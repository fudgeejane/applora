import { useEffect } from 'react'

export default function Modal({ open, onClose, children, className = '', ariaLabel }) {
  useEffect(() => {
    if (!open) return undefined

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [open, onClose])

  if (!open) return null

  return (
    <div onMouseDown={(event) => event.target === event.currentTarget && onClose()} className="modal-overlay">
      <div role="dialog" aria-modal="true" aria-label={ariaLabel} className={`w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl ${className}`}>
        {children}
      </div>
    </div>
  )
}
