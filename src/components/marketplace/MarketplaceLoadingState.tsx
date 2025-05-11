import React from 'react';
import { Spinner } from '../common';

/**
 * Component for displaying loading state in marketplace
 * 
 * @returns The rendered marketplace loading state component with spinner
 */
export const MarketplaceLoadingState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Spinner size="lg" className="mb-4" />
      <p className="text-secondary-600">Loading products...</p>
    </div>
  );
};
