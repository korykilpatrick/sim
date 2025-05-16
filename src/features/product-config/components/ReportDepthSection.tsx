import React from 'react';
import { SelectField } from '@features/forms';

/**
 * Component for selecting report depth
 *
 * @returns The rendered report depth selection dropdown
 */
export const ReportDepthSection: React.FC = () => {
  return (
    <SelectField
      name="reportDepth"
      label="Report Depth"
      options={[
        { value: 'basic', label: 'Basic (Less detail, faster delivery)' },
        { value: 'standard', label: 'Standard (Recommended)' },
        { value: 'comprehensive', label: 'Comprehensive (Maximum detail)' },
      ]}
      required
      helperText="Select the level of detail for your report"
    />
  );
};
