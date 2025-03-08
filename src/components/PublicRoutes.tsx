import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { UserState } from '../constants/types';
const PublicRoutes = () => {
  // const { currentUser } = useSelector((state: any) => state.user);

  const { currentUser } = useSelector(
    (state: { user: UserState }) => state.user
  );
  return (
    <div>
      {currentUser && currentUser !== null ? (
        <Navigate
          to={
            currentUser?.role === 'trader'
              ? '/trader/dashboard'
              : '/customer/dashboard'
          }
        />
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default PublicRoutes;
