import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@components/common/Input';
import { Button } from '@components/common/Button';
import { Alert } from '@components/common/Alert';
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
 * Login page component that handles user authentication
 */
const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/marketplace';

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
      // If login is successful, redirect to the previous page or marketplace
      navigate(from, { replace: true });
    } catch (err: unknown) {
      // Use the new error handling approach
      const errorMessage = getErrorMessage(err);
      logError(err, 'Login attempt failed');
      console.error('Login error:', errorMessage);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-6 text-ocean-200">
        Sign In
      </h2>

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

      <div className="mt-6 text-center">
        <p className="text-sm text-ocean-100">
          Don&apos;t have an account?{' '}
          <Link
            to="/auth/register"
            className="text-ocean-400 hover:text-ocean-300 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
