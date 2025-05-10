import React from 'react';

/**
 * Component for displaying a message when no products are found
 */
export const EmptySearchState: React.FC = () => {
  return (
    <div className="bg-secondary-50 rounded-lg p-8 text-center">
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
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h3 className="text-lg font-medium text-secondary-900 mb-2">
        No products found
      </h3>
      <p className="text-secondary-600">
        Try adjusting your filters or search query to find what you&apos;re
        looking for.
      </p>
    </div>
  );
};
