/**
 * Core application-wide TypeScript types
 */

export enum ErrorCode {
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR = 'AUTHORIZATION_ERROR',
  NOT_FOUND_ERROR = 'NOT_FOUND_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  SERVER_ERROR = 'SERVER_ERROR',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',
  API_ERROR = 'API_ERROR',
}

export interface AppError {
  code: ErrorCode | string;
  message: string;
  timestamp: string;
  stack?: string;
  details?: Record<string, unknown>;
}

export interface ApiError {
  status: number;
  data: {
    message: string;
    code?: string;
    details?: Record<string, unknown>;
  };
}

export interface RtkQueryError {
  status: number;
  data: unknown;
}

export function isAppError(error: unknown): error is AppError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    'message' in error &&
    'timestamp' in error
  );
}

export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    'data' in error &&
    typeof (error as any).data === 'object' &&
    (error as any).data !== null &&
    'message' in (error as any).data
  );
}

export function isRtkQueryError(error: unknown): error is RtkQueryError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    'data' in error
  );
}

export function toAppError(error: unknown): AppError {
  if (isAppError(error)) {
    return error;
  }

  if (isApiError(error)) {
    return {
      code: error.data.code || ErrorCode.API_ERROR,
      message: error.data.message,
      timestamp: new Date().toISOString(),
      details: {
        status: error.status,
        ...error.data.details,
      },
    };
  }

  if (isRtkQueryError(error)) {
    return {
      code: ErrorCode.API_ERROR,
      message: 'API request failed',
      timestamp: new Date().toISOString(),
      details: {
        status: error.status,
        data: error.data,
      },
    };
  }

  if (error instanceof Error) {
    const appError: AppError = {
      code: ErrorCode.UNKNOWN_ERROR,
      message: error.message,
      timestamp: new Date().toISOString(),
    };
    
    if (error.stack) {
      appError.stack = error.stack;
    }
    
    return appError;
  }

  return {
    code: ErrorCode.UNKNOWN_ERROR,
    message: String(error),
    timestamp: new Date().toISOString(),
  };
}

export function getUserFriendlyErrorMessage(error: AppError): string {
  switch (error.code) {
    case ErrorCode.VALIDATION_ERROR:
      return 'Please check your input and try again.';
    case ErrorCode.AUTHENTICATION_ERROR:
      return 'Authentication failed. Please sign in again.';
    case ErrorCode.AUTHORIZATION_ERROR:
      return 'You do not have permission to perform this action.';
    case ErrorCode.NOT_FOUND_ERROR:
      return 'The requested resource was not found.';
    case ErrorCode.NETWORK_ERROR:
      return 'Network error. Please check your connection and try again.';
    case ErrorCode.SERVER_ERROR:
      return 'Server error. Please try again later.';
    case ErrorCode.TIMEOUT_ERROR:
      return 'Request timed out. Please try again.';
    case ErrorCode.API_ERROR:
      return 'API error. Please try again later.';
    default:
      return error.message || 'An unknown error occurred.';
  }
}

export interface AppState {
  isLoading: boolean;
  error: AppError | null;
}

/**
 * Validated request interface for form validation results
 */
export interface ValidatedRequest<T> {
  data: T;
  isValid: boolean;
  validationErrors?: Record<string, string[]>;
}
