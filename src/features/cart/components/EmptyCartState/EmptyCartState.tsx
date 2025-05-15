import React, { FC } from 'react';
import { Link } from 'react-router-dom';

/**
 * Component for displaying an empty cart state
 *
 * @returns The rendered empty cart state component
 */
export const EmptyCartState: FC = () => {
  return (
    <div className="bg-white rounded-lg shadow p-8 text-center">
      <div className="flex justify-center mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-secondary-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      </div>
      <h2 className="text-xl font-medium text-secondary-900 mb-2">
        Your cart is empty
      </h2>
      <p className="text-secondary-500 mb-6">
        Looks like you haven't added any products to your cart yet.
      </p>
      <Link
        to="/marketplace"
        className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-ocean-600 hover:bg-ocean-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ocean-500"
      >
        Browse Products
      </Link>
    </div>
  );
};
