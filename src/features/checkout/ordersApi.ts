import { apiSlice } from '../../app/api';
import {
  CreateOrderRequestBody,
  Order as OrderType,
} from '@shared-types/order';
import { clearCart } from '../cart/cartSlice';

interface CreateOrderResponse {
  order: OrderType;
}

interface OrderResponse {
  order: OrderType;
}

interface OrdersResponse {
  orders: OrderType[];
}

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<CreateOrderResponse, CreateOrderRequestBody>({
      query: (orderData) => ({
        url: '/orders',
        method: 'POST',
        body: orderData,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(clearCart());
        } catch (_err) {
        }
      },
      invalidatesTags: ['User', 'Credits'],
    }),

    getOrder: builder.query<OrderResponse, string>({
      query: (orderId) => `/orders/${orderId}`,
      providesTags: (_result, _error, id) => [{ type: 'Orders', id }],
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
