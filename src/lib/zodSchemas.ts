/**
 * Zod schemas for validation
 */

import { z } from 'zod';

/**
 * Login schema for validation
 */
export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional(),
});

/**
 * Registration schema for validation
 */
export const registrationSchema = z
  .object({
    email: z.string().email('Please enter a valid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string(),
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    organization: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

/**
 * Checkout schema for validation
 */
export const checkoutSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  paymentMethod: z.enum(['credit_card', 'credits', 'invoice']),
  billingAddress: z.object({
    street: z.string().min(5, 'Street address must be at least 5 characters'),
    city: z.string().min(2, 'City must be at least 2 characters'),
    state: z.string().min(2, 'State must be at least 2 characters'),
    zipCode: z.string().min(5, 'Zip code must be at least 5 characters'),
    country: z.string().min(2, 'Country must be at least 2 characters'),
  }),
  creditCardInfo: z
    .object({
      cardNumber: z.string().regex(/^\d{16}$/, 'Card number must be 16 digits'),
      cardholderName: z
        .string()
        .min(5, 'Cardholder name must be at least 5 characters'),
      expirationMonth: z
        .string()
        .regex(/^(0[1-9]|1[0-2])$/, 'Expiration month must be between 01-12'),
      expirationYear: z
        .string()
        .regex(/^\d{4}$/, 'Expiration year must be 4 digits'),
      cvv: z.string().regex(/^\d{3,4}$/, 'CVV must be 3 or 4 digits'),
    })
    .optional(),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
});

/**
 * Change password schema for validation
 */
export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, 'Current password must be at least 8 characters'),
    newPassword: z
      .string()
      .min(8, 'New password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Passwords do not match',
    path: ['confirmNewPassword'],
  });

/**
 * User profile schema for validation
 */
export const userProfileSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  organization: z.string().optional(),
  jobTitle: z.string().optional(),
  phoneNumber: z
    .string()
    .regex(/^\+?[0-9\s-()]{10,15}$/, 'Please enter a valid phone number')
    .optional(),
});

/**
 * Notification preferences schema for validation
 */
export const notificationPreferencesSchema = z.object({
  emailNotifications: z.boolean(),
  smsNotifications: z.boolean(),
  marketingEmails: z.boolean(),
  alertFrequency: z.enum(['immediate', 'daily', 'weekly']),
});
