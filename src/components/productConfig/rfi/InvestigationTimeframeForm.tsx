import React from 'react';
import { TimeframeSection } from '../TimeframeSection';

/**
 * Component for timeframe selection in RFI form
 */
export const InvestigationTimeframeForm: React.FC = () => {
  return (
    <div className="mt-6">
      <TimeframeSection
        startRequired={false}
        endRequired={false}
        startHelperText="Start date for the investigation period"
        endHelperText="End date for the investigation period"
      />
    </div>
  );
};
