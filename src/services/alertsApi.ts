import { apiSlice } from './api';
import { AlertNotification } from '../types/alert';
import { AlertConfigurationU } from '../types/alertConfiguration';
import { ProductType } from '../types/product';

interface AlertsResponse {
  alerts: AlertNotification[];
}

interface Alert {
  id: string;
  productId: string;
  name: string;
  alertType: ProductType;
  configuration: AlertConfigurationU;
  createdAt: string;
  expiryDate?: string;
  status: string;
}

interface AlertResponse {
  alert: Alert;
}

interface CreateAlertRequest {
  productId: string;
  name: string;
  alertType: ProductType;
  configuration: AlertConfigurationU;
}

interface CreateAlertResponse {
  success: boolean;
  alert: Alert;
}

interface MarkAlertReadResponse {
  success: boolean;
  notification: AlertNotification;
}

export const alertsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserAlerts: builder.query<AlertsResponse, void>({
      query: () => '/alerts',
      providesTags: ['Alerts'],
    }),

    createAlert: builder.mutation<CreateAlertResponse, CreateAlertRequest>({
      query: (alertData) => ({
        url: '/alerts',
        method: 'POST',
        body: alertData,
      }),
      invalidatesTags: ['Alerts'],
    }),

    getAlert: builder.query<AlertResponse, string>({
      query: (alertId) => `/alerts/${alertId}`,
      providesTags: (result, error, id) => [{ type: 'Alerts', id }],
    }),

    markAlertRead: builder.mutation<MarkAlertReadResponse, string>({
      query: (notificationId) => ({
        url: `/alerts/${notificationId}/read`,
        method: 'PUT',
      }),
      invalidatesTags: ['Alerts'],
    }),
  }),
});

export const {
  useGetUserAlertsQuery,
  useCreateAlertMutation,
  useGetAlertQuery,
  useMarkAlertReadMutation,
} = alertsApiSlice;
