import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'light' | 'dark';
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = true,
      leftIcon,
      rightIcon,
      variant = 'dark',
      className = '',
      ...rest
    },
    ref,
  ) => {
    // Define styling based on variant
    const variantStyles = {
      light: {
        input:
          'bg-white border-secondary-300 text-secondary-800 placeholder-secondary-400',
        label: 'text-secondary-700',
        helperText: 'text-secondary-600',
      },
      dark: {
        input:
          'bg-navy-700 border-navy-600 text-ocean-100 placeholder-navy-400',
        label: 'text-ocean-100',
        helperText: 'text-ocean-300',
      },
    };

    const inputClasses = `
      block px-3 py-2 border rounded-md shadow-sm 
      focus:outline-none focus:ring-ocean-500 focus:border-ocean-500
      ${error ? 'border-red-500' : ''}
      ${variantStyles[variant].input}
      ${fullWidth ? 'w-full' : ''}
      ${leftIcon ? 'pl-10' : ''}
      ${rightIcon ? 'pr-10' : ''}
      ${className}
    `;

    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label
            className={`block text-sm font-medium mb-1 ${variantStyles[variant].label}`}
          >
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {leftIcon}
            </div>
          )}

          <input ref={ref} className={inputClasses} {...rest} />

          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              {rightIcon}
            </div>
          )}
        </div>

        {error && <p className="mt-1 text-sm text-red-400">{error}</p>}

        {helperText && !error && (
          <p className={`mt-1 text-sm ${variantStyles[variant].helperText}`}>
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
