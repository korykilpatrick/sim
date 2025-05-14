import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '@hooks/redux';
import { Logo } from './Logo';
import { Navigation } from './Navigation';
import { CartIcon } from './CartIcon';
import { UserMenu } from './UserMenu';

/**
 * Main header component with logo, navigation, and user menu
 *
 * @returns The rendered header component with logo, navigation, cart icon, and user menu
 */
export const Header: React.FC = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { items } = useAppSelector((state) => state.cart);
  const cartItemCount = items.length;

  return (
    <header className="bg-navy-800 shadow-lg border-b border-navy-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Logo />
          </div>

          <Navigation isAuthenticated={isAuthenticated} />

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <CartIcon itemCount={cartItemCount} />
                <UserMenu />
              </>
            ) : (
              <Link to="/auth/login" className="btn-primary">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
