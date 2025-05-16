import React from 'react';
import { CheckboxGroupField } from '@features/forms';

/**
 * Props for the MonitoringCriteriaSection component
 */
export interface MonitoringCriteriaSectionProps {
  /** Options for monitoring criteria */
  options: Array<{ value: string; label: string }>;
}

/**
 * Component for the monitoring criteria selection section
 *
 * @param props - The component props
 * @param props.options - Options for monitoring criteria
 * @returns The rendered monitoring criteria section with checkbox group
 */
export const MonitoringCriteriaSection: React.FC<
  MonitoringCriteriaSectionProps
> = ({ options }) => {
  return (
    <div className="border-t border-secondary-200 pt-6">
      <CheckboxGroupField
        name="selectedCriteria"
        label="Monitoring Criteria"
        options={options}
        required
        helperText="Select at least one monitoring criterion"
      />
    </div>
  );
};
