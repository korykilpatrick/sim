export interface PaymentGatewayDetails {
  paymentMethodId?: string;
  paymentType: 'card' | 'paypal' | 'bank_transfer' | 'crypto' | 'other';
  billingAddress?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  cardBrand?: string;
  payPalOrderId?: string;
}
