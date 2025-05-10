import React from 'react';
import { TextareaField } from './FormFields';

/**
 * Component for the notes input section
 */
export const NotesSection: React.FC = () => {
  return (
    <div className="border-t border-secondary-200 pt-6">
      <TextareaField
        name="notes"
        label="Notes"
        placeholder="Add any additional information or requirements"
        helperText="Optional: Add any special instructions or notes for this monitoring service"
      />
    </div>
  );
};
