import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@components/ui/Button';

/**
 * Props for the ProductCardActions component
 */
export interface ProductCardActionsProps {
  /** Product ID for the link */
  productId: string;
}

/**
 * Component for product card action buttons
 *
 * @param props - The component props
 * @param props.productId - Product ID for the link
 * @returns The rendered product card actions component
 */
export const ProductCardActions: React.FC<ProductCardActionsProps> = ({
  productId,
}) => {
  return (
    <Link to={`/products/${productId}`}>
      <Button variant="primary" size="sm">
        Learn more
      </Button>
    </Link>
  );
};
