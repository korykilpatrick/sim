import React from 'react';
import { Button } from '@components/ui';

/**
 * Props for the ReportItem component
 */
interface ReportItemProps {
  /** Report data */
  report: {
    id: string;
    name: string;
    type: string;
    purchaseDate: string;
    status: string;
  };
}

/**
 * Component for displaying a single report item
 *
 * @param props - The component props
 * @param props.report - Report data to display
 * @returns The rendered report item component
 */
export const ReportItem: React.FC<ReportItemProps> = ({ report }) => {
  return (
    <div className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
      <div>
        <h3 className="font-medium text-secondary-900">{report.name}</h3>
        <p className="text-sm text-secondary-500 mt-1">
          {report.type === 'REPORT_COMPLIANCE'
            ? 'Vessel Compliance Report'
            : 'Vessel Chronology Report'}
        </p>
        <p className="text-sm text-secondary-500 mt-1">
          Purchased on {new Date(report.purchaseDate).toLocaleDateString()}
        </p>
      </div>

      <div className="mt-4 sm:mt-0">
        <Button variant="primary" size="sm">
          Download Report
        </Button>
      </div>
    </div>
  );
};
