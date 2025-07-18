import React from 'react';

type SpinnerSize = 'sm' | 'md' | 'lg';
type SpinnerColor = 'primary' | 'secondary' | 'white';

// interface SpinnerProps {
//   size?: SpinnerSize;
//   color?: SpinnerColor;
//   className?: string;
// }

type SpinnerProps = {
  size?: SpinnerSize;
  color?: SpinnerColor;
  className?: string;
};

/**
 * Spinner component for indicating loading states
 *
 * @param props - The component props
 * @param props.size - Size of the spinner
 * @param props.color - Color of the spinner
 * @param props.className - Additional CSS classes
 * @returns The rendered spinner component with appropriate styling
 */
export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color = 'primary',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  const colorClasses = {
    primary: 'text-primary-600',
    secondary: 'text-secondary-600',
    white: 'text-white',
  };

  return (
    <svg
      className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
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
  );
};
