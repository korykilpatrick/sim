import React from 'react';
import { CheckboxGroup } from './FormFields';

/**
 * Props for the TrackingCriteriaSection component
 */
export interface TrackingCriteriaSectionProps {
  /** Options for tracking criteria */
  options: Array<{ value: string; label: string }>;
  /** Custom label */
  label?: string;
  /** Custom helper text */
  helperText?: string;
}

/**
 * Component for the tracking criteria selection section
 * 
 * @param props - The component props
 * @param props.options - Options for tracking criteria
 * @param props.label - Custom label
 * @param props.helperText - Custom helper text
 * @returns The rendered tracking criteria selection section
 */
export const TrackingCriteriaSection: React.FC<
  TrackingCriteriaSectionProps
> = ({
  options,
  label = 'Tracking Criteria',
  helperText = 'Select at least one tracking criterion',
}) => {
  return (
    <div className="border-t border-secondary-200 pt-6">
      <CheckboxGroup
        name="selectedCriteria"
        label={label}
        options={options}
        required
        helperText={helperText}
      />
    </div>
  );
};
