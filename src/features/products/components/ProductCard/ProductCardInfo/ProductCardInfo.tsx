import React from 'react';

/**
 * Props for the ProductCardInfo component
 */
export interface ProductCardInfoProps {
  /** Name of the product */
  name: string;
  /** Short description of the product */
  shortDescription?: string;
}

/**
 * Component for displaying product name and description in a card
 *
 * @param props - The component props
 * @param props.name - Name of the product
 * @param props.shortDescription - Short description of the product
 * @returns The rendered product info component
 */
export const ProductCardInfo: React.FC<ProductCardInfoProps> = ({
  name,
  shortDescription,
}) => {
  return (
    <div className="mb-2">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{name}</h3>
      {shortDescription && (
        <p className="text-sm text-gray-600 line-clamp-2">{shortDescription}</p>
      )}
    </div>
  );
};
