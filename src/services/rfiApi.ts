import { apiSlice } from './api';

interface RFISubmitRequest {
  id: string;
  name: string;
  investigationType: 'vessel' | 'company' | 'incident';
  subjectIdentifier: string;
  timeframe: {
    startDate: string;
    endDate: string;
  };
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
  endpoints: (builder: any) => ({
    submitRFI: builder.mutation<RFISubmitResponse, RFISubmitRequest>({
      query: (data: RFISubmitRequest) => ({
        url: '/investigations/rfi',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useSubmitRFIMutation } = rfiApiSlice;
