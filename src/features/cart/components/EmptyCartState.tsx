import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@components/ui';

/**
 * Component for displaying empty cart state
 *
 * @returns The rendered empty cart state component with a button to browse products
 */
export const EmptyCartState: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow p-8 text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 mx-auto text-secondary-400 mb-4"
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
      <h2 className="text-xl font-medium text-secondary-900 mb-2">
        Your cart is empty
      </h2>
      <p className="text-secondary-600 mb-6">
        Looks like you haven&apos;t added any products to your cart yet.
      </p>
      <Link to="/marketplace">
        <Button variant="primary">Browse Products</Button>
      </Link>
    </div>
  );
};
