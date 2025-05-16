import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Props for the Navigation component
 */
export interface NavigationProps {
  /** Whether the user is authenticated */
  isAuthenticated: boolean;
}

/**
 * Component for main navigation links
 *
 * @param props - The component props
 * @param props.isAuthenticated - Whether the user is authenticated
 * @returns The rendered navigation component with conditional links based on authentication status
 */
export const Navigation: React.FC<NavigationProps> = ({ isAuthenticated }) => {
  return (
    <nav className="hidden md:flex space-x-8">
      <Link to="/marketplace" className="text-ocean-100 hover:text-ocean-300">
        Marketplace
      </Link>
      {isAuthenticated && (
        <>
          <Link
            to="/protected/dashboard"
            className="text-ocean-100 hover:text-ocean-300"
          >
            My Products
          </Link>
        </>
      )}
    </nav>
  );
};
