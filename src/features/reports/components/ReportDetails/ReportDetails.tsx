import React from 'react';

/**
 * Props for the ReportDetails component
 */
export interface ReportDetailsProps {
  /** ID of the report */
  id: string;
  /** Title of the report */
  title: string;
  /** Date the report was created */
  createdAt: string;
  /** Type of the report */
  type: string;
  /** Status of the report */
  status: 'completed' | 'in-progress' | 'pending';
  /** Content of the report */
  content: string;
}

/**
 * Component for displaying detailed report information
 *
 * @param props - The component props
 * @returns The rendered report details component
 */
export const ReportDetails: React.FC<ReportDetailsProps> = ({
  title,
  createdAt,
  type,
  status,
  content,
}) => {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${
              status === 'completed'
                ? 'bg-green-100 text-green-800'
                : status === 'in-progress'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {status === 'completed'
              ? 'Completed'
              : status === 'in-progress'
              ? 'In Progress'
              : 'Pending'}
          </span>
        </div>
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <span>{new Date(createdAt).toLocaleDateString()}</span>
          <span className="mx-2">•</span>
          <span>{type}</span>
        </div>
      </div>
      <div className="px-6 py-4">
        <div className="prose max-w-none">{content}</div>
      </div>
    </div>
  );
};
