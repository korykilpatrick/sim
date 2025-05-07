import React, { useState } from 'react';
import { ConfigFormBase } from './ConfigFormBase';
import { NumberField, TextField, CheckboxGroup, TextareaField } from './FormFields';
import { useAppDispatch } from '@hooks/redux';
import { useNavigate } from 'react-router-dom';
import { addItem } from '@store/slices/cartSlice';
import { v4 as uuidv4 } from 'uuid';
import { BaseProduct } from '@types/product';

interface VesselTrackingConfigProps {
  product: BaseProduct;
}

export const VesselTrackingConfig: React.FC<VesselTrackingConfigProps> = ({ product }) => {
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
  
  // Default form values
  const defaultValues = {
    trackingDurationDays: 30,
    vesselIMOs: '',
    selectedCriteria: [],
    additionalVessels: 0,
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
      
      const totalVessels = vesselIMOs.length + data.additionalVessels;
      
      // Create configuration object
      const configuration = {
        trackingDurationDays: data.trackingDurationDays,
        vesselIMOs,
        selectedCriteria: data.selectedCriteria || [],
        additionalVessels: data.additionalVessels,
        totalVessels,
        notes: data.notes,
      };
      
      // Calculate the price based on configuration
      const durationMultiplier = data.trackingDurationDays / 30; // Default is 30 days
      const vesselMultiplier = 1 + (totalVessels - 1) * 0.1; // 10% extra for each additional vessel
      
      const configuredPrice = Math.round(product.price * durationMultiplier * vesselMultiplier * 100) / 100;
      const configuredCreditCost = Math.round(product.creditCost * durationMultiplier * vesselMultiplier);
      
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
      setError('Failed to add the configured tracking service to your cart. Please try again.');
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
      error={error}
    >
      <div className="space-y-6">
        <NumberField
          name="trackingDurationDays"
          label="Tracking Duration (Days)"
          min={7}
          max={365}
          required
          helperText="How long would you like to track the vessels? (7-365 days)"
        />
        
        <TextField
          name="vesselIMOs"
          label="Primary Vessel IMO Numbers"
          placeholder="9876543, 1234567"
          required
          helperText="Enter comma-separated IMO numbers for vessels to track"
        />
        
        <NumberField
          name="additionalVessels"
          label="Additional Vessels (To Be Specified Later)"
          min={0}
          max={100}
          helperText="Optionally add capacity for additional vessels you'll specify later"
        />
        
        <div className="border-t border-secondary-200 pt-6">
          <CheckboxGroup
            name="selectedCriteria"
            label="Tracking Criteria"
            options={trackingCriteriaOptions}
            required
            helperText="Select at least one tracking criterion"
          />
        </div>
        
        <div className="border-t border-secondary-200 pt-6">
          <TextareaField
            name="notes"
            label="Notes"
            placeholder="Add any additional information or requirements"
            helperText="Optional: Add any special instructions or notes for this tracking service"
          />
        </div>
      </div>
    </ConfigFormBase>
  );
};