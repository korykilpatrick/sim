import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppSelector, useAppDispatch } from '@hooks/redux';
import { clearCart } from '@store/slices/cartSlice';
import { useCreateOrderMutation } from '@services/ordersApi';
import { Alert, Button } from '@components/common';
import {
  ShippingAddressForm,
  PaymentMethodSelector,
  PaymentDetailsForm,
  OrderSummary,
} from '@components/checkout';
import {
  checkoutSchema,
  type CheckoutFormValues,
  type PaymentMethod,
} from '@shared-types/checkout';

/**
 * Checkout page component for completing purchases
 * 
 * @returns The rendered checkout page with forms and order summary
 */
const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items, totalAmount, totalCredits } = useAppSelector(
    (state) => state.cart,
  );
  const { balance: credits } = useAppSelector((state) => state.credits);

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>('credit_card');
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
  });

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
            <ShippingAddressForm register={register} errors={errors} />

            {/* Payment Method */}
            <PaymentMethodSelector
              paymentMethod={paymentMethod}
              onPaymentMethodChange={setPaymentMethod}
              availableCredits={credits}
              requiredCredits={totalCredits}
            />

            {/* Payment Details Form */}
            <PaymentDetailsForm
              register={register}
              errors={errors}
              visible={paymentMethod === 'credit_card'}
            />
          </div>

          {/* Order Summary */}
          <div className="lg:w-96">
            <OrderSummary
              items={items}
              totalAmount={totalAmount}
              totalCredits={totalCredits}
              paymentMethod={paymentMethod}
              isLoading={isLoading}
              isDisabled={
                isLoading ||
                (paymentMethod === 'credits' && !hasSufficientCredits)
              }
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
