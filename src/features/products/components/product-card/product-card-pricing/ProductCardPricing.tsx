import React from 'react';

/**
 * Props for the ProductCardPricing component
 */
export interface ProductCardPricingProps {
  /** Price of the product in USD */
  price?: number;
  /** Cost of the product in credits */
  creditCost?: number;
}

/**
 * Component for displaying product pricing information in a card
 *
 * @param props - The component props
 * @param props.price - Price of the product in USD
 * @param props.creditCost - Cost of the product in credits
 * @returns The rendered product pricing component
 */
export const ProductCardPricing: React.FC<ProductCardPricingProps> = ({
  price,
  creditCost,
}) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <div>
      {price !== undefined && (
        <div className="text-lg font-bold text-gray-900">
          {formatter.format(price)}
        </div>
      )}
      {creditCost !== undefined && (
        <div className="text-sm text-gray-600">
          {creditCost} {creditCost === 1 ? 'credit' : 'credits'}
        </div>
      )}
    </div>
  );
};
