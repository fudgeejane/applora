import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ArrowRightLeft, ChevronDown, Home, LogOut, Search, Settings } from 'lucide-react'
import logo from '../assets/Logo.png'
import NotificationDropdown from '../components/common/NotificationDropdown'
import useAuth from '../hooks/useAuth'

const navItems = [
  { label: 'Home', to: '/app', icon: Home },
  { label: 'Resume', to: '/app/resume', icon: ArrowRightLeft },
  { label: 'Settings', to: '/app/settings', icon: Settings },
]

export default function ProtectedLayout({ children }) {
  const { user, profile, signOut } = useAuth()
  const [logoutError, setLogoutError] = useState('')
  const navigate = useNavigate()
  const displayName = profile?.name || user?.displayName || user?.email || 'Applora user'
  const firstName = profile?.firstName || displayName.split(/\s+/)[0]
  const initial = firstName.charAt(0).toUpperCase()

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
          <div className="flex min-w-0 flex-1 items-center gap-5 sm:gap-8">
            <Link to="/app" className="flex shrink-0 items-center gap-2">
              <img src={logo} alt="Applora" className="h-8 w-8" />
            </Link>

            <div className="hidden w-full max-w-sm items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-500 md:flex">
              <Search size={14} />
              <input aria-label="Search applications" value="Search applications" readOnly className="w-full bg-transparent text-xs text-slate-600 outline-none" />
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <NotificationDropdown />

            <details className="group relative">
              <summary aria-label="Open account menu" className="relative flex h-9 w-9 cursor-pointer list-none items-center justify-center rounded-full border border-blue-100 bg-blue-50 text-sm font-bold text-blue-700 shadow-sm hover:border-blue-300">
                {initial}
                <ChevronDown size={11} aria-hidden="true" className="absolute -bottom-1 -right-1 rounded-full bg-white text-slate-500 shadow-sm transition-transform group-open:rotate-180" />
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
