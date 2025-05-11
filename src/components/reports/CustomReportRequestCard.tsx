import React from 'react';
import { Button } from '@components/common';
import { Link } from 'react-router-dom';

/**
 * Component for requesting custom reports
 * 
 * @returns The rendered custom report request card with description and button
 */
export const CustomReportRequestCard: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6 border-b border-secondary-200">
        <h2 className="text-lg font-medium text-secondary-900">
          Request Custom Report
        </h2>
        <p className="text-sm text-secondary-500 mt-1">
          Need specialized information or analysis? Request a custom report.
        </p>
      </div>

      <div className="p-6">
        <p className="text-secondary-600 mb-4">
          Our team can create custom reports tailored to your specific needs.
          Contact us to discuss your requirements.
        </p>

        <Link to="/protected/investigations/rfi">
          <Button variant="primary">Request Custom Report</Button>
        </Link>
      </div>
    </div>
  );
};
