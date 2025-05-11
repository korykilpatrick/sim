import React from 'react';
import { SelectField } from './FormFields';

/**
 * Component for the update frequency selection section
 * 
 * @returns The rendered update frequency selection dropdown
 */
export const UpdateFrequencySection: React.FC = () => {
  return (
    <SelectField
      name="updateFrequencyHours"
      label="Update Frequency"
      options={[
        { value: '6', label: 'Every 6 hours (Premium)' },
        { value: '12', label: 'Every 12 hours (Standard)' },
        { value: '24', label: 'Daily (Basic)' },
      ]}
      required
      helperText="How often should the system update with new data?"
    />
  );
};
