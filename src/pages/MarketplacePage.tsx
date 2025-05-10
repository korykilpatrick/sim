import React, { useState, useEffect } from 'react';
import { ProductCard, FilterSidebar, PromotionalSlider } from '@components/products';
import { Spinner, Alert } from '@components/common';
import { useGetProductsQuery } from '@services/productsApi';
import type { ProductType } from '@shared-types/product';
import {
  RtkQueryError,
  ApiErrorPayload as _ApiErrorPayload,
} from '@/types/apiError';
import { SerializedError } from '@reduxjs/toolkit';

// Helper to check if it's an RTK Query API error with our expected payload
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
  // Fetch products with filtering
  const queryParams = {
    type: selectedType === null ? undefined : selectedType,
    search: debouncedSearch || undefined,
  };
  const { data, error, isLoading } = useGetProductsQuery(queryParams);

  const handleTypeChange = (type: ProductType | null) => {
    setSelectedType(type);
  };

  const handleSearchChange = (search: string) => {
    setSearchQuery(search);
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
            <div className="flex justify-center items-center h-64">
              <Spinner size="lg" />
            </div>
          ) : error ? (
            <Alert
              variant="error"
              title="Error loading products"
              message={
                isApiError(error)
                  ? error.data.message
                  : (error as SerializedError)?.message ||
                    'There was an error loading the product catalog. Please try again later.'
              }
            />
          ) : data && data.products.length > 0 ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  {selectedType
                    ? `${data.products.length} products found`
                    : 'All Products'}
                </h2>

                <div className="text-sm text-secondary-600">
                  {data.products.length} of {data.total} products
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-secondary-50 rounded-lg p-8 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto text-secondary-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-lg font-medium text-secondary-900 mb-2">
                No products found
              </h3>
              <p className="text-secondary-600">
                Try adjusting your filters or search query to find what
                you&apos;re looking for.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;
