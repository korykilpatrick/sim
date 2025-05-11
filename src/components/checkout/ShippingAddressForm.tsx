import React from 'react';
import { TextField } from '@components/forms';

/**
 * Props for the ShippingAddressForm component
 */
interface ShippingAddressFormProps {
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * Form component for collecting shipping/billing address information during checkout
 *
 * @param props - The component props
 * @param props.className - Optional additional CSS classes
 * @returns The rendered shipping address form
 */
export const ShippingAddressForm: React.FC<ShippingAddressFormProps> = ({
  className = '',
}) => {
  return (
    <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
      <h2 className="text-lg font-medium text-secondary-900 mb-4">
        Billing Information
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <TextField
            name="name"
            label="Full Name"
            placeholder="John Doe"
            required
          />
        </div>

        <div className="sm:col-span-2">
          <TextField
            name="email"
            label="Email Address"
            type="email"
            placeholder="john@example.com"
            required
          />
        </div>

        <div className="sm:col-span-2">
          <TextField
            name="address"
            label="Address"
            placeholder="123 Main St"
            required
          />
        </div>

        <div>
          <TextField
            name="city"
            label="City"
            placeholder="New York"
            required
          />
        </div>

        <div>
          <TextField
            name="state"
            label="State / Province"
            placeholder="NY"
            required
          />
        </div>

        <div>
          <TextField
            name="zipCode"
            label="ZIP / Postal Code"
            placeholder="10001"
            required
          />
        </div>

        <div>
          <TextField
            name="country"
            label="Country"
            placeholder="United States"
            required
          />
        </div>
      </div>
    </div>
  );
};
