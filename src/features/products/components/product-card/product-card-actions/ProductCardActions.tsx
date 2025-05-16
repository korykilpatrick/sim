import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Props for the ProductCardActions component
 */
export interface ProductCardActionsProps {
  /** ID of the product */
  productId: string;
}

/**
 * Component for displaying action buttons in a product card
 *
 * @param props - The component props
 * @param props.productId - ID of the product
 * @returns The rendered product actions component
 */
export const ProductCardActions: React.FC<ProductCardActionsProps> = ({
  productId,
}) => {
  return (
    <div>
      <Link
        to={`/products/${productId}`}
        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        View Details
      </Link>
    </div>
  );
};
