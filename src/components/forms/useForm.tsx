import { useState } from 'react';
import {
  useForm as useHookForm,
  FieldValues,
  UseFormProps,
  UseFormReturn,
  SubmitHandler,
  FieldErrors,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

/**
 * Extended props for the custom useForm hook
 */
interface UseFormExtendedProps<TFormValues extends FieldValues>
  extends UseFormProps<TFormValues> {
  /** Form schema for validation */
  schema?: z.ZodSchema<TFormValues>;
}

/**
 * Extended return type for the custom useForm hook
 */
interface UseFormExtendedReturn<TFormValues extends FieldValues>
  extends UseFormReturn<TFormValues> {
  /** Whether the form is submitting */
  isSubmitting: boolean;
  /** Submit handler with state management */
  handleSubmitWithState: (
    onValid: SubmitHandler<TFormValues>,
    onInvalid?: (errors: FieldErrors<TFormValues>) => void,
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
}

/**
 * Custom hook for form state management
 *
 * @param props - Hook props including schema and default values
 * @returns Extended useForm return value with additional utilities
 */
export function useForm<TFormValues extends FieldValues>(
  props: UseFormExtendedProps<TFormValues> = {},
): UseFormExtendedReturn<TFormValues> {
  const { schema, ...rest } = props;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useHookForm<TFormValues>({
    ...rest,
    resolver: schema ? zodResolver(schema) : undefined,
  });

  const handleSubmitWithState = (
    onValid: SubmitHandler<TFormValues>,
    onInvalid?: (errors: FieldErrors<TFormValues>) => void,
  ) => {
    return async (e?: React.BaseSyntheticEvent) => {
      if (e) {
        e.preventDefault();
      }

      setIsSubmitting(true);

      return methods.handleSubmit(
        async (data) => {
          try {
            await onValid(data);
          } finally {
            setIsSubmitting(false);
          }
        },
        (errors) => {
          setIsSubmitting(false);
          if (onInvalid) {
            onInvalid(errors);
          }
        },
      )(e);
    };
  };

  return {
    ...methods,
    isSubmitting,
    handleSubmitWithState,
  };
}
