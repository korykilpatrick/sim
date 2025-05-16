import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Component for displaying the footer navigation links
 *
 * @returns The rendered footer links section with navigation links
 */
export const FooterLinks: React.FC = () => {
  return (
    <div>
      <h4 className="text-lg font-semibold mb-4 text-ocean-300">Links</h4>
      <ul className="space-y-2">
        <li>
          <Link to="/" className="text-ocean-100 hover:text-ocean-300">
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/marketplace"
            className="text-ocean-100 hover:text-ocean-300"
          >
            Marketplace
          </Link>
        </li>
        <li>
          <Link
            to="/auth/login"
            className="text-ocean-100 hover:text-ocean-300"
          >
            Login
          </Link>
        </li>
        <li>
          <Link
            to="/auth/register"
            className="text-ocean-100 hover:text-ocean-300"
          >
            Register
          </Link>
        </li>
      </ul>
    </div>
  );
};
