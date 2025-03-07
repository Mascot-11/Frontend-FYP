import { useState } from "react";
import { Link } from "react-router-dom";
import { motion} from "framer-motion";
import {
  FaTachometerAlt,
  FaImages,
  FaPaintBrush,
  FaCalendarAlt,
  FaUser,
  FaCog
  
} from "react-icons/fa";

const AdminSidebar = () => {
  const [] = useState(true);

  

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
  animate="open"
  variants={sidebarVariants}
>
  <div className="flex items-center justify-between p-4 border-b border-gray-800">
    <motion.h2
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-xl font-semibold tracking-wider"
    >
      Admin Panel
    </motion.h2>
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
              className={`text-xl mr-3`}
            />
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              className="text-sm whitespace-nowrap"
            >
              {item.label}
            </motion.span>
          </Link>
        </li>
      ))}
    </ul>
  </nav>
</motion.div>
  );
};

export default AdminSidebar;
