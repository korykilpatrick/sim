import React, { useState } from 'react';
import { useSubmitRFIMutation } from '@services/rfiApi';
import { useNavigate } from 'react-router-dom';
import { BaseProduct } from '@shared-types/product';
import { getErrorMessage, logError } from '@utils/errorUtils';
import { ConfigFormBase, PrioritySection } from '@components/productConfig';
import {
  InvestigationTypeSelector,
  SubjectInformationForm,
  InvestigationTimeframeForm,
  RFISubmissionFooter,
} from '@components/productConfig/rfi';

/**
 * Props for the InvestigationRFIForm component
 */
interface InvestigationRFIFormProps {
  /** Product data */
  product: BaseProduct;
}

/**
 * Component for submitting investigation requests
 */
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
    displayError =
      getErrorMessage(rtkQueryError) ||
      'Failed to submit request. Please try again later.';
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
        <InvestigationTypeSelector />

        <PrioritySection />

        <SubjectInformationForm />

        <InvestigationTimeframeForm />

        <RFISubmissionFooter />
      </div>
    </ConfigFormBase>
  );
};
