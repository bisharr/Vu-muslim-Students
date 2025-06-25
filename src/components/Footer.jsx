import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className="text-white bg-cover bg-center    relative mt-20"
      style={{ backgroundImage: "url('/footer-bg.jpg')" }}
    >
      <div className="bg-blue-800 bg-opacity-50 w-full h-full py-10 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-sm">
          {/* About */}
          <div>
            <h2 className="text-lg font-semibold mb-2">About Us</h2>
            <p>
              The Muslim Community of Victoria supports students and residents
              spiritually, socially, and academically through inclusive services
              and events.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Quick Links</h2>
            <ul className="space-y-1">
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
            <h2 className="text-lg font-semibold mb-2">Contact</h2>
            <p>Email: info@victoriamuslim.org</p>
            <p>Location: Victoria, BC</p>
            <div className="mt-2 flex space-x-4">
              <a href="#" className="hover:text-blue-400">
                Facebook
              </a>
              <a href="#" className="hover:text-blue-300">
                Instagram
              </a>
              <a href="#" className="hover:text-blue-200">
                Twitter
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 text-center text-xs text-gray-300">
          &copy; {new Date().getFullYear()} Muslim Community of Victoria. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
