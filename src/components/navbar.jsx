import React from "react";
import { Link } from "react-router-dom";
import { Home, Palette, Music, Image, UserPlus, LogIn } from "lucide-react";

const NavBar = ({ isUserLoggedIn, onLogin, onLogout }) => {
  const menuItems = [
    { to: "/landing", text: "Home", icon: Home },
    { to: "/tattoo", text: "Tattoo", icon: Palette },
    { to: "/music", text: "Music", icon: Music },
    { to: "/murals", text: "Murals", icon: Image },
    { to: "/userlist", text: "Users", icon: Image },
    { to: "/appointmentslist", text: "Appointments", icon: Image },
    ...(isUserLoggedIn
      ? [{ to: "/login", text: "Logout", icon: LogIn, onClick: onLogout }]
      : [
          { to: "/register", text: "Register", icon: UserPlus },
          { to: "/login", text: "Login", icon: LogIn, onClick: onLogin },
        ]), // Login/Register based on authentication status
  ];

  return (
    <nav className="sticky top-0 bg-black text-white z-10 shadow-lg w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/landing" className="text-2xl font-bold">
              Color Mode
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {menuItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                  onClick={item.onClick} // Call onClick for login/logout actions
                >
                  <item.icon className="inline-block w-5 h-5 mr-2" />
                  {item.text}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
