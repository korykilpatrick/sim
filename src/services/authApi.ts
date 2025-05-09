import { apiSlice } from './api';
import type { User } from '@shared-types/user';
import type { LoginRequest, RegisterRequest, AuthResponse } from '@shared-types/auth';
import { setCredentials, logout } from '@store/slices/authSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      // When the login mutation succeeds, dispatch the setCredentials action
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data));
        } catch (_err) {
          // Handle error if needed
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
          // Handle error if needed
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
      // No matter the response, we want to clear the user's credentials
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
