import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '@features/auth/authApi';
import {
  logError,
  getErrorMessage,
  isErrorOfType,
  ErrorCode,
} from '@lib/errorUtils';
import { isDefined } from '@lib/typeGuards';

/**
 * Props for the LogoutButton component
 */
type LogoutButtonProps = {
  /** Additional CSS class names */
  className?: string;
};

/**
 * Button component that handles user logout functionality
 *
 * @param props - The component props
 * @param props.className - Additional CSS class names
 * @returns The rendered logout button that handles user sign out
 */
export const LogoutButton: FC<LogoutButtonProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async (): Promise<void> => {
    try {
      const result = await logout().unwrap();

      if (isDefined(result)) {
        navigate('/auth/login', { replace: true });
      } else {
        navigate('/auth/login', { replace: true });
      }
    } catch (error: unknown) {
      logError(error, 'Logout operation failed');

      if (isErrorOfType(error, ErrorCode.NETWORK_ERROR)) {
        console.error(
          'Network error during logout. Please check your connection.',
        );
      } else {
        console.error('Logout failed:', getErrorMessage(error));
      }

    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className={`block w-full text-left px-4 py-2 text-sm text-ocean-100 hover:bg-navy-600 ${className}`}
      aria-busy={isLoading}
    >
      {isLoading ? 'Signing out...' : 'Sign out'}
    </button>
  );
};
