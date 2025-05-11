import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input, Button, Alert } from '@components/common';
import { useRegisterMutation } from '@services/authApi';
import { getErrorMessage, logError } from '@utils/errorUtils';

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
 */
export const RegisterForm: React.FC<RegisterFormProps> = ({
  onRegisterSuccess,
}) => {
  const [register, { isLoading, error }] = useRegisterMutation();

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  /**
   * Handles form submission for user registration
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

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <div>
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              error={errors.email?.message}
              {...registerField('email')}
            />
          </div>

          <div>
            <Input
              label="Name"
              type="text"
              placeholder="Enter your name"
              error={errors.name?.message}
              {...registerField('name')}
            />
          </div>

          <div>
            <Input
              label="Password"
              type="password"
              placeholder="Create a password"
              error={errors.password?.message}
              {...registerField('password')}
            />
          </div>

          <div>
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              error={errors.confirmPassword?.message}
              {...registerField('confirmPassword')}
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isLoading}
            >
              Create Account
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};
