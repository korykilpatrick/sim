import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@components/ui/Button';
import type { AlertNotification } from '@shared-types/alert';

/**
 * Props for the AlertItem component
 */
export interface AlertItemProps {
  /** Alert data */
  alert: AlertNotification;
  /** Function to mark an alert as read */
  onMarkAsRead: (alertId: string) => void;
}

/**
 * Component for displaying a single alert notification
 *
 * @param props - The component props
 * @param props.alert - Alert data to display
 * @param props.onMarkAsRead - Function to mark an alert as read
 * @returns The rendered alert item with severity indicator, content, and action buttons
 */
export const AlertItem: React.FC<AlertItemProps> = ({
  alert,
  onMarkAsRead,
}) => {
  return (
    <div
      className={`p-4 rounded-md border ${
        !alert.read
          ? 'bg-primary-50 border-primary-200'
          : 'bg-white border-secondary-200'
      }`}
    >
      <div className="flex items-start">
        <div
          className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${
            alert.severity === 'critical'
              ? 'bg-red-500'
              : alert.severity === 'warning'
                ? 'bg-yellow-500'
                : 'bg-blue-500'
          }`}
        />

        <div className="ml-3 flex-1">
          <div className="flex justify-between">
            <h3
              className={`text-sm font-medium ${
                !alert.read ? 'text-primary-800' : 'text-secondary-900'
              }`}
            >
              {alert.title}
            </h3>
            <p className="text-xs text-secondary-500">
              {formatDistanceToNow(new Date(alert.timestamp), {
                addSuffix: true,
              })}
            </p>
          </div>

          <p
            className={`text-sm mt-1 ${
              !alert.read ? 'text-primary-700' : 'text-secondary-600'
            }`}
          >
            {alert.summary}
          </p>

          <div className="mt-3 flex items-center justify-between">
            {alert.linkToDetails && (
              <Link to={alert.linkToDetails}>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </Link>
            )}

            {!alert.read && (
              <button
                className="text-xs text-primary-600 hover:text-primary-800"
                onClick={() => onMarkAsRead(alert.id)}
              >
                Mark as read
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
