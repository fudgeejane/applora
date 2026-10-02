import { Navigate } from 'react-router-dom'
import PublicLayout from '../layouts/PublicLayout'
import LandingPage from '../pages/LandingPage'
import ForgotPassword from '../pages/ForgotPassword'
import ChangePassword from '../pages/ChangePassword'
import ChangeEmail from '../pages/ChangeEmail'
import EmailVerified from '../pages/EmailVerified'
import TermsOfService from '../pages/TermsOfService'
import PrivacyPolicy from '../pages/PrivacyPolicy'
import AuthActionHandler from '../components/auth/AuthActionHandler'
import AuthActionError from '../pages/AuthActionError'

const publicRoutes = [
  {
    path: '/',
    element: (
      <PublicLayout>
        <LandingPage />
      </PublicLayout>
    ),
  },
  {
    path: '/auth/action',
    element: (
      <PublicLayout>
        <AuthActionHandler />
      </PublicLayout>
    ),
  },
  {
    path: '/auth-action-error',
    element: (
      <PublicLayout>
        <AuthActionError />
      </PublicLayout>
    ),
  },
  {
    path: '/forgot-password',
     element: <ForgotPassword />,
  },
  {
    path: '/change-password',
    element: (
      <PublicLayout>
        <ChangePassword />
      </PublicLayout>
    ),
  },
  {
    path: '/change-email',
    element: (
      <PublicLayout>
        <ChangeEmail />
      </PublicLayout>
    ),
  },
  {
    path: '/email-verified',
    element: <EmailVerified />,
  },
  {
    path: '/terms',
    element: (
      <PublicLayout>
        <TermsOfService />
      </PublicLayout>
    ),
  },
  {
    path: '/privacy-policy',
    element: (
      <PublicLayout>
        <PrivacyPolicy />
      </PublicLayout>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]

export default publicRoutes
