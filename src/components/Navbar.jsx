import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { RiCloseLargeFill } from "react-icons/ri";
// icon library (optional alternative: heroicons)

function Navbar() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Prayer Times", path: "/prayer-times" },
    { name: "Events", path: "/events" },
    { name: "Resources", path: "/resources" },
    { name: "Contact", path: "/contact" },
  ];

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-2"
          onClick={closeMenu}
        >
          <img
            src="/logo.png"
            alt="MCV Logo"
            className="h-10 w-15 object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="space-x-4 hidden sm:block">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium ${
                pathname === link.path
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-500"
              } pb-1 transition`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={toggleMenu}
          className="sm:hidden text-blue-700 focus:outline-none"
          aria-label="Toggle Menu"
        >
          {menuOpen ? (
            <IoIosMenu className="h-6 w-6" />
          ) : (
            <RiCloseLargeFill className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden bg-white border-t shadow-md px-4 py-3 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={closeMenu}
              className={`block text-sm font-medium ${
                pathname === link.path
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-500"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

export default Navbar;
