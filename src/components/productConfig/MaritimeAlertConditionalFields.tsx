import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ShipAlertConfigSection } from './ShipAlertConfigSection';
import { AreaAlertConfigSection } from './AreaAlertConfigSection';
import { NotesSection } from './NotesSection';

/**
 * Props for the MaritimeAlertConditionalFields component
 */
export interface MaritimeAlertConditionalFieldsProps {
  /** Options for ship criteria checkboxes */
  shipCriteriaOptions: Array<{ value: string; label: string }>;
  /** Options for area criteria checkboxes */
  areaCriteriaOptions: Array<{ value: string; label: string }>;
}

/**
 * Component for conditionally rendering ship and/or area alert configuration sections
 * based on the selected alert type
 *
 * @param props - The component props
 * @param props.shipCriteriaOptions - Options for ship criteria checkboxes
 * @param props.areaCriteriaOptions - Options for area criteria checkboxes
 * @returns The rendered alert configuration sections based on selected alert type
 */
export const MaritimeAlertConditionalFields: React.FC<
  MaritimeAlertConditionalFieldsProps
> = ({ shipCriteriaOptions, areaCriteriaOptions }) => {
  const { watch } = useFormContext<{
    alertType: 'SHIP' | 'AREA' | 'SHIP_AND_AREA' | '';
  }>();
  const alertType = watch('alertType');

  return (
    <>
      {(alertType === 'SHIP' || alertType === 'SHIP_AND_AREA') && (
        <ShipAlertConfigSection shipCriteriaOptions={shipCriteriaOptions} />
      )}
      {(alertType === 'AREA' || alertType === 'SHIP_AND_AREA') && (
        <AreaAlertConfigSection areaCriteriaOptions={areaCriteriaOptions} />
      )}
      <NotesSection />
    </>
  );
};
