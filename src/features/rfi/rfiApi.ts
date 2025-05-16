import { apiSlice } from './api';
import { InvestigationConfig } from '@frontend-types/product';

interface RFISubmitRequest extends InvestigationConfig {
  additionalInfo?: string;
  priority?: 'standard' | 'urgent';
}

interface RFISubmitResponse {
  success: boolean;
  requestId: string;
  message: string;
  estimatedResponse: string;
  submittedAt: string;
}

export const rfiApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    submitRFI: builder.mutation<RFISubmitResponse, RFISubmitRequest>({
      query: (data) => ({
        url: '/investigations/rfi',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useSubmitRFIMutation } = rfiApiSlice;
