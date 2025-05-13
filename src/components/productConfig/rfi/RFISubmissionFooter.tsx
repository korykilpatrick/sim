import React from 'react';
import { InfoBoxSection } from '../InfoBoxSection';
import { TextareaField } from '@components/forms';

/**
 * Component for the submission footer in RFI form
 *
 * @returns The rendered RFI submission footer with investigation scope field and process information
 */
export const RFISubmissionFooter: React.FC = () => {
  return (
    <>
      <div className="border-t border-secondary-200 pt-6">
        <TextareaField
          name="investigationScope"
          label="Investigation Scope & Details"
          placeholder="Please describe what you're looking to find out..."
          required
          rows={6}
          helperText="Provide as much detail as possible about what you're looking to investigate"
        />
      </div>

      <InfoBoxSection type="info" title="RFI Process">
        <p>
          After submission, our team will review your request and may contact
          you for additional information. Standard investigations are typically
          completed within 2-3 business days, while urgent requests receive
          priority handling. You&apos;ll receive a notification when your report
          is ready.
        </p>
      </InfoBoxSection>
    </>
  );
};
