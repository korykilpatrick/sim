import React from 'react';

/**
 * Props for the SearchBox component
 */
export interface SearchBoxProps {
  /** Current search query */
  searchQuery: string;
  /** Function to handle search query changes */
  onSearchChange: (search: string) => void;
}

/**
 * Component for product search functionality
 */
export const SearchBox: React.FC<SearchBoxProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  return (
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
