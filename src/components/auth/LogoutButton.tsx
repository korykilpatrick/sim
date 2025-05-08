import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '@services/authApi';

interface LogoutButtonProps {
  className?: string;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({
  className = '',
}) => {
  const navigate = useNavigate();
  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      navigate('/auth/login', { replace: true });
    } catch (error) {
      // Properly type the error and handle it
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'An unknown error occurred during logout';
      console.error('Logout failed:', errorMessage);

      // You could also integrate with a notification system here if needed
      // For example: displayNotification('error', 'Failed to log out. Please try again.');
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className={`block w-full text-left px-4 py-2 text-sm text-ocean-100 hover:bg-navy-600 ${className}`}
    >
      {isLoading ? 'Signing out...' : 'Sign out'}
    </button>
  );
};
