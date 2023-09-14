import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from 'Hooks/useAuth';

const RequireAuth = ({ allowedRoles }: { allowedRoles: number[] }) => {
  const { auth } = useAuth();
  const location = useLocation();
  console.log(auth.role.id);

  return allowedRoles.includes(auth.role.id) ? (
    <Outlet />
  ) : auth?.data ? (
    <Navigate to="/auth/signup" state={{ from: location }} replace />
  ) : (
    <Navigate to="/auth/signin" state={{ from: location }} replace />
  );
};

export default RequireAuth;
