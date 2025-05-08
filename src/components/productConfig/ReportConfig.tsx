import React, { useState } from 'react';
import { ConfigFormBase } from './ConfigFormBase';
import { TextField, SelectField, DateField, TextareaField } from './FormFields';
import { useAppDispatch } from '@hooks/redux';
import { useNavigate } from 'react-router-dom';
import { addItem } from '@store/slices/cartSlice';
import { v4 as uuidv4 } from 'uuid';
import { BaseProduct } from '@types/product';

interface ReportConfigProps {
  product: BaseProduct;
}

export const ReportConfig: React.FC<ReportConfigProps> = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Determine if this is a compliance or chronology report
  const isComplianceReport = product.type === 'REPORT_COMPLIANCE';

  // Default form values
  const defaultValues = {
    vesselIMO: '',
    vesselName: '',
    timeframeStart: '',
    timeframeEnd: '',
    reportDepth: 'standard',
    additionalInfo: '',
  };

  const handleSubmit = (data: any) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Create configuration object
      const configuration = {
        vesselIMO: data.vesselIMO,
        vesselName: data.vesselName,
        timeframeStart: data.timeframeStart,
        timeframeEnd: data.timeframeEnd,
        reportDepth: data.reportDepth,
        additionalInfo: data.additionalInfo,
      };

      // Calculate the price based on configuration
      // For reports, different depths have different prices
      const depthMultiplier =
        data.reportDepth === 'comprehensive'
          ? 1.5
          : data.reportDepth === 'standard'
            ? 1.0
            : 0.7;

      const configuredPrice =
        Math.round(product.price * depthMultiplier * 100) / 100;
      const configuredCreditCost = Math.round(
        product.creditCost * depthMultiplier,
      );

      // Add to cart
      dispatch(
        addItem({
          itemId: uuidv4(),
          product,
          quantity: 1,
          configuredPrice,
          configuredCreditCost,
          configurationDetails: configuration,
        }),
      );

      // Navigate to cart
      navigate('/protected/cart');
    } catch (err) {
      console.error('Error adding to cart:', err);
      setError(
        'Failed to add the configured report to your cart. Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ConfigFormBase
      title={`Configure ${isComplianceReport ? 'Vessel Compliance Report' : 'Vessel Chronology Report'}`}
      description={
        isComplianceReport
          ? 'Generate a detailed compliance report for a specific vessel, including sanctions checks and compliance history.'
          : "Generate a comprehensive chronology of a vessel's movements and activities over a specified time period."
      }
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      error={error}
    >
      <div className="space-y-6">
        <TextField
          name="vesselIMO"
          label="Vessel IMO Number"
          placeholder="1234567"
          required
          helperText="Enter the 7-digit IMO number of the vessel"
        />

        <TextField
          name="vesselName"
          label="Vessel Name"
          placeholder="EXAMPLE VESSEL"
          required
          helperText="Enter the name of the vessel"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <DateField
            name="timeframeStart"
            label="Timeframe Start Date"
            required
            helperText="Start date for the report period"
          />

          <DateField
            name="timeframeEnd"
            label="Timeframe End Date"
            required
            helperText="End date for the report period"
          />
        </div>

        <SelectField
          name="reportDepth"
          label="Report Depth"
          options={[
            { value: 'basic', label: 'Basic (Less detail, faster delivery)' },
            { value: 'standard', label: 'Standard (Recommended)' },
            { value: 'comprehensive', label: 'Comprehensive (Maximum detail)' },
          ]}
          required
          helperText="Select the level of detail for your report"
        />

        {isComplianceReport && (
          <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">
            <h3 className="text-sm font-medium text-yellow-800 mb-2">
              Compliance Report Note
            </h3>
            <p className="text-sm text-yellow-700">
              Compliance reports include sanctions checks, port call history,
              and compliance risk assessment. The comprehensive option includes
              additional ownership structure analysis and historical compliance
              records.
            </p>
          </div>
        )}

        {!isComplianceReport && (
          <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
            <h3 className="text-sm font-medium text-blue-800 mb-2">
              Chronology Report Note
            </h3>
            <p className="text-sm text-blue-700">
              Chronology reports include detailed vessel movements, port calls,
              and activity patterns. The comprehensive option includes weather
              overlays, cargo information (when available), and anomaly
              detection.
            </p>
          </div>
        )}

        <div className="border-t border-secondary-200 pt-6">
          <TextareaField
            name="additionalInfo"
            label="Additional Information"
            placeholder="Add any specific aspects you want included in the report..."
            helperText="Optional: Add any special requests or areas of focus for this report"
          />
        </div>
      </div>
    </ConfigFormBase>
  );
};
