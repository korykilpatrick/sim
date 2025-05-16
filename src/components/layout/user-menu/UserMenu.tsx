import React from 'react';
import { Link } from 'react-router-dom';
import { LogoutButton } from '@features/auth/components/LogoutButton';

/**
 * Component for user account dropdown menu
 *
 * @returns The rendered user menu dropdown with account options and logout button
 */
export const UserMenu: React.FC = () => {
  return (
    <div className="relative group">
      <button className="flex items-center space-x-1 text-ocean-100 hover:text-ocean-300">
        <span>Account</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div className="absolute right-0 w-48 bg-navy-700 rounded-md shadow-lg hidden group-hover:block z-10 border border-navy-600">
        <div className="py-1">
          <Link
            to="/protected/dashboard"
            className="block px-4 py-2 text-sm text-ocean-100 hover:bg-navy-600"
          >
            Dashboard
          </Link>
          <Link
            to="/protected/settings"
            className="block px-4 py-2 text-sm text-ocean-100 hover:bg-navy-600"
          >
            Settings
          </Link>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};
