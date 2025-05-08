import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  itemId: string;
  product: any; // Using any for simplicity, should be properly typed in a real app
  quantity: number;
  configuredPrice?: number;
  configuredCreditCost?: number;
  configurationDetails?: any;
}

export interface CartState {
  items: CartItem[];
  totalAmount: number;
  totalCredits: number;
}

const persistedCart = localStorage.getItem('cart');
const initialCart = persistedCart
  ? JSON.parse(persistedCart)
  : { items: [], totalAmount: 0, totalCredits: 0 };

const initialState: CartState = initialCart;

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) =>
          item.itemId === newItem.itemId ||
          (item.product.id === newItem.product.id &&
            JSON.stringify(item.configurationDetails) ===
              JSON.stringify(newItem.configurationDetails)),
      );

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }

      // Recalculate totals
      updateTotals(state);

      // Persist to localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
    updateItemQuantity: (
      state,
      action: PayloadAction<{ itemId: string; quantity: number }>,
    ) => {
      const { itemId, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.itemId === itemId);

      if (existingItem) {
        existingItem.quantity = Math.max(1, quantity);
      }

      // Recalculate totals
      updateTotals(state);

      // Persist to localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.itemId !== itemId);

      // Recalculate totals
      updateTotals(state);

      // Persist to localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalCredits = 0;

      // Persist to localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

// Helper function to update cart totals
function updateTotals(state: CartState) {
  state.totalAmount = state.items.reduce((total, item) => {
    const price = item.configuredPrice ?? item.product.price;
    return total + price * item.quantity;
  }, 0);

  state.totalCredits = state.items.reduce((total, item) => {
    const credits = item.configuredCreditCost ?? item.product.creditCost;
    return total + credits * item.quantity;
  }, 0);
}

export const { addItem, updateItemQuantity, removeItem, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
