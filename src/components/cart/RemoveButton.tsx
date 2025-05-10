import React from 'react';

/**
 * Props for the RemoveButton component
 */
interface RemoveButtonProps {
  /** Function to handle item removal */
  onRemove: () => void;
}

/**
 * Component for removing an item from the cart
 */
export const RemoveButton: React.FC<RemoveButtonProps> = ({ onRemove }) => {
  return (
    <button
      type="button"
      className="text-sm text-red-600 hover:text-red-800"
      onClick={onRemove}
    >
      Remove
    </button>
  );
};
