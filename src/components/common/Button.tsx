import React from 'react';

/**
 * Possible button variants for visual styling
 */
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger';

/**
 * Available button sizes
 */
type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Props for the Button component
 */
type ButtonProps = {
  /** Visual style variant of the button */
  variant?: ButtonVariant;
  /** Size of the button */
  size?: ButtonSize;
  /** Whether the button is in a loading state */
  isLoading?: boolean;
  /** Icon to display to the left of the button text */
  leftIcon?: React.ReactNode;
  /** Icon to display to the right of the button text */
  rightIcon?: React.ReactNode;
  /** Whether the button should take up the full width of its container */
  fullWidth?: boolean;
} & React.ComponentPropsWithoutRef<'button'>;

/**
 * Button component for user interactions
 * Provides customizable styling with variants, sizes, loading states and icons
 */
export const Button = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth,
  children,
  className = '',
  disabled,
  ...rest
}: ButtonProps): JSX.Element => {
  // Base classes
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors';

  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  // Variant classes
  const variantClasses = {
    primary:
      'bg-ocean-500 text-white hover:bg-ocean-600 focus:ring-ocean-400 focus:ring-offset-navy-800 disabled:bg-ocean-300',
    secondary:
      'bg-navy-500 text-white hover:bg-navy-600 focus:ring-navy-400 focus:ring-offset-navy-800 disabled:bg-navy-400 disabled:text-navy-100',
    outline:
      'border border-ocean-300 text-ocean-300 hover:bg-navy-700 focus:ring-ocean-300 focus:ring-offset-navy-800 disabled:text-ocean-200 disabled:border-ocean-200',
    danger:
      'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 focus:ring-offset-navy-800 disabled:bg-red-400',
  };

  // Loading state
  const loadingClasses = isLoading ? 'opacity-80 cursor-not-allowed' : '';

  // Full width
  const widthClasses = fullWidth ? 'w-full' : '';

  // Combine all classes
  const buttonClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${loadingClasses} ${widthClasses} ${className}`;

  return (
    <button
      className={buttonClasses}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}

      {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}

      {children}

      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};
