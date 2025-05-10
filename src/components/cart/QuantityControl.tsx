import React from 'react';

/**
 * Props for the QuantityControl component
 */
interface QuantityControlProps {
  /** Unique ID for the input */
  itemId: string;
  /** Current quantity value */
  quantity: number;
  /** Function to handle quantity changes */
  onQuantityChange: (newQuantity: number) => void;
}

/**
 * Component for handling quantity selection with increment/decrement buttons
 */
export const QuantityControl: React.FC<QuantityControlProps> = ({
  itemId,
  quantity,
  onQuantityChange,
}) => {
  return (
    <div className="flex items-center">
      <label
        htmlFor={`quantity-${itemId}`}
        className="mr-2 text-sm text-ocean-100"
      >
        Qty
      </label>
      <div className="flex border border-navy-600 rounded-md">
        <button
          type="button"
          className="px-2 py-1 text-ocean-100 hover:bg-navy-600 bg-navy-700"
          onClick={() => onQuantityChange(quantity - 1)}
          disabled={quantity <= 1}
        >
          -
        </button>
        <input
          id={`quantity-${itemId}`}
          type="text"
          className="w-12 text-center border-x border-navy-600 bg-navy-700 text-ocean-100"
          value={quantity}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            if (!isNaN(val)) onQuantityChange(val);
          }}
        />
        <button
          type="button"
          className="px-2 py-1 text-ocean-100 hover:bg-navy-600 bg-navy-700"
          onClick={() => onQuantityChange(quantity + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
};
