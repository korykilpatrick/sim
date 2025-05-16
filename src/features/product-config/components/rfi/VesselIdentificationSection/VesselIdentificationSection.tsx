import React from 'react';
import { TextField } from '@features/forms';

/**
 * Props for the VesselIdentificationSection component
 */
export interface VesselIdentificationSectionProps {
  /** Whether to show vessel IMO field */
  showIMO?: boolean;
  /** Whether to show vessel name field */
  showName?: boolean;
  /** Whether IMO is required */
  imoRequired?: boolean;
  /** Whether name is required */
  nameRequired?: boolean;
  /** Custom IMO label */
  imoLabel?: string;
  /** Custom IMO placeholder */
  imoPlaceholder?: string;
  /** Custom IMO helper text */
  imoHelperText?: string;
  /** Custom name label */
  nameLabel?: string;
  /** Custom name placeholder */
  namePlaceholder?: string;
  /** Custom name helper text */
  nameHelperText?: string;
}

/**
 * Component for vessel identification input fields
 *
 * @param props - The component props
 * @param props.showIMO - Whether to show vessel IMO field
 * @param props.showName - Whether to show vessel name field
 * @param props.imoRequired - Whether IMO is required
 * @param props.nameRequired - Whether name is required
 * @param props.imoLabel - Custom IMO label
 * @param props.imoPlaceholder - Custom IMO placeholder
 * @param props.imoHelperText - Custom IMO helper text
 * @param props.nameLabel - Custom name label
 * @param props.namePlaceholder - Custom name placeholder
 * @param props.nameHelperText - Custom name helper text
 * @returns The rendered vessel identification input fields
 */
export const VesselIdentificationSection: React.FC<
  VesselIdentificationSectionProps
> = ({
  showIMO = true,
  showName = false,
  imoRequired = true,
  nameRequired = false,
  imoLabel = 'Vessel IMO Number',
  imoPlaceholder = '1234567',
  imoHelperText = 'Enter the 7-digit IMO number of the vessel',
  nameLabel = 'Vessel Name',
  namePlaceholder = 'EXAMPLE VESSEL',
  nameHelperText = 'Enter the name of the vessel',
}) => {
  return (
    <div className="space-y-4">
      {showIMO && (
        <TextField
          name="vesselIMO"
          label={imoLabel}
          placeholder={imoPlaceholder}
          required={imoRequired}
          helperText={imoHelperText}
        />
      )}

      {showName && (
        <TextField
          name="vesselName"
          label={nameLabel}
          placeholder={namePlaceholder}
          required={nameRequired}
          helperText={nameHelperText}
        />
      )}
    </div>
  );
};
