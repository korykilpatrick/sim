import React from 'react';
import type { FormActionsProps } from '@components/forms';

/**
 * Component for consistent form action buttons
 *
 * @param props - The component props
 * @param props.primaryText - Primary button text
 * @param props.secondaryText - Secondary button text
 * @param props.isSubmitting - Whether the form is submitting
 * @param props.onSecondaryClick - Handler for secondary action
 * @param props.showSecondary - Whether to show the secondary button
 * @param props.className - Additional CSS classes
 * @returns The rendered form action buttons
 */
export function FormActions({
  primaryText = 'Submit',
  secondaryText = 'Cancel',
  isSubmitting = false,
  onSecondaryClick,
  showSecondary = true,
  className = '',
}: FormActionsProps): React.ReactElement {
  return (
    <div className={`flex justify-end space-x-4 ${className}`}>
      {showSecondary && (
        <button
          type="button"
          className="px-4 py-2 border border-navy-600 text-ocean-100 rounded-md shadow-sm hover:bg-navy-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ocean-500"
          onClick={onSecondaryClick}
          disabled={isSubmitting}
        >
          {secondaryText}
        </button>
      )}

      <button
        type="submit"
        className="px-4 py-2 bg-ocean-600 border border-transparent rounded-md shadow-sm text-white hover:bg-ocean-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ocean-500 disabled:opacity-50"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className="flex items-center">
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {primaryText}
          </span>
        ) : (
          primaryText
        )}
      </button>
    </div>
  );
}
