import React from 'react';
import { FormField } from './FormField';
import { useFormContext } from './FormContext';
import type { SelectFieldProps } from './types';

/**
 * Component for rendering a select dropdown field
 *
 * @param props - The component props
 * @param props.name - Field name
 * @param props.label - Field label
 * @param props.options - Options for the select dropdown
 * @param props.placeholder - Placeholder text (used as first empty option)
 * @param props.helperText - Helper text displayed below the field
 * @param props.required - Whether the field is required
 * @param props.disabled - Whether the field is disabled
 * @param props.className - Additional CSS classes
 * @returns The rendered select dropdown field with label and validation
 */
export function SelectField({
  name,
  label,
  options,
  placeholder = 'Select an option',
  helperText,
  required = false,
  disabled = false,
  className = '',
}: SelectFieldProps): React.ReactElement {
  const { register, formState } = useFormContext();
  const errors = formState.errors;

  return (
    <FormField
      name={name}
      label={label}
      required={required}
      helperText={helperText}
      className={className}
    >
      <select
        id={name}
        disabled={disabled}
        className={`block w-full rounded-md shadow-sm bg-navy-700 text-ocean-100 border-navy-600 focus:border-ocean-500 focus:ring-ocean-500 ${
          errors[name]
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
            : ''
        }`}
        {...register(name, {
          required: required ? `${label || name} is required` : false,
        })}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FormField>
  );
}
