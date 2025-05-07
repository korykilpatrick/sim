import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '@services/authApi';

interface LogoutButtonProps {
  className?: string;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      navigate('/auth/login', { replace: true });
    } catch (error) {
      // Handle any errors if needed
      console.error('Logout failed', error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className={`block w-full text-left px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-100 ${className}`}
    >
      {isLoading ? 'Signing out...' : 'Sign out'}
    </button>
  );
};