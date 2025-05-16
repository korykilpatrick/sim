import React from 'react';

/**
 * Loading state component for the marketplace page
 *
 * @returns The rendered loading state component
 */
export const MarketplaceLoadingState: React.FC = () => {
  return (
    <div className="py-8">
      <div className="animate-pulse space-y-8">
        {/* Header skeleton */}
        <div className="space-y-2">
          <div className="h-6 bg-secondary-200 rounded w-1/4"></div>
          <div className="h-4 bg-secondary-200 rounded w-1/3"></div>
        </div>
        
        {/* Product grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="border border-secondary-200 rounded-lg p-4 space-y-4">
              <div className="h-40 bg-secondary-200 rounded"></div>
              <div className="h-5 bg-secondary-200 rounded w-3/4"></div>
              <div className="h-4 bg-secondary-200 rounded w-1/2"></div>
              <div className="h-8 bg-secondary-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
