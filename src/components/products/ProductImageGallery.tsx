import React from 'react';
import { ProductImage } from './ProductImage';
import { PlaceholderImage } from './PlaceholderImage';

/**
 * Props for the ProductImageGallery component
 */
export interface ProductImageGalleryProps {
  /** URL of the product image */
  mainImage?: string | undefined;
  /** Alt text for the image */
  alt: string;
}

/**
 * Component for displaying a product image gallery
 * For the MVP, this just displays a single image
 * In a real app, we might have multiple images to show in a gallery
 *
 * @param props - The component props
 * @param props.mainImage - URL of the product image
 * @param props.alt - Alt text for the image
 * @returns The rendered product image gallery component
 */
export const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  mainImage,
  alt,
}) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="aspect-w-16 aspect-h-12 bg-secondary-100">
        {mainImage ? (
          <ProductImage src={mainImage} alt={alt} />
        ) : (
          <PlaceholderImage />
        )}
      </div>
    </div>
  );
};
