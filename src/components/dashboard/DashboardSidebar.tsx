import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '@hooks/redux';

export const DashboardSidebar: React.FC = () => {
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);
  const { balance } = useAppSelector((state) => state.credits);
  
  // Navigation items
  const navItems = [
    { name: 'My Products', path: '/protected/dashboard' },
    { name: 'My Team', path: '/protected/dashboard/team', disabled: true },
    { name: 'Billing & Plan', path: '/protected/dashboard/billing', disabled: true },
    { name: 'Settings', path: '/protected/settings' },
  ];
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      {/* User Info */}
      <div className="mb-6 pb-6 border-b border-secondary-200">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-semibold">
            {user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase()}
          </div>
          <div className="ml-3">
            <p className="font-medium text-secondary-900">{user?.name || 'User'}</p>
            <p className="text-sm text-secondary-500">{user?.email}</p>
          </div>
        </div>
        
        <div className="mt-4 bg-secondary-50 rounded-md p-3">
          <div className="flex justify-between items-center">
            <p className="text-sm text-secondary-600">Credit Balance</p>
            <p className="font-semibold text-secondary-900">{balance}</p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.disabled ? '#' : item.path}
            className={`
              block px-3 py-2 rounded-md w-full text-left
              ${
                isActive(item.path)
                  ? 'bg-primary-50 text-primary-700 font-medium'
                  : 'text-secondary-700 hover:bg-secondary-50'
              }
              ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            onClick={(e) => {
              if (item.disabled) {
                e.preventDefault();
              }
            }}
          >
            {item.name}
            {item.disabled && (
              <span className="text-xs ml-2 text-secondary-500">(Coming Soon)</span>
            )}
          </Link>
        ))}
      </nav>
    </div>
  );
};