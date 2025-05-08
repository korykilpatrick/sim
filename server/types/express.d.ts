import { User } from '../../src/types/user'; // Adjust path as necessary

declare global {
  namespace Express {
    export interface Request {
      user?: User; // Add your custom property
    }
  }
}
