import { type FC } from 'react';
import { Button } from '@components/ui/Button';
import { Spinner } from '@components/ui/Spinner';
import type { CartItem } from '@features/cart/types';

/**
 * Props for the checkout OrderSummary component
 */
interface OrderSummaryProps {
  /** Items in the cart */
  items: CartItem[];
  /** Total amount before tax */
  totalAmount: number;
  /** Total credits cost */
  totalCredits: number;
  /** Selected payment method */
  paymentMethod: 'credit_card' | 'credits';
  /** Whether the order is being processed */
  isLoading: boolean;
  /** Whether the submit button should be disabled */
  isDisabled: boolean;
}

/**
 * Component for displaying order summary during checkout
 *
 * @param props - The component props
 * @param props.items - Items in the cart
 * @param props.totalAmount - Total amount before tax
 * @param props.totalCredits - Total credits cost
 * @param props.paymentMethod - Selected payment method
 * @param props.isLoading - Whether the order is being processed
 * @param props.isDisabled - Whether the submit button should be disabled
 * @returns The rendered order summary component
 */
export const OrderSummary: FC<OrderSummaryProps> = ({
  items,
  totalAmount,
  totalCredits,
  paymentMethod,
  isLoading,
  isDisabled,
}) => {
  const taxRate = 0.08; // 8%
  const taxAmount = totalAmount * taxRate;
  const total = totalAmount + taxAmount;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium text-secondary-900 mb-4">
        Order Summary
      </h2>

      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.itemId} className="flex justify-between">
            <div>
              <p className="text-secondary-900">{item.product.name}</p>
              <p className="text-sm text-secondary-500">Qty: {item.quantity}</p>
            </div>
            <p className="text-secondary-900">
              $
              {(
                (item.configuredPrice || item.product.price) * item.quantity
              ).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="border-t border-secondary-200 pt-4 space-y-2">
        <div className="flex justify-between">
          <p className="text-secondary-600">Subtotal</p>
          <p className="text-secondary-900">${totalAmount.toFixed(2)}</p>
        </div>

        <div className="flex justify-between">
          <p className="text-secondary-600">Tax (8%)</p>
          <p className="text-secondary-900">${taxAmount.toFixed(2)}</p>
        </div>

        <div className="pt-2 border-t border-secondary-200">
          <div className="flex justify-between font-medium">
            <p className="text-secondary-900">Total</p>
            <p className="text-secondary-900">${total.toFixed(2)}</p>
          </div>

          {paymentMethod === 'credits' && (
            <div className="flex justify-between mt-1">
              <p className="text-secondary-600 text-sm">Credits to be used:</p>
              <p className="text-secondary-900 font-medium text-sm">
                {totalCredits}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6">
        <Button
          type="submit"
          variant="primary"
          fullWidth
          isLoading={isLoading}
          disabled={isDisabled}
        >
          {isLoading ? (
            <span className="flex items-center">
              <Spinner size="sm" color="white" className="mr-2" />
              Processing...
            </span>
          ) : (
            `Complete ${paymentMethod === 'credit_card' ? 'Purchase' : 'Order'}`
          )}
        </Button>
      </div>

      <p className="text-xs text-secondary-500 text-center mt-4">
        By completing your purchase, you agree to our Terms of Service and
        Privacy Policy.
      </p>
    </div>
  );
};
