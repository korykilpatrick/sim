import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api';
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/cartSlice';
import uiReducer from '../features/ui/uiSlice';
import creditsReducer from '../features/credits/creditsSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    cart: cartReducer,
    ui: uiReducer,
    credits: creditsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: !import.meta.env.PROD,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
