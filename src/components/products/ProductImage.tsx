import React from 'react';

/**
 * Props for the ProductImage component
 */
export interface ProductImageProps {
  /** URL of the product image */
  src: string;
  /** Alt text for the image */
  alt: string;
}

/**
 * Component for displaying a product image
 */
export const ProductImage: React.FC<ProductImageProps> = ({ src, alt }) => {
  return <img src={src} alt={alt} className="w-full h-full object-contain" />;
};
