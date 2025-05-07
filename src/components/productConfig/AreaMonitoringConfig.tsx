import React, { useState } from 'react';
import { ConfigFormBase } from './ConfigFormBase';
import { NumberField, TextField, SelectField, CheckboxGroup, TextareaField } from './FormFields';
import { useAppDispatch } from '@hooks/redux';
import { useNavigate } from 'react-router-dom';
import { addItem } from '@store/slices/cartSlice';
import { v4 as uuidv4 } from 'uuid';
import { BaseProduct } from '@types/product';

interface AreaMonitoringConfigProps {
  product: BaseProduct;
}

export const AreaMonitoringConfig: React.FC<AreaMonitoringConfigProps> = ({ product }) => {
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
    updateFrequencyHours: '24',
    selectedCriteria: [],
    specificVesselIMOs: '',
    notes: '',
  };
  
  const handleSubmit = (data: any) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Process specific vessel IMOs into an array (if any)
      const specificVesselIMOs = data.specificVesselIMOs
        ? data.specificVesselIMOs.split(',').map((imo: string) => imo.trim())
        : [];
      
      // Create configuration object
      const configuration = {
        areaName: data.areaName,
        monitoringDurationDays: data.monitoringDurationDays,
        updateFrequencyHours: parseInt(data.updateFrequencyHours),
        selectedCriteria: data.selectedCriteria || [],
        specificVesselIMOs,
        notes: data.notes,
        // In a real app, we'd include the GeoJSON for the area
        aoiDefinition: { type: 'Placeholder for GeoJSON' },
      };
      
      // Calculate the price based on configuration
      const durationMultiplier = data.monitoringDurationDays / 30; // Default is 30 days
      
      // Update frequency affects price - more frequent updates cost more
      const frequencyMultiplier = 
        data.updateFrequencyHours === '6' ? 1.5 :
        data.updateFrequencyHours === '12' ? 1.25 : 1;
      
      const configuredPrice = Math.round(product.price * durationMultiplier * frequencyMultiplier * 100) / 100;
      const configuredCreditCost = Math.round(product.creditCost * durationMultiplier * frequencyMultiplier);
      
      // Add to cart
      dispatch(addItem({
        itemId: uuidv4(),
        product,
        quantity: 1,
        configuredPrice,
        configuredCreditCost,
        configurationDetails: configuration,
      }));
      
      // Navigate to cart
      navigate('/protected/cart');
    } catch (err) {
      console.error('Error adding to cart:', err);
      setError('Failed to add the configured area monitoring service to your cart. Please try again.');
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
        <TextField
          name="areaName"
          label="Area Name"
          placeholder="Gulf of Mexico Monitoring Zone"
          required
          helperText="Give your monitoring area a descriptive name"
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
        
        <NumberField
          name="monitoringDurationDays"
          label="Monitoring Duration (Days)"
          min={7}
          max={365}
          required
          helperText="How long would you like to monitor this area? (7-365 days)"
        />
        
        <SelectField
          name="updateFrequencyHours"
          label="Update Frequency"
          options={[
            { value: '6', label: 'Every 6 hours (Premium)' },
            { value: '12', label: 'Every 12 hours (Standard)' },
            { value: '24', label: 'Daily (Basic)' },
          ]}
          required
          helperText="How often should the system update with new data?"
        />
        
        <div className="border-t border-secondary-200 pt-6">
          <CheckboxGroup
            name="selectedCriteria"
            label="Monitoring Criteria"
            options={areaCriteriaOptions}
            required
            helperText="Select at least one monitoring criterion"
          />
        </div>
        
        <TextField
          name="specificVesselIMOs"
          label="Specific Vessels of Interest (Optional)"
          placeholder="9876543, 1234567"
          helperText="Enter comma-separated IMO numbers if you're interested in specific vessels within this area"
        />
        
        <div className="border-t border-secondary-200 pt-6">
          <TextareaField
            name="notes"
            label="Notes"
            placeholder="Add any additional information or requirements"
            helperText="Optional: Add any special instructions or notes for this monitoring service"
          />
        </div>
      </div>
    </ConfigFormBase>
  );
};