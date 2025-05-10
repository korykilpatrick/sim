import React, { type FC } from 'react';

/**
 * Props for the PaymentMethodSelector component
 */
interface PaymentMethodSelectorProps {
  /** Currently selected payment method */
  paymentMethod: 'credit_card' | 'credits';
  /** Function to handle payment method change */
  onPaymentMethodChange: (method: 'credit_card' | 'credits') => void;
  /** User's available credits */
  availableCredits: number;
  /** Total credits required for the purchase */
  requiredCredits: number;
}

/**
 * Component for selecting payment method during checkout
 */
export const PaymentMethodSelector: FC<PaymentMethodSelectorProps> = ({
  paymentMethod,
  onPaymentMethodChange,
  availableCredits,
  requiredCredits,
}) => {
  const hasSufficientCredits = availableCredits >= requiredCredits;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium text-secondary-900 mb-4">
        Payment Method
      </h2>

      <div className="mb-6">
        <div className="flex space-x-4">
          <label className="relative flex items-center">
            <input
              type="radio"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300"
              checked={paymentMethod === 'credit_card'}
              onChange={() => onPaymentMethodChange('credit_card')}
            />
            <span className="ml-2 text-secondary-700">Credit Card</span>
          </label>

          <label className="relative flex items-center">
            <input
              type="radio"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300"
              checked={paymentMethod === 'credits'}
              onChange={() => onPaymentMethodChange('credits')}
              disabled={!hasSufficientCredits}
            />
            <span className="ml-2 text-secondary-700">
              Use Credits ({availableCredits} available)
              {!hasSufficientCredits && (
                <span className="text-red-500 ml-2">
                  Insufficient credits
                </span>
              )}
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};
