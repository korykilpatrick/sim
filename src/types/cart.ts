import { BaseProduct, ProductServiceConfig } from './product';

export interface CartItem {
  // itemId: string; // Unique ID for the cart item instance - Removed for now
  product: BaseProduct;
  quantity: number;
  // configuredPrice?: number; // If configuration affects price - Removed for now
  // configuredCreditCost?: number; // - Removed for now
  configurationDetails: ProductServiceConfig; // Updated from any and made non-optional
}
