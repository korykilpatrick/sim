import { useState } from 'react';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@components/common';

/**
 * Props for the OrderSummary component
 */
type OrderSummaryProps = {
  /** Subtotal price before tax */
  subtotal: number;
  /** Total credits cost for the order */
  totalCredits: number;
  /** Number of items in the cart */
  itemCount: number;
  /** Whether the user is authenticated */
  isAuthenticated: boolean;
};

/**
 * Component for displaying order summary with pricing details and checkout options
 *
 * @param props - The component props
 * @param props.subtotal - Subtotal price before tax
 * @param props.totalCredits - Total credits cost for the order
 * @param props.itemCount - Number of items in the cart
 * @param props.isAuthenticated - Whether the user is authenticated
 * @returns The rendered order summary component
 */
export const OrderSummary: FC<OrderSummaryProps> = ({
  subtotal,
  totalCredits,
  itemCount,
  isAuthenticated,
}) => {
  const navigate = useNavigate();
  /** Payment method type */
  type PaymentMethod = 'money' | 'credits';

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('money');

  // Calculate tax (mock calculation - in a real app, this would be server-side)
  const taxRate = 0.08; // 8%
  const taxAmount = subtotal * taxRate;
  const total = subtotal + taxAmount;

  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate('/protected/checkout');
    } else {
      navigate('/auth/login', { state: { from: '/protected/checkout' } });
    }
  };

  return (
    <div className="bg-navy-800 border border-navy-700 rounded-lg shadow-lg p-6">
      <h2 className="text-lg font-medium text-ocean-300 mb-4">Order Summary</h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <p className="text-ocean-100">
            Subtotal ({itemCount} item{itemCount !== 1 ? 's' : ''})
          </p>
          <p className="text-white font-medium">${subtotal.toFixed(2)}</p>
        </div>

        <div className="flex justify-between">
          <p className="text-ocean-100">Tax (8%)</p>
          <p className="text-white font-medium">${taxAmount.toFixed(2)}</p>
        </div>

        <div className="pt-4 border-t border-navy-700">
          <div className="flex justify-between">
            <p className="text-ocean-100 font-medium">Total</p>
            <p className="text-white font-bold">${total.toFixed(2)}</p>
          </div>

          <div className="flex justify-between mt-1">
            <p className="text-ocean-200 text-sm">or credits</p>
            <p className="text-white font-medium text-sm">
              {totalCredits} credits
            </p>
          </div>
        </div>

        {isAuthenticated && (
          <div className="pt-4">
            <p className="text-sm font-medium text-ocean-100 mb-2">
              Select payment method:
            </p>

            <div className="flex space-x-2 mb-4">
              <button
                className={`flex-1 py-2 rounded-md border ${
                  paymentMethod === 'money'
                    ? 'bg-navy-700 border-ocean-500 text-ocean-300'
                    : 'border-navy-600 text-ocean-100 hover:bg-navy-700'
                }`}
                onClick={() => setPaymentMethod('money')}
              >
                Pay with money
              </button>

              <button
                className={`flex-1 py-2 rounded-md border ${
                  paymentMethod === 'credits'
                    ? 'bg-navy-700 border-ocean-500 text-ocean-300'
                    : 'border-navy-600 text-ocean-100 hover:bg-navy-700'
                }`}
                onClick={() => setPaymentMethod('credits')}
              >
                Use credits
              </button>
            </div>
          </div>
        )}

        <Button
          variant="primary"
          fullWidth
          onClick={handleCheckout}
          disabled={itemCount === 0}
        >
          {isAuthenticated ? 'Proceed to Checkout' : 'Sign in to Checkout'}
        </Button>
      </div>
    </div>
  );
};
