import React from 'react';
import { Button } from '@components/common';

/**
 * Component for notification preferences card in user settings
 *
 * @returns The rendered notification preferences card component
 */
export const NotificationPreferencesCard: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6 border-b border-secondary-200">
        <h2 className="text-lg font-medium text-secondary-900">
          Notification Preferences
        </h2>
        <p className="text-sm text-secondary-500 mt-1">
          Manage how you receive notifications
        </p>
      </div>

      <div className="p-6">
        <p className="text-secondary-600 mb-4">
          Notification preferences are not available in this demo version.
        </p>

        <Button variant="outline" disabled>
          Manage Notifications
        </Button>
      </div>
    </div>
  );
};
