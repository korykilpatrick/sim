import React from 'react';
import { TextField } from '@components/forms';

/**
 * Props for the PaymentDetailsForm component
 */
interface PaymentDetailsFormProps {
  /** Whether the form should be displayed */
  visible: boolean;
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * Form component for collecting payment details during checkout
 *
 * @param props - The component props
 * @param props.visible - Whether the form should be displayed
 * @param props.className - Optional additional CSS classes
 * @returns The rendered payment details form or null if not visible
 */
export const PaymentDetailsForm: React.FC<PaymentDetailsFormProps> = ({
  visible,
  className = '',
}) => {
  if (!visible) {
    return null;
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <TextField
          name="cardNumber"
          label="Card Number"
          placeholder="1234 5678 9012 3456"
          required
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <TextField
            name="expiryDate"
            label="Expiry Date"
            placeholder="MM/YY"
            required
          />
        </div>

        <div>
          <TextField name="cvv" label="CVV" placeholder="123" required />
        </div>

        <div className="col-span-3">
          <TextField
            name="cardholderName"
            label="Cardholder Name"
            placeholder="John Doe"
            required
          />
        </div>
      </div>
    </div>
  );
};
