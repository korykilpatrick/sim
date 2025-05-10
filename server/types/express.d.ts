import type { User } from '../../shared/types/user';

/**
 * Enhanced type definitions for Express Request objects.
 * These augmentations provide type safety for custom properties used throughout the application.
 */
declare global {
  namespace Express {
    /**
     * Extended Express Request interface with strongly-typed custom properties
     */
    export interface Request {
      /** The authenticated user - set by authentication middleware */
      user?: User;

      /**
       * Raw token from the Authorization header
       * This is set by the authentication middleware when validating tokens
       */
      token?: string;
    }
  }
}
