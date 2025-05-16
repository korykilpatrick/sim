import React from 'react';
import type { ProductType } from '@shared-types/product';

/**
 * Props for ProductFilters component
 */
interface ProductFiltersProps {
  /** Currently active filter */
  activeFilter: ProductType | null;
  /** Function to handle filter changes */
  onFilterChange: (filter: ProductType | null) => void;
  /** Available product types for filtering */
  productTypes: Array<{ value: ProductType; label: string }>;
}

/**
 * Component for filtering dashboard products by type
 *
 * @param props - The component props
 * @param props.activeFilter - Currently active filter
 * @param props.onFilterChange - Function to handle filter changes
 * @param props.productTypes - Available product types for filtering
 * @returns The rendered product filters with filter buttons
 */
export const ProductFilters: React.FC<ProductFiltersProps> = ({
  activeFilter,
  onFilterChange,
  productTypes,
}) => {
  if (productTypes.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          activeFilter === null
            ? 'bg-primary-100 text-primary-800'
            : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
        }`}
        onClick={() => onFilterChange(null)}
      >
        All Products
      </button>

      {productTypes.map((typeOpt) => (
        <button
          key={typeOpt.value}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeFilter === typeOpt.value
              ? 'bg-primary-100 text-primary-800'
              : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
          }`}
          onClick={() => onFilterChange(typeOpt.value)}
        >
          {typeOpt.label}
        </button>
      ))}
    </div>
  );
};
