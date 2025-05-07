import React, { useState } from 'react';

interface ProductImageGalleryProps {
  mainImage?: string;
  alt: string;
}

export const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ 
  mainImage, 
  alt 
}) => {
  // For the MVP we'll just display a single image
  // In a real app, we might have multiple images to show in a gallery

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="aspect-w-16 aspect-h-12 bg-secondary-100">
        {mainImage ? (
          <img 
            src={mainImage} 
            alt={alt} 
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-secondary-100 p-12">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};