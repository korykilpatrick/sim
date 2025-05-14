import React, { useState, useEffect } from 'react';
import { FilterSidebar, PromotionalSlider } from '@components/products';
import { useGetProductsQuery } from '@services/productsApi';
import type { ProductType } from '@shared-types/product';
import {
  RtkQueryError,
  ApiErrorPayload as _ApiErrorPayload,
} from '@/types/apiError';
import { SerializedError } from '@reduxjs/toolkit';
import {
  MarketplaceHeader,
  SearchResults,
  EmptySearchState,
  MarketplaceLoadingState,
  MarketplaceErrorState,
} from '@components/marketplace';

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
    'status' in error &&
    typeof error.status === 'number' &&
    'data' in error &&
    typeof error.data === 'object' &&
    error.data !== null &&
    'message' in error.data &&
    typeof error.data.message === 'string'
  );
}

/**
 * Component for displaying the marketplace page
 *
 * @returns The rendered marketplace page with filters, product grid, and promotional content
 */
const MarketplacePage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<ProductType | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch products with filtering
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
  const getErrorMessage = () => {
    if (isApiError(error)) {
      return error.data.message;
    }
    return (
      (error as SerializedError)?.message ||
      'There was an error loading the product catalog. Please try again later.'
    );
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

export default MarketplacePage;
