import React from 'react';
import { TextareaField } from './FormFields';

/**
 * Props for the NotesSection component
 */
export interface NotesSectionProps {
  /** Field name */
  name?: string;
  /** Field label */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Helper text */
  helperText?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Number of rows */
  rows?: number;
}

/**
 * Component for the notes input section
 */
export const NotesSection: React.FC<NotesSectionProps> = ({
  name = 'notes',
  label = 'Notes',
  placeholder = 'Add any additional information or requirements',
  helperText = 'Optional: Add any special instructions or notes',
  required = false,
  rows = 4,
}) => {
  return (
    <div className="border-t border-secondary-200 pt-6">
      <TextareaField
        name={name}
        label={label}
        placeholder={placeholder}
        helperText={helperText}
        required={required}
        rows={rows}
      />
    </div>
  );
};
