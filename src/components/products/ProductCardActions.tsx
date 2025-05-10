import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@components/common';

/**
 * Props for the ProductCardActions component
 */
export interface ProductCardActionsProps {
  /** Product ID for the link */
  productId: string;
}

/**
 * Component for product card action buttons
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
