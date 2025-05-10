import type { BaseProduct } from '@shared-types/product';
import type { ProductConfigurationDetailsU } from '@shared-types/productConfiguration';

/**
 * Represents an item in the shopping cart
 */
export interface CartItem {
  /** Unique identifier for the cart item */
  itemId: string;
  /** Product information */
  product: BaseProduct;
  /** Quantity of the product */
  quantity: number;
  /** Price after configuration (if applicable) */
  configuredPrice?: number;
  /** Credit cost after configuration (if applicable) */
  configuredCreditCost?: number;
  /** Configuration details for the product */
  configurationDetails?: ProductConfigurationDetailsU;
}
