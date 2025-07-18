import React from 'react';

/**
 * Component for displaying a placeholder when no product image is available
 *
 * @returns The rendered placeholder image component
 */
export const PlaceholderImage: React.FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-secondary-100 p-12">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-24 w-24 text-secondary-400"
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
  );
};
