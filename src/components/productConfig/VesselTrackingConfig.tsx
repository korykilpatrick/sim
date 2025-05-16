import React, { useState } from 'react';
import { useAppDispatch } from '@hooks/redux';
import { useNavigate } from 'react-router-dom';
import { addItem } from '@features/cart/cartSlice';
import { v4 as uuidv4 } from 'uuid';
import {
  BaseProduct,
  ProductType as _ProductType,
} from '@shared-types/product';
import { getErrorMessage, logError } from '@lib/errorUtils';
import { VTSProductConfiguration } from '@shared-types/productConfiguration';
import {
  ConfigFormBase,
  MonitoringDurationSection,
  TrackingCriteriaSection,
  NotesSection,
  SpecificVesselsSection,
} from '@components/productConfig';
import { NumberField } from '@/components/forms';

/**
 * Props for the VesselTrackingConfig component
 */
interface VesselTrackingConfigProps {
  /** Product data */
  product: BaseProduct;
}

/**
 * Component for configuring Vessel Tracking Service products
 *
 * @param props - The component props
 * @param props.product - Product data
 * @returns The rendered vessel tracking configuration form
 */
export const VesselTrackingConfig: React.FC<VesselTrackingConfigProps> = ({
  product,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Criteria options
  const trackingCriteriaOptions = [
    { value: 'AIS_REPORTING_6HR', label: 'AIS Reporting Gap (6+ hours)' },
    { value: 'DARK_EVENT', label: 'Dark Activity Detection' },
    { value: 'PORT_ARRIVAL', label: 'Port Arrival Notifications' },
    { value: 'PORT_DEPARTURE', label: 'Port Departure Notifications' },
    { value: 'SPEED_THRESHOLD', label: 'Speed Threshold Crossing' },
    { value: 'COURSE_CHANGE', label: 'Significant Course Changes' },
    { value: 'ZONE_ENTRY', label: 'Zone Entry/Exit (Predefined Zones)' },
  ];

  // Default form values for the form itself, may contain more fields than the strict configuration type
  const defaultValues = {
    trackingDurationDays: 30,
    vesselIMOs: '',
    selectedCriteria: [] as string[],
    // Fields like additionalVessels and notes are used for price calculation or UI but not part of VTSProductConfiguration
    additionalVessels: 0,
    notes: '',
  };

  // Type for the full form data
  type VesselTrackingFormData = typeof defaultValues;

  const handleSubmit = (data: VesselTrackingFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const parsedIMOs = data.vesselIMOs
        ? data.vesselIMOs.split(',').map((imo: string) => imo.trim())
        : [];

      // Ensure product.type is correctly 'VTS' for this configuration
      if (product.type !== 'VTS') {
        console.error(
          'Invalid product type for VesselTrackingConfig:',
          product.type,
        );
        const productTypeError = new Error(
          'Misconfigured product type for VTS.',
        );
        logError(productTypeError, 'Product configuration error');
        setError(getErrorMessage(productTypeError));
        setIsSubmitting(false);
        return;
      }

      const configuration: VTSProductConfiguration = {
        type: 'VTS', // Explicitly set based on ProductType and expected config
        trackingDurationDays: data.trackingDurationDays,
        vesselIMOs: parsedIMOs, // Use parsed IMOs
        selectedCriteria: data.selectedCriteria || [],
      };

      // Price calculation can still use fields from `data` like `additionalVessels`
      const totalVessels = parsedIMOs.length + data.additionalVessels;
      const durationMultiplier = data.trackingDurationDays / 30;
      const vesselMultiplier = Math.max(1, 1 + (totalVessels - 1) * 0.1); // Ensure multiplier is at least 1

      const configuredPrice =
        Math.round(
          product.price * durationMultiplier * vesselMultiplier * 100,
        ) / 100;
      const configuredCreditCost = Math.round(
        product.creditCost * durationMultiplier * vesselMultiplier,
      );

      dispatch(
        addItem({
          itemId: uuidv4(),
          product,
          quantity: 1,
          configuredPrice,
          configuredCreditCost,
          configurationDetails: configuration, // Use the typed configuration
        }),
      );

      navigate('/protected/cart');
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      logError(err, 'Error adding vessel tracking to cart');
      console.error('Error adding to cart:', errorMessage);
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ConfigFormBase
      title="Configure Vessel Tracking Service"
      description="Set up your vessel tracking parameters to monitor specific vessels and receive notifications."
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      error={error} // Access message property for display
    >
      <div className="space-y-6">
        <MonitoringDurationSection />

        <SpecificVesselsSection />

        <NumberField
          name="additionalVessels"
          label="Additional Vessels (To Be Specified Later)"
          min={0}
          max={100}
          helperText="Optionally add capacity for additional vessels you'll specify later"
        />

        <TrackingCriteriaSection options={trackingCriteriaOptions} />

        <NotesSection />
      </div>
    </ConfigFormBase>
  );
};
