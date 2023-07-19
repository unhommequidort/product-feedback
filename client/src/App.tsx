import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Layout from './components/layout';
import RequireUser from './components/requireUser';
import AdminPage from './pages/admin.page';
import HomePage from './pages/home.page';
import LoginPage from './pages/login.page';
import ProfilePage from './pages/profile.page';
import RegisterPage from './pages/register.page';
import UnauthorizePage from './pages/unauthorized.page';
import EmailVerificationPage from './pages/verifyemail.page';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />

          {/* Private Route */}
          <Route element={<RequireUser allowedRoles={['user', 'admin']} />}>
            <Route path="profile" element={<ProfilePage />} />
          </Route>
          <Route element={<RequireUser allowedRoles={['admin']} />}>
            <Route path="admin" element={<AdminPage />} />
          </Route>
          <Route path="unauthorized" element={<UnauthorizePage />} />
        </Route>
        <Route path="verifyemail" element={<EmailVerificationPage />}>
          <Route path=":verificationCode" element={<EmailVerificationPage />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Routes>
    </>
  );
}

export default App;
