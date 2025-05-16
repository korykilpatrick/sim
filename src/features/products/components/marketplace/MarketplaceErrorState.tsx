import React from 'react';

/**
 * Props for the MarketplaceErrorState component
 */
export interface MarketplaceErrorStateProps {
  /** Error message to display */
  message: string;
  /** Function to retry loading the marketplace */
  onRetry: () => void;
}

/**
 * Error state component for the marketplace page
 *
 * @param props - The component props
 * @param props.message - Error message to display
 * @param props.onRetry - Function to retry loading the marketplace
 * @returns The rendered error state component
 */
export const MarketplaceErrorState: React.FC<MarketplaceErrorStateProps> = ({
  message,
  onRetry,
}) => {
  return (
    <div className="text-center py-12 px-4">
      <svg
        className="mx-auto h-12 w-12 text-red-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <h3 className="mt-2 text-lg font-medium text-secondary-900">Error loading products</h3>
      <p className="mt-1 text-sm text-secondary-500">{message}</p>
      <div className="mt-6">
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-ocean-600 hover:bg-ocean-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ocean-500"
        >
          Try again
        </button>
      </div>
    </div>
  );
};
