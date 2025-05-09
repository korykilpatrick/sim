import type { BaseProduct } from '@shared-types/product';
import type { ProductConfigurationDetailsU } from '@shared-types/productConfiguration';

export interface CartItem {
  itemId: string; 
  product: BaseProduct;
  quantity: number;
  configuredPrice?: number; 
  configuredCreditCost?: number; 
  configurationDetails?: ProductConfigurationDetailsU; 
} 