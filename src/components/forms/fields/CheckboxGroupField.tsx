import React from 'react';
import { Controller } from 'react-hook-form';
import { FormField } from '@components/forms';
import { useFormContext } from '@components/forms/core/FormContext';
import type {
  CheckboxGroupProps,
  FormFieldProps,
} from '@components/forms';

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

  const control = formContext?.control;

  if (!control || typeof control.register !== 'function') {
    console.error(
      `CheckboxGroupField ('${name}'): Receiving an invalid 'control' object. ` +
      `This typically means the component is not rendered within a FormProvider, ` +
      `or the form context is not propagating correctly. Form rendering will be skipped to prevent a crash.`,
      { receivedControl: control }
    );
    return (
      <FormField
        name={name}
        label={label}
        required={required}
        {...(helperText && { helperText })}
        className={className}
        error="Configuration error: Form field cannot be rendered."
      >
        <div className="mt-1 space-y-2 text-red-500">
          Field &apos;{label || name}&apos; is unavailable due to a form setup issue.
        </div>
      </FormField>
    );
  }

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
            const value =
              field && field.value
                ? Array.isArray(field.value)
                  ? field.value
                  : []
                : [];

            const handleChange = (newValue: any) => {
              if (field && typeof field.onChange === 'function') {
                field.onChange(newValue);
              }
            };

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
                          handleChange([...value, option.value]);
                        } else {
                          handleChange(
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
    ),
  } as FormFieldProps;

  return <FormField {...formFieldProps} />;
}  