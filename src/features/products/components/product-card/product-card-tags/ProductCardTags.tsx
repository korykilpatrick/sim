import React from 'react';

/**
 * Props for the ProductCardTags component
 */
export interface ProductCardTagsProps {
  /** Array of tags for the product */
  tags: string[] | undefined;
}

/**
 * Component for displaying product tags in a card
 *
 * @param props - The component props
 * @param props.tags - Array of tags for the product
 * @returns The rendered product tags component
 */
export const ProductCardTags: React.FC<ProductCardTagsProps> = ({ tags = [] }) => {
  if (!tags.length) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-1 mt-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};
