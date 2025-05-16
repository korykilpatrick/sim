import React from 'react';
import { ReportItem } from './ReportItem';
import { Spinner, Alert } from '@components/ui';

/**
 * Props for the ReportsList component
 */
interface ReportsListProps {
  /** Reports data */
  reports: Array<{
    id: string;
    name: string;
    type: string;
    purchaseDate: string;
    status: string;
  }>;
  /** Whether reports are loading */
  isLoading?: boolean;
  /** Error message if reports failed to load */
  error?: unknown;
}

/**
 * Component for displaying a list of reports
 *
 * @param props - The component props
 * @param props.reports - Reports data to display
 * @param props.isLoading - Whether reports are loading
 * @param props.error - Error message if reports failed to load
 * @returns The rendered reports list component with loading, error, and content states
 */
export const ReportsList: React.FC<ReportsListProps> = ({
  reports,
  isLoading = false,
  error = null,
}) => {
  return (
    <>
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
          title="Error loading reports"
          message="There was an error loading your reports. Please try again later."
          className="mb-6"
        />
      )}

      {/* Content */}
      {!isLoading && !error && (
        <>
          {reports.length > 0 ? (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b border-secondary-200">
                <h2 className="text-lg font-medium text-secondary-900">
                  Your Reports
                </h2>
                <p className="text-sm text-secondary-500 mt-1">
                  Access your purchased reports
                </p>
              </div>

              <div className="divide-y divide-secondary-200">
                {reports.map((report) => (
                  <ReportItem key={report.id} report={report} />
                ))}
              </div>
            </div>
          ) : (
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
                  d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>

              <h2 className="text-xl font-medium text-secondary-900 mb-2">
                No reports yet
              </h2>
              <p className="text-secondary-600 mb-6">
                You haven&apos;t purchased any reports yet. Visit our
                marketplace to get started.
              </p>

              <a href="/marketplace">
                <button className="bg-ocean-600 hover:bg-ocean-700 text-white font-medium py-2 px-4 rounded">
                  Browse Marketplace
                </button>
              </a>
            </div>
          )}
        </>
      )}
    </>
  );
};
