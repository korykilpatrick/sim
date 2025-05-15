import { apiSlice } from '../../app/api';
import type { User } from '@shared-types/user';
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
} from '@shared-types/auth';
import { setCredentials, logout } from './authSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data));
        } catch (_err) {
        }
      },
    }),

    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data));
        } catch (_err) {
        }
      },
    }),

    getProfile: builder.query<{ user: User }, void>({
      query: () => '/auth/me',
      providesTags: ['User'],
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(_, { dispatch }) {
        dispatch(logout());
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetProfileQuery,
  useLogoutMutation,
} = authApiSlice;
