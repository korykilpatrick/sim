import React, { useState } from 'react';
import { z } from 'zod';
import { Alert } from '@components/ui';
import { Form, TextField, FormActions } from '@features/forms';
import { userProfileSchema } from '@lib/zodSchemas';

type ProfileFormValues = z.infer<typeof userProfileSchema>;

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
 *
 * @param props - The component props
 * @param props.userData - User data to populate the form
 * @param props.isSuccess - Whether the form submission was successful
 * @returns The rendered user profile settings form with success alert
 */
export const UserProfileSettingsCard: React.FC<
  UserProfileSettingsCardProps
> = ({ userData, isSuccess }) => {
  const [showSuccess, setShowSuccess] = useState(isSuccess || false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: ProfileFormValues) => {
    setIsSubmitting(true);
    console.log('Profile update data:', data);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
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

        <Form<ProfileFormValues>
          schema={userProfileSchema}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          defaultValues={{
            firstName: userData?.name?.split(' ')[0] || '',
            lastName: userData?.name?.split(' ')[1] || '',
            email: userData?.email || '',
            organization: '',
            jobTitle: '',
          }}
          className="p-6"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <TextField
                name="firstName"
                label="First Name"
                placeholder="John"
                required
              />

              <TextField
                name="lastName"
                label="Last Name"
                placeholder="Doe"
                required
              />

              <TextField
                name="email"
                label="Email Address"
                type="email"
                placeholder="john@example.com"
                required
              />

              <TextField
                name="organization"
                label="Organization (Optional)"
                placeholder="Acme Inc."
              />

              <TextField
                name="jobTitle"
                label="Job Title (Optional)"
                placeholder="Maritime Analyst"
              />
            </div>

            <div className="pt-5">
              <FormActions primaryText="Save Changes" showSecondary={false} />
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};
