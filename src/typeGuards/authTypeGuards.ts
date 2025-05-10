/**
 * Auth Type Guards
 * 
 * Type guards specific to authentication and user types in the application.
 * These help ensure type safety when working with user authentication states.
 */

import type { User } from '@shared-types/user';
import type { AuthResponse, LoginRequest, RegisterRequest } from '@shared-types/auth';

import { isObject, hasProperty } from './baseTypeGuards';

/**
 * Type guard for checking if a value is a User.
 * 
 * @param value - Value to check
 * @returns True if the value is a valid User
 */
export function isUser(value: unknown): value is User {
  if (!isObject(value)) return false;
  
  const requiredProps: (keyof User)[] = [
    'id',
    'email',
    'firstName',
    'lastName'
  ];
  
  return requiredProps.every(prop => hasProperty(value, prop));
}

/**
 * Type guard for checking if a value is an AuthResponse.
 * 
 * @param value - Value to check
 * @returns True if the value is a valid AuthResponse
 */
export function isAuthResponse(value: unknown): value is AuthResponse {
  if (!isObject(value)) return false;
  
  return (
    hasProperty(value, 'user') &&
    hasProperty(value, 'token') &&
    isUser(value.user) &&
    typeof value.token === 'string'
  );
}

/**
 * Type guard for checking if a value is a LoginRequest.
 * 
 * @param value - Value to check
 * @returns True if the value is a valid LoginRequest
 */
export function isLoginRequest(value: unknown): value is LoginRequest {
  if (!isObject(value)) return false;
  
  return (
    hasProperty(value, 'email') &&
    hasProperty(value, 'password') &&
    typeof value.email === 'string' &&
    typeof value.password === 'string'
  );
}

/**
 * Type guard for checking if a value is a RegisterRequest.
 * 
 * @param value - Value to check
 * @returns True if the value is a valid RegisterRequest
 */
export function isRegisterRequest(value: unknown): value is RegisterRequest {
  if (!isObject(value)) return false;
  
  const requiredProps: (keyof RegisterRequest)[] = [
    'email',
    'password',
    'firstName',
    'lastName'
  ];
  
  return requiredProps.every(
    prop => hasProperty(value, prop) && typeof value[prop] === 'string'
  );
}