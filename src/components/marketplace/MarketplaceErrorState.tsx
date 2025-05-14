import React from 'react';
import { Button } from '../common';

/**
 * Props for the MarketplaceErrorState component
 */
interface MarketplaceErrorStateProps {
  /** Error message to display */
  message?: string;
  /** Function to retry loading products */
  onRetry?: () => void;
}

/**
 * Component for displaying error state in marketplace
 *
 * @param props - The component props
 * @param props.message - Error message to display
 * @param props.onRetry - Function to retry loading products
 * @returns The rendered marketplace error state component with message and retry button
 */
export const MarketplaceErrorState: React.FC<MarketplaceErrorStateProps> = ({
  message = 'Failed to load products. Please try again.',
  onRetry,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-8 text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 mx-auto text-red-500 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <h2 className="text-xl font-medium text-secondary-900 mb-2">
        Error Loading Products
      </h2>
      <p className="text-secondary-600 mb-6">{message}</p>
      {onRetry && (
        <Button variant="primary" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
};
