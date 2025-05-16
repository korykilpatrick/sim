import React from 'react';
import {
  FormProvider as HookFormProvider,
  FieldValues,
  UseFormRegister,
  Control,
} from 'react-hook-form';
import { FormProvider } from '@features/forms/components/core/FormContext';
import { FormError } from './FormError';
import { useForm } from './useForm';
import type { FormProps } from '@features/forms';

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
  const formConfig = {
    defaultValues: defaultValues || undefined,
    schema,
  } as any;

  const methods = useForm<TFormValues>(formConfig);

  const { handleSubmitWithState, control, formState, register } = methods;
  const { errors } = formState;
  const isSubmitting = externalIsSubmitting ?? methods.isSubmitting;

  return (
    <HookFormProvider {...methods}>
      <FormProvider
        value={{
          register: register as unknown as UseFormRegister<FieldValues>,
          formState: { errors },
          control: control as unknown as Control<FieldValues>,
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