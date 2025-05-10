import React from 'react';
import { Badge } from '@components/common';

/**
 * Props for the ProductCardTags component
 */
export interface ProductCardTagsProps {
  /** Array of product tags */
  tags?: string[] | undefined;
}

/**
 * Component for displaying product tags
 */
export const ProductCardTags: React.FC<ProductCardTagsProps> = ({ tags }) => {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1 mb-3">
      {tags.map((tag) => (
        <Badge key={tag} variant="secondary" size="sm">
          {tag}
        </Badge>
      ))}
    </div>
  );
};
