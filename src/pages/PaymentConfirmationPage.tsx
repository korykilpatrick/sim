import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  OrderConfirmationHeader,
  OrderSummaryList,
  ConfirmationActions,
} from '@components/confirmation';
import { CartItem } from '@shared-types/cart';

/**
 * Interface for location state containing order information
 */
interface LocationState {
  orderId: string;
  items: CartItem[];
}

/**
 * Component for displaying payment confirmation page
 */
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

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <OrderConfirmationHeader orderId={orderId} />
        <OrderSummaryList items={items} />
        <ConfirmationActions items={items} />
      </div>
    </div>
  );
};

export default PaymentConfirmationPage;
