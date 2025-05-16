import React from 'react';
import { ProductType } from '@features/products/types';
import { SearchBox } from './search-box/SearchBox';
import { TypeFilter } from './type-filter/TypeFilter';
import { ClearFiltersButton } from './clear-filters-button/ClearFiltersButton';

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
 *
 * @param props - The component props
 * @param props.selectedType - Currently selected product type
 * @param props.onTypeChange - Function to handle type selection changes
 * @param props.onSearchChange - Function to handle search query changes
 * @param props.searchQuery - Current search query
 * @returns The rendered filter sidebar component
 */
export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  selectedType,
  onTypeChange,
  onSearchChange,
  searchQuery,
}) => {
  // Product type options
  const productTypes: { value: ProductType; label: string }[] = [
    { value: ProductType.VTS, label: 'Vessel Tracking' },
    { value: ProductType.AMS, label: 'Area Monitoring' },
    { value: ProductType.FTS, label: 'Fleet Tracking' },
    { value: ProductType.REPORT_COMPLIANCE, label: 'Compliance Reports' },
    { value: ProductType.REPORT_CHRONOLOGY, label: 'Chronology Reports' },
    { value: ProductType.INVESTIGATION, label: 'Investigations' },
    { value: ProductType.MARITIME_ALERT, label: 'Maritime Alerts' },
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
