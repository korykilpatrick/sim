import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { Button } from '@components/common/Button';

interface ConfigFormBaseProps {
  title: string;
  description: string;
  defaultValues: any;
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
  error: any;
  children: React.ReactNode;
}

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

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? Your configuration will not be saved.')) {
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
                {typeof error === 'string' ? error : 'An error occurred while saving your configuration. Please try again.'}
              </div>
            )}

            {children}
          </div>

          <div className="px-6 py-4 bg-secondary-50 border-t border-secondary-200 flex justify-end space-x-3">
            <Button 
              variant="outline" 
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="primary" 
              isLoading={isSubmitting}
            >
              Add to Cart
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};