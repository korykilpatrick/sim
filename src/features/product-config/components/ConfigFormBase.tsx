import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider as HookFormProvider } from 'react-hook-form';
import { FormProvider as CustomFormProvider } from '@features/forms/core/FormContext';
import type { UseFormRegister, Control, FieldErrors, FieldValues } from 'react-hook-form';
import { Button } from '@components/common';

/**
 * Props for the ConfigFormBase component
 */
type ConfigFormBaseProps = {
  /** Form title */
  title: string;
  /** Form description */
  description: string;
  /** Default form values */
  defaultValues: any;
  /** Form submission handler */
  onSubmit: (data: any) => void;
  /** Whether the form is currently submitting */
  isSubmitting: boolean;
  /** Error message to display */
  error: any;
  /** Form content */
  children: React.ReactNode;
};

/**
 * Base component for product configuration forms
 *
 * @param props - The component props
 * @param props.title - Form title
 * @param props.description - Form description
 * @param props.defaultValues - Default form values
 * @param props.onSubmit - Form submission handler
 * @param props.isSubmitting - Whether the form is currently submitting
 * @param props.error - Error message to display
 * @param props.children - Form content
 * @returns The rendered configuration form with header, content, and action buttons
 */
export const ConfigFormBase: React.FC<ConfigFormBaseProps> = ({
  title,
  description,
  defaultValues,
  onSubmit,
  isSubmitting,
  error,
  children,
}) => {
  const navigate = useNavigate();
  const methods = useForm({ defaultValues });
  const { control, formState, register: rhfRegister } = methods;
  const { errors } = formState;

  const handleCancel = () => {
    if (
      window.confirm(
        'Are you sure you want to cancel? Your configuration will not be saved.',
      )
    ) {
      navigate(-1);
    }
  };

  const customFormContextValue = {
    register: rhfRegister as unknown as UseFormRegister<FieldValues>,
    formState: { errors: errors as FieldErrors<FieldValues> },
    control: control as Control<FieldValues>,
    isSubmitting: isSubmitting,
    defaultValues: defaultValues,
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-secondary-200">
        <h2 className="text-xl font-semibold text-secondary-900">{title}</h2>
        <p className="mt-1 text-sm text-secondary-500">{description}</p>
      </div>

      <HookFormProvider {...methods}>
        <CustomFormProvider value={customFormContextValue}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="p-6 space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-4">
                  {typeof error === 'string'
                    ? error
                    : 'An error occurred while saving your configuration. Please try again.'}
                </div>
              )}

              {children}
            </div>

            <div className="px-6 py-4 bg-secondary-50 border-t border-secondary-200 flex justify-end space-x-3">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" isLoading={isSubmitting}>
                Add to Cart
              </Button>
            </div>
          </form>
        </CustomFormProvider>
      </HookFormProvider>
    </div>
  );
};
