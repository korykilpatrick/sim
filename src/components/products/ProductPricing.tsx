import React, { useState } from 'react';
import { BaseProduct } from '@shared-types/product';
import { useAppSelector } from '@hooks/redux';
import { Button } from '@components/common';

type ProductPricingProps = {
  product: BaseProduct;
  onAddToCart: () => void;
  onBuyNow: () => void;
};

export const ProductPricing: React.FC<ProductPricingProps> = ({
  product,
  onAddToCart,
  onBuyNow,
}) => {
  const { price, creditCost } = product;
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const creditsBalance = useAppSelector((state) => state.credits.balance);

  // Payment method selection (for display only, actual selection happens at checkout)
  const [selectedPayment, setSelectedPayment] = useState<'credits' | 'money'>(
    'money',
  );

  const hasSufficientCredits = creditsBalance >= creditCost;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Pricing</h3>

      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-3xl font-bold text-primary-600">
            ${price.toFixed(2)}
          </p>
          <span className="text-sm text-secondary-500">
            or {creditCost} credits
          </span>
        </div>

        {isAuthenticated && (
          <div className="text-right">
            <p className="text-sm text-secondary-500">Your credit balance:</p>
            <p className="font-medium">{creditsBalance} credits</p>
          </div>
        )}
      </div>

      {isAuthenticated && (
        <div className="mb-6">
          <p className="text-sm font-medium text-secondary-700 mb-2">
            Select payment method:
          </p>

          <div className="flex space-x-2">
            <button
              className={`flex-1 py-2 rounded-md border ${
                selectedPayment === 'money'
                  ? 'bg-primary-50 border-primary-500 text-primary-700'
                  : 'border-secondary-300 text-secondary-700 hover:bg-secondary-50'
              }`}
              onClick={() => setSelectedPayment('money')}
            >
              Pay with money
            </button>

            <button
              className={`flex-1 py-2 rounded-md border ${
                selectedPayment === 'credits'
                  ? 'bg-primary-50 border-primary-500 text-primary-700'
                  : 'border-secondary-300 text-secondary-700 hover:bg-secondary-50'
              }`}
              onClick={() => setSelectedPayment('credits')}
              disabled={!hasSufficientCredits}
            >
              Use credits
              {!hasSufficientCredits && (
                <span className="block text-xs text-red-500 mt-1">
                  Insufficient credits
                </span>
              )}
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        <Button variant="primary" fullWidth onClick={onBuyNow}>
          Purchase Now
        </Button>

        <Button variant="outline" fullWidth onClick={onAddToCart}>
          Add to Cart
        </Button>
      </div>

      {!isAuthenticated && (
        <p className="text-sm text-secondary-600 mt-4 text-center">
          <a href="/auth/login" className="text-primary-600 hover:underline">
            Sign in
          </a>{' '}
          to use your credits for purchase
        </p>
      )}
    </div>
  );
};
