import { z } from 'zod';

/**
 * Validation schema for checkout form
 */
export const checkoutSchema = z.object({
  name: z.string().min(1, 'Full name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: z.string().min(1, 'ZIP code is required'),
  country: z.string().min(1, 'Country is required'),
  cardNumber: z
    .string()
    .min(1, 'Card number is required')
    .regex(/^\d{16}$/, 'Card number must be 16 digits'),
  expiryDate: z
    .string()
    .min(1, 'Expiry date is required')
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiry date must be in MM/YY format'),
  cvv: z
    .string()
    .min(1, 'CVV is required')
    .regex(/^\d{3,4}$/, 'CVV must be 3 or 4 digits'),
  cardholderName: z.string().min(1, 'Cardholder name is required'),
});

/**
 * Type for checkout form values derived from the validation schema
 */
export type CheckoutFormValues = z.infer<typeof checkoutSchema>;

/**
 * Available payment methods for checkout
 */
export type PaymentMethod = 'credit_card' | 'credits';
