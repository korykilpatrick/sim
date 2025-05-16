import React, { useState, useEffect } from 'react';
import { FilterSidebar, PromotionalSlider } from '@features/products/components';
import { useGetProductsQuery } from '@features/products/productsApi';
import type { ProductType } from '@features/products/types';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import {
  MarketplaceHeader,
  SearchResults,
  EmptySearchState,
  MarketplaceLoadingState,
  MarketplaceErrorState,
} from '@features/products/components/marketplace';

// Placeholder types - these should be defined globally or replaced with actual types
interface ApiErrorPayload {
  message: string;
  // Add other expected properties if any, e.g., code, details
}

// This represents a FetchBaseQueryError where the server returned an error payload we expect
interface RtkQueryError {
  status: number; // HTTP status code
  data: ApiErrorPayload;
}

/**
 * Helper to check if it's an RTK Query API error with our expected payload
 *
 * @param error - The error to check
 * @returns True if the error is an RTK Query API error, false otherwise
 */
function isApiError(error: any): error is RtkQueryError {
  return (
    typeof error === 'object' &&
    error !== null &&
    typeof error.status === 'number' && // Check for numeric status first
    typeof error.data === 'object' &&
    error.data !== null &&
    typeof error.data.message === 'string'
  );
}

/**
 * Component for displaying the marketplace page
 *
 * @returns The rendered marketplace page with filters, product grid, and promotional content
 */
export const MarketplacePage: React.FC = () => {
  console.log('MarketplacePage rendering, about to call useGetProductsQuery');

  const [selectedType, setSelectedType] = useState<ProductType | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data, error, isLoading, refetch } = useGetProductsQuery({
    ...(selectedType !== null && { type: selectedType }),
    ...(debouncedSearch && { search: debouncedSearch }),
  });

  /**
   * Handles product type filter change
   *
   * @param type - The product type to filter by or null to clear filter
   */
  const handleTypeChange = (type: ProductType | null) => {
    setSelectedType(type);
  };

  /**
   * Handles search query change
   *
   * @param search - The search query string
   */
  const handleSearchChange = (search: string) => {
    setSearchQuery(search);
  };

  /**
   * Gets error message from API error
   *
   * @returns The formatted error message string
   */
  const getErrorMessage = (): string => {
    if (isApiError(error)) {
      return error.data.message;
    }
    // Check for FetchBaseQueryError with string status (e.g., 'FETCH_ERROR')
    if (error && typeof (error as FetchBaseQueryError).status === 'string') {
      // data might be undefined, error property usually holds the message for these
      if ('error' in error && typeof (error as any).error === 'string') {
        return (error as any).error; 
      }
      return `An error occurred: ${(error as FetchBaseQueryError).status}`;
    }
    // Handle SerializedError (e.g., programming error before fetch)
    if (error && error instanceof Error) { // SerializedError is typically an instance of Error
        return error.message;
    }
    return 'An unexpected error occurred. Please try again later.'; // Fallback
  };

  return (
    <div>
      <PromotionalSlider />

      <div className="flex flex-col md:flex-row gap-8 md:items-start">
        {/* Filter Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <FilterSidebar
            selectedType={selectedType}
            onTypeChange={handleTypeChange}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
          />
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          {isLoading ? (
            <MarketplaceLoadingState />
          ) : error ? (
            <MarketplaceErrorState
              message={getErrorMessage()}
              onRetry={refetch}
            />
          ) : data && data.products.length > 0 ? (
            <div>
              <MarketplaceHeader
                hasTypeFilter={selectedType !== null}
                productCount={data.products.length}
                totalProducts={data.total}
              />

              <SearchResults products={data.products} />
            </div>
          ) : (
            <EmptySearchState />
          )}
        </div>
      </div>
    </div>
  );
};
