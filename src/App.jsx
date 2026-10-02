import { BrowserRouter, Route, Routes } from 'react-router-dom'
import publicRoutes from './routes/public'
import protectedRoutes from './routes/protected'
import AuthProvider from './components/auth/AuthProvider'

function App() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  )
}

export default App