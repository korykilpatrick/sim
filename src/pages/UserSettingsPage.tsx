import React from 'react';
import { useAppSelector } from '@hooks/redux';
import { DashboardSidebar } from '@components/dashboard';
import {
  UserProfileSettingsCard,
  ChangePasswordCard,
  NotificationPreferencesCard,
} from '@components/userSettings';

/**
 * User settings page component
 *
 * @returns The rendered user settings page with profile, password, and notification preferences
 */
const UserSettingsPage: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar */}
      <div className="lg:w-64 w-full flex-shrink-0">
        <DashboardSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>

        <div className="space-y-8">
          <UserProfileSettingsCard
            userData={{
              name: user?.name,
              email: user?.email,
            }}
          />

          <ChangePasswordCard />

          <NotificationPreferencesCard />
        </div>
      </div>
    </div>
  );
};

export default UserSettingsPage;
