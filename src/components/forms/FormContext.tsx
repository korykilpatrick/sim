import React, { createContext, useContext } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import type { FormContextType } from './types';

// Create a default context value for when useFormContext is used outside of FormProvider
const defaultContextValue: FormContextType<any> = {
  register: () => ({}),
  errors: {},
  control: {} as any,
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
