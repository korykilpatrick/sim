import React, { useRef, useEffect } from 'react';
import { Button } from './Button';

// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   title?: string;
//   children: React.ReactNode;
//   footer?: React.ReactNode;
//   size?: 'sm' | 'md' | 'lg' | 'xl';
//   closeOnOverlayClick?: boolean;
// }

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeOnOverlayClick?: boolean;
};

/**
 * Modal component for displaying content in a dialog overlay
 * 
 * @param props - The component props
 * @param props.isOpen - Whether the modal is currently open
 * @param props.onClose - Function to call when the modal should close
 * @param props.title - Optional modal title
 * @param props.children - Content to display inside the modal
 * @param props.footer - Optional footer content
 * @param props.size - Size of the modal
 * @param props.closeOnOverlayClick - Whether clicking the overlay should close the modal
 * @returns The rendered modal component or null if not open
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeOnOverlayClick = true,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Handle click outside
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      closeOnOverlayClick &&
      modalRef.current &&
      !modalRef.current.contains(e.target as Node)
    ) {
      onClose();
    }
  };

  // Size classes
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-center min-h-screen p-4 text-center">
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={handleOverlayClick}
        ></div>

        {/* Modal */}
        <div
          ref={modalRef}
          className={`inline-block w-full ${sizeClasses[size]} p-6 my-8 overflow-hidden text-left align-middle bg-navy-800 text-white border border-navy-700 rounded-lg shadow-xl transform transition-all`}
        >
          {/* Header */}
          {title && (
            <div className="flex justify-between items-center pb-3 border-b border-navy-700">
              <h3
                className="text-lg font-medium text-ocean-300"
                id="modal-title"
              >
                {title}
              </h3>
              <Button
                variant="secondary"
                size="sm"
                onClick={onClose}
                aria-label="Close"
                className="!p-1 !bg-transparent hover:!bg-secondary-100"
              >
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </Button>
            </div>
          )}

          {/* Body */}
          <div className={`${title ? 'mt-4' : ''}`}>{children}</div>

          {/* Footer */}
          {footer && (
            <div className="mt-6 pt-3 border-t border-navy-700">{footer}</div>
          )}
        </div>
      </div>
    </div>
  );
};
