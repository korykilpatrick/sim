import React from 'react';
import { TextField } from '@components/forms';

/**
 * Component for configuring the name of an area-based alert
 *
 * @returns The rendered area name input section
 */
export const AreaNameSection: React.FC = () => {
  return (
    <div className="space-y-4">
      <h4 className="text-md font-medium text-secondary-800">Area Name</h4>
      <TextField
        name="areaName"
        label="Name your area"
        placeholder="e.g., Gulf of Mexico Monitoring"
        required
        helperText="Provide a descriptive name for this area alert"
      />
    </div>
  );
};
