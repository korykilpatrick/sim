import React from 'react';

/**
 * GlobalStyles component for applying global styles beyond Tailwind
 * 
 * @returns JSX element with global styles
 */
export const GlobalStyles: React.FC = () => {
  return (
    <style jsx global>{`
      /* Maritime-specific components styles from index.css */
      .maritime-card {
        @apply bg-navy-800 rounded-lg shadow-lg border-l-4 border-ocean-500 p-6;
      }

      .maritime-alert {
        @apply flex items-center p-4 bg-navy-700 border-l-4 border-ocean-500 rounded-r-md;
      }

      .maritime-data-table {
        @apply w-full divide-y divide-navy-700;
      }

      .maritime-data-table th {
        @apply px-6 py-3 text-left text-xs font-medium text-ocean-300 uppercase tracking-wider bg-navy-800;
      }

      .maritime-data-table td {
        @apply px-6 py-4 whitespace-nowrap text-sm text-white;
      }

      .vessel-tracking-box {
        @apply bg-navy-800 p-4 rounded-md border-l-4 border-ocean-600;
      }

      .map-container {
        @apply bg-navy-900 rounded-md overflow-hidden border border-navy-700;
      }
    `}</style>
  );
};
