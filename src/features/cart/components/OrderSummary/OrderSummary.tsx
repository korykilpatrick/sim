import React, { FC } from 'react';
import { Link } from 'react-router-dom';

/**
 * Props for the OrderSummary component
 */
export interface OrderSummaryProps {
  /** Subtotal amount in dollars */
  subtotal: number;
  /** Total credits cost */
  totalCredits: number;
  /** Number of items in the cart */
  itemCount: number;
  /** Whether the user is authenticated */
  isAuthenticated: boolean;
}

/**
 * Component for displaying order summary in cart and checkout
 *
 * @param props - The component props
 * @param props.subtotal - Subtotal amount in dollars
 * @param props.totalCredits - Total credits cost
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
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-secondary-200">
        <h2 className="text-lg font-medium text-secondary-900">Order Summary</h2>
      </div>
      
      <div className="p-6 space-y-4">
        <div className="flex justify-between">
          <span className="text-secondary-500">Subtotal ({itemCount} item{itemCount !== 1 ? 's' : ''})</span>
          <span className="text-secondary-900 font-medium">${subtotal.toFixed(2)}</span>
        </div>
        
        {totalCredits > 0 && (
          <div className="flex justify-between">
            <span className="text-secondary-500">Credits</span>
            <span className="text-ocean-600 font-medium">{totalCredits} credit{totalCredits !== 1 ? 's' : ''}</span>
          </div>
        )}
        
        <div className="border-t border-secondary-200 pt-4 flex justify-between">
          <span className="text-lg font-medium text-secondary-900">Total</span>
          <div className="text-right">
            <div className="text-lg font-medium text-secondary-900">${subtotal.toFixed(2)}</div>
            {totalCredits > 0 && (
              <div className="text-sm text-ocean-600">
                + {totalCredits} credit{totalCredits !== 1 ? 's' : ''}
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-6">
          {isAuthenticated ? (
            <Link
              to="/protected/checkout"
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-ocean-600 hover:bg-ocean-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ocean-500"
            >
              Proceed to Checkout
            </Link>
          ) : (
            <Link
              to="/auth/login?redirect=/protected/checkout"
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-ocean-600 hover:bg-ocean-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ocean-500"
            >
              Sign in to Checkout
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
