import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Props for the CartIcon component
 */
export interface CartIconProps {
  /** Number of items in the cart */
  itemCount: number;
}

/**
 * Component for displaying the cart icon with item counter
 *
 * @param props - The component props
 * @param props.itemCount - Number of items in the cart
 * @returns The rendered cart icon with item count badge
 */
export const CartIcon: React.FC<CartIconProps> = ({ itemCount }) => {
  return (
    <Link to="/protected/cart" className="relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-ocean-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-ocean-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          {itemCount}
        </span>
      )}
    </Link>
  );
};
