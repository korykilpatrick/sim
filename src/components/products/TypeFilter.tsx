import React from 'react';
import type { ProductType } from '@shared-types/product';

/**
 * Props for the TypeFilter component
 */
export interface TypeFilterProps {
  /** Currently selected product type */
  selectedType: ProductType | null;
  /** Function to handle type selection changes */
  onTypeChange: (type: ProductType | null) => void;
  /** Available product types for filtering */
  productTypes: Array<{ value: ProductType; label: string }>;
}

/**
 * Component for filtering products by type
 */
export const TypeFilter: React.FC<TypeFilterProps> = ({
  selectedType,
  onTypeChange,
  productTypes,
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium text-ocean-300 mb-3">Product Type</h3>
      <div className="space-y-2">
        {productTypes.map((type) => (
          <div key={type.value} className="flex items-center">
            <input
              id={`type-${type.value}`}
              name="productType"
              type="radio"
              checked={selectedType === type.value}
              onChange={() => onTypeChange(type.value)}
              className="h-4 w-4 text-ocean-600 focus:ring-ocean-500 border-navy-600 bg-navy-700"
            />
            <label
              htmlFor={`type-${type.value}`}
              className="ml-3 text-sm text-ocean-100"
            >
              {type.label}
            </label>
          </div>
        ))}
        <div className="flex items-center">
          <input
            id="type-all"
            name="productType"
            type="radio"
            checked={selectedType === null}
            onChange={() => onTypeChange(null)}
            className="h-4 w-4 text-ocean-600 focus:ring-ocean-500 border-navy-600 bg-navy-700"
          />
          <label htmlFor="type-all" className="ml-3 text-sm text-ocean-100">
            All Products
          </label>
        </div>
      </div>
    </div>
  );
};
