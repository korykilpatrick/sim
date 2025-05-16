import React from 'react';
import { Link } from 'react-router-dom';
import {
  useGetUserAlertsQuery,
  useMarkAlertReadMutation,
} from '@features/alerts/alertsApi';
import { Spinner } from '@components/ui/Spinner';
import { Alert } from '@components/ui/Alert';
import { getErrorMessage, logError } from '@lib/errorUtils';
import type { AlertNotification } from '@features/alerts/types';
import { AlertsHeader } from './AlertsHeader';
import { AlertItem } from './AlertItem';
import { EmptyAlertsState } from './EmptyAlertsState';

/**
 * Component for displaying a card with recent alerts
 *
 * @returns The rendered alerts card with header, alert items, and view all link
 */
export const AlertsCard: React.FC = () => {
  const { data, isLoading, error: queryError } = useGetUserAlertsQuery();
  const [markAlertRead] = useMarkAlertReadMutation();

  const handleMarkAsRead = async (alertId: string) => {
    try {
      await markAlertRead(alertId).unwrap();
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      logError(err, 'Failed to mark alert as read');
      console.error('Failed to mark alert as read:', errorMessage);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-secondary-900 mb-4">
          Recent Alerts
        </h2>
        <div className="flex justify-center py-8">
          <Spinner size="md" />
        </div>
      </div>
    );
  }

  if (queryError) {
    const errorMessage = getErrorMessage(queryError);
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-secondary-900 mb-4">
          Recent Alerts
        </h2>
        <Alert
          variant="error"
          message={
            errorMessage ||
            'There was an error loading your alerts. Please try again later.'
          }
        />
      </div>
    );
  }

  const { alerts = [] } = data || {};
  const hasUnreadAlerts = alerts.some((alert: AlertNotification) => !alert.read);

  const handleMarkAllAsRead = () => {
    // Mark all as read
    alerts.forEach((alert: AlertNotification) => {
      if (!alert.read) {
        handleMarkAsRead(alert.id);
      }
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <AlertsHeader
        hasUnreadAlerts={hasUnreadAlerts}
        onMarkAllAsRead={handleMarkAllAsRead}
      />

      {alerts.length === 0 ? (
        <EmptyAlertsState />
      ) : (
        <div className="space-y-4">
          {alerts.map((alert) => (
            <AlertItem
              key={alert.id}
              alert={alert}
              onMarkAsRead={handleMarkAsRead}
            />
          ))}
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-secondary-200 text-center">
        <Link
          to="/protected/alerts"
          className="text-sm text-primary-600 hover:text-primary-800"
        >
          View all alerts
        </Link>
      </div>
    </div>
  );
};
