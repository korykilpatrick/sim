import type { ProductType } from '@shared-types/product';
import type { ProductConfigurationDetailsU } from '@shared-types/productConfiguration';

export type UserProductStatus =
  | 'active'
  | 'pending_activation'
  | 'expired'
  | 'cancelled'
  | 'suspended';

export interface UserProduct {
  id: string; 
  orderId?: string; 
  productId: string; 
  name: string; 
  type: ProductType; 
  userId: string; 
  purchaseDate: string; 
  activationDate?: string; 
  expiryDate?: string; 
  status: UserProductStatus;
  configuration: ProductConfigurationDetailsU; 
  lastUpdated?: string; 
} 