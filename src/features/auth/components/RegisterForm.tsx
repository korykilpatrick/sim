import React from 'react';
import { z } from 'zod';
import { Alert } from '@components/ui/Alert';
import { useRegisterMutation } from '@features/auth/authApi';
import { getErrorMessage, logError } from '@lib/errorUtils';
import { Form, TextField, PasswordField, FormActions } from '@features/forms';

/**
 * Form validation schema using zod for registration form
 */
const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Invalid email address'),
    name: z.string().min(1, 'Name is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Confirm Password is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

/**
 * Type for registration form values derived from the validation schema
 */
type RegisterFormValues = z.infer<typeof registerSchema>;

/**
 * Props for the RegisterForm component
 */
interface RegisterFormProps {
  /** Callback function called after successful registration */
  onRegisterSuccess: (
    data: Omit<RegisterFormValues, 'confirmPassword'>,
  ) => void;
}

/**
 * Component for the registration form
 *
 * @param props - The component props
 * @param props.onRegisterSuccess - Callback function called after successful registration
 * @returns The rendered registration form with email, name, password inputs and submit button
 */
export const RegisterForm: React.FC<RegisterFormProps> = ({
  onRegisterSuccess,
}) => {
  const [register, { isLoading, error }] = useRegisterMutation();

  /**
   * Handles form submission for user registration
   *
   * @param data - The form data containing user registration information
   */
  const onSubmit = async (data: RegisterFormValues): Promise<void> => {
    try {
      const { confirmPassword: _confirmPassword, ...registerData } = data;
      await register(registerData).unwrap();
      onRegisterSuccess(registerData);
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(err);
      logError(err, 'Registration attempt failed');
      console.error('Registration error:', errorMessage);
    }
  };

  return (
    <>
      {error && (
        <Alert
          variant="error"
          message="An error occurred during registration. Please try again."
          className="mb-4"
        />
      )}

      <Form<RegisterFormValues>
        schema={registerSchema}
        onSubmit={onSubmit}
        isSubmitting={isLoading}
      >
        <div className="space-y-4">
          <TextField
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            required
          />

          <TextField
            name="name"
            label="Name"
            placeholder="Enter your name"
            required
          />

          <PasswordField
            name="password"
            label="Password"
            placeholder="Create a password"
            required
          />

          <PasswordField
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm your password"
            required
          />

          <div className="pt-2">
            <FormActions primaryText="Create Account" showSecondary={false} />
          </div>
        </div>
      </Form>
    </>
  );
};
