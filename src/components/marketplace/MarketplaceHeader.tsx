import React from 'react';

/**
 * Props for the MarketplaceHeader component
 */
export interface MarketplaceHeaderProps {
  /** Whether a product type filter is selected */
  hasTypeFilter: boolean;
  /** Number of products found */
  productCount: number;
  /** Total number of products in the catalog */
  totalProducts: number;
}

/**
 * Component for displaying the marketplace header with product count information
 */
export const MarketplaceHeader: React.FC<MarketplaceHeaderProps> = ({
  hasTypeFilter,
  productCount,
  totalProducts,
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold">
        {hasTypeFilter
          ? `${productCount} products found`
          : 'All Products'}
      </h2>

      <div className="text-sm text-secondary-600">
        {productCount} of {totalProducts} products
      </div>
    </div>
  );
};
