import React from 'react';
import { TextField } from './FormFields';

/**
 * Component for the area name input section
 * 
 * @returns The rendered area name input field with label and helper text
 */
export const AreaNameSection: React.FC = () => {
  return (
    <TextField
      name="areaName"
      label="Area Name"
      placeholder="Gulf of Mexico Monitoring Zone"
      required
      helperText="Give your monitoring area a descriptive name"
    />
  );
};
