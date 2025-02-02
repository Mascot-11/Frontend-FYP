// navbar.jsx
import React, { useState } from "react"; // Add useState here
import { Link } from "react-router-dom";
import {
  Home,
  Palette,
  Music,
  Image,
  UserPlus,
  LogIn,
  X,
  Menu,
} from "lucide-react";
const NavBar = ({ isUserLoggedIn, onLogin, onLogout, user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = [
    { to: "/landing", text: "Home", icon: Home },
    { to: "/tattoo", text: "Tattoo", icon: Palette },
    { to: "/music", text: "Music", icon: Music },
    ...(isUserLoggedIn
      ? [{ to: "/myappointments", text: "My Appointments", icon: Image }]
      : []), // Conditionally add 'My Appointments'
    ...(isUserLoggedIn
      ? [{ to: "/login", text: "Logout", icon: LogIn, onClick: onLogout }]
      : [
          { to: "/register", text: "Register", icon: UserPlus },
          { to: "/login", text: "Login", icon: LogIn, onClick: onLogin },
        ]),
  ];

  return (
    <nav className="sticky top-0 bg-black text-white z-10 shadow-lg w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/landing" className="text-2xl font-bold">
            Color Mode
          </Link>

          {/* Hamburger menu for small screens */}
          <button
            className="md:hidden text-white hover:text-gray-400 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          {/* Menu items (hidden on small screens) */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {menuItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                  onClick={item.onClick}
                >
                  <item.icon className="inline-block w-5 h-5 mr-2" />
                  {item.text}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black text-white">
          <div className="px-4 py-4 space-y-4">
            {menuItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                onClick={() => {
                  item.onClick?.();
                  setIsMenuOpen(false); // Close menu after clicking
                }}
              >
                <item.icon className="inline-block w-5 h-5 mr-2" />
                {item.text}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
export default NavBar;
