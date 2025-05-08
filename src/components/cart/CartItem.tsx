import React from 'react';
import { CartItem as CartItemType } from '@types/cart';
import { useAppDispatch } from '@hooks/redux';
import { updateItemQuantity, removeItem } from '@store/slices/cartSlice';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const { itemId, product, quantity, configuredPrice, configuredCreditCost } = item;
  
  const price = configuredPrice ?? product.price;
  const creditCost = configuredCreditCost ?? product.creditCost;
  const totalPrice = price * quantity;
  const totalCredits = creditCost * quantity;
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    dispatch(updateItemQuantity({ itemId, quantity: newQuantity }));
  };
  
  const handleRemove = () => {
    dispatch(removeItem(itemId));
  };
  
  // Get simplified configuration details for display
  const getConfigSummary = () => {
    if (!item.configurationDetails) return null;
    
    const { trackingDurationDays, monitoringDurationDays } = item.configurationDetails;
    const duration = trackingDurationDays || monitoringDurationDays;
    
    if (duration) {
      return `${duration} days`;
    }
    
    return null;
  };
  
  const configSummary = getConfigSummary();
  
  return (
    <div className="flex flex-col md:flex-row border-b border-secondary-200 py-6 last:border-b-0">
      {/* Product Image */}
      <div className="w-full md:w-24 h-24 flex-shrink-0 bg-secondary-100 rounded-md overflow-hidden">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
      
      {/* Product Info */}
      <div className="flex-1 md:ml-6 mt-4 md:mt-0">
        <div className="flex flex-col md:flex-row md:justify-between">
          <div>
            <h3 className="text-lg font-medium text-secondary-900">{product.name}</h3>
            <p className="mt-1 text-sm text-secondary-500">
              {configSummary ? (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                  {configSummary}
                </span>
              ) : null}
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 text-right">
            <p className="text-lg font-medium text-secondary-900">${totalPrice.toFixed(2)}</p>
            <p className="text-sm text-secondary-500">{totalCredits} credits</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <label htmlFor={`quantity-${itemId}`} className="mr-2 text-sm text-ocean-100">
              Qty
            </label>
            <div className="flex border border-navy-600 rounded-md">
              <button
                type="button"
                className="px-2 py-1 text-ocean-100 hover:bg-navy-600 bg-navy-700"
                onClick={() => handleQuantityChange(quantity - 1)}
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
                  if (!isNaN(val)) handleQuantityChange(val);
                }}
              />
              <button
                type="button"
                className="px-2 py-1 text-ocean-100 hover:bg-navy-600 bg-navy-700"
                onClick={() => handleQuantityChange(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>
          
          <button
            type="button"
            className="text-sm text-red-600 hover:text-red-800"
            onClick={handleRemove}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};