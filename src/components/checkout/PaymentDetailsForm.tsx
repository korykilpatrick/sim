import React from 'react';
import { TextField } from '@components/forms';
import type { UseFormReturn } from 'react-hook-form';
import type { CheckoutFormValues } from '@shared-types/checkout';

/**
 * Props for the PaymentDetailsForm component
 */
interface PaymentDetailsFormProps {
  /** Form methods from react-hook-form */
  formMethods: UseFormReturn<CheckoutFormValues>;
  /** Whether the form should be displayed */
  visible: boolean;
}

/**
 * Form component for collecting payment details during checkout
 *
 * @param props - The component props
 * @param props.formMethods - Form methods from react-hook-form
 * @param props.visible - Whether the form should be displayed
 * @returns The rendered payment details form or null if not visible
 */
export const PaymentDetailsForm: React.FC<PaymentDetailsFormProps> = ({
  formMethods,
  visible,
}) => {
  if (!visible) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div>
        <TextField
          name="cardNumber"
          label="Card Number"
          placeholder="1234 5678 9012 3456"
          required
          formMethods={formMethods}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <TextField
            name="expiryDate"
            label="Expiry Date"
            placeholder="MM/YY"
            required
            formMethods={formMethods}
          />
        </div>

        <div>
          <TextField
            name="cvv"
            label="CVV"
            placeholder="123"
            required
            formMethods={formMethods}
          />
        </div>

        <div className="col-span-3">
          <TextField
            name="cardholderName"
            label="Cardholder Name"
            placeholder="John Doe"
            required
            formMethods={formMethods}
          />
        </div>
      </div>
    </div>
  );
};
