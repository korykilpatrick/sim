import React from 'react';
import { FooterBranding } from '../FooterBranding';
import { FooterLinks } from '../FooterLinks';
import { FooterContact } from '../FooterContact';
import { FooterCopyright } from '../FooterCopyright';

/**
 * Main footer component with branding, links, contact info, and copyright
 *
 * @returns The rendered footer component with branding, links, contact, and copyright sections
 */
export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-900 text-white py-8 border-t border-navy-700">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FooterBranding />
          <FooterLinks />
          <FooterContact />
        </div>
        <FooterCopyright />
      </div>
    </footer>
  );
};
