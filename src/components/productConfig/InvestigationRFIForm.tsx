import React, { useState } from 'react';
import { useSubmitRFIMutation } from '@services/rfiApi';
import { useNavigate } from 'react-router-dom';
import { BaseProduct } from '@shared-types/product';
import { getErrorMessage, logError } from '@lib/errorUtils';
import { PrioritySection } from '@components/productConfig';
import {
  InvestigationTypeSelector,
  SubjectInformationForm,
  InvestigationTimeframeForm,
  RFISubmissionFooter,
} from '@components/productConfig/rfi';
import { Form, FormActions } from '@components/forms';

/**
 * Props for the InvestigationRFIForm component
 */
interface InvestigationRFIFormProps {
  /** Product data */
  product: BaseProduct;
}

/**
 * Component for submitting investigation requests
 *
 * @param props - The component props
 * @param props.product - Product data for the investigation request
 * @returns The rendered investigation request form with type selection, priority, subject information, and timeframe inputs
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
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-secondary-200">
        <h2 className="text-xl font-semibold text-secondary-900">
          Maritime Investigation Request Form
        </h2>
        <p className="mt-1 text-sm text-secondary-500">
          Submit a Request for Intelligence (RFI) to our maritime analysis team
          for detailed investigation.
        </p>
      </div>

      <Form<RFIFormData>
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        error={displayError}
      >
        <div className="p-6 space-y-6">
          <div className="space-y-6">
            <InvestigationTypeSelector />

            <PrioritySection />

            <SubjectInformationForm />

            <InvestigationTimeframeForm />

            <RFISubmissionFooter />
          </div>
        </div>

        <div className="px-6 py-4 bg-secondary-50 border-t border-secondary-200 flex justify-end space-x-3">
          <FormActions
            primaryText="Add to Cart"
            secondaryText="Cancel"
            onSecondaryClick={() => navigate(-1)}
          />
        </div>
      </Form>
    </div>
  );
};
