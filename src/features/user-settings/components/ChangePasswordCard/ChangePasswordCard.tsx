import React from 'react';
import { Button } from '@components/ui/Button';

/**
 * Component for the change password card in user settings
 *
 * @returns The rendered change password card component
 */
export const ChangePasswordCard: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6 border-b border-secondary-200">
        <h2 className="text-lg font-medium text-secondary-900">
          Change Password
        </h2>
        <p className="text-sm text-secondary-500 mt-1">Update your password</p>
      </div>

      <div className="p-6">
        <p className="text-secondary-600 mb-4">
          Password management is not available in this demo version.
        </p>

        <Button variant="outline" disabled>
          Change Password
        </Button>
      </div>
    </div>
  );
};
