/**
 * Validation utilities using Zod for runtime type checking.
 * These utilities help ensure that data conforms to expected shapes at runtime.
 */

import { z } from 'zod';
import type { User } from '@features/auth/types';
import type { BaseProduct } from '@features/products/types';
import type { CartItem } from '@features/cart/types';
import type { ValidatedRequest } from '@app/types';
import { isObject } from '@lib/typeGuards';

/**
 * User schema for validation
 */
export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().optional(),
  credits: z.number().nonnegative(),
});

/**
 * Base product schema for validation
 */
export const BaseProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  shortDescription: z.string(),
  longDescription: z.string(),
  type: z.string(),
  price: z.number().nonnegative(),
  creditCost: z.number().nonnegative(),
  imageUrl: z.string().url().optional(),
  tags: z.array(z.string()).optional(),
});

/**
 * Cart item schema for validation
 */
export const CartItemSchema = z.object({
  itemId: z.string(),
  product: BaseProductSchema,
  quantity: z.number().int().positive(),
  configuredPrice: z.number().nonnegative().optional(),
  configuredCreditCost: z.number().nonnegative().optional(),
  configurationDetails: z.unknown().optional(),
});

/**
 * Validates a user object against the User schema
 * @param data - Data to validate as a User
 * @returns The validated User object
 * @throws {z.ZodError} When validation fails
 */
export function validateUser(data: unknown): User {
  return UserSchema.parse(data);
}

/**
 * Validates a product object against the BaseProduct schema
 * @param data - Data to validate as a BaseProduct
 * @returns The validated BaseProduct object
 * @throws {z.ZodError} When validation fails
 */
export function validateProduct(data: unknown): BaseProduct {
  return BaseProductSchema.parse(data);
}

/**
 * Validates a cart item object against the CartItem schema
 * @param data - Data to validate as a CartItem
 * @returns The validated CartItem object
 * @throws {z.ZodError} When validation fails
 */
export function validateCartItem(data: unknown): CartItem {
  return CartItemSchema.parse(data);
}

/**
 * Safe validation that doesn't throw but returns validation status
 * @param schema - Zod schema to validate against
 * @param data - Data to validate
 * @returns Validation result object with data and validation status
 */
export function safeValidate<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
): ValidatedRequest<T> {
  try {
    const validData = schema.parse(data);
    return {
      data: validData,
      isValid: true,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Convert Zod error format to a more usable structure
      const validationErrors: Record<string, string[]> = {};

      error.errors.forEach((err) => {
        const path = err.path.join('.') || 'root';
        if (!validationErrors[path]) {
          validationErrors[path] = [];
        }
        validationErrors[path].push(err.message);
      });

      return {
        // Cast to T is safe here since we know validation failed
        data: (isObject(data) ? data : {}) as unknown as T,
        isValid: false,
        validationErrors,
      };
    }

    // Handle unexpected errors
    return {
      data: (isObject(data) ? data : {}) as unknown as T,
      isValid: false,
      validationErrors: {
        unexpected: ['An unexpected error occurred during validation'],
      },
    };
  }
}

/**
 * Login form data schema
 */
export const LoginFormSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional(),
});

/**
 * Registration form data schema
 */
export const RegisterFormSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

// Type inference from schemas
export type LoginFormData = z.infer<typeof LoginFormSchema>;
export type RegisterFormData = z.infer<typeof RegisterFormSchema>;
