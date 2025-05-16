import React from 'react';
import { ReportCard, ReportCardProps } from '../ReportCard';

/**
 * Props for the ReportsList component
 */
export interface ReportsListProps {
  /** Array of reports to display */
  reports: ReportCardProps[];
  /** Whether the reports are loading */
  isLoading?: boolean;
  /** Error message if there was an error loading reports */
  error?: string;
}

/**
 * Component for displaying a list of reports
 *
 * @param props - The component props
 * @param props.reports - Array of reports to display
 * @param props.isLoading - Whether the reports are loading
 * @param props.error - Error message if there was an error loading reports
 * @returns The rendered reports list component
 */
export const ReportsList: React.FC<ReportsListProps> = ({
  reports,
  isLoading,
  error,
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading reports...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  if (!reports.length) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-md p-8 text-center">
        <p className="text-gray-500">No reports found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reports.map((report) => (
        <ReportCard key={report._id} {...report} />
      ))}
    </div>
  );
};
