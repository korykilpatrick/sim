import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input, Button, Alert } from '@components/common';
import { useLoginMutation } from '@services/authApi';
import { getErrorMessage, logError } from '@utils/errorUtils';

/**
 * Form validation schema using zod
 */
const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

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
 */
export const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [login, { isLoading, error }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  /**
   * Handles form submission and authentication
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

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <div>
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              error={errors.email?.message}
              {...register('email')}
            />
          </div>

          <div>
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              error={errors.password?.message}
              {...register('password')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-ocean-500 focus:ring-ocean-400 bg-navy-700 border-navy-600 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-ocean-100"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="text-ocean-400 hover:text-ocean-300 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isLoading}
          >
            Sign In
          </Button>
        </div>
      </form>
    </>
  );
};
