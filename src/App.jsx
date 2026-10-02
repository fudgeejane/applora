import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import publicRoutes from './routes/public'
import protectedRoutes from './routes/protected'
import AuthProvider from './components/auth/AuthProvider'
import LoadingPage from './components/common/LoadingPage'
import useAuth from './hooks/useAuth'

function AppContent() {
  const { loading } = useAuth()
  const [isReload] = useState(() =>
    typeof performance !== 'undefined'
    && performance.getEntriesByType('navigation')[0]?.type === 'reload',
  )

  if (isReload && loading) return <LoadingPage />

  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
        {protectedRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </BrowserRouter>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App