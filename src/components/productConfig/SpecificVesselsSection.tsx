import React from 'react';
import { TextField } from './FormFields';

/**
 * Component for the specific vessels input section
 * 
 * @returns The rendered specific vessels input field
 */
export const SpecificVesselsSection: React.FC = () => {
  return (
    <TextField
      name="specificVesselIMOs"
      label="Specific Vessels of Interest (Optional)"
      placeholder="9876543, 1234567"
      helperText="Enter comma-separated IMO numbers if you're interested in specific vessels within this area"
    />
  );
};
