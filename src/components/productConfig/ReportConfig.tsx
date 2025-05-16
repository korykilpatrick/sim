import React, { useState } from 'react';
import { useAppDispatch } from '@hooks/redux';
import { useNavigate } from 'react-router-dom';
import { addItem } from '@features/cart/cartSlice';
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
import {
  ConfigFormBase,
  VesselIdentificationSection,
  TimeframeSection,
  ReportDepthSection,
  InfoBoxSection,
  NotesSection,
} from '@components/productConfig';

/**
 * Props for the ReportConfig component
 */
type ReportConfigProps = {
  /** Product data */
  product: BaseProduct;
};

/**
 * Component for configuring Report products
 *
 * @param props - The component props
 * @param props.product - Product data
 * @returns The rendered report configuration form
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
        <VesselIdentificationSection
          showIMO={true}
          showName={true}
          imoRequired={true}
          nameRequired={true}
        />

        <TimeframeSection
          startHelperText="Start date for the report period"
          endHelperText="End date for the report period"
        />

        <ReportDepthSection />

        {isComplianceReport && (
          <InfoBoxSection type="warning" title="Compliance Report Note">
            <p>
              Compliance reports include sanctions checks, port call history,
              and compliance risk assessment. The comprehensive option includes
              additional ownership structure analysis and historical compliance
              records.
            </p>
          </InfoBoxSection>
        )}

        {!isComplianceReport && (
          <InfoBoxSection type="info" title="Chronology Report Note">
            <p>
              Chronology reports include detailed vessel movements, port calls,
              and activity patterns. The comprehensive option includes weather
              overlays, cargo information (when available), and anomaly
              detection.
            </p>
          </InfoBoxSection>
        )}

        <NotesSection
          name="additionalInfo"
          label="Additional Information"
          placeholder="Add any specific aspects you want included in the report..."
          helperText="Optional: Add any special requests or areas of focus for this report"
        />
      </div>
    </ConfigFormBase>
  );
};
