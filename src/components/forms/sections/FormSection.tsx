import React from 'react';
import type { FormSectionProps } from '@components/forms';

/**
 * Component for grouping related form fields
 *
 * @param props - The component props
 * @param props.title - Section title
 * @param props.description - Optional description
 * @param props.showBorder - Whether to show a border at the top
 * @param props.children - Section content
 * @param props.className - Additional CSS classes
 * @returns The rendered form section with title, description, and content
 */
export function FormSection({
  title,
  description,
  showBorder = true,
  children,
  className = '',
}: FormSectionProps): React.ReactElement {
  return (
    <div
      className={`${
        showBorder ? 'border-t border-secondary-200 pt-6' : ''
      } mb-6 ${className}`}
    >
      <h3 className="text-lg font-medium text-secondary-900 mb-2">{title}</h3>

      {description && <p className="text-secondary-600 mb-4">{description}</p>}

      <div className="space-y-4">{children}</div>
    </div>
  );
}
