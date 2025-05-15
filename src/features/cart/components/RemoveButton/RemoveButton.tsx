import React, { FC } from 'react';

/**
 * Props for the RemoveButton component
 */
export interface RemoveButtonProps {
  /** Callback function when remove button is clicked */
  onRemove: () => void;
}

/**
 * Component for removing an item from the cart
 *
 * @param props - The component props
 * @param props.onRemove - Callback function when remove button is clicked
 * @returns The rendered remove button component
 */
export const RemoveButton: FC<RemoveButtonProps> = ({ onRemove }) => {
  return (
    <button
      type="button"
      className="text-sm text-red-500 hover:text-red-700"
      onClick={onRemove}
      aria-label="Remove item from cart"
    >
      Remove
    </button>
  );
};
