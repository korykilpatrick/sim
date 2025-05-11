import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LoginForm } from '@components/auth';

/**
 * Login page component that handles user authentication
 * 
 * @returns The rendered login page with sign-in form and registration link
 */
const LoginPage = (): React.ReactElement => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/marketplace';

  /**
   * Handles successful login
   */
  const handleLoginSuccess = () => {
    // If login is successful, redirect to the previous page or marketplace
    navigate(from, { replace: true });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-6 text-ocean-200">
        Sign In
      </h2>

      <LoginForm onLoginSuccess={handleLoginSuccess} />

      <div className="mt-6 text-center">
        <p className="text-sm text-ocean-100">
          Don&apos;t have an account?{' '}
          <Link
            to="/auth/register"
            className="text-ocean-400 hover:text-ocean-300 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
