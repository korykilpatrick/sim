import React from 'react';
import { FormProvider as HookFormProvider, FieldValues } from 'react-hook-form';
import { FormProvider } from './FormContext';
import { FormError } from './FormError';
import { useForm } from './useForm';
import type { FormProps } from './types';

/**
 * Main form component that provides form context and handles submission
 *
 * @param props - The component props
 * @param props.defaultValues - Default form values
 * @param props.onSubmit - Form submission handler
 * @param props.schema - Form schema for validation
 * @param props.children - Form content
 * @param props.id - Form ID
 * @param props.className - Additional CSS classes
 * @param props.error - Error message to display
 * @param props.isSubmitting - Whether the form is currently submitting
 * @returns The rendered form with context provider
 */
export function Form<TFormValues extends FieldValues>({
  defaultValues,
  onSubmit,
  schema,
  children,
  id,
  className = '',
  error,
  isSubmitting: externalIsSubmitting,
}: FormProps<TFormValues>): React.ReactElement {
  const methods = useForm<TFormValues>({
    defaultValues,
    schema,
  });

  const { handleSubmitWithState, control, formState, register } = methods;
  const { errors } = formState;
  const isSubmitting = externalIsSubmitting ?? methods.isSubmitting;

  return (
    <HookFormProvider {...methods}>
      <FormProvider
        value={{
          register,
          errors,
          control,
          isSubmitting,
          defaultValues,
        }}
      >
        <form
          id={id}
          className={className}
          onSubmit={handleSubmitWithState(onSubmit)}
          noValidate
        >
          {error && <FormError error={error} className="mb-4" />}

          {typeof children === 'function' ? children(methods) : children}
        </form>
      </FormProvider>
    </HookFormProvider>
  );
}
