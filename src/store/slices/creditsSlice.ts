import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CreditTransaction {
  id: string;
  amount: number; // positive for credit purchase, negative for credit usage
  description: string;
  timestamp: string; // ISO date string
  orderId?: string; // If associated with an order
  productId?: string; // If associated with a product
}

export interface CreditsState {
  balance: number;
  transactions: CreditTransaction[];
}

const initialState: CreditsState = {
  balance: 0,
  transactions: [],
};

const creditsSlice = createSlice({
  name: 'credits',
  initialState,
  reducers: {
    setCreditsBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
    },
    updateCreditsBalance: (state, action: PayloadAction<number>) => {
      state.balance += action.payload;
    },
    addCreditTransaction: (state, action: PayloadAction<CreditTransaction>) => {
      state.transactions.unshift(action.payload);
    },
    setTransactions: (state, action: PayloadAction<CreditTransaction[]>) => {
      state.transactions = action.payload;
    },
  },
});

export const {
  setCreditsBalance,
  updateCreditsBalance,
  addCreditTransaction,
  setTransactions,
} = creditsSlice.actions;

export default creditsSlice.reducer;