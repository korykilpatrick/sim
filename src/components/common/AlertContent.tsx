import React from 'react';

/**
 * Props for the AlertContent component
 */
export interface AlertContentProps {
  /** Alert title */
  title?: string | undefined;
  /** Alert message */
  message: string;
}

/**
 * Component for displaying alert content (title and message)
 * 
 * @param props - The component props
 * @param props.title - Alert title
 * @param props.message - Alert message
 * @returns The rendered alert content with title and message
 */
export const AlertContent: React.FC<AlertContentProps> = ({
  title,
  message,
}) => {
  return (
    <div className="ml-3 flex-1">
      {title && <h3 className="text-sm font-medium">{title}</h3>}
      <div className="text-sm">
        <p>{message}</p>
      </div>
    </div>
  );
};
