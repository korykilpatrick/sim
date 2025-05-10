import React from 'react';

/**
 * Props for the ProductCardPricing component
 */
export interface ProductCardPricingProps {
  /** Product price in dollars */
  price: number;
  /** Product cost in credits */
  creditCost: number;
}

/**
 * Component for displaying product pricing information
 */
export const ProductCardPricing: React.FC<ProductCardPricingProps> = ({
  price,
  creditCost,
}) => {
  return (
    <div>
      <p className="text-primary-600 font-bold">${price.toFixed(2)}</p>
      <p className="text-xs text-secondary-500">or {creditCost} credits</p>
    </div>
  );
};
