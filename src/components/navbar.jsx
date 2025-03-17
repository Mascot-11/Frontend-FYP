import { useEffect, useState } from "react";
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
  DollarSign
} from "lucide-react";
import {FaPaintBrush} from "react-icons/fa";

const NavBar = ({ onLogin, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }
    // if any problem regarding infinte uncommet code below
  },
// []
);
  const menuItems = [
    { to: "/landing", text: "Home", icon: Home },
    { to: "/tattoo", text: "Tattoo", icon: Palette },
    { to: "/music", text: "Music", icon: Music },
    ...(isUserLoggedIn
      ? [{ to: "/userpayments", text: "My Payments", icon: DollarSign }]
      : []),
    ...(isUserLoggedIn
      ? [{ to: "/myappointments", text: "My Appointments", icon: FaPaintBrush }]
      : []),
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

          {/* Mobile Menu Button */}
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

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {menuItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                  onClick={item.onClick} // FIXED: No automatic logout
                >
                  <item.icon className="inline-block w-5 h-5 mr-2" />
                  {item.text}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black text-white">
          <div className="px-4 py-4 space-y-4">
            {menuItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                onClick={() => {
                  if (item.onClick) item.onClick(); // Call onClick if it exists
                  setIsMenuOpen(false); // Close mobile menu after clicking
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
}

export default NavBar;
