import React from 'react';
import { ProductType } from '@shared-types/product';
import { SearchBox } from './SearchBox';
import { TypeFilter } from './TypeFilter';
import { ClearFiltersButton } from './ClearFiltersButton';

/**
 * Props for the FilterSidebar component
 */
export interface FilterSidebarProps {
  /** Currently selected product type */
  selectedType: ProductType | null;
  /** Function to handle type selection changes */
  onTypeChange: (type: ProductType | null) => void;
  /** Function to handle search query changes */
  onSearchChange: (search: string) => void;
  /** Current search query */
  searchQuery: string;
}

/**
 * Component for filtering products in the marketplace
 */
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

  const hasActiveFilters = selectedType !== null || searchQuery !== '';

  return (
    <div className="bg-navy-800 border border-navy-700 rounded-lg shadow-lg p-4">
      <SearchBox searchQuery={searchQuery} onSearchChange={onSearchChange} />

      <TypeFilter
        selectedType={selectedType}
        onTypeChange={onTypeChange}
        productTypes={productTypes}
      />

      <ClearFiltersButton
        hasActiveFilters={hasActiveFilters}
        onClearFilters={handleClearFilters}
      />
    </div>
  );
};
