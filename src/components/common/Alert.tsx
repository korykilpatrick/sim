import React from 'react';
import { AlertIcon } from './AlertIcon';
import { AlertContent } from './AlertContent';
import { AlertActions } from './AlertActions';

type AlertVariant = 'info' | 'success' | 'warning' | 'error';

/**
 * Props for the Alert component
 */
type AlertProps = {
  /** Alert variant (info, success, warning, error) */
  variant?: AlertVariant;
  /** Optional title for the alert */
  title?: string;
  /** Alert message content */
  message: string;
  /** Optional callback for closing the alert */
  onClose?: () => void;
  /** Additional CSS classes */
  className?: string;
};

/**
 * Component for displaying alert messages with different variants
 */
export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  message,
  onClose,
  className = '',
}) => {
  const variantStyles: Record<AlertVariant, string> = {
    info: 'bg-navy-800 text-ocean-300 border-ocean-700',
    success: 'bg-green-900 text-green-300 border-green-700',
    warning: 'bg-yellow-900 text-yellow-300 border-yellow-700',
    error: 'bg-red-900 text-red-300 border-red-700',
  };

  return (
    <div
      className={`border rounded-md p-4 ${variantStyles[variant]} ${className}`}
    >
      <div className="flex">
        <AlertIcon variant={variant} />
        <AlertContent title={title} message={message} />
        <AlertActions variant={variant} onClose={onClose} />
      </div>
    </div>
  );
};
