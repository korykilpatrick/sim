import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAppSelector, useAppDispatch } from '@hooks/redux';
import { clearCart } from '@store/slices/cartSlice';
import { useCreateOrderMutation } from '@services/ordersApi';
import { Input } from '@components/common/Input';
import { Button } from '@components/common/Button';
import { Spinner } from '@components/common/Spinner';
import { Alert } from '@components/common/Alert';

// Form validation schema
const checkoutSchema = z.object({
  name: z.string().min(1, 'Full name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: z.string().min(1, 'ZIP code is required'),
  country: z.string().min(1, 'Country is required'),
  cardNumber: z
    .string()
    .min(1, 'Card number is required')
    .regex(/^\d{16}$/, 'Card number must be 16 digits'),
  expiryDate: z
    .string()
    .min(1, 'Expiry date is required')
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiry date must be in MM/YY format'),
  cvv: z
    .string()
    .min(1, 'CVV is required')
    .regex(/^\d{3,4}$/, 'CVV must be 3 or 4 digits'),
  cardholderName: z.string().min(1, 'Cardholder name is required'),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items, totalAmount, totalCredits } = useAppSelector(
    (state) => state.cart,
  );
  const { balance: credits } = useAppSelector((state) => state.credits);

  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'credits'>(
    'credit_card',
  );
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
  });

  // Calculate tax and total
  const taxRate = 0.08; // 8%
  const taxAmount = totalAmount * taxRate;
  const total = totalAmount + taxAmount;

  const hasSufficientCredits = credits >= totalCredits;

  const onSubmit = async (data: CheckoutFormValues) => {
    if (items.length === 0) return;

    try {
      // In a real app, we would send payment info to a payment processor separately
      // Here we're just mocking the order creation
      const orderData = {
        items,
        totalAmount,
        totalCredits,
        paymentMethod,
        billingDetails: {
          name: data.name,
          address: data.address,
          city: data.city,
          state: data.state,
          zipCode: data.zipCode,
          country: data.country,
        },
        paymentDetails:
          paymentMethod === 'credit_card'
            ? {
                cardNumber: data.cardNumber,
                expiryDate: data.expiryDate,
                cvv: data.cvv,
                cardholderName: data.cardholderName,
              }
            : undefined,
      };

      const result = await createOrder(orderData).unwrap();
      dispatch(clearCart());

      // Navigate to confirmation page with order ID
      navigate('/protected/confirmation', {
        state: {
          orderId: result.order.id,
          items: result.order.items,
        },
      });
    } catch (_err) {
      // Error is handled by RTK Query and available in the error variable
    }
  };

  if (items.length === 0) {
    return (
      <div className="text-center">
        <Alert
          variant="info"
          title="Empty Cart"
          message="Your cart is empty. Please add some products before proceeding to checkout."
        />
        <div className="mt-6">
          <Button variant="primary" onClick={() => navigate('/marketplace')}>
            Browse Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>

      {error && (
        <Alert
          variant="error"
          title="Checkout Error"
          message="There was an error processing your order. Please try again."
          className="mb-6"
        />
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Checkout Form */}
          <div className="flex-1 space-y-8">
            {/* Billing Information */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-secondary-900 mb-4">
                Billing Information
              </h2>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Input
                    label="Full Name"
                    placeholder="John Doe"
                    error={errors.name?.message}
                    {...register('name')}
                  />
                </div>

                <div className="sm:col-span-2">
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="john@example.com"
                    error={errors.email?.message}
                    {...register('email')}
                  />
                </div>

                <div className="sm:col-span-2">
                  <Input
                    label="Address"
                    placeholder="123 Main St"
                    error={errors.address?.message}
                    {...register('address')}
                  />
                </div>

                <div>
                  <Input
                    label="City"
                    placeholder="New York"
                    error={errors.city?.message}
                    {...register('city')}
                  />
                </div>

                <div>
                  <Input
                    label="State / Province"
                    placeholder="NY"
                    error={errors.state?.message}
                    {...register('state')}
                  />
                </div>

                <div>
                  <Input
                    label="ZIP / Postal Code"
                    placeholder="10001"
                    error={errors.zipCode?.message}
                    {...register('zipCode')}
                  />
                </div>

                <div>
                  <Input
                    label="Country"
                    placeholder="United States"
                    error={errors.country?.message}
                    {...register('country')}
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-secondary-900 mb-4">
                Payment Method
              </h2>

              <div className="mb-6">
                <div className="flex space-x-4">
                  <label className="relative flex items-center">
                    <input
                      type="radio"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300"
                      checked={paymentMethod === 'credit_card'}
                      onChange={() => setPaymentMethod('credit_card')}
                    />
                    <span className="ml-2 text-secondary-700">Credit Card</span>
                  </label>

                  <label className="relative flex items-center">
                    <input
                      type="radio"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300"
                      checked={paymentMethod === 'credits'}
                      onChange={() => setPaymentMethod('credits')}
                      disabled={!hasSufficientCredits}
                    />
                    <span className="ml-2 text-secondary-700">
                      Use Credits ({credits} available)
                      {!hasSufficientCredits && (
                        <span className="text-red-500 ml-2">
                          Insufficient credits
                        </span>
                      )}
                    </span>
                  </label>
                </div>
              </div>

              {paymentMethod === 'credit_card' && (
                <div className="space-y-4">
                  <div>
                    <Input
                      label="Card Number"
                      placeholder="1234 5678 9012 3456"
                      error={errors.cardNumber?.message}
                      {...register('cardNumber')}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Input
                        label="Expiry Date"
                        placeholder="MM/YY"
                        error={errors.expiryDate?.message}
                        {...register('expiryDate')}
                      />
                    </div>

                    <div>
                      <Input
                        label="CVV"
                        placeholder="123"
                        error={errors.cvv?.message}
                        {...register('cvv')}
                      />
                    </div>

                    <div className="col-span-3">
                      <Input
                        label="Cardholder Name"
                        placeholder="John Doe"
                        error={errors.cardholderName?.message}
                        {...register('cardholderName')}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-96">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-secondary-900 mb-4">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.itemId} className="flex justify-between">
                    <div>
                      <p className="text-secondary-900">{item.product.name}</p>
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

              <div className="border-t border-secondary-200 pt-4 space-y-2">
                <div className="flex justify-between">
                  <p className="text-secondary-600">Subtotal</p>
                  <p className="text-secondary-900">
                    ${totalAmount.toFixed(2)}
                  </p>
                </div>

                <div className="flex justify-between">
                  <p className="text-secondary-600">Tax (8%)</p>
                  <p className="text-secondary-900">${taxAmount.toFixed(2)}</p>
                </div>

                <div className="pt-2 border-t border-secondary-200">
                  <div className="flex justify-between font-medium">
                    <p className="text-secondary-900">Total</p>
                    <p className="text-secondary-900">${total.toFixed(2)}</p>
                  </div>

                  {paymentMethod === 'credits' && (
                    <div className="flex justify-between mt-1">
                      <p className="text-secondary-600 text-sm">
                        Credits to be used:
                      </p>
                      <p className="text-secondary-900 font-medium text-sm">
                        {totalCredits}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  isLoading={isLoading}
                  disabled={
                    isLoading ||
                    (paymentMethod === 'credits' && !hasSufficientCredits)
                  }
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <Spinner size="sm" color="white" className="mr-2" />
                      Processing...
                    </span>
                  ) : (
                    `Complete ${paymentMethod === 'credit_card' ? 'Purchase' : 'Order'}`
                  )}
                </Button>
              </div>

              <p className="text-xs text-secondary-500 text-center mt-4">
                By completing your purchase, you agree to our Terms of Service
                and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
