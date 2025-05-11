import React from 'react';
import { Input } from '@components/common';
import { FormField } from './FormField';
import { useFormContext } from './FormContext';
import type { TextFieldProps } from './types';
import { FieldValues } from 'react-hook-form';

/**
 * Component for rendering a text input field
 *
 * @param props - The component props
 * @param props.name - Field name
 * @param props.label - Field label
 * @param props.placeholder - Placeholder text
 * @param props.helperText - Helper text displayed below the field
 * @param props.type - Input type, defaults to 'text'
 * @param props.required - Whether the field is required
 * @param props.disabled - Whether the field is disabled
 * @param props.className - Additional CSS classes
 * @param props.pattern - Pattern for validation
 * @param props.maxLength - Maximum length
 * @param props.minLength - Minimum length
 * @param props.autoComplete - Auto complete attribute
 * @returns The rendered text input field with label and validation
 */
export function TextField<TFormValues extends FieldValues = any>({
  name,
  label,
  placeholder,
  helperText,
  type = 'text',
  required = false,
  disabled = false,
  className = '',
  pattern,
  maxLength,
  minLength,
  autoComplete,
  ...rest
}: TextFieldProps): React.ReactElement {
  const methods = useFormContext<TFormValues>();

  const register = methods?.register || (() => ({}));
  const errors = methods?.formState?.errors || {};
  const errorMessage =
    name && errors[name as keyof typeof errors]?.message?.toString();

  return (
    <FormField
      name={name}
      label={label}
      required={required}
      helperText={helperText || undefined}
      className={className}
      error={errorMessage || undefined}
    >
      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        pattern={pattern}
        maxLength={maxLength}
        minLength={minLength}
        autoComplete={autoComplete}
        {...(register
          ? register(name as any, {
              required: required ? `${label || name} is required` : false,
            })
          : {})}
        {...rest}
      />
    </FormField>
  );
}
