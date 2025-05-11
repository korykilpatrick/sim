import React from 'react';
import { FormField } from './FormField';
import { useFormContext } from './FormContext';
import type { TextareaFieldProps } from './types';

/**
 * Component for rendering a textarea field
 *
 * @param props - The component props
 * @param props.name - Field name
 * @param props.label - Field label
 * @param props.placeholder - Placeholder text
 * @param props.helperText - Helper text displayed below the field
 * @param props.rows - Number of rows, defaults to 4
 * @param props.maxLength - Maximum length
 * @param props.required - Whether the field is required
 * @param props.disabled - Whether the field is disabled
 * @param props.className - Additional CSS classes
 * @returns The rendered textarea field with label and validation
 */
export function TextareaField({
  name,
  label,
  placeholder,
  helperText,
  rows = 4,
  maxLength,
  required = false,
  disabled = false,
  className = '',
}: TextareaFieldProps): React.ReactElement {
  const { register, errors } = useFormContext();

  return (
    <FormField
      name={name}
      label={label}
      required={required}
      helperText={helperText}
      className={className}
    >
      <textarea
        id={name}
        rows={rows}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        className={`block w-full rounded-md shadow-sm bg-navy-700 text-ocean-100 border-navy-600 focus:border-ocean-500 focus:ring-ocean-500 ${
          errors[name]
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
            : ''
        }`}
        {...register(name, {
          required: required ? `${label || name} is required` : false,
          maxLength: maxLength
            ? {
                value: maxLength,
                message: `${label || name} must be at most ${maxLength} characters`,
              }
            : undefined,
        })}
      />
    </FormField>
  );
}
