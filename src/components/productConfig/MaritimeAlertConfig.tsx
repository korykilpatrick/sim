import React, { useState } from 'react';
import { useAppDispatch } from '@hooks/redux';
import { useNavigate } from 'react-router-dom';
import { addItem } from '@store/slices/cartSlice';
import { v4 as uuidv4 } from 'uuid';
import { MaritimeAlertProduct } from '@shared-types/product';
import { MaritimeAlertProductConfiguration } from '@shared-types/productConfiguration';
import { getErrorMessage, logError } from '@utils/errorUtils';
import {
  ConfigFormBase,
  AlertTypeSection,
  MonitoringDurationSection,
  UpdateFrequencySection,
} from '@components/productConfig';
import { MaritimeAlertConditionalFields } from './MaritimeAlertConditionalFields';

/**
 * Props for MaritimeAlertConfig component
 */
interface MaritimeAlertConfigProps {
  /** The maritime alert product being configured */
  product: MaritimeAlertProduct;
}

/**
 * Component for configuring Maritime Alert products
 * 
 * @param props - The component props
 * @param props.product - The maritime alert product being configured
 * @returns The rendered maritime alert configuration form with alert type, monitoring duration, and conditional fields
 */
export const MaritimeAlertConfig = ({
  product,
}: MaritimeAlertConfigProps): React.ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Available alert types (from product)
  const alertTypes = product.alertTypesAvailable;

  const alertTypeOptions = alertTypes.map((type) => {
    let label = '';
    switch (type) {
      case 'SHIP':
        label = 'Ship-based Alert';
        break;
      case 'AREA':
        label = 'Area-based Alert';
        break;
      case 'SHIP_AND_AREA':
        label = 'Combined Ship & Area Alert';
        break;
    }
    return { value: type, label };
  });

  // Criteria options
  const shipCriteriaOptions = [
    { value: 'AIS_REPORTING_6HR', label: 'AIS Reporting Gap (6+ hours)' },
    { value: 'DARK_EVENT', label: 'Dark Activity Detection' },
    { value: 'PORT_ARRIVAL', label: 'Port Arrival' },
    { value: 'PORT_DEPARTURE', label: 'Port Departure' },
    { value: 'SPEED_THRESHOLD', label: 'Speed Threshold Crossing' },
  ];

  const areaCriteriaOptions = [
    { value: 'VESSEL_ENTRY', label: 'Vessel Entry' },
    { value: 'VESSEL_EXIT', label: 'Vessel Exit' },
    { value: 'LOITERING', label: 'Loitering Detection' },
    { value: 'UNUSUAL_ACTIVITY', label: 'Unusual Activity' },
  ];

  // Default form values
  const defaultValues = {
    alertType: '' as 'SHIP' | 'AREA' | 'SHIP_AND_AREA' | '',
    monitoringDurationDays: 30,
    vesselIMOs: '',
    areaName: '',
    shipCriteria: [] as string[],
    areaCriteria: [] as string[],
    updateFrequencyHours: '24' as '6' | '12' | '24',
    notes: '',
  };

  // Type for the full form data
  type MaritimeAlertFormData = typeof defaultValues;

  const handleSubmit = (data: MaritimeAlertFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Ensure product.type is correctly 'MARITIME_ALERT' for this configuration
      if (product.type !== 'MARITIME_ALERT') {
        console.error(
          'Invalid product type for MaritimeAlertConfig:',
          product.type,
        );
        const productTypeError = new Error(
          'Misconfigured product type for MARITIME_ALERT.',
        );
        logError(productTypeError, 'Product configuration error');
        setError(getErrorMessage(productTypeError));
        setIsSubmitting(false);
        return;
      }
      if (!data.alertType) {
        // Ensure alertType is selected
        const alertTypeError = new Error('Alert type is required.');
        logError(alertTypeError, 'Validation error');
        setError(getErrorMessage(alertTypeError));
        setIsSubmitting(false);
        return;
      }

      // Process vessel IMOs into an array
      const formVesselIMOs = data.vesselIMOs
        ? data.vesselIMOs.split(',').map((imo: string) => imo.trim())
        : [];

      let compiledSelectedCriteria: string[] = [];
      if (data.alertType === 'SHIP' || data.alertType === 'SHIP_AND_AREA') {
        compiledSelectedCriteria = [
          ...compiledSelectedCriteria,
          ...(data.shipCriteria || []),
        ];
      }
      if (data.alertType === 'AREA' || data.alertType === 'SHIP_AND_AREA') {
        compiledSelectedCriteria = [
          ...compiledSelectedCriteria,
          ...(data.areaCriteria || []),
        ];
      }

      const baseConfig = {
        type: 'MARITIME_ALERT' as const,
        maritimeAlertType: data.alertType as 'SHIP' | 'AREA' | 'SHIP_AND_AREA',
        selectedCriteria: compiledSelectedCriteria,
      };

      const configuration = {
        ...baseConfig,
        ...(data.monitoringDurationDays
          ? { monitoringDurationDays: data.monitoringDurationDays }
          : {}),
        ...(data.updateFrequencyHours
          ? {
              updateFrequencyHours: parseInt(data.updateFrequencyHours, 10) as
                | 6
                | 12
                | 24,
            }
          : {}),
        ...(data.notes ? { notes: data.notes } : {}),
        ...((data.alertType === 'AREA' || data.alertType === 'SHIP_AND_AREA') &&
        data.areaName
          ? { customRuleName: data.areaName }
          : {}),
        ...((data.alertType === 'SHIP' || data.alertType === 'SHIP_AND_AREA') &&
        formVesselIMOs.length > 0
          ? { vesselIMOs: formVesselIMOs }
          : {}),
        ...(data.alertType === 'AREA' || data.alertType === 'SHIP_AND_AREA'
          ? { aoiDefinition: { type: 'Polygon', coordinates: [] } }
          : {}),
      } as MaritimeAlertProductConfiguration;

      const basePriceMultiplier = data.monitoringDurationDays / 30;
      const configuredPrice =
        Math.round(product.price * basePriceMultiplier * 100) / 100;
      const configuredCreditCost = Math.round(
        product.creditCost * basePriceMultiplier,
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
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(err);
      logError(err, 'Error adding maritime alert to cart');
      console.error('Error adding to cart:', errorMessage);
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ConfigFormBase
      title="Configure Maritime Alert"
      description="Set up your custom alert to monitor vessel activities and maritime areas of interest."
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      error={error}
    >
      <div className="space-y-6">
        <AlertTypeSection options={alertTypeOptions} />

        <MonitoringDurationSection />

        <UpdateFrequencySection />

        <MaritimeAlertConditionalFields
          shipCriteriaOptions={shipCriteriaOptions}
          areaCriteriaOptions={areaCriteriaOptions}
        />
      </div>
    </ConfigFormBase>
  );
};
