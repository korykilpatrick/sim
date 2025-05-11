import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { Button } from '@components/common/Button';

/**
 * Props for the ConfigFormBase component
 */
type ConfigFormBaseProps = {
  /** Title displayed at the top of the form */
  title: string;
  /** Description text displayed below the title */
  description: string;
  /** Default values for the form fields */
  defaultValues: any;
  /** Function called when the form is submitted */
  onSubmit: (data: any) => void;
  /** Whether the form is currently submitting */
  isSubmitting: boolean;
  /** Error message to display if submission fails */
  error: any;
  /** Form content */
  children: React.ReactNode;
};

/**
 * Base component for product configuration forms
 * Provides common layout, error handling, and form submission
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

  /**
   * Handles the cancel button click
   * Confirms with the user before navigating back
   */
  const handleCancel = () => {
    if (
      window.confirm(
        'Are you sure you want to cancel? Your configuration will not be saved.',
      )
    ) {
      navigate(-1);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-secondary-200">
        <h2 className="text-xl font-semibold text-secondary-900">{title}</h2>
        <p className="mt-1 text-sm text-secondary-500">{description}</p>
      </div>

      <FormProvider {...methods}>
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
      </FormProvider>
    </div>
  );
};
