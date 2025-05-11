import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Input } from '@components/common/Input';

/**
 * Props for the TextField component
 */
type TextFieldProps = {
  /** Field name for form registration */
  name: string;
  /** Label text displayed above the input */
  label: string;
  /** Placeholder text for the input */
  placeholder?: string;
  /** Helper text displayed below the input */
  helperText?: string;
  /** Input type (text, email, password, etc.) */
  type?: string;
  /** Whether the field is required */
  required?: boolean;
};

/**
 * A text input field component for forms
 */
export const TextField: React.FC<TextFieldProps> = ({
  name,
  label,
  placeholder,
  helperText,
  type = 'text',
  required = false,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-1">
      <Input
        label={label + (required ? ' *' : '')}
        type={type}
        placeholder={placeholder}
        helperText={helperText}
        error={errors[name]?.message?.toString()}
        {...register(name, {
          required: required ? `${label} is required` : false,
        })}
      />
    </div>
  );
};

/**
 * Props for the NumberField component
 */
type NumberFieldProps = {
  /** Field name for form registration */
  name: string;
  /** Label text displayed above the input */
  label: string;
  /** Placeholder text for the input */
  placeholder?: string;
  /** Helper text displayed below the input */
  helperText?: string;
  /** Minimum allowed value */
  min?: number;
  /** Maximum allowed value */
  max?: number;
  /** Whether the field is required */
  required?: boolean;
};

/**
 * A number input field component for forms with min/max validation
 */
export const NumberField: React.FC<NumberFieldProps> = ({
  name,
  label,
  placeholder,
  helperText,
  min,
  max,
  required = false,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-1">
      <Input
        label={label + (required ? ' *' : '')}
        type="number"
        placeholder={placeholder}
        helperText={helperText}
        error={errors[name]?.message?.toString()}
        {...register(name, {
          required: required ? `${label} is required` : false,
          valueAsNumber: true,
          min:
            min !== undefined
              ? {
                  value: min,
                  message: `${label} must be at least ${min}`,
                }
              : undefined,
          max:
            max !== undefined
              ? {
                  value: max,
                  message: `${label} must be at most ${max}`,
                }
              : undefined,
        })}
      />
    </div>
  );
};

/**
 * Props for the SelectField component
 */
type SelectFieldProps = {
  /** Field name for form registration */
  name: string;
  /** Label text displayed above the select */
  label: string;
  /** Array of options for the select dropdown */
  options: { value: string; label: string }[];
  /** Helper text displayed below the select */
  helperText?: string;
  /** Whether the field is required */
  required?: boolean;
};

/**
 * A select dropdown field component for forms
 */
export const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  options,
  helperText,
  required = false,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-secondary-700">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <select
        className={`block w-full rounded-md shadow-sm bg-navy-700 text-ocean-100 border-navy-600 focus:border-ocean-500 focus:ring-ocean-500 ${
          errors[name]
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
            : ''
        }`}
        {...register(name, {
          required: required ? `${label} is required` : false,
        })}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {helperText && !errors[name] && (
        <p className="mt-1 text-sm text-secondary-500">{helperText}</p>
      )}
      {errors[name]?.message && (
        <p className="mt-1 text-sm text-red-600">
          {errors[name]?.message?.toString()}
        </p>
      )}
    </div>
  );
};

/**
 * Props for the CheckboxGroup component
 */
type CheckboxGroupProps = {
  /** Field name for form registration */
  name: string;
  /** Label text displayed above the checkbox group */
  label: string;
  /** Array of options for the checkbox group */
  options: { value: string; label: string }[];
  /** Helper text displayed below the checkbox group */
  helperText?: string;
  /** Whether at least one checkbox is required */
  required?: boolean;
};

/**
 * A group of checkboxes for multi-select form fields
 */
