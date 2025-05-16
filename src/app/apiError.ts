export interface ApiErrorPayload {
  message: string;
  // Potentially other fields like errorCode, details, etc.
}

export interface RtkQueryError {
  status: number;
  data: ApiErrorPayload;
}

// You might also want to export SerializedError from @reduxjs/toolkit if used directly
// import { SerializedError } from '@reduxjs/toolkit';
