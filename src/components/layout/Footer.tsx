import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-secondary-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">SynMax Intelligence Marketplace</h3>
            <p className="text-secondary-300">
              Your source for maritime industry data and analytics products
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-secondary-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="text-secondary-300 hover:text-white">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link to="/auth/login" className="text-secondary-300 hover:text-white">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/auth/register" className="text-secondary-300 hover:text-white">
                  Register
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <address className="not-italic text-secondary-300">
              <p>SynMax Intelligence</p>
              <p>123 Maritime Way</p>
              <p>Houston, TX 77001</p>
              <p className="mt-2">
                <a href="mailto:info@synmax.com" className="hover:text-white">
                  info@synmax.com
                </a>
              </p>
            </address>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-secondary-700 text-center text-secondary-400">
          <p>&copy; {new Date().getFullYear()} SynMax Intelligence. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};