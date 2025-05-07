import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '@hooks/redux';

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page with a return path
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};