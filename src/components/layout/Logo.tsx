import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Component for displaying the SynMax logo
 *
 * @returns The rendered logo component with company name and link to home page
 */
export const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <span className="text-xl font-bold text-ocean-400">SYNMAX</span>
      <span className="text-xl text-white uppercase">Maritime</span>
    </Link>
  );
};
