import React from 'react';
import { Input } from '@components/common';
import { FormField } from './FormField';
import { useFormContext } from './FormContext';
import type { NumberFieldProps } from './types';

/**
 * Component for rendering a number input field
 *
 * @param props - The component props
 * @param props.name - Field name
 * @param props.label - Field label
 * @param props.placeholder - Placeholder text
 * @param props.helperText - Helper text displayed below the field
 * @param props.min - Minimum allowed value
 * @param props.max - Maximum allowed value
 * @param props.step - Step value
 * @param props.required - Whether the field is required
 * @param props.disabled - Whether the field is disabled
 * @param props.className - Additional CSS classes
 * @returns The rendered number input field with label and validation
 */
export function NumberField({
  name,
  label,
  placeholder,
  helperText,
  min,
  max,
  step,
  required = false,
  disabled = false,
  className = '',
}: NumberFieldProps): React.ReactElement {
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
      <Input
        id={name}
        type="number"
        placeholder={placeholder}
        disabled={disabled}
        min={min}
        max={max}
        step={step}
        error={errors[name]?.message?.toString()}
        {...register(name, {
          required: required ? `${label || name} is required` : false,
          valueAsNumber: true,
          min:
            min !== undefined
              ? {
                  value: min,
                  message: `${label || name} must be at least ${min}`,
                }
              : undefined,
          max:
            max !== undefined
              ? {
                  value: max,
                  message: `${label || name} must be at most ${max}`,
                }
              : undefined,
        })}
      />
    </FormField>
  );
}
