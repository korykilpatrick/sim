import React from 'react';

/**
 * Component displayed when no products match the current search criteria
 *
 * @returns The rendered empty state component
 */
export const EmptySearchState: React.FC = () => {
  return (
    <div className="text-center py-12 px-4">
      <svg
        className="mx-auto h-12 w-12 text-secondary-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h3 className="mt-2 text-lg font-medium text-secondary-900">No products found</h3>
      <p className="mt-1 text-sm text-secondary-500">
        Try adjusting your search or filter criteria to find what you're looking for.
      </p>
    </div>
  );
};
