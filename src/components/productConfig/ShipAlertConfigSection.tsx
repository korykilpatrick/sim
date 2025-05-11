import React from 'react';
import { TextField, CheckboxGroup } from '@components/productConfig';

/**
 * Props for the ShipAlertConfigSection component
 */
export interface ShipAlertConfigSectionProps {
  /** Options for ship criteria checkboxes */
  shipCriteriaOptions: Array<{ value: string; label: string }>;
}

/**
 * Component for displaying ship-based alert configuration fields
 * 
 * @param props - The component props
 * @param props.shipCriteriaOptions - Options for ship criteria checkboxes
 * @returns The rendered ship alert configuration section with vessel IMO input and criteria checkboxes
 */
export const ShipAlertConfigSection: React.FC<ShipAlertConfigSectionProps> = ({
  shipCriteriaOptions,
}) => {
  return (
    <div className="space-y-6 border-t border-secondary-200 pt-6">
      <h3 className="text-lg font-medium text-secondary-900">
        Ship-based Alert Configuration
      </h3>
      <TextField
        name="vesselIMOs"
        label="Vessel IMO Numbers"
        placeholder="9876543, 1234567"
        required
        helperText="Enter comma-separated IMO numbers for vessels to monitor"
      />
      <CheckboxGroup
        name="shipCriteria"
        label="Alert Criteria"
        options={shipCriteriaOptions}
        required
        helperText="Select at least one criterion"
      />
    </div>
  );
};
