import { FC } from 'react';

/**
 * Props for the QuantityControl component
 */
export interface QuantityControlProps {
  /** ID of the cart item */
  itemId: string;
  /** Current quantity of the item */
  quantity: number;
  /** Callback function when quantity changes */
  onQuantityChange: (quantity: number) => void;
}

/**
 * Component for controlling item quantity in cart
 *
 * @param props - The component props
 * @param props.itemId - ID of the cart item
 * @param props.quantity - Current quantity of the item
 * @param props.onQuantityChange - Callback function when quantity changes
 * @returns The rendered quantity control component
 */
export const QuantityControl: FC<QuantityControlProps> = ({
  quantity,
  onQuantityChange,
}) => {
  const handleDecrement = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    onQuantityChange(quantity + 1);
  };

  return (
    <div className="flex items-center">
      <button
        type="button"
        className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary-100 text-secondary-600 hover:bg-secondary-200"
        onClick={handleDecrement}
        disabled={quantity <= 1}
        aria-label="Decrease quantity"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 12H4"
          />
        </svg>
      </button>
      
      <span className="mx-3 w-8 text-center">{quantity}</span>
      
      <button
        type="button"
        className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary-100 text-secondary-600 hover:bg-secondary-200"
        onClick={handleIncrement}
        aria-label="Increase quantity"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
    </div>
  );
};
