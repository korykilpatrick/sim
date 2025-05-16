import React from 'react';
import { RadioField } from '@features/forms';

/**
 * Props for AlertTypeSection component
 */
export interface AlertTypeSectionProps {
  /** Options for alert types */
  options: Array<{ value: string; label: string }>;
}

/**
 * Component for selecting alert type
 *
 * @param props - The component props
 * @param props.options - Options for alert types
 * @returns The rendered alert type selection with radio buttons
 */
export const AlertTypeSection: React.FC<AlertTypeSectionProps> = ({
  options,
}) => {
  return (
    <RadioField
      name="alertType"
      label="Alert Type"
      options={options}
      required
    />
  );
};
