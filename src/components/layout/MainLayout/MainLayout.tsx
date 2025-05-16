import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import { Footer } from '../Footer';

/**
 * Main layout component for the application
 *
 * @returns The rendered main layout with header, content area, and footer
 */
export const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 text-white">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
