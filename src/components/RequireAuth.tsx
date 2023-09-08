import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from 'Hooks/useAuth';

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.data ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/signin" state={{ from: location }} replace />
  );
};

export default RequireAuth;
