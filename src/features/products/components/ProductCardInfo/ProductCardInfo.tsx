import React from 'react';

/**
 * Props for the ProductCardInfo component
 */
export interface ProductCardInfoProps {
  /** Product name */
  name: string;
  /** Short description of the product */
  shortDescription: string;
}

/**
 * Component for displaying product name and description
 *
 * @param props - The component props
 * @param props.name - Product name
 * @param props.shortDescription - Short description of the product
 * @returns The rendered product card info component
 */
export const ProductCardInfo: React.FC<ProductCardInfoProps> = ({
  name,
  shortDescription,
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-secondary-900 mb-1">{name}</h3>
      <p
        className="text-secondary-600 text-sm mb-3 line-clamp-2"
        style={{ minHeight: '2.5rem' }}
      >
        {shortDescription}
      </p>
    </div>
  );
};
