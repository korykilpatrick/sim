import React from 'react';
import { VesselIdentificationSection } from '../VesselIdentificationSection';
import { TextField } from '../FormFields';

/**
 * Component for subject information section in RFI form
 */
export const SubjectInformationForm: React.FC = () => {
  return (
    <div className="border-t border-secondary-200 pt-6">
      <h3 className="text-lg font-medium text-secondary-900 mb-4">
        Subject Information
      </h3>

      <VesselIdentificationSection
        showIMO={true}
        showName={true}
        imoRequired={false}
        nameRequired={false}
        imoHelperText="If applicable"
        nameHelperText="If applicable"
      />

      <TextField
        name="region"
        label="Region/Area of Interest"
        placeholder="e.g., Gulf of Mexico, Strait of Malacca"
        helperText="Geographical scope of the investigation"
      />
    </div>
  );
};
