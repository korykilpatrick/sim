import React from 'react';
import { Controller } from 'react-hook-form';
import { FormField } from './FormField';
import { useFormContext } from './FormContext';
import type { CheckboxGroupProps, FormFieldProps } from './types';

/**
 * Component for rendering a group of checkboxes
 *
 * @param props - The component props
 * @param props.name - Field name
 * @param props.label - Field label
 * @param props.options - Options for the checkbox group
 * @param props.helperText - Helper text displayed below the field
 * @param props.required - Whether the field is required
 * @param props.disabled - Whether the field is disabled
 * @param props.className - Additional CSS classes
 * @returns The rendered checkbox group with label and validation
 */
export function CheckboxGroupField({
  name,
  label,
  options,
  helperText,
  required = false,
  disabled = false,
  className = '',
}: CheckboxGroupProps): React.ReactElement {
  const formContext = useFormContext();
  
  const control = formContext?.control || {};

  const formFieldProps = {
    name,
    label,
    required,
    helperText,
    className,
    children: (
      <div className="mt-1 space-y-2">
        <Controller
          name={name}
          control={control as any}
          rules={{
            required: required ? `${label || name} is required` : false,
          }}
          defaultValue={[]}
          render={({ field }) => {
            const value = Array.isArray(field.value) ? field.value : [];
            
            return (
              <>
                {options.map((option) => (
                  <div key={option.value} className="flex items-center">
                    <input
                      id={`${name}-${option.value}`}
                      type="checkbox"
                      disabled={disabled}
                      className="h-4 w-4 text-ocean-600 focus:ring-ocean-500 border-navy-600 rounded bg-navy-700"
                      checked={value.includes(option.value)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          field.onChange([...value, option.value]);
                        } else {
                          field.onChange(
                            value.filter((v: string) => v !== option.value),
                          );
                        }
                      }}
                    />
                    <label
                      htmlFor={`${name}-${option.value}`}
                      className="ml-2 block text-sm text-ocean-100"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </>
            );
          }}
        />
      </div>
    )
  } as FormFieldProps;

  return <FormField {...formFieldProps} />;
}
