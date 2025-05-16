import React from 'react';

/**
 * Props for the ProductCardImage component
 */
export interface ProductCardImageProps {
  /** URL of the product image */
  imageUrl: string | undefined;
  /** Name of the product for alt text */
  name: string;
}

/**
 * Component for displaying a product image in a card
 *
 * @param props - The component props
 * @param props.imageUrl - URL of the product image
 * @param props.name - Name of the product for alt text
 * @returns The rendered product image component
 */
export const ProductCardImage: React.FC<ProductCardImageProps> = ({
  imageUrl,
  name,
}) => {
  const fallbackImage = '/assets/images/product-placeholder.jpg';

  return (
    <div className="relative h-48 bg-gray-100">
      <img
        src={imageUrl || fallbackImage}
        alt={`${name} product image`}
        className="w-full h-full object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          if (target.src !== fallbackImage) {
            target.src = fallbackImage;
          }
        }}
      />
    </div>
  );
};
