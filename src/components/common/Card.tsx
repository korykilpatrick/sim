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
      className={`bg-navy-800 rounded-lg shadow-lg border border-navy-700 overflow-hidden ${className}`}
      {...rest}
    >
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b border-navy-700">
          {title && <h3 className="text-lg font-medium text-ocean-300">{title}</h3>}
          {subtitle && <p className="mt-1 text-sm text-ocean-100">{subtitle}</p>}
        </div>
      )}
      
      <div className={noPadding ? '' : 'p-6'}>
        {children}
      </div>
      
      {footer && (
        <div className="px-6 py-4 border-t border-navy-700 bg-navy-900">
          {footer}
        </div>
      )}
    </div>
  );
};