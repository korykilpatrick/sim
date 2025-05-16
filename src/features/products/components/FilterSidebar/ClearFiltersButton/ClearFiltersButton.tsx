import React from 'react';

/**
 * Props for the ClearFiltersButton component
 */
export interface ClearFiltersButtonProps {
  /** Whether there are active filters to clear */
  hasActiveFilters: boolean;
  /** Function to handle clearing all filters */
  onClearFilters: () => void;
}

/**
 * Button component for clearing all active filters
 *
 * @param props - The component props
 * @param props.hasActiveFilters - Whether there are active filters to clear
 * @param props.onClearFilters - Function to handle clearing all filters
 * @returns The rendered clear filters button component
 */
export const ClearFiltersButton: React.FC<ClearFiltersButtonProps> = ({
  hasActiveFilters,
  onClearFilters,
}) => {
  if (!hasActiveFilters) {
    return null;
  }

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={onClearFilters}
        className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-navy-100 bg-navy-600 hover:bg-navy-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ocean-500"
      >
        <svg
          className="mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
        Clear Filters
      </button>
    </div>
  );
};
