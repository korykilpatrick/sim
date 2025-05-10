import React from 'react';
import { NumberField } from './FormFields';

/**
 * Component for the monitoring duration input section
 */
export const MonitoringDurationSection: React.FC = () => {
  return (
    <NumberField
      name="monitoringDurationDays"
      label="Monitoring Duration (Days)"
      min={7}
      max={365}
      required
      helperText="How long would you like to monitor this area? (7-365 days)"
    />
  );
};
