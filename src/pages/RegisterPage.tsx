import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@components/common/Input';
import { Button } from '@components/common/Button';
import { Alert } from '@components/common/Alert';
import { useRegisterMutation } from '@services/authApi';
import { mapErrorToKnownType } from '@utils/errorUtils';

// Form validation schema using zod
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

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [register, { isLoading, error }] = useRegisterMutation();

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const { confirmPassword: _confirmPassword, ...registerData } = data;
      await register(registerData).unwrap();
      // If registration is successful, redirect to marketplace
      navigate('/marketplace', { replace: true });
    } catch (err) {
      // Error is handled by RTK Query and available in the error variable
      const knownError = mapErrorToKnownType(err);
      console.error('Registration error:', knownError.message);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-6 text-ocean-200">
        Create Account
      </h2>

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

      <div className="mt-6 text-center">
        <p className="text-sm text-ocean-100">
          Already have an account?{' '}
          <Link
            to="/auth/login"
            className="text-ocean-400 hover:text-ocean-300 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
