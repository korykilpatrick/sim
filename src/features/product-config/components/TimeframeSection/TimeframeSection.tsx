import React from 'react';
import { DateField } from '@features/forms';

/**
 * Props for the TimeframeSection component
 */
export interface TimeframeSectionProps {
  /** Whether start date is required */
  startRequired?: boolean;
  /** Whether end date is required */
  endRequired?: boolean;
  /** Custom start date label */
  startLabel?: string;
  /** Custom start date helper text */
  startHelperText?: string;
  /** Custom end date label */
  endLabel?: string;
  /** Custom end date helper text */
  endHelperText?: string;
}

/**
 * Component for selecting a timeframe with start and end dates
 *
 * @param props - The component props
 * @param props.startRequired - Whether start date is required
 * @param props.endRequired - Whether end date is required
 * @param props.startLabel - Custom start date label
 * @param props.startHelperText - Custom start date helper text
 * @param props.endLabel - Custom end date label
 * @param props.endHelperText - Custom end date helper text
 * @returns The rendered timeframe selection component with start and end date fields
 */
export const TimeframeSection: React.FC<TimeframeSectionProps> = ({
  startRequired = true,
  endRequired = true,
  startLabel = 'Timeframe Start Date',
  startHelperText = 'Start date for the period',
  endLabel = 'Timeframe End Date',
  endHelperText = 'End date for the period',
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <DateField
        name="timeframeStart"
        label={startLabel}
        required={startRequired}
        helperText={startHelperText}
      />

      <DateField
        name="timeframeEnd"
        label={endLabel}
        required={endRequired}
        helperText={endHelperText}
      />
    </div>
  );
};
