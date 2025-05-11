/**
 * Central location for all validation schemas
 * 
 * This file exports all validation schemas used throughout the application
 * to ensure consistency and avoid duplication.
 */

import { z } from 'zod';

/**
 * User schema for validation
 */
export const userSchema = z.object({
  id: z.string(),
  email: z.string().email('Please enter a valid email address'),
  name: z.string().optional(),
  company: z.string().optional(),
});

/**
 * Login form schema for validation
 */
export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

/**
 * Registration form schema for validation
 */
export const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

/**
 * User profile schema for validation
 */
export const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
});

/**
 * Base product schema for validation
 */
export const baseProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  shortDescription: z.string(),
  fullDescription: z.string(),
  price: z.number(),
  creditCost: z.number().optional(),
  imageUrl: z.string().optional(),
  category: z.string(),
});

/**
 * Cart item schema for validation
 */
export const cartItemSchema = z.object({
  itemId: z.string(),
  product: baseProductSchema,
  quantity: z.number().int().positive(),
  configuredPrice: z.number().optional(),
  configuredCreditCost: z.number().optional(),
  configurationDetails: z.any().optional(),
});

/**
 * Checkout form schema for validation
 */
export const checkoutSchema = z.object({
  name: z.string().min(1, 'Full name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: z.string().min(1, 'ZIP code is required'),
  country: z.string().min(1, 'Country is required'),
  cardNumber: z.string().optional(),
  expiryDate: z.string().optional(),
  cvv: z.string().optional(),
  cardholderName: z.string().optional(),
});
