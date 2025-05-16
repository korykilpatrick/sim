import React from 'react';

/**
 * Props for the ReportCard component
 */
export interface ReportCardProps {
  /** ID of the report */
  _id: string;
  /** Title of the report */
  title: string;
  /** Date the report was created */
  createdAt: string;
  /** Type of the report */
  type: string;
  /** Status of the report */
  status: 'completed' | 'in-progress' | 'pending';
}

/**
 * Component for displaying a report card
 *
 * @param props - The component props
 * @returns The rendered report card component
 */
export const ReportCard: React.FC<ReportCardProps> = ({
  // _id is required in props but not used in the component
  // _id,
  title,
  createdAt,
  type,
  status,
}) => {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">
            {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
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
      <div className="mt-2">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {type}
        </span>
      </div>
    </div>
  );
};
