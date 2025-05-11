import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/common';
import { ProductCard } from '@/components/dashboard/ProductCard';
import type { UserProduct } from '@shared-types/userProduct';
import type { ProductType } from '@shared-types/product';

/**
 * Props for ProductGrid component
 */
interface ProductGridProps {
  /** Filtered products to display */
  products: UserProduct[];
  /** Currently active filter */
  activeFilter: ProductType | null;
}

/**
 * Component for displaying dashboard products in a grid
 * 
 * @param props - The component props
 * @param props.products - Filtered products to display
 * @param props.activeFilter - Currently active filter
 * @returns The rendered product grid or empty state message
 */
export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  activeFilter,
}) => {
  if (products.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center mb-8">
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
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>

        <h2 className="text-xl font-medium text-secondary-900 mb-2">
          {activeFilter ? 'No products of this type' : 'No products yet'}
        </h2>

        <p className="text-secondary-600 mb-6">
          {activeFilter
            ? "You don't have any products of this type. Try selecting a different filter or browse the marketplace."
            : "You haven't purchased any products yet. Browse our marketplace to get started."}
        </p>

        <Link to="/marketplace">
          <Button variant="primary">Browse Marketplace</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
