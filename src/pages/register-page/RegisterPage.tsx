import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterForm } from '@features/auth/components/RegisterForm';

/**
 * Registration page component
 *
 * @returns The rendered registration page with sign-up form and login link
 */
export const RegisterPage = (): React.ReactElement => {
  const navigate = useNavigate();

  /**
   * Handles successful registration
   */
  const handleRegisterSuccess = () => {
    navigate('/marketplace', { replace: true });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-6 text-ocean-200">
        Create Account
      </h2>

      <RegisterForm onRegisterSuccess={handleRegisterSuccess} />

      <div className="mt-6 text-center">
        <p className="text-sm text-ocean-100">
          Already have an account?{' '}
          <Link
            to="/auth/login"
            className="text-ocean-400 hover:text-ocean-300 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};
