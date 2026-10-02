import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/Logo.png'
import AuthModal from '../components/modals/AuthModal'

export default function PublicLayout({ children }) {
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState('signin')
  const [returnTo, setReturnTo] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handler = (event) => {
      setAuthMode(event.detail?.mode ?? 'signin')
      setAuthOpen(true)
    }

    window.addEventListener('applora-auth', handler)
    return () => window.removeEventListener('applora-auth', handler)
  }, [])

  const routeAuthOpen = location.state?.openAuth === true
  const requestedPath = location.state?.from?.pathname
  const resolvedReturnTo = routeAuthOpen && requestedPath?.startsWith('/app')
    ? requestedPath
    : returnTo

  const closeAuth = () => {
    setAuthOpen(false)
    setReturnTo(null)
    if (routeAuthOpen) navigate(location.pathname, { replace: true, state: null })
  }

  useEffect(() => {
    if (location.pathname === '/' && location.hash === '#home') {
      document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [location.pathname, location.hash])

  return (
    <div className="min-h-screen bg-white text-slate-800">
      {(authOpen || routeAuthOpen) && <AuthModal open onClose={closeAuth} defaultMode={routeAuthOpen ? 'signin' : authMode} returnTo={resolvedReturnTo} />}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            to="/#home"
            onClick={() => {
              if (location.pathname === '/') {
                document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            className="flex items-center gap-3"
          >
            <img src={logo} alt="Applora logo" className="h-8 w-8" />
            <span className="text-lg font-bold tracking-tight text-slate-900">Applora</span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="#home" className="transition hover:text-blue-600">Home</a>
            <a href="#about" className="transition hover:text-blue-600">About</a>
            <a href="#features" className="transition hover:text-blue-600">Features</a>
            <a href="#contact" className="transition hover:text-blue-600">Contact</a>
          </nav>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setAuthMode('signin')
                setReturnTo(null)
                setAuthOpen(true)
              }}
              className="cursor-pointer rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-600 sm:inline-flex"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode('signup')
                setReturnTo(null)
                setAuthOpen(true)
              }}
              className="cursor-pointer inline-flex rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <span className="text-white">Sign Up</span>
            </button>
          </div>
        </div>
      </header>
      {children}
    </div>
  )
}
