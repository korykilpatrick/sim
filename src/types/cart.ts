import { BaseProduct } from './product';

export interface CartItem {
  itemId: string; // Unique ID for the cart item instance
  product: BaseProduct;
  quantity: number;
  configuredPrice?: number; // If configuration affects price
  configuredCreditCost?: number;
  configurationDetails?: any; // To store VTSConfig, AMSConfig etc.
}