export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  name,
  label,
  options,
  helperText,
  required = false,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-secondary-700">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="mt-1 space-y-2">
        <Controller
          name={name}
          control={control}
          rules={{ required: required ? `${label} is required` : false }}
          defaultValue={[]}
          render={({ field: { onChange, value = [] } }) => (
            <>
              {options.map((option) => (
                <div key={option.value} className="flex items-center">
                  <input
                    id={`${name}-${option.value}`}
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
                    checked={value.includes(option.value)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        onChange([...value, option.value]);
                      } else {
                        onChange(
                          value.filter((v: string) => v !== option.value),
                        );
                      }
                    }}
                  />
                  <label
                    htmlFor={`${name}-${option.value}`}
                    className="ml-2 block text-sm text-secondary-700"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </>
          )}
        />
      </div>
      {helperText && !errors[name] && (
        <p className="mt-1 text-sm text-secondary-500">{helperText}</p>
      )}
      {errors[name]?.message && (
        <p className="mt-1 text-sm text-red-600">
          {errors[name]?.message?.toString()}
        </p>
      )}
    </div>
  );
};

/**
 * Props for the RadioGroup component
 */
type RadioGroupProps = {
  /** Field name for form registration */
  name: string;
  /** Label text displayed above the radio group */
  label: string;
  /** Array of options for the radio group */
  options: { value: string; label: string }[];
  /** Helper text displayed below the radio group */
  helperText?: string;
  /** Whether a selection is required */
  required?: boolean;
};

/**
 * A group of radio buttons for single-select form fields
 */
export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  label,
  options,
  helperText,
  required = false,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-secondary-700">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="mt-1 space-y-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              id={`${name}-${option.value}`}
              type="radio"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300"
              value={option.value}
              {...register(name, {
                required: required ? `${label} is required` : false,
              })}
            />
            <label
              htmlFor={`${name}-${option.value}`}
              className="ml-2 block text-sm text-secondary-700"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {helperText && !errors[name] && (
        <p className="mt-1 text-sm text-secondary-500">{helperText}</p>
      )}
      {errors[name]?.message && (
        <p className="mt-1 text-sm text-red-600">
          {errors[name]?.message?.toString()}
        </p>
      )}
    </div>
  );
};

/**
 * Props for the DateField component
 */
type DateFieldProps = {
  /** Field name for form registration */
  name: string;
  /** Label text displayed above the date input */
  label: string;
  /** Helper text displayed below the date input */
  helperText?: string;
  /** Whether the field is required */
  required?: boolean;
};

/**
 * A date input field component for forms
 */
export const DateField: React.FC<DateFieldProps> = ({
  name,
  label,
  helperText,
  required = false,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-1">
      <Input
        label={label + (required ? ' *' : '')}
        type="date"
        helperText={helperText}
        error={errors[name]?.message?.toString()}
        {...register(name, {
          required: required ? `${label} is required` : false,
        })}
      />
    </div>
  );
};

/**
 * Props for the TextareaField component
 */
type TextareaFieldProps = {
  /** Field name for form registration */
  name: string;
  /** Label text displayed above the textarea */
  label: string;
  /** Placeholder text for the textarea */
  placeholder?: string;
  /** Helper text displayed below the textarea */
  helperText?: string;
  /** Number of visible text rows */
  rows?: number;
  /** Whether the field is required */
  required?: boolean;
};

/**
 * A textarea field component for multi-line text input in forms
 */
export const TextareaField: React.FC<TextareaFieldProps> = ({
  name,
  label,
  placeholder,
  helperText,
  rows = 4,
  required = false,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-secondary-700">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        className={`block w-full rounded-md shadow-sm bg-navy-700 text-ocean-100 border-navy-600 focus:border-ocean-500 focus:ring-ocean-500 ${
          errors[name]
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
            : ''
        }`}
        placeholder={placeholder}
        rows={rows}
        {...register(name, {
          required: required ? `${label} is required` : false,
        })}
      ></textarea>
      {helperText && !errors[name] && (
        <p className="mt-1 text-sm text-secondary-500">{helperText}</p>
      )}
      {errors[name]?.message && (
        <p className="mt-1 text-sm text-red-600">
          {errors[name]?.message?.toString()}
        </p>
      )}
    </div>
  );
};
