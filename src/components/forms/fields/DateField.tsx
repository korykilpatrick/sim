import React from 'react';
import { Input } from '@components/common';
import { FormField } from '@components/forms';
import { useFormContext } from '@components/forms/core/FormContext';
import type { DateFieldProps } from '@components/forms';

/**
 * Component for rendering a date input field
 *
 * @param props - The component props
 * @param props.name - Field name
 * @param props.label - Field label
 * @param props.helperText - Helper text displayed below the field
 * @param props.min - Minimum date
 * @param props.max - Maximum date
 * @param props.required - Whether the field is required
 * @param props.disabled - Whether the field is disabled
 * @param props.className - Additional CSS classes
 * @returns The rendered date input field with label and validation
 */
export function DateField({
  name,
  label,
  helperText,
  min,
  max,
  required = false,
  disabled = false,
  className = '',
}: DateFieldProps): React.ReactElement {
  const { register, formState } = useFormContext();
  const errors = formState.errors;

  return (
    <FormField
      name={name}
      label={label}
      required={required}
      {...(helperText && { helperText })}
      className={className}
    >
      <Input
        id={name}
        type="date"
        min={min}
        max={max}
        disabled={disabled}
        {...(errors[name]?.message?.toString() && { error: errors[name]?.message?.toString() })}
        {...register(name, {
          required: required ? `${label || name} is required` : false,
        })}
      />
    </FormField>
  );
} 