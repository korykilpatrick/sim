import type { BaseProduct } from '@shared-types/product';
import type { ProductConfigurationDetailsU } from '@shared-types/productConfiguration';
import type { PaymentGatewayDetails } from '@shared-types/payment';

export interface OrderItem {
  product: BaseProduct;
  quantity: number;
  configurationDetails: ProductConfigurationDetailsU;
}

export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'cancelled'
  | 'refunded';

export type PaymentMethod = 'credits' | 'stripe' | 'paypal'; 

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number; 
  totalCredits: number;
  paymentMethod: PaymentMethod;
  paymentDetails?: PaymentGatewayDetails;
  status: OrderStatus;
  purchaseDate: string; 
  lastUpdated?: string; 
  transactionId?: string; 
}

export interface CreateOrderRequestBody {
  items: OrderItem[];
  paymentMethod: PaymentMethod;
  paymentDetails?: PaymentGatewayDetails;
} 