import { apiSlice } from './api';
import { AlertNotification } from '@types/alert';

interface AlertsResponse {
  alerts: AlertNotification[];
}

interface AlertResponse {
  alert: {
    id: string;
    productId: string;
    name: string;
    configuration: any;
    createdAt: string;
    expiryDate: string;
    status: string;
  };
}

interface CreateAlertRequest {
  productId: string;
  alertType: string;
  configuration: any;
}

interface CreateAlertResponse {
  success: boolean;
  alert: {
    id: string;
    productId: string;
    alertType: string;
    configuration: any;
    createdAt: string;
    status: string;
  };
}

interface MarkAlertReadResponse {
  success: boolean;
  notification: AlertNotification;
}

export const alertsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserAlerts: builder.query<AlertsResponse, void>({
      query: () => '/user/alerts',
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
        url: `/user/alerts/${notificationId}`,
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