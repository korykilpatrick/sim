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
 *
 * @param props - The component props
 * @param props.src - URL of the product image
 * @param props.alt - Alt text for the image
 * @returns The rendered product image component
 */
export const ProductImage: React.FC<ProductImageProps> = ({ src, alt }) => {
  return <img src={src} alt={alt} className="w-full h-full object-contain" />;
};
