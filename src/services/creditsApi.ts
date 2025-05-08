import { apiSlice } from './api';
import { CreditTransaction } from '@/types/credits';
import { setCreditsBalance } from '@store/slices/creditsSlice';

interface CreditsBalanceResponse {
  credits: number;
}

interface TransactionsResponse {
  transactions: CreditTransaction[];
}

interface PurchaseCreditsRequest {
  amount: number;
  paymentDetails: any;
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
      // When the query succeeds, update Redux state with the balance
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCreditsBalance(data.credits));
        } catch (_err) {
          // Handle error if needed
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
