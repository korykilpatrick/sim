import React from 'react';

type AlertVariant = 'info' | 'success' | 'warning' | 'error';

/**
 * Props for the AlertActions component
 */
export interface AlertActionsProps {
  /** Alert variant */
  variant: AlertVariant;
  /** Function to handle closing the alert */
  onClose?: (() => void) | undefined;
}

/**
 * Component for displaying alert actions (like close button)
 * 
 * @param props - The component props
 * @param props.variant - Alert variant
 * @param props.onClose - Function to handle closing the alert
 * @returns The rendered close button for the alert or null if no onClose handler is provided
 */
export const AlertActions: React.FC<AlertActionsProps> = ({
  variant,
  onClose,
}) => {
  if (!onClose) return null;

  return (
    <div className="ml-auto pl-3">
      <div className="-mx-1.5 -my-1.5">
        <button
          type="button"
          onClick={onClose}
          className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2
            ${variant === 'info' ? 'text-blue-500 hover:bg-blue-100 focus:ring-blue-600' : ''}
            ${variant === 'success' ? 'text-green-500 hover:bg-green-100 focus:ring-green-600' : ''}
            ${variant === 'warning' ? 'text-yellow-500 hover:bg-yellow-100 focus:ring-yellow-600' : ''}
            ${variant === 'error' ? 'text-red-500 hover:bg-red-100 focus:ring-red-600' : ''}
          `}
        >
          <span className="sr-only">Dismiss</span>
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
