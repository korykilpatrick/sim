import { apiSlice } from '@app/api';
import { InvestigationConfiguration } from '@features/alerts/types';

interface RFISubmitRequest extends InvestigationConfiguration {
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
