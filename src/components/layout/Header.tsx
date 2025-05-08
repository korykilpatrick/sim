import { Link } from 'react-router-dom';
import { useAppSelector } from '@hooks/redux';
import { LogoutButton } from '@components/auth/LogoutButton';

export const Header = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { items } = useAppSelector((state) => state.cart);
  const cartItemCount = items.length;

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-primary-600">SynMax</span>
              <span className="text-xl">Marketplace</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link to="/marketplace" className="text-secondary-600 hover:text-secondary-900">
              Marketplace
            </Link>
            {isAuthenticated && (
              <>
                <Link to="/protected/dashboard" className="text-secondary-600 hover:text-secondary-900">
                  My Products
                </Link>
              </>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/protected/cart" className="relative">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
                <div className="relative group">
                  <button className="flex items-center space-x-1 text-secondary-600 hover:text-secondary-900">
                    <span>{user?.name || 'Account'}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute right-0 w-48 bg-white rounded-md shadow-lg hidden group-hover:block z-10">
                    <div className="py-1">
                      <Link to="/protected/dashboard" className="block px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-100">
                        Dashboard
                      </Link>
                      <Link to="/protected/settings" className="block px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-100">
                        Settings
                      </Link>
                      <LogoutButton />
                    </div>
                  </div>
                </div>
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