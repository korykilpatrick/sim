import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-navy-900 text-white py-8 border-t border-navy-700">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-ocean-300">
              SYNMAX MARITIME
            </h3>
            <p className="text-ocean-100">Actionable Intelligence at Sea</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-ocean-300">Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-ocean-100 hover:text-ocean-300">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/marketplace"
                  className="text-ocean-100 hover:text-ocean-300"
                >
                  Marketplace
                </Link>
              </li>
              <li>
                <Link
                  to="/auth/login"
                  className="text-ocean-100 hover:text-ocean-300"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/auth/register"
                  className="text-ocean-100 hover:text-ocean-300"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-ocean-300">
              Contact
            </h4>
            <address className="not-italic text-ocean-100">
              <p>SynMax Intelligence</p>
              <p>123 Maritime Way</p>
              <p>Houston, TX 77001</p>
              <p className="mt-2">
                <a
                  href="mailto:info@synmax.com"
                  className="hover:text-ocean-300"
                >
                  info@synmax.com
                </a>
              </p>
            </address>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-navy-800 text-center text-ocean-200">
          <p>
            &copy; {new Date().getFullYear()} SynMax Intelligence. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
