import React, { useState } from 'react';
import { useAppDispatch } from '@hooks/redux';
import { useNavigate } from 'react-router-dom';
import { addItem } from '@store/slices/cartSlice';
import { v4 as uuidv4 } from 'uuid';
import { BaseProduct } from '@shared-types/product';
import { AMSProductConfiguration } from '@shared-types/productConfiguration';
import { getErrorMessage, logError } from '@utils/errorUtils';
import {
  ConfigFormBase,
  AreaNameSection,
  MapSelectionSection,
  MonitoringDurationSection,
  UpdateFrequencySection,
  MonitoringCriteriaSection,
  SpecificVesselsSection,
  NotesSection,
} from '@components/productConfig';

/**
 * Props for the AreaMonitoringConfig component
 */
export interface AreaMonitoringConfigProps {
  /** Product data */
  product: BaseProduct;
}

/**
 * Component for configuring Area Monitoring Service products
 *
 * @param props - The component props
 * @param props.product - Product data to configure
 * @returns The rendered area monitoring configuration form with all input sections
 */
export const AreaMonitoringConfig: React.FC<AreaMonitoringConfigProps> = ({
  product,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Criteria options
  const areaCriteriaOptions = [
    { value: 'VESSEL_ENTRY', label: 'Vessel Entry into Area' },
    { value: 'VESSEL_EXIT', label: 'Vessel Exit from Area' },
    { value: 'LOITERING', label: 'Loitering Detection' },
    { value: 'UNUSUAL_ACTIVITY', label: 'Unusual Activity Patterns' },
    { value: 'SPECIFIC_VESSEL_DETECTION', label: 'Specific Vessel Detection' },
    { value: 'VESSEL_PROXIMITY', label: 'Vessel Proximity Alerts' },
    { value: 'VESSEL_DENSITY', label: 'Vessel Density Monitoring' },
  ];

  // Default form values
  const defaultValues = {
    areaName: '',
    monitoringDurationDays: 30,
    updateFrequencyHours: '24' as '6' | '12' | '24',
    selectedCriteria: [] as string[],
    specificVesselIMOs: '',
    notes: '',
  };

  // Type for the full form data
  type AreaMonitoringFormData = typeof defaultValues;

  const handleSubmit = (data: AreaMonitoringFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Ensure product.type is correctly 'AMS' for this configuration
      if (product.type !== 'AMS') {
        console.error(
          'Invalid product type for AreaMonitoringConfig:',
          product.type,
        );
        const productTypeError = new Error(
          'Misconfigured product type for AMS.',
        );
        logError(productTypeError, 'Product configuration error');
        setError(getErrorMessage(productTypeError));
        setIsSubmitting(false);
        return;
      }

      const specificVesselIMOsArray = data.specificVesselIMOs
        ? data.specificVesselIMOs.split(',').map((imo: string) => imo.trim())
        : [];

      const configuration = {
        type: 'AMS' as const,
        areaName: data.areaName || undefined,
        monitoringDurationDays: data.monitoringDurationDays,
        updateFrequencyHours: parseInt(data.updateFrequencyHours, 10) as
          | 6
          | 12
          | 24,
        selectedCriteria: data.selectedCriteria || [],
        specificVesselIMOs:
          specificVesselIMOsArray.length > 0
            ? specificVesselIMOsArray
            : undefined,
        notes: data.notes || undefined,
        aoiDefinition: { type: 'Polygon' as const, coordinates: [] },
      } as AMSProductConfiguration;

      // Add to cart
      dispatch(
        addItem({
          itemId: uuidv4(),
          product,
          quantity: 1,
          configurationDetails: configuration,
        }),
      );

      navigate('/protected/cart');
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      logError(err, 'Error adding area monitoring to cart');
      console.error('Error adding to cart:', errorMessage);
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ConfigFormBase
      title="Configure Area Monitoring Service"
      description="Set up your area of interest and monitoring parameters to receive notifications about maritime activities."
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      error={error}
    >
      <div className="space-y-6">
        <AreaNameSection />
        <MapSelectionSection />
        <MonitoringDurationSection />
        <UpdateFrequencySection />
        <MonitoringCriteriaSection options={areaCriteriaOptions} />
        <SpecificVesselsSection />
        <NotesSection />
      </div>
    </ConfigFormBase>
  );
};
