import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input, Button, Alert } from '@components/common';

const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface UserProfileSettingsCardProps {
  /** User data */
  userData: {
    name?: string;
    email?: string;
  };
  /** Whether the form submission was successful */
  isSuccess?: boolean;
}

/**
 * Component for user profile settings form
 */
export const UserProfileSettingsCard: React.FC<
  UserProfileSettingsCardProps
> = ({ userData, isSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: userData?.name || '',
      email: userData?.email || '',
      company: '',
      jobTitle: '',
    },
  });

  const [showSuccess, setShowSuccess] = React.useState(isSuccess || false);

  const onSubmit = async (data: ProfileFormValues) => {
    console.log('Profile update data:', data);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <>
      {showSuccess && (
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
              <Button type="submit" variant="primary" isLoading={isSubmitting}>
                Save Changes
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
