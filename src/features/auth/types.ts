/**
 * Authentication types for the SIM application
 */

/**
 * User interface representing an authenticated user
 */
export interface User {
  id: string;
  email: string;
  name?: string;
  credits: number;
  firstName?: string;
  lastName?: string;
  role?: UserRole;
  organization?: string;
  createdAt?: string;
  lastLogin?: string;
}

/**
 * User role enum
 */
export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  ANALYST = 'ANALYST',
}

/**
 * Login request interface
 */
export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

/**
 * Login response interface
 */
export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

/**
 * Register request interface
 */
export interface RegisterRequest {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  organization?: string;
}

/**
 * Register response interface
 */
export interface RegisterResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

/**
 * Auth state interface for Redux
 */
export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
