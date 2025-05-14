import React from 'react';

/**
 * Props for the CartItemImage component
 */
export interface CartItemImageProps {
  /** URL of the product image */
  imageUrl?: string | undefined;
  /** Alt text for the image */
  alt: string;
}

/**
 * Component for displaying a product image or placeholder in cart
 *
 * @param props - The component props
 * @param props.imageUrl - URL of the product image
 * @param props.alt - Alt text for the image
 * @returns The rendered image component or placeholder
 */
export const CartItemImage: React.FC<CartItemImageProps> = ({
  imageUrl,
  alt,
}) => {
  return (
    <div className="w-full md:w-24 h-24 flex-shrink-0 bg-secondary-100 rounded-md overflow-hidden">
      {imageUrl ? (
        <img src={imageUrl} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-secondary-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      )}
    </div>
  );
};
