import React from 'react';
import { Link } from 'react-router-dom';
import { format, formatDistanceToNow } from 'date-fns';
import { useGetUserAlertsQuery, useMarkAlertReadMutation } from '@services/alertsApi';
import { Spinner } from '@components/common/Spinner';
import { Alert } from '@components/common/Alert';
import { Button } from '@components/common/Button';

export const AlertsCard: React.FC = () => {
  const { data, isLoading, error } = useGetUserAlertsQuery();
  const [markAlertRead] = useMarkAlertReadMutation();
  
  const handleMarkAsRead = async (alertId: string) => {
    try {
      await markAlertRead(alertId).unwrap();
    } catch (error) {
      console.error('Failed to mark alert as read:', error);
    }
  };
  
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-secondary-900 mb-4">Recent Alerts</h2>
        <div className="flex justify-center py-8">
          <Spinner size="md" />
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-secondary-900 mb-4">Recent Alerts</h2>
        <Alert
          variant="error"
          message="There was an error loading your alerts. Please try again later."
        />
      </div>
    );
  }
  
  const { alerts = [] } = data || {};
  const hasUnreadAlerts = alerts.some(alert => !alert.read);
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-secondary-900">Recent Alerts</h2>
        
        {hasUnreadAlerts && (
          <button
            className="text-sm text-primary-600 hover:text-primary-800"
            onClick={() => {
              // Mark all as read
              alerts.forEach(alert => {
                if (!alert.read) {
                  handleMarkAsRead(alert.id);
                }
              });
            }}
          >
            Mark all as read
          </button>
        )}
      </div>
      
      {alerts.length === 0 ? (
        <div className="text-center py-8 text-secondary-500">
          <p>No alerts to display.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-md border ${
                !alert.read
                  ? 'bg-primary-50 border-primary-200'
                  : 'bg-white border-secondary-200'
              }`}
            >
              <div className="flex items-start">
                <div className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${
                  alert.severity === 'critical'
                    ? 'bg-red-500'
                    : alert.severity === 'warning'
                    ? 'bg-yellow-500'
                    : 'bg-blue-500'
                }`} />
                
                <div className="ml-3 flex-1">
                  <div className="flex justify-between">
                    <h3 className={`text-sm font-medium ${
                      !alert.read ? 'text-primary-800' : 'text-secondary-900'
                    }`}>
                      {alert.title}
                    </h3>
                    <p className="text-xs text-secondary-500">
                      {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
                    </p>
                  </div>
                  
                  <p className={`text-sm mt-1 ${
                    !alert.read ? 'text-primary-700' : 'text-secondary-600'
                  }`}>
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
                        onClick={() => handleMarkAsRead(alert.id)}
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-4 pt-4 border-t border-secondary-200 text-center">
        <Link to="/protected/alerts" className="text-sm text-primary-600 hover:text-primary-800">
          View all alerts
        </Link>
      </div>
    </div>
  );
};