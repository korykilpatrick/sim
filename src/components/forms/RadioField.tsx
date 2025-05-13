import React from 'react';
import { FormField } from '@components/forms/FormField';
import { useFormContext } from '@components/forms/core/FormContext';
import type { RadioFieldProps } from '@components/forms/types';

/**
 * Component for rendering a group of radio buttons
 *
 * @param props - The component props
 * @param props.name - Field name
 * @param props.label - Field label
 * @param props.options - Options for the radio group
 * @param props.helperText - Helper text displayed below the field
 * @param props.required - Whether the field is required
 * @param props.disabled - Whether the field is disabled
 * @param props.className - Additional CSS classes
 * @returns The rendered radio group with label and validation
 */
export function RadioField({
  name,
  label,
  options,
  helperText,
  required = false,
  disabled = false,
  className = '',
}: RadioFieldProps): React.ReactElement {
  const { register } = useFormContext();

  return (
    <FormField
      name={name}
      label={label}
      required={required}
      helperText={helperText}
      className={className}
    >
      <div className="mt-1 space-y-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              id={`${name}-${option.value}`}
              type="radio"
              value={option.value}
              disabled={disabled}
              className="h-4 w-4 text-ocean-600 focus:ring-ocean-500 border-navy-600 bg-navy-700"
              {...register(name, {
                required: required ? `${label || name} is required` : false,
              })}
            />
            <label
              htmlFor={`${name}-${option.value}`}
              className="ml-2 block text-sm text-ocean-100"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </FormField>
  );
}
