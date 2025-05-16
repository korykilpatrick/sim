import React from 'react';

/**
 * Alert variant types for different visual styles
 */
type AlertVariant = 'info' | 'success' | 'warning' | 'error';

/**
 * Props for the Alert component
 */
export interface AlertProps {
  /** The title of the alert */
  title?: string;
  /** The main content of the alert */
  children: React.ReactNode;
  /** The visual style variant of the alert */
  variant?: AlertVariant;
  /** Optional icon to display in the alert */
  icon?: React.ReactNode;
  /** Whether the alert is dismissible */
  dismissible?: boolean;
  /** Function called when the alert is dismissed */
  onDismiss?: () => void;
}

/**
 * Alert component for displaying important messages to users
 *
 * @param props - The component props
 * @param props.title - The title of the alert
 * @param props.children - The main content of the alert
 * @param props.variant - The visual style variant of the alert
 * @param props.icon - Optional icon to display in the alert
 * @param props.dismissible - Whether the alert is dismissible
 * @param props.onDismiss - Function called when the alert is dismissed
 * @returns The rendered alert component with appropriate styling
 */
export const Alert: React.FC<AlertProps> = ({
  title,
  children,
  variant = 'info',
  icon,
  dismissible = false,
  onDismiss,
}) => {
  const variantClasses = {
    info: 'bg-blue-50 text-blue-800 border-blue-200',
    success: 'bg-green-50 text-green-800 border-green-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    error: 'bg-red-50 text-red-800 border-red-200',
  };

  return (
    <div className={`p-4 rounded-md border ${variantClasses[variant]}`}>
      <div className="flex">
        {icon && <div className="flex-shrink-0 mr-3">{icon}</div>}
        <div className="flex-1">
          {title && <h3 className="text-sm font-medium mb-1">{title}</h3>}
          <div className="text-sm">{children}</div>
        </div>
        {dismissible && onDismiss && (
          <button
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 rounded-md p-1.5 inline-flex focus:outline-none focus:ring-2 focus:ring-offset-2"
            onClick={onDismiss}
            aria-label="Dismiss"
          >
            <span className="sr-only">Dismiss</span>
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
