import React from 'react';
import { useFormContext } from './FormContext';
import type { CheckboxFieldProps } from './types';

/**
 * Component for rendering a checkbox field
 *
 * @param props - The component props
 * @param props.name - Field name
 * @param props.label - Field label
 * @param props.helperText - Helper text displayed below the field
 * @param props.required - Whether the field is required
 * @param props.disabled - Whether the field is disabled
 * @param props.className - Additional CSS classes
 * @returns The rendered checkbox field with label and validation
 */
export function CheckboxField({
  name,
  label,
  helperText,
  required = false,
  disabled = false,
  className = '',
}: CheckboxFieldProps): React.ReactElement {
  const { register, formState } = useFormContext();
  const errors = formState.errors;
  const errorMessage = errors[name]?.message?.toString();

  return (
    <div className={`${className}`}>
      <div className="flex items-center">
        <input
          id={name}
          type="checkbox"
          disabled={disabled}
          className="h-4 w-4 text-ocean-600 focus:ring-ocean-500 border-navy-600 rounded bg-navy-700"
          {...register(name, {
            required: required ? `${label} is required` : false,
          })}
        />
        <label htmlFor={name} className="ml-2 block text-sm text-ocean-100">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      </div>

      {errorMessage && (
        <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
      )}

      {helperText && !errorMessage && (
        <p className="mt-1 text-sm text-navy-400">{helperText}</p>
      )}
    </div>
  );
}
