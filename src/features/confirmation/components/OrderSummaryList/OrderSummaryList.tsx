import React from 'react';
import type { CartItem } from '@/types/cart';

/**
 * Props for the OrderSummaryList component
 */
export interface OrderSummaryListProps {
  /** Array of cart items to display */
  items: CartItem[];
}

/**
 * Component for displaying the itemized list of purchased products
 *
 * @param props - The component props
 * @param props.items - Array of cart items to display
 * @returns The rendered order summary with itemized list of purchased products
 */
export const OrderSummaryList: React.FC<OrderSummaryListProps> = ({
  items,
}) => {
  return (
    <div className="space-y-6 mb-8">
      <div>
        <h3 className="text-lg font-medium text-secondary-900 mb-3">
          Order Summary
        </h3>
        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex justify-between py-3 border-b border-secondary-200 last:border-b-0"
            >
              <div className="text-left">
                <p className="text-secondary-900 font-medium">
                  {item.product.name}
                </p>
                <p className="text-sm text-secondary-500">
                  Qty: {item.quantity}
                </p>
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
      </div>

      <div className="border-t border-secondary-200 pt-4">
        <p className="text-secondary-600 text-sm mb-2">
          A confirmation email has been sent to your email address.
        </p>
      </div>
    </div>
  );
};
