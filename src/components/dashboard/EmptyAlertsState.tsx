import React from 'react';

/**
 * Component for displaying a message when there are no alerts
 */
export const EmptyAlertsState: React.FC = () => {
  return (
    <div className="text-center py-8 text-secondary-500">
      <p>No alerts to display.</p>
    </div>
  );
};
