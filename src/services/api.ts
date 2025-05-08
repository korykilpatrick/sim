import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@store/index';

// Define a base URL for our API
// In development, we point to our local Express server
// In production, we'll use environment variables to configure the API URL
const baseUrl = import.meta.env.DEV ? 'http://localhost:3001/api' : '/api';

// Create our API service
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      // Get the token from the auth state
      const token = (getState() as RootState).auth.token;

      // If we have a token, add it to the headers
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Products', 'User', 'Alerts', 'Orders', 'Credits'],
  endpoints: () => ({}),
});
