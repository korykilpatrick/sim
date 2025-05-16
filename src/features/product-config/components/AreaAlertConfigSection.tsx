import React from 'react';
import { AreaNameSection } from './AreaNameSection';
import { MapSelectionSection } from './MapSelectionSection';
import { CheckboxGroupField } from '@components/forms';

/**
 * Props for the AreaAlertConfigSection component
 */
export interface AreaAlertConfigSectionProps {
  /** Options for area criteria checkboxes */
  areaCriteriaOptions: Array<{ value: string; label: string }>;
}

/**
 * Component for displaying area-based alert configuration fields
 *
 * @param props - The component props
 * @param props.areaCriteriaOptions - Options for area criteria checkboxes
 * @returns The rendered area alert configuration section with name, map, and criteria fields
 */
export const AreaAlertConfigSection: React.FC<AreaAlertConfigSectionProps> = ({
  areaCriteriaOptions,
}) => {
  return (
    <div className="space-y-6 border-t border-secondary-200 pt-6">
      <h3 className="text-lg font-medium text-secondary-900">
        Area-based Alert Configuration
      </h3>
      <AreaNameSection />
      <MapSelectionSection />
      <CheckboxGroupField
        name="areaCriteria"
        label="Alert Criteria"
        options={areaCriteriaOptions}
        required
        helperText="Select at least one criterion"
      />
    </div>
  );
};
