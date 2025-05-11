import { ReactNode } from 'react';
import type {
  FieldValues,
  UseFormRegister,
  FieldErrors,
  Control,
  UseFormReturn,
} from 'react-hook-form';
import { z } from 'zod';

/**
 * Base props shared by all form field components
 */
export interface BaseFieldProps {
  /** Field name */
  name: string;
  /** Field label */
  label: string;
  /** Helper text displayed below the field */
  helperText?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Props for text input fields
 */
export interface TextFieldProps extends BaseFieldProps {
  /** Placeholder text */
  placeholder?: string;
  /** Input type */
  type?: 'text' | 'email' | 'tel' | 'url' | 'search';
  /** Pattern for validation */
  pattern?: string;
  /** Maximum length */
  maxLength?: number;
  /** Minimum length */
  minLength?: number;
  /** Auto complete attribute */
  autoComplete?: string;
}

/**
 * Props for number input fields
 */
export interface NumberFieldProps extends BaseFieldProps {
  /** Placeholder text */
  placeholder?: string;
  /** Minimum allowed value */
  min?: number;
  /** Maximum allowed value */
  max?: number;
  /** Step value */
  step?: number;
}

/**
 * Props for select fields
 */
export interface SelectFieldProps extends BaseFieldProps {
  /** Options for the select dropdown */
  options: Array<{ value: string; label: string }>;
  /** Placeholder text (used as first empty option) */
  placeholder?: string;
}

/**
 * Props for checkbox fields
 */
export interface CheckboxFieldProps extends BaseFieldProps {
  /** Checked state */
  checked?: boolean;
}

/**
 * Props for radio group fields
 */
export interface RadioFieldProps extends BaseFieldProps {
  /** Options for the radio group */
  options: Array<{ value: string; label: string }>;
}

/**
 * Props for checkbox group fields
 */
export interface CheckboxGroupProps extends BaseFieldProps {
  /** Options for the checkbox group */
  options: Array<{ value: string; label: string }>;
}

/**
 * Props for textarea fields
 */
export interface TextareaFieldProps extends BaseFieldProps {
  /** Placeholder text */
  placeholder?: string;
  /** Number of rows */
  rows?: number;
  /** Maximum length */
  maxLength?: number;
}

/**
 * Props for date fields
 */
export interface DateFieldProps extends BaseFieldProps {
  /** Minimum date */
  min?: string;
  /** Maximum date */
  max?: string;
}

/**
 * Props for password fields
 */
export interface PasswordFieldProps extends BaseFieldProps {
  /** Placeholder text */
  placeholder?: string;
  /** Whether to show the password toggle button */
  showToggle?: boolean;
}

/**
 * Props for form section
 */
export interface FormSectionProps {
  /** Section title */
  title: string;
  /** Optional description */
  description?: string;
  /** Whether to show a border at the top */
  showBorder?: boolean;
  /** Section content */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Props for form actions
 */
export interface FormActionsProps {
  /** Primary button text */
  primaryText?: string;
  /** Secondary button text */
  secondaryText?: string;
  /** Whether the form is submitting */
  isSubmitting?: boolean;
  /** Handler for secondary action */
  onSecondaryClick?: () => void;
  /** Whether to show the secondary button */
  showSecondary?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Props for form error
 */
export interface FormErrorProps {
  /** Error message to display */
  error: string | null | undefined;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Props for the form field component
 */
export interface FormFieldProps {
  /** Field name */
  name: string;
  /** Field label */
  label?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Helper text */
  helperText?: string;
  /** Additional CSS classes */
  className?: string;
  /** Field children */
  children: ReactNode;
  /** Error message */
  error?: string;
}

/**
 * Props for the main form component
 */
export interface FormProps<TFormValues extends FieldValues> {
  /** Default form values */
  defaultValues?: Partial<TFormValues>;
  /** Form submission handler */
  onSubmit: (data: TFormValues) => void | Promise<void>;
  /** Form schema for validation */
  schema?: z.ZodSchema<TFormValues>;
  /** Form children */
  children: ReactNode | ((methods: UseFormReturn<TFormValues>) => ReactNode);
  /** Form ID */
  id?: string;
  /** Additional CSS classes */
  className?: string;
  /** Error message to display */
  error?: string | null;
  /** Whether the form is currently submitting */
  isSubmitting?: boolean;
}

/**
 * Props for text input fields with form methods
 */
export interface TextFieldWithFormMethodsProps<
  TFormValues extends FieldValues = any,
> extends TextFieldProps {
  /** Form methods from parent component */
  formMethods: UseFormReturn<TFormValues>;
}

/**
 * Context type for form context
 */
export interface FormContextType<TFormValues extends FieldValues> {
  register: UseFormRegister<TFormValues>;
  formState: { errors: FieldErrors<TFormValues> };
  control: Control<TFormValues>;
  isSubmitting: boolean;
  defaultValues?: Partial<TFormValues>;
}
