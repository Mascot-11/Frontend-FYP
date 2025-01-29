import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTachometerAlt,
  FaImages,
  FaPaintBrush,
  FaCalendarAlt,
  FaUser,
  FaCog,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const AdminSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sidebarVariants = {
    open: { width: "16rem", transition: { duration: 0.3 } },
    closed: { width: "3rem", transition: { duration: 0.3 } },
  };

  const menuItems = [
    { path: "/admin/dashboard", icon: FaTachometerAlt, label: "Dashboard" },
    { path: "/admin/tattoo-gallery", icon: FaImages, label: "Tattoo Gallery" },
    { path: "/admin/artists", icon: FaPaintBrush, label: "Artists" },
    { path: "/admin/appointments", icon: FaCalendarAlt, label: "Appointments" },
    { path: "/admin/users", icon: FaUser, label: "Manage Users" },
    { path: "/chat", icon: FaCog, label: "Chats" },
  ];

  return (
    <motion.div
      className="h-screen bg-black text-white fixed top-0 left-0 z-50 overflow-hidden shadow-lg flex flex-col"
      initial="open"
      animate={isSidebarOpen ? "open" : "closed"}
      variants={sidebarVariants}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xl font-semibold tracking-wider"
            >
              Admin Panel
            </motion.h2>
          )}
        </AnimatePresence>
        <button
          onClick={toggleSidebar}
          className="text-white p-2 rounded-full hover:bg-gray-800 focus:outline-none transition-colors duration-200"
        >
          {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>
      <nav className="flex-grow py-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className="flex items-center py-3 px-4 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200"
              >
                <item.icon
                  className={`text-xl ${isSidebarOpen ? "mr-3" : "mx-auto"}`}
                />
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      className="text-sm whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </motion.div>
  );
};

export default AdminSidebar;
