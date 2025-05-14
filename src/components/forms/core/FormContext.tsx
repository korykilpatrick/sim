import React, { createContext, useContext } from 'react';
import {
  FieldValues,
  UseFormRegister,
  Control,
  FieldErrors,
} from 'react-hook-form';
import type { FormContextType } from '@components/forms';

// Create a default context value for when useFormContext is used outside of FormProvider
// Create a type-safe default context value
const defaultContextValue: FormContextType<FieldValues> = {
  register: (() => ({ name: '' })) as unknown as UseFormRegister<FieldValues>,
  formState: { errors: {} as unknown as FieldErrors<FieldValues> },
  control: {} as unknown as Control<FieldValues>,
  isSubmitting: false,
  defaultValues: undefined,
};

const FormContext = createContext<FormContextType<any>>(defaultContextValue);

/**
 * Hook for accessing form context
 * @returns The form context
 */
export function useFormContext<
  TFormValues extends FieldValues,
>(): FormContextType<TFormValues> {
  const context = useContext(FormContext);
  // Log what context is being received by consumers
  if (context === defaultContextValue) {
    console.warn(
      'useFormContext: Receiving default context value. This usually means a component is used outside a FormProvider.',
      {
        consumerStackTrace: new Error('Consumer stack trace').stack
      }
    );
  } else if (!context) {
    console.error(
      'useFormContext: Receiving undefined context. This is unexpected if a FormProvider is present.',
      {
        consumerStackTrace: new Error('Consumer stack trace').stack
      }
    );
  }
  return context as FormContextType<TFormValues>;
}

/**
 * Props for the FormProvider component
 */
interface FormProviderProps<TFormValues extends FieldValues> {
  /** Form context value */
  value: FormContextType<TFormValues>;
  /** Provider children */
  children: React.ReactNode;
}

/**
 * Provider component for form context
 *
 * @param props - The component props
 * @param props.value - Form context value
 * @param props.children - Provider children
 * @returns The form context provider
 */
export function FormProvider<TFormValues extends FieldValues>({
  value,
  children,
}: FormProviderProps<TFormValues>): React.ReactElement {
  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
}
