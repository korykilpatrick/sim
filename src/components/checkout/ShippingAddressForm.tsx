import React from 'react';
import { TextField } from '@components/forms';
import type { UseFormReturn } from 'react-hook-form';
import type { CheckoutFormValues } from '@shared-types/checkout';

/**
 * Props for the ShippingAddressForm component
 */
interface ShippingAddressFormProps {
  /** Form methods from react-hook-form */
  formMethods: UseFormReturn<CheckoutFormValues>;
}

/**
 * Form component for collecting shipping/billing address information during checkout
 *
 * @param props - The component props
 * @param props.formMethods - Form methods from react-hook-form
 * @returns The rendered shipping address form
 */
export const ShippingAddressForm: React.FC<ShippingAddressFormProps> = ({
  formMethods,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
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
            formMethods={formMethods}
          />
        </div>

        <div className="sm:col-span-2">
          <TextField
            name="email"
            label="Email Address"
            type="email"
            placeholder="john@example.com"
            required
            formMethods={formMethods}
          />
        </div>

        <div className="sm:col-span-2">
          <TextField
            name="address"
            label="Address"
            placeholder="123 Main St"
            required
            formMethods={formMethods}
          />
        </div>

        <div>
          <TextField
            name="city"
            label="City"
            placeholder="New York"
            required
            formMethods={formMethods}
          />
        </div>

        <div>
          <TextField
            name="state"
            label="State / Province"
            placeholder="NY"
            required
            formMethods={formMethods}
          />
        </div>

        <div>
          <TextField
            name="zipCode"
            label="ZIP / Postal Code"
            placeholder="10001"
            required
            formMethods={formMethods}
          />
        </div>

        <div>
          <TextField
            name="country"
            label="Country"
            placeholder="United States"
            required
            formMethods={formMethods}
          />
        </div>
      </div>
    </div>
  );
};
