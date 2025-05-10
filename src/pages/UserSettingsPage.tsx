import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAppSelector } from '@hooks/redux';
import { DashboardSidebar } from '@components/dashboard/DashboardSidebar';
import { Input, Button, Alert } from '@components/common';

// Form validation schema
const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const UserSettingsPage: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      company: '',
      jobTitle: '',
    },
  });

  const [isSuccess, setIsSuccess] = React.useState(false);

  const onSubmit = async (data: ProfileFormValues) => {
    // In a real app, we would call an API to update the profile
    console.log('Profile update data:', data);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Show success message
    setIsSuccess(true);

    // Hide success message after 3 seconds
    setTimeout(() => {
      setIsSuccess(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar */}
      <div className="lg:w-64 w-full flex-shrink-0">
        <DashboardSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>

        {isSuccess && (
          <Alert
            variant="success"
            message="Your profile has been updated successfully."
            className="mb-6"
          />
        )}

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-secondary-200">
            <h2 className="text-lg font-medium text-secondary-900">
              Profile Settings
            </h2>
            <p className="text-sm text-secondary-500 mt-1">
              Update your profile information
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <Input
                    label="Full Name"
                    placeholder="John Doe"
                    error={errors.name?.message}
                    {...register('name')}
                  />
                </div>

                <div>
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="john@example.com"
                    error={errors.email?.message}
                    {...register('email')}
                  />
                </div>

                <div>
                  <Input
                    label="Company (Optional)"
                    placeholder="Acme Inc."
                    error={errors.company?.message}
                    {...register('company')}
                  />
                </div>

                <div>
                  <Input
                    label="Job Title (Optional)"
                    placeholder="Maritime Analyst"
                    error={errors.jobTitle?.message}
                    {...register('jobTitle')}
                  />
                </div>
              </div>

              <div className="pt-5">
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isSubmitting}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden mt-8">
          <div className="p-6 border-b border-secondary-200">
            <h2 className="text-lg font-medium text-secondary-900">
              Change Password
            </h2>
            <p className="text-sm text-secondary-500 mt-1">
              Update your password
            </p>
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

        <div className="bg-white rounded-lg shadow overflow-hidden mt-8">
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
      </div>
    </div>
  );
};

export default UserSettingsPage;
