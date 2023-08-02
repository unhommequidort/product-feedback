import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

import { useLogoutUserMutation } from '../redux/api/authApi';
import { useAppSelector } from '../redux/store';

const Header = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.userState.user);

  const [logoutUser, { isSuccess, error, isError }] = useLogoutUserMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate('/login');
    }

    if (isError) {
      if (Array.isArray((error as any).data.error)) {
        (error as any).data.error.forEach((el: any) => {
          toast.error(el.message, {
            position: 'top-right',
          });
        });
      } else {
        toast.error((error as any).data.error.message, {
          position: 'top-right',
        });
      }
    }
  }, [isSuccess, navigate]);

  const onLogoutHandler = () => {
    logoutUser();
  };

  return (
    <div>
      <h1 onClick={() => navigate('/')}>Product Feedback</h1>
      <div>
        {!user && (
          <>
            <button onClick={() => navigate('/register')}>Sign up</button>
            <button onClick={() => navigate('/login')}>Log in</button>
          </>
        )}
        {user && (
          <>
            <button onClick={onLogoutHandler}>Log out</button>
          </>
        )}
        {user && user?.role === 'admin' && (
          <button onClick={() => navigate('/admin')}>Admin</button>
        )}
        <button onClick={() => navigate('/profile')}>Profile</button>
      </div>
    </div>
  );
};

export default Header;
