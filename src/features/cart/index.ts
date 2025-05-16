export { 
  addItem, 
  updateItemQuantity, 
  removeItem, 
  clearCart,
  default as cartReducer
} from './cartSlice';

export * from './components';

export type { CartItem as CartItemType } from './types';
