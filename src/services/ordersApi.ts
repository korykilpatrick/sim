import { apiSlice } from './api';
import { CartItem } from '@types/cart';
import { clearCart } from '@store/slices/cartSlice';

interface CreateOrderRequest {
  items: CartItem[];
  totalAmount: number;
  totalCredits: number;
  paymentMethod: 'credit_card' | 'credits';
  billingDetails?: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentDetails?: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    cardholderName: string;
  };
}

interface CreateOrderResponse {
  success: boolean;
  order: {
    id: string;
    userId: string;
    items: CartItem[];
    totalAmount: number;
    totalCredits: number;
    paymentMethod: string;
    status: string;
    purchaseDate: string;
  };
}

interface OrderResponse {
  order: {
    id: string;
    userId: string;
    items: CartItem[];
    totalAmount: number;
    totalCredits: number;
    paymentMethod: string;
    status: string;
    purchaseDate: string;
  };
}

interface OrdersResponse {
  orders: OrderResponse['order'][];
}

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<CreateOrderResponse, CreateOrderRequest>({
      query: (orderData) => ({
        url: '/orders',
        method: 'POST',
        body: orderData,
      }),
      // Clear the cart after successful checkout
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(clearCart());
        } catch (err) {
          // Error handling could happen here
        }
      },
      invalidatesTags: ['User', 'Credits'],
    }),
    
    getOrder: builder.query<OrderResponse, string>({
      query: (orderId) => `/orders/${orderId}`,
      providesTags: (result, error, id) => [{ type: 'Orders', id }],
    }),
    
    getUserOrders: builder.query<OrdersResponse, void>({
      query: () => '/user/orders',
      providesTags: ['Orders'],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderQuery,
  useGetUserOrdersQuery,
} = ordersApiSlice;