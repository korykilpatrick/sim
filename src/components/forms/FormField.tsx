import React from 'react';
import type { FormFieldProps } from './types';

/**
 * Base wrapper component for form fields
 *
 * @param props - The component props
 * @param props.name - Field name
 * @param props.label - Field label
 * @param props.required - Whether the field is required
 * @param props.helperText - Helper text displayed below the field
 * @param props.className - Additional CSS classes
 * @param props.children - Field content
 * @param props.error - Error message to display
 * @returns The rendered form field with label, content, and error message
 */
export function FormField({
  name,
  label,
  required = false,
  helperText,
  className = '',
  children,
  error,
}: FormFieldProps): React.ReactElement {
  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-secondary-700"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {children}

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

      {helperText && !error && (
        <p className="mt-1 text-sm text-secondary-500">{helperText}</p>
      )}
    </div>
  );
}
