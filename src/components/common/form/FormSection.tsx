import React from 'react';

/**
 * Props for the FormSection component
 */
interface FormSectionProps {
  /** Section title */
  title: string;
  /** Optional description */
  description?: string;
  /** Whether to show a border at the top */
  showBorder?: boolean;
  /** Section content */
  children: React.ReactNode;
}

/**
 * Component for consistent form section styling
 */
export const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  showBorder = true,
  children,
}) => {
  return (
    <div className={`${showBorder ? 'border-t border-secondary-200 pt-6' : ''} mb-6`}>
      <h3 className="text-lg font-medium text-secondary-900 mb-2">
        {title}
      </h3>
      
      {description && (
        <p className="text-secondary-600 mb-4">{description}</p>
      )}
      
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};
