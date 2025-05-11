import React from 'react';

/**
 * Props for the AlertsHeader component
 */
export interface AlertsHeaderProps {
  /** Whether there are any unread alerts */
  hasUnreadAlerts: boolean;
  /** Function to mark all alerts as read */
  onMarkAllAsRead: () => void;
}

/**
 * Component for displaying the alerts card header with title and actions
 * 
 * @param props - The component props
 * @param props.hasUnreadAlerts - Whether there are any unread alerts
 * @param props.onMarkAllAsRead - Function to mark all alerts as read
 * @returns The rendered alerts header with title and conditional mark all as read button
 */
export const AlertsHeader: React.FC<AlertsHeaderProps> = ({
  hasUnreadAlerts,
  onMarkAllAsRead,
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-medium text-secondary-900">Recent Alerts</h2>

      {hasUnreadAlerts && (
        <button
          className="text-sm text-primary-600 hover:text-primary-800"
          onClick={onMarkAllAsRead}
        >
          Mark all as read
        </button>
      )}
    </div>
  );
};
