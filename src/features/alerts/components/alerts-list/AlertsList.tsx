import React from 'react';
import { AlertItem } from '../AlertItem';

/**
 * Props for the AlertsList component
 */
export interface AlertsListProps {
  /** Array of alert notifications to display */
  alerts: any[]; // Using any[] temporarily until we find the correct type
  /** Function to mark an alert as read */
  onMarkAsRead?: ((alertId: string) => void) | undefined;
  /** Whether the list is in a loading state */
  isLoading?: boolean | undefined;
  /** Error message if alerts failed to load */
  error?: string | null | undefined;
}

/**
 * Component for displaying a list of alert notifications
 *
 * @param props - The component props
 * @param props.alerts - Array of alert notifications to display
 * @param props.onMarkAsRead - Function to mark an alert as read
 * @param props.isLoading - Whether the list is in a loading state
 * @param props.error - Error message if alerts failed to load
 * @returns The rendered list of alerts or appropriate loading/error/empty states
 */
export const AlertsList: React.FC<AlertsListProps> = ({
  alerts,
  onMarkAsRead,
  isLoading = false,
  error = null,
}) => {
  if (isLoading) {
    return (
      <div className="py-4 text-center text-gray-500">
        <p>Loading alerts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-4 text-center text-red-500">
        <p>Error loading alerts: {error}</p>
      </div>
    );
  }

  if (!alerts || alerts.length === 0) {
    return (
      <div className="py-4 text-center text-gray-500">
        <p>No alerts to display</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {alerts.map((alert) => (
        <AlertItem
          key={alert.alertId}
          alert={alert}
          onMarkAsRead={onMarkAsRead}
        />
      ))}
    </div>
  );
};
