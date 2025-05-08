import React, { useState } from 'react';
import { ConfigFormBase } from './ConfigFormBase';
import {
  RadioGroup,
  NumberField,
  TextField,
  SelectField,
  CheckboxGroup,
  TextareaField,
} from './FormFields';
import { useAppDispatch } from '@hooks/redux';
import { useNavigate } from 'react-router-dom';
import { addItem } from '@store/slices/cartSlice';
import { v4 as uuidv4 } from 'uuid';
import { MaritimeAlertProduct } from '@types/product';

interface MaritimeAlertConfigProps {
  product: MaritimeAlertProduct;
}

export const MaritimeAlertConfig: React.FC<MaritimeAlertConfigProps> = ({
  product,
}) => {
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
    alertType: '',
    monitoringDurationDays: 30,
    vesselIMOs: '',
    areaName: '',
    shipCriteria: [],
    areaCriteria: [],
    updateFrequencyHours: '24',
    notes: '',
  };

  const handleSubmit = (data: any) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Process vessel IMOs into an array
      const vesselIMOs = data.vesselIMOs
        ? data.vesselIMOs.split(',').map((imo: string) => imo.trim())
        : [];

      // Create configuration object
      let configuration = {
        alertType: data.alertType,
        monitoringDurationDays: data.monitoringDurationDays,
        updateFrequencyHours: parseInt(data.updateFrequencyHours),
        notes: data.notes,
      };

      // Add type-specific configuration data
      if (data.alertType === 'SHIP' || data.alertType === 'SHIP_AND_AREA') {
        configuration = {
          ...configuration,
          vesselIMOs,
          shipCriteria: data.shipCriteria || [],
        };
      }

      if (data.alertType === 'AREA' || data.alertType === 'SHIP_AND_AREA') {
        configuration = {
          ...configuration,
          areaName: data.areaName,
          areaCriteria: data.areaCriteria || [],
          // In a real app, we'd include the GeoJSON for the area as well
          aoiDefinition: { type: 'Placeholder for GeoJSON' },
        };
      }

      // Calculate the price based on configuration
      // This is a simple example - in a real app, pricing would be more complex
      const basePriceMultiplier = data.monitoringDurationDays / 30; // Default is 30 days
      const configuredPrice =
        Math.round(product.price * basePriceMultiplier * 100) / 100;
      const configuredCreditCost = Math.round(
        product.creditCost * basePriceMultiplier,
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
        'Failed to add the configured alert to your cart. Please try again.',
      );
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
        <RadioGroup
          name="alertType"
          label="Alert Type"
          options={alertTypeOptions}
          required
        />

        <NumberField
          name="monitoringDurationDays"
          label="Monitoring Duration (Days)"
          min={1}
          max={365}
          required
          helperText="How long should this alert be active? (1-365 days)"
        />

        <SelectField
          name="updateFrequencyHours"
          label="Update Frequency"
          options={[
            { value: '6', label: 'Every 6 hours' },
            { value: '12', label: 'Every 12 hours' },
            { value: '24', label: 'Daily' },
          ]}
          required
          helperText="How often should the system check for alert conditions?"
        />

        {/* Conditional fields based on alert type */}
        {(formValues) => {
          const alertType = formValues.alertType;

          return (
            <>
              {(alertType === 'SHIP' || alertType === 'SHIP_AND_AREA') && (
                <div className="space-y-6 border-t border-secondary-200 pt-6">
                  <h3 className="text-lg font-medium text-secondary-900">
                    Ship-based Alert Configuration
                  </h3>

                  <TextField
                    name="vesselIMOs"
                    label="Vessel IMO Numbers"
                    placeholder="9876543, 1234567"
                    required
                    helperText="Enter comma-separated IMO numbers for vessels to monitor"
                  />

                  <CheckboxGroup
                    name="shipCriteria"
                    label="Alert Criteria"
                    options={shipCriteriaOptions}
                    required
                    helperText="Select at least one criterion"
                  />
                </div>
              )}

              {(alertType === 'AREA' || alertType === 'SHIP_AND_AREA') && (
                <div className="space-y-6 border-t border-secondary-200 pt-6">
                  <h3 className="text-lg font-medium text-secondary-900">
                    Area-based Alert Configuration
                  </h3>

                  <TextField
                    name="areaName"
                    label="Area Name"
                    placeholder="Gulf of Mexico Monitoring Zone"
                    required
                  />

                  <div className="bg-secondary-50 p-4 rounded-md border border-secondary-200">
                    <p className="text-sm text-secondary-600 mb-2">
                      Area Selection Map
                    </p>
                    <div className="h-64 bg-white border border-secondary-300 rounded-md flex items-center justify-center">
                      <p className="text-secondary-500">
                        Map interface would be here in a complete implementation
                      </p>
                    </div>
                    <p className="text-xs text-secondary-500 mt-2">
                      Use the map to define your area of interest
                    </p>
                  </div>

                  <CheckboxGroup
                    name="areaCriteria"
                    label="Alert Criteria"
                    options={areaCriteriaOptions}
                    required
                    helperText="Select at least one criterion"
                  />
                </div>
              )}

              <div className="space-y-6 border-t border-secondary-200 pt-6">
                <TextareaField
                  name="notes"
                  label="Notes"
                  placeholder="Add any additional information or requirements"
                  helperText="Optional: Add any special instructions or notes for this alert"
                />
              </div>
            </>
          );
        }}
      </div>
    </ConfigFormBase>
  );
};
