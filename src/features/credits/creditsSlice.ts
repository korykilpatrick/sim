import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CreditTransaction } from '@shared-types/credits';

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
