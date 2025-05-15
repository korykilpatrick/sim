import { apiSlice } from '../../app/api';
import { CreditTransaction } from '@shared-types/credits';
import { setCreditsBalance } from './creditsSlice';
import { PaymentGatewayDetails } from '@shared-types/payment';

interface CreditsBalanceResponse {
  credits: number;
}

interface TransactionsResponse {
  transactions: CreditTransaction[];
}

interface PurchaseCreditsRequest {
  amount: number;
  paymentDetails: PaymentGatewayDetails;
}

interface PurchaseCreditsResponse {
  success: boolean;
  transaction: CreditTransaction;
  newBalance: number;
}

export const creditsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCreditsBalance: builder.query<CreditsBalanceResponse, void>({
      query: () => '/credits/balance',
      providesTags: ['Credits'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCreditsBalance(data.credits));
        } catch (_err) {
        }
      },
    }),

    getCreditTransactions: builder.query<TransactionsResponse, void>({
      query: () => '/credits/transactions',
      providesTags: ['Credits'],
    }),

    purchaseCredits: builder.mutation<
      PurchaseCreditsResponse,
      PurchaseCreditsRequest
    >({
      query: (data) => ({
        url: '/credits/purchase',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Credits', 'User'],
    }),
  }),
});

export const {
  useGetCreditsBalanceQuery,
  useGetCreditTransactionsQuery,
  usePurchaseCreditsMutation,
} = creditsApiSlice;
