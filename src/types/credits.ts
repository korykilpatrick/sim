export interface CreditTransaction {
  id: string;
  amount: number; // positive for credit purchase, negative for credit usage
  description: string;
  timestamp: string; // ISO date string
  orderId?: string; // If associated with an order
  productId?: string; // If associated with a product
}