import React, { useState } from 'react';
import { ConfigFormBase } from './ConfigFormBase';
import { TextField, SelectField, DateField, TextareaField } from './FormFields';
import { useAppDispatch } from '@hooks/redux';
import { useNavigate } from 'react-router-dom';
import { addItem } from '@store/slices/cartSlice';
import { v4 as uuidv4 } from 'uuid';
import {
  BaseProduct,
  ProductType as _ProductType,
} from '@shared-types/product';
import { getErrorMessage, logError } from '@utils/errorUtils';
import {
  ProductConfigurationDetailsU,
  ReportComplianceProductConfiguration,
  ReportChronologyProductConfiguration,
} from '@shared-types/productConfiguration';

/**
 * Props for the ReportConfig component
 */
type ReportConfigProps = {
  /** The product being configured */
  product: BaseProduct;
};

/**
 * Component for configuring vessel reports (Compliance or Chronology)
 * Handles configuration for both report types based on the product type
 */
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
    timeframeStart: '',
    timeframeEnd: '',
    reportDepth: 'standard' as 'basic' | 'standard' | 'comprehensive',
  };

  // This component also uses vesselName and additionalInfo for UI or other logic,
  // but they are not part of the strictly typed configuration for cart item.
  // We collect all form data first.
  type ReportFormData = typeof defaultValues & {
    vesselName: string;
    additionalInfo: string;
  };

  /**
   * Handles form submission
   * Creates the appropriate configuration based on report type and adds to cart
   */
  const handleSubmit = (data: ReportFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      let configuration: ProductConfigurationDetailsU;

      if (product.type === 'REPORT_COMPLIANCE') {
        configuration = {
          type: product.type,
          vesselIMO: data.vesselIMO,
          timeframeStart: data.timeframeStart,
          timeframeEnd: data.timeframeEnd,
          depth: data.reportDepth,
        } as ReportComplianceProductConfiguration;
      } else if (product.type === 'REPORT_CHRONOLOGY') {
        configuration = {
          type: product.type,
          vesselIMO: data.vesselIMO,
          timeframeStart: data.timeframeStart,
          timeframeEnd: data.timeframeEnd,
          depth: data.reportDepth,
        } as ReportChronologyProductConfiguration;
      } else {
        // Fallback or error for unexpected product type if necessary
        // For now, assume product.type will be one of the two handled
        console.error(
          'Unexpected product type for report configuration:',
          product.type,
        );
        // Set a generic error or handle appropriately
        const err = new Error('Invalid product type for report configuration.');
        logError(err, 'Product configuration error');
        setError(getErrorMessage(err));
        setIsSubmitting(false);
        return;
      }

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

      navigate('/protected/cart');
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      logError(err, 'Error adding report to cart');
      console.error('Error adding to cart:', errorMessage);
      setError(errorMessage);
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
