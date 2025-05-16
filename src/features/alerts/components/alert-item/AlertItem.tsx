import React from 'react';

interface AlertNotification {
  alertId: string;
  userId: string;
  message: string;
  alertType: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
  read: boolean;
  createdAt: string;
}

/**
 * Props for the AlertItem component
 */
export interface AlertItemProps {
  /** The alert notification to display */
  alert: AlertNotification;
  /** Function to mark the alert as read */
  onMarkAsRead?: ((alertId: string) => void) | undefined;
}

/**
 * Component for displaying a single alert notification
 *
 * @param props - The component props
 * @param props.alert - The alert notification to display
 * @param props.onMarkAsRead - Function to mark the alert as read
 * @returns The rendered alert item with appropriate styling based on alert type and read status
 */
export const AlertItem: React.FC<AlertItemProps> = ({ alert, onMarkAsRead }) => {
  const { alertId, message, alertType, read, createdAt } = alert;

  const handleMarkAsRead = () => {
    if (onMarkAsRead && !read) {
      onMarkAsRead(alertId);
    }
  };

  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const alertTypeStyles = {
    INFO: 'bg-blue-50 border-blue-200',
    SUCCESS: 'bg-green-50 border-green-200',
    WARNING: 'bg-yellow-50 border-yellow-200',
    ERROR: 'bg-red-50 border-red-200',
  };

  const typeStyle = alertTypeStyles[alertType] || alertTypeStyles.INFO;
  const readStyle = read ? 'opacity-75' : 'font-medium';

  return (
    <div
      className={`p-4 mb-3 border rounded-md ${typeStyle} ${readStyle}`}
      onClick={handleMarkAsRead}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p className="text-sm text-gray-800">{message}</p>
          <p className="text-xs text-gray-500 mt-1">{formattedDate}</p>
        </div>
        {!read && (
          <div className="ml-2 h-2 w-2 bg-blue-500 rounded-full" aria-label="Unread"></div>
        )}
      </div>
    </div>
  );
};
