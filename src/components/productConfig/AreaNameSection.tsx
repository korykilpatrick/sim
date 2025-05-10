import React from 'react';
import { TextField } from './FormFields';

/**
 * Component for the area name input section
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
