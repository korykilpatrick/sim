import React from 'react';
import { ProductType } from '@types/product';

interface FilterSidebarProps {
  selectedType: ProductType | null;
  onTypeChange: (type: ProductType | null) => void;
  onSearchChange: (search: string) => void;
  searchQuery: string;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  selectedType,
  onTypeChange,
  onSearchChange,
  searchQuery,
}) => {
  // Product type options
  const productTypes: { value: ProductType; label: string }[] = [
    { value: 'VTS', label: 'Vessel Tracking' },
    { value: 'AMS', label: 'Area Monitoring' },
    { value: 'FTS', label: 'Fleet Tracking' },
    { value: 'REPORT_COMPLIANCE', label: 'Compliance Reports' },
    { value: 'REPORT_CHRONOLOGY', label: 'Chronology Reports' },
    { value: 'INVESTIGATION', label: 'Investigations' },
    { value: 'MARITIME_ALERT', label: 'Maritime Alerts' },
  ];

  const handleClearFilters = () => {
    onTypeChange(null);
    onSearchChange('');
  };

  return (
    <div className="bg-navy-800 border border-navy-700 rounded-lg shadow-lg p-4">
      <div className="mb-6">
        <h3 className="text-lg font-medium text-ocean-300 mb-3">Search</h3>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search products..."
            className="w-full px-4 py-2 border border-navy-600 rounded-md bg-navy-700 text-ocean-100 placeholder-navy-400 focus:ring-ocean-500 focus:border-ocean-500"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-ocean-400 hover:text-ocean-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
      </div>

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
              <label htmlFor={`type-${type.value}`} className="ml-3 text-sm text-ocean-100">
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

      {(selectedType || searchQuery) && (
        <button
          onClick={handleClearFilters}
          className="w-full py-2 text-sm text-ocean-400 hover:text-ocean-300 flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Clear All Filters
        </button>
      )}
    </div>
  );
};