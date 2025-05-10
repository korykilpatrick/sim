/**
 * Comprehensive error handling types for the application.
 * This module provides type-safe error definitions and utilities.
 */

/**
 * Error codes used throughout the application.
 * Maintaining this enum ensures consistent error handling.
 */
export enum ErrorCode {
  // Generic errors
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',

  // Authentication errors
  AUTHENTICATION_FAILED = 'AUTHENTICATION_FAILED',
  UNAUTHORIZED = 'UNAUTHORIZED',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',

  // Authorization errors
  FORBIDDEN = 'FORBIDDEN',
  INSUFFICIENT_PERMISSIONS = 'INSUFFICIENT_PERMISSIONS',

  // Resource errors
  NOT_FOUND = 'NOT_FOUND',
  RESOURCE_EXISTS = 'RESOURCE_EXISTS',
  RESOURCE_LIMIT_REACHED = 'RESOURCE_LIMIT_REACHED',

  // Validation errors
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INVALID_INPUT = 'INVALID_INPUT',
  MISSING_REQUIRED_FIELD = 'MISSING_REQUIRED_FIELD',

  // Business logic errors
  INSUFFICIENT_CREDITS = 'INSUFFICIENT_CREDITS',
  PAYMENT_FAILED = 'PAYMENT_FAILED',
  OPERATION_FAILED = 'OPERATION_FAILED',

  // Server errors
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',

  // API errors
  API_ERROR = 'API_ERROR',
  RATE_LIMITED = 'RATE_LIMITED',
}

/**
 * Base Application Error interface.
 * All application errors must conform to this structure.
 */
export interface AppError {
  code: ErrorCode;
  message: string;
  status?: number;
  details?: Record<string, unknown>;
  stack?: string;
  timestamp: string;
}

/**
 * API Error returned from server responses.
 * This should match the error format returned by the backend.
 */
export interface ApiError {
  code: string;
  message: string;
  status: number;
  details?: Record<string, unknown>;
  timestamp?: string;
}

/**
 * Redux Toolkit Query error type.
 * Matches the error structure from RTK Query.
 */
export interface RtkQueryError {
  status: number;
  data: ApiError;
}

/**
 * Validation error structure for form validations.
 */
export interface ValidationError {
  field: string;
  message: string;
  code?: string;
}

/**
 * Error response from a form submission with validation errors.
 */
export interface FormValidationErrorResponse {
  message: string;
  errors: ValidationError[];
}

/**
 * Converts any error type to a strongly-typed AppError.
 * This ensures consistent error handling throughout the application.
 */
export function toAppError(error: unknown): AppError {
  if (isAppError(error)) {
    return error;
  }

  if (isApiError(error)) {
    return {
      code: mapApiErrorCodeToErrorCode(error.code),
      message: error.message,
      status: error.status,
      details: error.details,
      timestamp: error.timestamp || new Date().toISOString(),
    };
  }

  if (isRtkQueryError(error)) {
    return toAppError(error.data);
  }

  if (error instanceof Error) {
    return {
      code: ErrorCode.UNKNOWN_ERROR,
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    };
  }

  // Handle primitive error values or other unusual errors
  return {
    code: ErrorCode.UNKNOWN_ERROR,
    message: typeof error === 'string' ? error : 'An unknown error occurred',
    details:
      typeof error === 'object' && error !== null
        ? { originalError: error }
        : undefined,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Type guard for AppError.
 */
export function isAppError(error: unknown): error is AppError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    'message' in error &&
    'timestamp' in error
  );
}

/**
 * Type guard for ApiError.
 */
export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    'message' in error &&
    'status' in error
  );
}

/**
 * Type guard for RTK Query errors.
 */
export function isRtkQueryError(error: unknown): error is RtkQueryError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    'data' in error &&
    isApiError((error as RtkQueryError).data)
  );
}

/**
 * Maps API error codes to our internal error codes.
 */
function mapApiErrorCodeToErrorCode(apiCode: string): ErrorCode {
  // Try to match the API code directly to our ErrorCode enum
  if (Object.values(ErrorCode).includes(apiCode as ErrorCode)) {
    return apiCode as ErrorCode;
  }

  // Handle specific mapping cases
  switch (apiCode) {
    case 'UNAUTHENTICATED':
      return ErrorCode.AUTHENTICATION_FAILED;
    case 'PERMISSION_DENIED':
      return ErrorCode.FORBIDDEN;
    case 'NOT_FOUND':
      return ErrorCode.NOT_FOUND;
    case 'ALREADY_EXISTS':
      return ErrorCode.RESOURCE_EXISTS;
    case 'INVALID_ARGUMENT':
      return ErrorCode.VALIDATION_ERROR;
    case 'FAILED_PRECONDITION':
      return ErrorCode.OPERATION_FAILED;
    case 'ABORTED':
      return ErrorCode.OPERATION_FAILED;
    case 'INTERNAL':
      return ErrorCode.INTERNAL_SERVER_ERROR;
    case 'UNAVAILABLE':
      return ErrorCode.SERVICE_UNAVAILABLE;
    default:
      return ErrorCode.API_ERROR;
  }
}

/**
 * Creates a user-friendly error message from an AppError.
 */
export function getUserFriendlyErrorMessage(error: AppError): string {
  // Customize error messages based on error code
  switch (error.code) {
    case ErrorCode.AUTHENTICATION_FAILED:
    case ErrorCode.UNAUTHORIZED:
    case ErrorCode.TOKEN_EXPIRED:
      return 'Authentication error. Please sign in again.';

    case ErrorCode.FORBIDDEN:
    case ErrorCode.INSUFFICIENT_PERMISSIONS:
      return 'You do not have permission to perform this action.';

    case ErrorCode.NOT_FOUND:
      return 'The requested resource was not found.';

    case ErrorCode.VALIDATION_ERROR:
    case ErrorCode.INVALID_INPUT:
    case ErrorCode.MISSING_REQUIRED_FIELD:
      return 'Please check your input and try again.';

    case ErrorCode.INSUFFICIENT_CREDITS:
      return 'Insufficient credits to perform this action.';

    case ErrorCode.PAYMENT_FAILED:
      return 'Payment processing failed. Please try again or use a different payment method.';

    case ErrorCode.NETWORK_ERROR:
      return 'Network error. Please check your connection and try again.';

    case ErrorCode.TIMEOUT_ERROR:
      return 'Request timed out. Please try again.';

    case ErrorCode.RATE_LIMITED:
      return 'Too many requests. Please try again later.';

    case ErrorCode.SERVICE_UNAVAILABLE:
      return 'Service is currently unavailable. Please try again later.';

    default:
      return (
        error.message || 'An unexpected error occurred. Please try again later.'
      );
  }
}
