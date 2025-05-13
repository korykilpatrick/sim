import React from 'react';
import { TextareaField } from '@components/forms';

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
 *
 * @param props - The component props
 * @param props.name - Field name, defaults to 'notes'
 * @param props.label - Field label, defaults to 'Notes'
 * @param props.placeholder - Placeholder text
 * @param props.helperText - Helper text displayed below the field
 * @param props.required - Whether the field is required
 * @param props.rows - Number of rows for the textarea
 * @returns The rendered notes section with textarea field
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
