import { useEffect, useRef, useState } from 'react'
import { Bell, CheckCheck, X } from 'lucide-react'

export default function NotificationDropdown() {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (!dropdownRef.current?.contains(event.target)) setOpen(false)
    }
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', closeOnOutsideClick)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [])

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        aria-label="Notifications"
        aria-expanded={open}
        aria-controls="notification-dropdown"
        onClick={() => setOpen((wasOpen) => !wasOpen)}
        className="relative rounded-full border border-slate-200 bg-white p-2 text-slate-500 transition hover:border-blue-200 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200"
      >
        <Bell size={15} />
      </button>

      {open && (
        <section
          id="notification-dropdown"
          role="dialog"
          aria-label="Notifications"
          className="absolute right-0 top-full z-50 mt-2 w-80 max-w-[calc(100vw-2rem)] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl"
        >
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <h2 className="text-sm font-semibold text-slate-800">Notifications</h2>
            <button
              type="button"
              aria-label="Close notifications"
              onClick={() => setOpen(false)}
              className="rounded p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            >
              <X size={16} />
            </button>
          </div>
          <div className="grid justify-items-center px-6 py-9 text-center">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-500">
              <CheckCheck size={19} />
            </span>
            <p className="mt-3 text-sm font-medium text-slate-700">You&apos;re all caught up</p>
            <p className="mt-1 text-xs leading-5 text-slate-500">New updates will appear here.</p>
          </div>
        </section>
      )}
    </div>
  )
}