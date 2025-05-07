import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  footer?: React.ReactNode;
  noPadding?: boolean;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  footer,
  children,
  noPadding = false,
  className = '',
  ...rest
}) => {
  return (
    <div
      className={`bg-white rounded-lg shadow overflow-hidden ${className}`}
      {...rest}
    >
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b border-secondary-200">
          {title && <h3 className="text-lg font-medium text-secondary-900">{title}</h3>}
          {subtitle && <p className="mt-1 text-sm text-secondary-500">{subtitle}</p>}
        </div>
      )}
      
      <div className={noPadding ? '' : 'p-6'}>
        {children}
      </div>
      
      {footer && (
        <div className="px-6 py-4 border-t border-secondary-200 bg-secondary-50">
          {footer}
        </div>
      )}
    </div>
  );
};