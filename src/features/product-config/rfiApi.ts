import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Placeholder for RFI API slice
// TODO: Define actual baseQuery and endpoints

/**
 * API slice for RFI (Request For Information) related operations.
 */
export const rfiApi = createApi({
  reducerPath: 'rfiApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/rfi' }), // Example base URL
  endpoints: (builder) => ({
    submitRFI: builder.mutation<void, unknown>({
      query: (rfiData) => ({
        url: '/',
        method: 'POST',
        body: rfiData,
      }),
    }),
    // Add other RFI related endpoints here
  }),
});

export const { useSubmitRFIMutation } = rfiApi; 