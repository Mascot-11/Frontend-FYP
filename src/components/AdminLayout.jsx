import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminSidebar from "./Adminsidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-grow p-4 ml-64">
        {" "}
        {/* Adjusted ml-64 to leave enough space for sidebar */}
        {children} {/* Render child components (admin pages) here */}
      </div>
    </div>
  );
};

export default AdminLayout;
