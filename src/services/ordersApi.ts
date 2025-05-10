import { apiSlice } from './api';
// import { CartItem } from '@/types/cart'; // No longer directly used in request type
import {
  CreateOrderRequestBody,
  Order as OrderType,
} from '@shared-types/order'; // Import shared request and response parts
import { clearCart } from '@store/slices/cartSlice';

// interface CreateOrderRequest { // Removed old frontend-specific request type
//   items: CartItem[];
//   totalAmount: number;
//   totalCredits: number;
//   paymentMethod: 'credit_card' | 'credits';
//   billingDetails?: {
//     name: string;
//     address: string;
//     city: string;
//     state: string;
//     zipCode: string;
//     country: string;
//   };
//   paymentDetails?: {
//     cardNumber: string;
//     expiryDate: string;
//     cvv: string;
//     cardholderName: string;
//   };
// }

// Using OrderType for response, assuming server returns the full order object matching shared type
interface CreateOrderResponse {
  order: OrderType;
  // success: boolean; // Consider if 'success' field is standard or if HTTP status is enough
}

// Assuming server returns full OrderType for single order GET too
interface OrderResponse {
  order: OrderType;
}

// Assuming server returns array of full OrderType for user orders
interface OrdersResponse {
  orders: OrderType[];
  // total: number; // Add if server provides total count for pagination
}

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<CreateOrderResponse, CreateOrderRequestBody>({
      query: (orderData) => ({
        url: '/orders',
        method: 'POST',
        body: orderData, // orderData is now CreateOrderRequestBody
      }),
      // Clear the cart after successful checkout
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(clearCart());
        } catch (_err) {
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
      query: () => '/orders',
      providesTags: ['Orders'],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderQuery,
  useGetUserOrdersQuery,
} = ordersApiSlice;
