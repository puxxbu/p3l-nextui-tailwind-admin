import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from 'Hooks/useAuth';
import { getCurrentUser } from 'src/hooks/sampleData';
import { all } from 'axios';

const RequireAuth = ({ allowedRoles }: { allowedRoles: number[] }) => {
  const { auth } = useAuth();
  const location = useLocation();
  console.log('auth :' + auth.token);

  if (!allowedRoles.includes(2001)) {
    if (auth.role.id_role === 2001) {
      return (
        <Navigate to="/error/forbidden" state={{ from: location }} replace />
      );
    }
  }

  getCurrentUser(auth.token, (data, error) => {
    if (error) {
      console.log('data :' + error);
      return <Navigate to="/auth/signin" state={{ from: location }} replace />;
    } else {
      console.log('data :' + data);
    }
  });

  if (Object.entries(auth).length === 0) {
    return <Navigate to="/auth/signin" state={{ from: location }} replace />;
  }

  return allowedRoles.includes(auth.role.id_role) ? (
    <Outlet />
  ) : auth?.data ? (
    <Navigate
      to="/admin"
      state={{ from: location, message: 'Unauthorized' }}
      replace
    />
  ) : (
    <Navigate
      to="/admin"
      state={{ from: location, message: 'Unauthorized' }}
      replace
    />
  );
};

export default RequireAuth;
