import { createBrowserRouter } from 'react-router-dom';

import RequireUser from '@/components/requireUser';
import AdminPage from '@/pages/admin.page';
import HomePage from '@/pages/home.page';
import LoginPage from '@/pages/login.page';
import ProfilePage from '@/pages/profile.page';
import RegisterPage from '@/pages/register.page';
import UnauthorizedPage from '@/pages/unauthorized.page';
import EmailVerificationPage from '@/pages/verifyemail.page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/verifyemail/:verificationCode',
    element: <EmailVerificationPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/admin',
    element: (
      <RequireUser allowedRoles={['user', 'admin']}>
        <AdminPage />
      </RequireUser>
    ),
  },
  {
    path: '/unauthorized',
    element: <UnauthorizedPage />,
  },
  {
    path: '/profile',
    element: (
      <RequireUser allowedRoles={['user', 'admin']}>
        <ProfilePage />
      </RequireUser>
    ),
  },
]);
