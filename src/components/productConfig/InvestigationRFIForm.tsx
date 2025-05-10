import React, { useState } from 'react';
import { ConfigFormBase } from './ConfigFormBase';
import {
  TextField,
  SelectField,
  DateField,
  TextareaField,
  RadioGroup,
} from './FormFields';
import { useSubmitRFIMutation } from '@services/rfiApi';
import { useNavigate } from 'react-router-dom';
import { BaseProduct } from '@/types/product';
import { getErrorMessage, logError } from '@utils/errorUtils';

interface InvestigationRFIFormProps {
  product: BaseProduct;
}

export const InvestigationRFIForm: React.FC<InvestigationRFIFormProps> = ({
  product,
}) => {
  const navigate = useNavigate();
  const [submitRFI, { isLoading: isSubmitting, error: rtkQueryError }] =
    useSubmitRFIMutation();
  const [formError, setFormError] = useState<string | null>(null);

  // Default form values
  const defaultValues = {
    investigationType: '',
    priority: 'standard' as 'standard' | 'urgent',
    vesselIMO: '',
    vesselName: '',
    region: '',
    timeframeStart: '',
    timeframeEnd: '',
    investigationScope: '',
  };

  type RFIFormData = typeof defaultValues;

  const handleSubmit = async (data: RFIFormData) => {
    setFormError(null);
    try {
      // Format request data
      const rfiData = {
        productId: product.id,
        investigationType: data.investigationType,
        priority: data.priority,
        vesselIMO: data.vesselIMO || undefined,
        vesselName: data.vesselName || undefined,
        region: data.region || undefined,
        timeframe: {
          start: data.timeframeStart,
          end: data.timeframeEnd,
        },
        additionalInfo: data.investigationScope,
      };

      // Submit the RFI
      const result = await submitRFI(rfiData).unwrap();

      // Navigate to confirmation page
      navigate('/protected/confirmation', {
        state: {
          isRFI: true,
          requestId: result.requestId,
          message: result.message,
          estimatedResponse: result.estimatedResponse,
        },
      });
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      logError(err, 'Error submitting investigation RFI');
      console.error('Error submitting RFI:', errorMessage);
      setFormError(errorMessage);
    }
  };

  // Determine the error message to display
  let displayError: string | null = null;
  if (formError) {
    displayError = formError;
  } else if (rtkQueryError) {
    displayError = getErrorMessage(rtkQueryError) || 'Failed to submit request. Please try again later.';
  }

  return (
    <ConfigFormBase
      title="Maritime Investigation Request Form"
      description="Submit a Request for Intelligence (RFI) to our maritime analysis team for detailed investigation."
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      error={displayError}
    >
      <div className="space-y-6">
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

        <RadioGroup
          name="priority"
          label="Priority Level"
          options={[
            { value: 'standard', label: 'Standard (48-72 hours)' },
            { value: 'urgent', label: 'Urgent (24-48 hours, +50% fee)' },
          ]}
          required
        />

        <div className="border-t border-secondary-200 pt-6">
          <h3 className="text-lg font-medium text-secondary-900 mb-4">
            Subject Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <TextField
              name="vesselIMO"
              label="Vessel IMO Number"
              placeholder="1234567"
              helperText="If applicable"
            />

            <TextField
              name="vesselName"
              label="Vessel Name"
              placeholder="EXAMPLE VESSEL"
              helperText="If applicable"
            />
          </div>

          <TextField
            name="region"
            label="Region/Area of Interest"
            placeholder="e.g., Gulf of Mexico, Strait of Malacca"
            helperText="Geographical scope of the investigation"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            <DateField
              name="timeframeStart"
              label="Timeframe Start Date"
              helperText="Start date for the investigation period"
            />

            <DateField
              name="timeframeEnd"
              label="Timeframe End Date"
              helperText="End date for the investigation period"
            />
          </div>
        </div>

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

        <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
          <h3 className="text-sm font-medium text-blue-800 mb-2">
            RFI Process
          </h3>
          <p className="text-sm text-blue-700">
            After submission, our team will review your request and may contact
            you for additional information. Standard investigations are
            typically completed within 2-3 business days, while urgent requests
            receive priority handling. You&apos;ll receive a notification when
            your report is ready.
          </p>
        </div>
      </div>
    </ConfigFormBase>
  );
};
