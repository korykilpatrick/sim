import React from 'react';
import { Alert, Spinner } from '@components/ui';

/**
 * Props for DashboardHeader component
 */
interface DashboardHeaderProps {
  /** Whether products are loading */
  isLoading: boolean;
  /** Error message if loading failed */
  error: any;
}

/**
 * Component for displaying dashboard header with loading and error states
 *
 * @param props - The component props
 * @param props.isLoading - Whether products are loading
 * @param props.error - Error message if loading failed
 * @returns The rendered dashboard header with title and loading/error states
 */
export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  isLoading,
  error,
}) => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">My Products</h1>

      {/* Loading state */}
      {isLoading && (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      )}

      {/* Error state */}
      {error && (
        <Alert
          variant="error"
          title="Error loading your products"
          message="There was an error loading your purchased products. Please try again later."
          className="mb-6"
        />
      )}
    </>
  );
};
