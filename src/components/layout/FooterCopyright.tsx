import React from 'react';

/**
 * Component for displaying the footer copyright notice
 * 
 * @returns The rendered footer copyright section with current year and company name
 */
export const FooterCopyright: React.FC = () => {
  return (
    <div className="mt-8 pt-8 border-t border-navy-800 text-center text-ocean-200">
      <p>
        &copy; {new Date().getFullYear()} SynMax Intelligence. All rights
        reserved.
      </p>
    </div>
  );
};
