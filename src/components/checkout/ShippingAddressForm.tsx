import React, { type FC } from 'react';
import { Input } from '../common/Input';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { CheckoutFormValues } from '../../types';

/**
 * Props for the ShippingAddressForm component
 */
interface ShippingAddressFormProps {
  /** Register function from react-hook-form */
  register: UseFormRegister<CheckoutFormValues>;
  /** Form validation errors */
  errors: FieldErrors<CheckoutFormValues>;
}

/**
 * Form component for collecting shipping/billing address information during checkout
 */
export const ShippingAddressForm: FC<ShippingAddressFormProps> = ({
  register,
  errors,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium text-secondary-900 mb-4">
        Billing Information
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Input
            label="Full Name"
            placeholder="John Doe"
            error={errors.name?.message}
            {...register('name')}
          />
        </div>

        <div className="sm:col-span-2">
          <Input
            label="Email Address"
            type="email"
            placeholder="john@example.com"
            error={errors.email?.message}
            {...register('email')}
          />
        </div>

        <div className="sm:col-span-2">
          <Input
            label="Address"
            placeholder="123 Main St"
            error={errors.address?.message}
            {...register('address')}
          />
        </div>

        <div>
          <Input
            label="City"
            placeholder="New York"
            error={errors.city?.message}
            {...register('city')}
          />
        </div>

        <div>
          <Input
            label="State / Province"
            placeholder="NY"
            error={errors.state?.message}
            {...register('state')}
          />
        </div>

        <div>
          <Input
            label="ZIP / Postal Code"
            placeholder="10001"
            error={errors.zipCode?.message}
            {...register('zipCode')}
          />
        </div>

        <div>
          <Input
            label="Country"
            placeholder="United States"
            error={errors.country?.message}
            {...register('country')}
          />
        </div>
      </div>
    </div>
  );
};
