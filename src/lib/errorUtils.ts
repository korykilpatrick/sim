import type { AppError } from '@app/types';
import {
  toAppError,
  getUserFriendlyErrorMessage,
  ErrorCode,
  isAppError,
  isApiError,
  isRtkQueryError,
} from '@app/types';

export { ErrorCode, isAppError, isApiError, isRtkQueryError };

/**
 * Transforms any error into a consistent format for handling throughout the application.
 * This ensures type safety when working with errors from various sources.
 *
 * @param error - Any error value that needs to be processed
 * @returns A properly formatted AppError object
 */
export function mapErrorToAppError(error: unknown): AppError {
  return toAppError(error);
}

/**
 * Gets a user-friendly error message from any error object.
 * Use this when displaying errors in the UI.
 *
 * @param error - Any error value
 * @returns A user-friendly error message string
 */
export function getErrorMessage(error: unknown): string {
  const appError = toAppError(error);
  return getUserFriendlyErrorMessage(appError);
}

/**
 * Checks if an error is of a specific error code.
 * Useful for conditional handling of specific error types.
 *
 * @param error - Any error value
 * @param code - The error code to check against
 * @returns True if the error matches the provided code
 */
export function isErrorOfType(error: unknown, code: ErrorCode): boolean {
  const appError = toAppError(error);
  return appError.code === code;
}

/**
 * Logs an error to the console with additional context.
 * Formats errors consistently for easier debugging.
 *
 * @param error - Any error to log
 * @param context - Optional additional context about where/when the error occurred
 */
export function logError(error: unknown, context?: string): void {
  const appError = toAppError(error);

  const logMessage = [
    `[ERROR] ${appError.code}: ${appError.message}`,
    context ? `Context: ${context}` : '',
    `Timestamp: ${appError.timestamp}`,
    appError.stack ? `Stack: ${appError.stack}` : '',
    appError.details
      ? `Details: ${JSON.stringify(appError.details, null, 2)}`
      : '',
  ]
    .filter(Boolean)
    .join('\n');

  console.error(logMessage);
}
