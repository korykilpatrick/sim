export interface PaymentGatewayDetails {
  paymentMethodId?: string; // e.g., 'pm_123abc' from Stripe, or a token from another provider
  paymentType: 'card' | 'paypal' | 'bank_transfer' | 'crypto' | 'other'; // The type of payment method used
  // Billing details might be collected separately or be part of this
  billingAddress?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string; // ISO 3166-1 alpha-2 country code
  };
  // Any other provider-specific details can be added here
  // For example, if using a specific card brand for some reason:
  cardBrand?: string; // e.g., 'visa', 'mastercard'
  // For PayPal, it might be an order ID or similar identifier
  payPalOrderId?: string;
}

// If you were to use something like Stripe Elements, the paymentDetails
// might just be a PaymentMethod ID created on the client-side.
// export interface StripePaymentDetails {
//   paymentMethodId: string; // Typically pm_xxx
//   // Stripe might also require a return_url for certain payment flows
//   returnUrl?: string;
// } 