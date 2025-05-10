import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@hooks/redux';
import { clearCart } from '@store/slices/cartSlice';
import { CartItem } from '@components/cart/CartItem';
import { OrderSummary } from '@components/cart/OrderSummary';
import { Button } from '@components/common';

const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, totalAmount, totalCredits } = useAppSelector(
    (state) => state.cart,
  );
  const { isAuthenticated } = useAppSelector((state) => state.auth);

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
                  <button
                    type="button"
                    className="text-sm text-red-600 hover:text-red-800"
                    onClick={handleClearCart}
                  >
                    Clear Cart
                  </button>
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
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto text-secondary-400 mb-4"
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
              <h2 className="text-xl font-medium text-secondary-900 mb-2">
                Your cart is empty
              </h2>
              <p className="text-secondary-600 mb-6">
                Looks like you haven&apos;t added any products to your cart yet.
              </p>
              <Link to="/marketplace">
                <Button variant="primary">Browse Products</Button>
              </Link>
            </div>
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
