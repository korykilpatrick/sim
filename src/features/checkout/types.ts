import { z } from 'zod';
import { checkoutSchema } from '@lib/zodSchemas';

/**
 * Type for checkout form values derived from the validation schema
 */
export type CheckoutFormValues = z.infer<typeof checkoutSchema>;

/**
 * Available payment methods for checkout
 */
export type PaymentMethod = 'credit_card' | 'credits';
