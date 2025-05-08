import { BaseProduct, ProductServiceConfig, ProductType } from './product';
import { PaymentGatewayDetails } from './payment';

export interface OrderItem {
  product: BaseProduct; // Or a more specific product type, TBD
  quantity: number;
  configurationDetails: ProductServiceConfig; // This should be discriminated based on product.type
}

export type OrderStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled' | 'refunded';
export type PaymentMethod = 'credits' | 'stripe' | 'paypal'; // Example payment methods

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number; // Usually in the smallest currency unit, e.g., cents
  totalCredits: number;
  paymentMethod: PaymentMethod;
  paymentDetails?: PaymentGatewayDetails;
  status: OrderStatus;
  purchaseDate: string; // ISO 8601 date string
  lastUpdated?: string; // ISO 8601 date string
  transactionId?: string; // From payment gateway
} 