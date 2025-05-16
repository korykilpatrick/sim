import React from 'react';

/**
 * Badge variant types for different visual styles
 */
export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'secondary';

/**
 * Props for the Badge component
 */
export interface BadgeProps {
  /** The content to display inside the badge */
  children: React.ReactNode;
  /** The visual style variant of the badge */
  variant?: BadgeVariant;
  /** Additional CSS classes to apply to the badge */
  className?: string;
}

/**
 * Badge component for displaying short status descriptors
 *
 * @param props - The component props
 * @param props.children - The content to display inside the badge
 * @param props.variant - The visual style variant of the badge
 * @param props.className - Additional CSS classes to apply to the badge
 * @returns The rendered badge component with appropriate styling
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className = '',
}) => {
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-blue-100 text-blue-800',
    secondary: 'bg-purple-100 text-purple-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
