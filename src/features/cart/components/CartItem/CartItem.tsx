import { FC } from 'react';
import { CartItem as CartItemType } from '@/types';
import { useAppDispatch } from '@hooks/useAppRedux';
import { updateItemQuantity, removeItem } from '@features/cart/cartSlice';
import { CartItemImage } from '../CartItemImage';
import { CartItemDetails } from '../CartItemDetails';
import { QuantityControl } from '../QuantityControl';
import { RemoveButton } from '../RemoveButton';

/**
 * Props for the CartItem component
 */
type CartItemProps = {
  /** The cart item to display */
  item: CartItemType;
};

/**
 * Displays a cart item with product details, quantity control, and removal option
 *
 * @param props - The component props
 * @param props.item - The cart item to display
 * @returns The rendered cart item component
 */
export const CartItem: FC<CartItemProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const {
    itemId,
    product,
    quantity,
    configuredPrice,
    configuredCreditCost,
    configurationDetails,
  } = item;

  const price = configuredPrice ?? product.price;
  const creditCost = configuredCreditCost ?? product.creditCost;
  const totalPrice = price * quantity;
  const totalCredits = creditCost * quantity;

  const handleQuantityChange = (newQuantity: number): void => {
    if (newQuantity < 1) return;
    dispatch(updateItemQuantity({ itemId, quantity: newQuantity }));
  };

  const handleRemove = (): void => {
    dispatch(removeItem(itemId));
  };

  return (
    <div className="flex flex-col md:flex-row border-b border-secondary-200 py-6 last:border-b-0">
      {/* Product Image */}
      <CartItemImage imageUrl={product.imageUrl} alt={product.name} />

      <div className="flex-1 md:ml-6 mt-4 md:mt-0">
        {/* Product Info */}
        <CartItemDetails
          productName={product.name}
          configurationDetails={configurationDetails}
          totalPrice={totalPrice}
          totalCredits={totalCredits}
        />

        <div className="flex items-center justify-between mt-4">
          {/* Quantity Control */}
          <QuantityControl
            itemId={itemId}
            quantity={quantity}
            onQuantityChange={handleQuantityChange}
          />

          {/* Remove Button */}
          <RemoveButton onRemove={handleRemove} />
        </div>
      </div>
    </div>
  );
};
