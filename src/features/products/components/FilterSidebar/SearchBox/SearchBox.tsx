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
 * Search input component for filtering products
 *
 * @param props - The component props
 * @param props.searchQuery - Current search query
 * @param props.onSearchChange - Function to handle search query changes
 * @returns The rendered search box component
 */
export const SearchBox: React.FC<SearchBoxProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className="mb-4">
      <label htmlFor="search" className="block text-sm font-medium text-navy-100 mb-1">
        Search Products
      </label>
      <div className="relative">
        <input
          type="text"
          id="search"
          className="block w-full bg-navy-700 border border-navy-600 rounded-md py-2 pl-3 pr-10 text-sm placeholder-navy-400 focus:outline-none focus:ring-1 focus:ring-ocean-500 focus:border-ocean-500"
          placeholder="Search by name or keyword..."
          value={searchQuery}
          onChange={handleChange}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className="h-4 w-4 text-navy-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
