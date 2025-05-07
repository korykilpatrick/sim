import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@components/common/Button';

interface OrderSummaryProps {
  subtotal: number;
  totalCredits: number;
  itemCount: number;
  isAuthenticated: boolean;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  totalCredits,
  itemCount,
  isAuthenticated,
}) => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<'money' | 'credits'>('money');
  
  // Calculate tax (mock calculation - in a real app, this would be server-side)
  const taxRate = 0.08; // 8%
  const taxAmount = subtotal * taxRate;
  const total = subtotal + taxAmount;
  
  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate('/protected/checkout');
    } else {
      navigate('/auth/login', { state: { from: '/protected/checkout' } });
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium text-secondary-900 mb-4">Order Summary</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between">
          <p className="text-secondary-600">Subtotal ({itemCount} item{itemCount !== 1 ? 's' : ''})</p>
          <p className="text-secondary-900 font-medium">${subtotal.toFixed(2)}</p>
        </div>
        
        <div className="flex justify-between">
          <p className="text-secondary-600">Tax (8%)</p>
          <p className="text-secondary-900 font-medium">${taxAmount.toFixed(2)}</p>
        </div>
        
        <div className="pt-4 border-t border-secondary-200">
          <div className="flex justify-between">
            <p className="text-secondary-900 font-medium">Total</p>
            <p className="text-secondary-900 font-bold">${total.toFixed(2)}</p>
          </div>
          
          <div className="flex justify-between mt-1">
            <p className="text-secondary-600 text-sm">or credits</p>
            <p className="text-secondary-900 font-medium text-sm">{totalCredits} credits</p>
          </div>
        </div>
        
        {isAuthenticated && (
          <div className="pt-4">
            <p className="text-sm font-medium text-secondary-700 mb-2">Select payment method:</p>
            
            <div className="flex space-x-2 mb-4">
              <button
                className={`flex-1 py-2 rounded-md border ${
                  paymentMethod === 'money'
                    ? 'bg-primary-50 border-primary-500 text-primary-700'
                    : 'border-secondary-300 text-secondary-700 hover:bg-secondary-50'
                }`}
                onClick={() => setPaymentMethod('money')}
              >
                Pay with money
              </button>
              
              <button
                className={`flex-1 py-2 rounded-md border ${
                  paymentMethod === 'credits'
                    ? 'bg-primary-50 border-primary-500 text-primary-700'
                    : 'border-secondary-300 text-secondary-700 hover:bg-secondary-50'
                }`}
                onClick={() => setPaymentMethod('credits')}
              >
                Use credits
              </button>
            </div>
          </div>
        )}
        
        <Button 
          variant="primary" 
          fullWidth 
          onClick={handleCheckout}
          disabled={itemCount === 0}
        >
          {isAuthenticated ? 'Proceed to Checkout' : 'Sign in to Checkout'}
        </Button>
      </div>
    </div>
  );
};