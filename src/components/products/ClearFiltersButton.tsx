import React from 'react';

/**
 * Props for the ClearFiltersButton component
 */
export interface ClearFiltersButtonProps {
  /** Whether any filters are active */
  hasActiveFilters: boolean;
  /** Function to handle clearing all filters */
  onClearFilters: () => void;
}

/**
 * Component for clearing all product filters
 */
export const ClearFiltersButton: React.FC<ClearFiltersButtonProps> = ({
  hasActiveFilters,
  onClearFilters,
}) => {
  if (!hasActiveFilters) return null;
  
  return (
    <button
      onClick={onClearFilters}
      className="w-full py-2 text-sm text-ocean-400 hover:text-ocean-300 flex items-center justify-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 mr-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
      Clear All Filters
    </button>
  );
};
