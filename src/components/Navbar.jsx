import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { RiCloseLargeFill } from "react-icons/ri";
import { useAuth } from "../context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { toast } from "react-toastify";

function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, userRole } = useAuth();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const handleLogout = async () => {
    try {
      await signOut(getAuth());
      toast.success("Signed out successfully");
      navigate("/signin");
    } catch (error) {
      toast.error("Logout failed", error.message);
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Prayer Times", path: "/prayer-times" },
    { name: "Events/Gallery", path: "/events" },
    { name: "Resources", path: "/resources" },
    { name: "Contact", path: "/contact" },
  ];

  const handleProtectedNavigation = (path) => {
    if (!user && path !== "/") {
      toast.warning("Please sign in to access this page");
      navigate("/signin");
      return;
    }
    navigate(path);
    closeMenu();
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 transition-colors">
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
        <nav className="space-x-4 hidden sm:flex items-center">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => handleProtectedNavigation(link.path)}
              className={`text-sm font-medium ${
                pathname === link.path
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-700 hover:text-blue-500"
              } pb-1 transition`}
            >
              {link.name}
            </button>
          ))}

          {/* Admin Link */}
          {user && userRole === "admin" && (
            <Link
              to="/admin"
              className={`text-sm font-medium ${
                pathname === "/admin"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-700 hover:text-blue-500"
              } pb-1 transition`}
            >
              Admin Panel
            </Link>
          )}

          {!user ? (
            <Link
              to="/signin"
              className="text-sm font-medium text-gray-700 hover:text-blue-500 transition"
            >
              Sign In
            </Link>
          ) : (
            <>
              <Link
                to="/profile"
                className="text-sm font-medium text-gray-700 hover:text-blue-500 transition"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-red-600 hover:underline"
              >
                Logout
              </button>
            </>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="sm:hidden text-blue-700 focus:outline-none"
          aria-label="Toggle Menu"
        >
          {menuOpen ? (
            <RiCloseLargeFill className="h-6 w-6" />
          ) : (
            <IoIosMenu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden bg-white border-t shadow-md px-4 py-3 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => handleProtectedNavigation(link.path)}
              className={`block text-sm font-medium ${
                pathname === link.path
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-500"
              }`}
            >
              {link.name}
            </button>
          ))}

          {/* Admin Link */}
          {user && userRole === "admin" && (
            <Link
              to="/admin"
              onClick={closeMenu}
              className={`block text-sm font-medium text-blue-400 p-2 ${
                pathname === "/admin"
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-500"
              }`}
            >
              Admin Panel
            </Link>
          )}

          {!user ? (
            <Link
              to="/signin"
              onClick={closeMenu}
              className="block text-sm font-medium text-gray-700 hover:text-blue-500"
            >
              Sign In
            </Link>
          ) : (
            <>
              <Link
                to="/profile"
                onClick={closeMenu}
                className="block text-sm font-medium text-gray-700 hover:text-blue-500"
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  closeMenu();
                }}
                className="block text-sm font-medium text-red-600 hover:underline"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;
