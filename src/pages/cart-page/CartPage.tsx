import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@hooks/useAppRedux';
import { clearCart } from '@features/cart/cartSlice';
import { CartItem } from '@features/cart/components';
import { OrderSummary } from '@features/cart/components/OrderSummary';
import { EmptyCartState } from '@features/cart/components/EmptyCartState';
import { Button } from '@components/ui/Button';

/**
 * Component for displaying the cart page
 *
 * @returns The rendered cart page with items list and order summary
 */
const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, totalAmount, totalCredits } = useAppSelector(
    (state) => state.cart,
  );
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  /**
   * Handles clearing the cart after confirmation
   */
  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearCart());
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Your Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1">
          {items.length > 0 ? (
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-secondary-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium text-secondary-900">
                    {items.length} Item{items.length !== 1 ? 's' : ''} in Cart
                  </h2>
                  <Button
                    type="button"
                    variant="danger"
                    size="sm"
                    onClick={handleClearCart}
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>

              <div className="divide-y divide-secondary-200">
                {items.map((item) => (
                  <div key={item.itemId} className="p-6">
                    <CartItem item={item} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <EmptyCartState />
          )}

          {items.length > 0 && (
            <div className="mt-8">
              <Link
                to="/marketplace"
                className="text-primary-600 hover:text-primary-800"
              >
                &larr; Continue Shopping
              </Link>
            </div>
          )}
        </div>

        {/* Order Summary */}
        {items.length > 0 && (
          <div className="lg:w-96">
            <OrderSummary
              subtotal={totalAmount}
              totalCredits={totalCredits}
              itemCount={items.length}
              isAuthenticated={isAuthenticated}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
