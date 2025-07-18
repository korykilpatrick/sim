import React from 'react';
import { RadioField } from '@components/forms';

/**
 * Component for selecting priority level
 *
 * @returns The rendered priority selection radio group
 */
export const PrioritySection: React.FC = () => {
  return (
    <RadioField
      name="priority"
      label="Priority Level"
      options={[
        { value: 'standard', label: 'Standard (48-72 hours)' },
        { value: 'urgent', label: 'Urgent (24-48 hours, +50% fee)' },
      ]}
      required
    />
  );
};
