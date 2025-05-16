import React from 'react';

/**
 * Props for the MarketplaceHeader component
 */
export interface MarketplaceHeaderProps {
  /** Whether a type filter is currently applied */
  hasTypeFilter: boolean;
  /** Number of products currently displayed */
  productCount: number;
  /** Total number of products in the catalog */
  totalProducts: number;
}

/**
 * Header component for the marketplace page showing product count and filter status
 *
 * @param props - The component props
 * @param props.hasTypeFilter - Whether a type filter is currently applied
 * @param props.productCount - Number of products currently displayed
 * @param props.totalProducts - Total number of products in the catalog
 * @returns The rendered marketplace header component
 */
export const MarketplaceHeader: React.FC<MarketplaceHeaderProps> = ({
  hasTypeFilter,
  productCount,
  totalProducts,
}) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-secondary-900">
        Products {hasTypeFilter ? '(Filtered)' : ''}
      </h2>
      <p className="text-sm text-secondary-500">
        Showing {productCount} of {totalProducts} products
      </p>
    </div>
  );
};
