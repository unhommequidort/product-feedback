import { useAppSelector } from '../redux/store';

const ProfilePage = () => {
  const { user } = useAppSelector((state) => state.userState);

  return (
    <div>
      <h1>Profile Page</h1>
      <p>{user?.name}</p>
      <p>{user?.email}</p>
      <p>{user?.username}</p>
    </div>
  );
};
