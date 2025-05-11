import React from 'react';
import { ProductCard } from '@components/products';
import type { BaseProduct } from '@shared-types/product';

/**
 * Props for the SearchResults component
 */
export interface SearchResultsProps {
  /** List of products to display */
  products: BaseProduct[];
}

/**
 * Component for displaying a grid of product search results
 * 
 * @param props - The component props
 * @param props.products - List of products to display
 * @returns The rendered search results grid with product cards
 */
export const SearchResults: React.FC<SearchResultsProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
