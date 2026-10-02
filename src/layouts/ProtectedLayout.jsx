import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ArrowRightLeft, Bell, ChevronDown, FileText, Home, LogOut, Search, Settings } from 'lucide-react'
import logo from '../assets/Logo.png'
import useAuth from '../hooks/useAuth'

const navItems = [
  { label: 'Dashboard', to: '/app', icon: Home },
  { label: 'Applications', to: '/app/applications', icon: FileText },
  { label: 'Resume', to: '/app/resume', icon: ArrowRightLeft },
  { label: 'Settings', to: '/app/settings', icon: Settings },
]

export default function ProtectedLayout({ children }) {
  const { user, profile, signOut } = useAuth()
  const [logoutError, setLogoutError] = useState('')
  const navigate = useNavigate()
  const displayName = profile?.name || user?.displayName || user?.email || 'Applora user'
  const initials = displayName.split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase()

  const handleSignOut = async () => {
    setLogoutError('')
    try {
      await signOut()
      navigate('/', { replace: true })
    } catch {
      setLogoutError('Unable to sign out. Please try again.')
    }
  }

  const closeProfileMenu = (event) => {
    event.currentTarget.closest('details')?.removeAttribute('open')
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link to="/app" className="flex shrink-0 items-center gap-2">
            <img src={logo} alt="Applora" className="h-8 w-8" />
            <span className="text-lg font-bold text-slate-900">Applora</span>
          </Link>

          <div className="hidden w-full max-w-md items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-500 md:flex">
            <Search size={14} />
            <input aria-label="Search applications" value="Search applications" readOnly className="w-full bg-transparent text-xs text-slate-600 outline-none" />
            <span className="rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-semibold text-slate-500">⌘K</span>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <button type="button" aria-label="Notifications" className="relative rounded-full border border-slate-200 bg-white p-2 text-slate-500 transition hover:border-blue-200 hover:text-blue-600">
              <Bell size={15} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-400" />
            </button>

            <details className="group relative">
              <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-slate-200 bg-white py-1.5 pl-1.5 pr-2 shadow-sm hover:border-blue-200">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">{initials}</span>
                <span className="hidden text-left sm:block">
                  <span className="block max-w-40 truncate text-xs font-semibold text-slate-700">{displayName}</span>
                  <span className="block max-w-40 truncate text-[10px] text-slate-500">{user?.email}</span>
                </span>
                <ChevronDown size={14} className="text-slate-500 transition group-open:rotate-180" />
              </summary>

              <div className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-xl border border-slate-200 bg-white py-2 shadow-xl">
                <div className="px-4 pb-3">
                  <p className="truncate text-sm font-semibold text-slate-800">{displayName}</p>
                  <p className="truncate text-xs text-slate-500">{user?.email}</p>
                </div>
                <nav aria-label="Workspace navigation" className="border-y border-slate-100 px-2 py-2">
                  {navItems.map(({ label, to, icon: Icon }) => (
                    <NavLink
                      key={to}
                      to={to}
                      end={to === '/app'}
                      onClick={closeProfileMenu}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`
                      }
                    >
                      <Icon size={16} />
                      {label}
                    </NavLink>
                  ))}
                </nav>
                <button type="button" onClick={handleSignOut} className="flex w-full items-center gap-3 px-5 py-3 text-left text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-red-600">
                  <LogOut size={16} />
                  Sign out
                </button>
              </div>
            </details>
          </div>
        </div>
      </header>

      {logoutError && <p role="alert" className="border-b border-red-200 bg-red-50 px-6 py-2 text-sm text-red-700">{logoutError}</p>}
      <main>{children}</main>
    </div>
  )
}
