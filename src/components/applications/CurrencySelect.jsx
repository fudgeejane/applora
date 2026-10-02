import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronDown, Search } from 'lucide-react'
import { currencyOptions } from '../../data/currencies'

export default function CurrencySelect({ value, onChange, ariaLabel = 'Salary currency' }) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [menuPosition, setMenuPosition] = useState(null)
  const buttonRef = useRef(null)
  const menuRef = useRef(null)
  const searchRef = useRef(null)

  const selected = currencyOptions.find((currency) => currency.code === value)

  const filteredCurrencies = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return currencyOptions

    return currencyOptions.filter((currency) => (
      currency.code.toLowerCase().includes(query)
      || currency.label.toLowerCase().includes(query)
    ))
  }, [search])

  const updateMenuPosition = () => {
    const button = buttonRef.current
    if (!button) return

    const rect = button.getBoundingClientRect()
    const menuWidth = 288
    const left = Math.min(rect.left, window.innerWidth - menuWidth - 12)

    setMenuPosition({
      top: rect.bottom + 6,
      left: Math.max(12, left),
      width: menuWidth,
    })
  }

  useEffect(() => {
    if (!open) return undefined

    updateMenuPosition()
    const frame = requestAnimationFrame(() => searchRef.current?.focus())

    const closeIfOutside = (event) => {
      const target = event.target
      if (buttonRef.current?.contains(target) || menuRef.current?.contains(target)) return
      setOpen(false)
      setSearch('')
    }

    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return
      event.preventDefault()
      event.stopPropagation()
      setOpen(false)
      setSearch('')
    }

    document.addEventListener('mousedown', closeIfOutside)
    document.addEventListener('keydown', onKeyDown, true)
    window.addEventListener('resize', updateMenuPosition)
    window.addEventListener('scroll', updateMenuPosition, true)

    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('mousedown', closeIfOutside)
      document.removeEventListener('keydown', onKeyDown, true)
      window.removeEventListener('resize', updateMenuPosition)
      window.removeEventListener('scroll', updateMenuPosition, true)
    }
  }, [open])

  const selectCurrency = (code) => {
    onChange(code)
    setOpen(false)
    setSearch('')
  }

  return (
    <div className="relative w-[7.5rem] shrink-0">
      <button
        ref={buttonRef}
        type="button"
        aria-label={ariaLabel}
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((isOpen) => !isOpen)}
        className="flex h-10 w-full items-center justify-between gap-1 rounded-md border border-slate-200 bg-white px-2.5 text-sm font-medium text-slate-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
      >
        <span className="truncate">{selected?.code || value || 'USD'}</span>
        <ChevronDown size={14} className={`shrink-0 text-slate-400 transition ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && menuPosition && createPortal(
        <div
          ref={menuRef}
          style={{ top: menuPosition.top, left: menuPosition.left, width: menuPosition.width }}
          className="fixed z-[80] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl"
        >
          <div className="border-b border-slate-100 p-2">
            <label className="flex h-9 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-400">
              <Search size={14} />
              <input
                ref={searchRef}
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') event.preventDefault()
                }}
                placeholder="Search currency"
                aria-label="Search currency"
                className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
              />
            </label>
          </div>

          <ul role="listbox" className="max-h-48 overflow-y-auto py-1">
            {filteredCurrencies.map((currency) => {
              const isSelected = currency.code === value

              return (
                <li key={currency.code}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => selectCurrency(currency.code)}
                    className={`flex w-full px-3 py-2 text-left text-sm transition hover:bg-slate-50 ${isSelected ? 'bg-blue-50 font-medium text-blue-700' : 'text-slate-700'}`}
                  >
                    {currency.label}
                  </button>
                </li>
              )
            })}

            {filteredCurrencies.length === 0 && (
              <li className="px-3 py-6 text-center text-sm text-slate-500">
                No currencies found.
              </li>
            )}
          </ul>
        </div>,
        document.body,
      )}
    </div>
  )
}
