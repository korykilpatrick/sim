import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '@hooks/redux';

/**
 * Component that protects routes requiring authentication
 * Redirects to login page if user is not authenticated
 *
 * @returns The outlet component if authenticated, otherwise redirects to login
 */
export const ProtectedRoute = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page with a return path
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
