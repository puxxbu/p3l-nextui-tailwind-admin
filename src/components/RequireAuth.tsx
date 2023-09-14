<<<<<<< HEAD
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
=======
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from 'Hooks/useAuth';

const RequireAuth = ({ allowedRoles }: { allowedRoles: number[] }) => {
  const { auth } = useAuth();
  const location = useLocation();

  return allowedRoles.includes(auth?.data?.role?.id) ? (
    <Outlet />
  ) : auth?.data ? (
    <Navigate to="/auth/signup" state={{ from: location }} replace />
  ) : (
    <Navigate to="/auth/signin" state={{ from: location }} replace />
  );
};

export default RequireAuth;
>>>>>>> 1569595aaab1969cf1d9b0697df6d6b3559f8796
