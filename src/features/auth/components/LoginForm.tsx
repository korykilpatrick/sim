import React from 'react';
import { z } from 'zod';
import { Alert } from '@components/ui/Alert';
import { useLoginMutation } from '@features/auth/authApi';
import { getErrorMessage, logError } from '@lib/errorUtils';
import {
  Form,
  TextField,
  PasswordField,
  CheckboxField,
  FormActions,
} from '@features/forms';
import { loginSchema } from '@lib/zodSchemas';

/**
 * Type for form values derived from the validation schema
 */
type LoginFormValues = z.infer<typeof loginSchema>;

/**
 * Props for the LoginForm component
 */
interface LoginFormProps {
  /** Callback function called after successful login */
  onLoginSuccess: (data: LoginFormValues) => void;
}

/**
 * Component for the login form
 *
 * @param props - The component props
 * @param props.onLoginSuccess - Callback function called after successful login
 * @returns The rendered login form with email, password inputs and submit button
 */
export const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [login, { isLoading, error }] = useLoginMutation();

  /**
   * Handles form submission and authentication
   *
   * @param data - The form data containing email and password
   */
  const onSubmit = async (data: LoginFormValues): Promise<void> => {
    try {
      await login(data).unwrap();
      onLoginSuccess(data);
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(err);
      logError(err, 'Login attempt failed');
      console.error('Login error:', errorMessage);
    }
  };

  return (
    <>
      {error && (
        <Alert
          variant="error"
          message="Invalid email or password. Please try again."
          className="mb-4"
        />
      )}

      <Form<LoginFormValues>
        schema={loginSchema}
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

          <PasswordField
            name="password"
            label="Password"
            placeholder="Enter your password"
            required
          />

          <div className="flex items-center justify-between">
            <CheckboxField name="rememberMe" label="Remember me" />

            <div className="text-sm">
              <a
                href="#"
                className="text-ocean-400 hover:text-ocean-300 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <FormActions primaryText="Sign In" showSecondary={false} />
        </div>
      </Form>
    </>
  );
};
