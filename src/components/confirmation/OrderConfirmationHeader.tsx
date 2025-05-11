import React from 'react';

/**
 * Props for the OrderConfirmationHeader component
 */
export interface OrderConfirmationHeaderProps {
  /** Order ID to display */
  orderId: string;
}

/**
 * Component for displaying the success icon, title, and order ID
 */
export const OrderConfirmationHeader: React.FC<OrderConfirmationHeaderProps> = ({
  orderId,
}) => {
  return (
    <>
      <div className="mb-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>

      <h1 className="text-2xl font-bold text-secondary-900 mb-2">
        Payment Successful!
      </h1>
      <p className="text-secondary-600 mb-6">
        Thank you for your purchase. Your order has been successfully
        processed.
      </p>

      <div className="border border-secondary-200 rounded-md p-4 mb-6 bg-secondary-50">
        <p className="text-secondary-700">
          <span className="font-medium">Order ID:</span> {orderId}
        </p>
      </div>
    </>
  );
};
