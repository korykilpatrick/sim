import React from 'react';
import { ProductType } from '@features/products/types';

/**
 * Props for the TypeFilter component
 */
export interface TypeFilterProps {
  /** Currently selected product type */
  selectedType: ProductType | null;
  /** Function to handle type selection changes */
  onTypeChange: (type: ProductType | null) => void;
  /** Available product type options */
  productTypes: { value: ProductType; label: string }[];
}

/**
 * Component for filtering products by type
 *
 * @param props - The component props
 * @param props.selectedType - Currently selected product type
 * @param props.onTypeChange - Function to handle type selection changes
 * @param props.productTypes - Available product type options
 * @returns The rendered type filter component
 */
export const TypeFilter: React.FC<TypeFilterProps> = ({
  selectedType,
  onTypeChange,
  productTypes,
}) => {
  const handleTypeChange = (type: ProductType) => {
    if (selectedType === type) {
      onTypeChange(null); // Deselect if already selected
    } else {
      onTypeChange(type);
    }
  };

  return (
    <div className="mb-4">
      <h3 className="text-sm font-medium text-navy-100 mb-2">Product Type</h3>
      <div className="space-y-2">
        {productTypes.map((type) => (
          <div key={type.value} className="flex items-center">
            <button
              type="button"
              className={`flex items-center w-full px-3 py-2 text-sm rounded-md ${
                selectedType === type.value
                  ? 'bg-ocean-600 text-white'
                  : 'bg-navy-700 text-navy-200 hover:bg-navy-600'
              }`}
              onClick={() => handleTypeChange(type.value)}
            >
              <span className="flex-1 text-left">{type.label}</span>
              {selectedType === type.value && (
                <svg
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
