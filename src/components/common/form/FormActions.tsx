import React from 'react';
import { Button } from '..';

/**
 * Props for the FormActions component
 */
interface FormActionsProps {
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
 * Component for consistent form action buttons
 */
export const FormActions: React.FC<FormActionsProps> = ({
  primaryText = 'Submit',
  secondaryText = 'Cancel',
  isSubmitting = false,
  onSecondaryClick,
  showSecondary = true,
  className = '',
}) => {
  return (
    <div className={`flex justify-end space-x-4 ${className}`}>
      {showSecondary && (
        <Button
          type="button"
          variant="outline"
          onClick={onSecondaryClick}
          disabled={isSubmitting}
        >
          {secondaryText}
        </Button>
      )}
      
      <Button
        type="submit"
        variant="primary"
        isLoading={isSubmitting}
        disabled={isSubmitting}
      >
        {primaryText}
      </Button>
    </div>
  );
};
