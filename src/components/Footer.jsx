import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className="text-white bg-cover bg-center relative mt-20"
      style={{ backgroundImage: "url('/footer-bg.jpg')" }}
    >
      <div className="bg-blue-900 bg-opacity-70 w-full h-full py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-sm">
          {/* Logo & Brand */}
          <div className="flex flex-col items-start space-y-3">
            <img
              src="/logo.png"
              alt="MCV Logo"
              className="h-12 w-auto object-contain"
            />
            <p className="text-sm text-gray-200 max-w-xs">
              Serving the Muslim community of Victoria through support, events,
              and education.
            </p>
          </div>

          {/* About */}
          <div>
            <h2 className="text-lg font-semibold mb-3 text-white">About Us</h2>
            <p className="text-gray-300">
              We support students and residents spiritually, socially, and
              academically through inclusive services and community programs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold mb-3 text-white">
              Quick Links
            </h2>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link to="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/resources" className="hover:underline">
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/prayer-times" className="hover:underline">
                  Prayer Times
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h2 className="text-lg font-semibold mb-3 text-white">Contact</h2>
            <p className="text-gray-300">📍 Victoria, BC</p>
            <p className="text-gray-300">✉️ info@victoriamuslim.org</p>
            <div className="mt-4 flex space-x-4 text-gray-200">
              <a href="#" className="hover:text-blue-400">
                Facebook
              </a>
              <a
                href="https://www.instagram.com/bishar_abdinur/"
                className="hover:text-blue-300"
              >
                Instagram
              </a>
              <a
                href="#https://x.com/abdinur_bishar"
                className="hover:text-blue-200"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 text-center text-xs text-gray-400 border-t border-gray-500 pt-6">
          &copy; {new Date().getFullYear()} Muslim Community of Victoria. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
