import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Button } from '@components/common/Button';
import { CartItem } from '@shared-types/cart';

interface LocationState {
  orderId: string;
  items: CartItem[];
}

const PaymentConfirmationPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;

  // If there's no order information, redirect to marketplace
  if (!state || !state.orderId) {
    navigate('/marketplace');
    return null;
  }

  const { orderId, items } = state;

  // Find products that need to be launched/configured
  const launchableProducts = items.filter((item) =>
    ['VTS', 'AMS', 'FTS', 'MARITIME_ALERT'].includes(item.product.type),
  );

  const hasReports = items.some((item) =>
    ['REPORT_COMPLIANCE', 'REPORT_CHRONOLOGY'].includes(item.product.type),
  );

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-secondary-900 mb-2">
          Payment Successful!
        </h1>
        <p className="text-secondary-600 mb-6">
          Thank you for your purchase. Your order has been successfully
          processed.
        </p>

        <div className="border border-secondary-200 rounded-md p-4 mb-6 bg-secondary-50">
          <p className="text-secondary-700">
            <span className="font-medium">Order ID:</span> {orderId}
          </p>
        </div>

        <div className="space-y-6 mb-8">
          <div>
            <h3 className="text-lg font-medium text-secondary-900 mb-3">
              Order Summary
            </h3>
            <div className="space-y-3">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between py-3 border-b border-secondary-200 last:border-b-0"
                >
                  <div className="text-left">
                    <p className="text-secondary-900 font-medium">
                      {item.product.name}
                    </p>
                    <p className="text-sm text-secondary-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="text-secondary-900">
                    $
                    {(
                      (item.configuredPrice || item.product.price) *
                      item.quantity
                    ).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-secondary-200 pt-4">
            <p className="text-secondary-600 text-sm mb-2">
              A confirmation email has been sent to your email address.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {launchableProducts.length > 0 && (
            <Link to="/protected/dashboard">
              <Button variant="primary" fullWidth>
                Launch Your Products
              </Button>
            </Link>
          )}

          {hasReports && (
            <Link to="/protected/reports">
              <Button variant="outline" fullWidth>
                View Your Reports
              </Button>
            </Link>
          )}

          <Link to="/marketplace">
            <Button
              variant={
                !launchableProducts.length && !hasReports
                  ? 'primary'
                  : 'outline'
              }
              fullWidth
            >
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmationPage;
