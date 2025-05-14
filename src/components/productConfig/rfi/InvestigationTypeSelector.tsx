import React from 'react';
import { SelectField } from '@components/forms';

/**
 * Component for selecting investigation type in RFI form
 *
 * @returns The rendered investigation type selector dropdown
 */
export const InvestigationTypeSelector: React.FC = () => {
  return (
    <SelectField
      name="investigationType"
      label="Investigation Type"
      options={[
        { value: 'vessel_activity', label: 'Vessel Activity Analysis' },
        { value: 'dark_activity', label: 'Dark Activity Investigation' },
        {
          value: 'ownership_structure',
          label: 'Vessel Ownership Structure',
        },
        {
          value: 'sanctions_compliance',
          label: 'Sanctions Compliance Investigation',
        },
        { value: 'unusual_behavior', label: 'Unusual Behavior Analysis' },
        {
          value: 'port_call_verification',
          label: 'Port Call Verification',
        },
        { value: 'other', label: 'Other (specify in details)' },
      ]}
      required
      helperText="Select the type of investigation you need"
    />
  );
};
