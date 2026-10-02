import ProtectedLayout from '../layouts/ProtectedLayout'
import HomePage from '../pages/HomePage'
import SettingsPage from '../pages/SettingsPage'
import ResumePage from '../pages/ResumePage'
import ProtectedRoute from '../components/auth/ProtectedRoute'

const protectedRoutes = [
  {
    path: '/app',
    element: (
      <ProtectedRoute><ProtectedLayout><HomePage /></ProtectedLayout></ProtectedRoute>
    ),
  },
  {
    path: '/app/applications',
    element: (
      <ProtectedRoute><ProtectedLayout><HomePage /></ProtectedLayout></ProtectedRoute>
    ),
  },
  {
    path: '/app/resume',
    element: (
      <ProtectedRoute><ProtectedLayout><ResumePage /></ProtectedLayout></ProtectedRoute>
    ),
  },
  {
    path: '/app/settings',
    element: (
      <ProtectedRoute><ProtectedLayout><SettingsPage /></ProtectedLayout></ProtectedRoute>
    ),
  },
]

export default protectedRoutes
