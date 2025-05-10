import React, { type FC } from 'react';
import { Input } from '../common/Input';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { CheckoutFormValues } from '../../types';

/**
 * Props for the PaymentDetailsForm component
 */
interface PaymentDetailsFormProps {
  /** Register function from react-hook-form */
  register: UseFormRegister<CheckoutFormValues>;
  /** Form validation errors */
  errors: FieldErrors<CheckoutFormValues>;
  /** Whether the form should be displayed */
  visible: boolean;
}

/**
 * Form component for collecting payment details during checkout
 */
export const PaymentDetailsForm: FC<PaymentDetailsFormProps> = ({
  register,
  errors,
  visible,
}) => {
  if (!visible) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div>
        <Input
          label="Card Number"
          placeholder="1234 5678 9012 3456"
          error={errors.cardNumber?.message}
          {...register('cardNumber')}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Input
            label="Expiry Date"
            placeholder="MM/YY"
            error={errors.expiryDate?.message}
            {...register('expiryDate')}
          />
        </div>

        <div>
          <Input
            label="CVV"
            placeholder="123"
            error={errors.cvv?.message}
            {...register('cvv')}
          />
        </div>

        <div className="col-span-3">
          <Input
            label="Cardholder Name"
            placeholder="John Doe"
            error={errors.cardholderName?.message}
            {...register('cardholderName')}
          />
        </div>
      </div>
    </div>
  );
};
