import { Outlet } from 'react-router-dom';

/**
 * Layout component for authentication pages (login and registration)
 *
 * @returns The rendered authentication layout with centered content and branding
 */
export const AuthLayout = () => {
  return (
    <div className="flex min-h-screen bg-navy-900">
      <div className="m-auto w-full max-w-md p-8 bg-navy-800 rounded-lg shadow-md border border-navy-700">
        <div className="mb-8 text-center">
          <span className="text-xl font-bold text-ocean-400">SYNMAX</span>
          <h1 className="text-2xl font-bold text-ocean-300 mt-2">
            Intelligence Marketplace
          </h1>
        </div>
        <Outlet />
      </div>
    </div>
  );
};
