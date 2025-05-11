import React from 'react';

/**
 * Props for InfoBoxSection component
 */
export interface InfoBoxSectionProps {
  /** Box type/color */
  type: 'info' | 'warning' | 'success' | 'error';
  /** Box title */
  title: string;
  /** Box content */
  children: React.ReactNode;
}

/**
 * Component for displaying information boxes
 * 
 * @param props - The component props
 * @param props.type - Box type/color (info, warning, success, error)
 * @param props.title - Box title
 * @param props.children - Box content
 * @returns The rendered information box with styled container, title, and content
 */
export const InfoBoxSection: React.FC<InfoBoxSectionProps> = ({
  type,
  title,
  children,
}) => {
  const styles = {
    info: {
      container: 'bg-blue-50 border-blue-200',
      title: 'text-blue-800',
      content: 'text-blue-700',
    },
    warning: {
      container: 'bg-yellow-50 border-yellow-200',
      title: 'text-yellow-800',
      content: 'text-yellow-700',
    },
    success: {
      container: 'bg-green-50 border-green-200',
      title: 'text-green-800',
      content: 'text-green-700',
    },
    error: {
      container: 'bg-red-50 border-red-200',
      title: 'text-red-800',
      content: 'text-red-700',
    },
  };

  return (
    <div className={`p-4 rounded-md border ${styles[type].container}`}>
      <h3 className={`text-sm font-medium ${styles[type].title} mb-2`}>
        {title}
      </h3>
      <div className={`text-sm ${styles[type].content}`}>{children}</div>
    </div>
  );
};
