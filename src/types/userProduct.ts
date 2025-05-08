import { ProductServiceConfig, ProductType } from './product';

export type UserProductStatus = 'active' | 'pending_activation' | 'expired' | 'cancelled' | 'suspended';

export interface UserProduct {
  id: string; // Unique ID for this instance of a user owning/using a product
  orderId?: string; // ID of the order through which this product was acquired
  productId: string; // Reference to the BaseProduct.id
  name: string; // Denormalized from BaseProduct for convenience
  type: ProductType; // Denormalized from BaseProduct
  userId: string; // The user who owns this product instance
  purchaseDate: string; // ISO 8601 date string
  activationDate?: string; // ISO 8601 date string, if activation is separate from purchase
  expiryDate?: string; // ISO 8601 date string, if applicable
  status: UserProductStatus;
  configuration: ProductServiceConfig; // The specific configuration for this instance
  lastUpdated?: string; // ISO 8601 date string
} 