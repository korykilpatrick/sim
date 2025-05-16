import React from 'react';

/**
 * Component for displaying the footer contact information
 *
 * @returns The rendered footer contact section with address and email
 */
export const FooterContact: React.FC = () => {
  return (
    <div>
      <h4 className="text-lg font-semibold mb-4 text-ocean-300">Contact</h4>
      <address className="not-italic text-ocean-100">
        <p>SynMax Intelligence</p>
        <p>123 Maritime Way</p>
        <p>Houston, TX 77001</p>
        <p className="mt-2">
          <a href="mailto:info@synmax.com" className="hover:text-ocean-300">
            info@synmax.com
          </a>
        </p>
      </address>
    </div>
  );
};
