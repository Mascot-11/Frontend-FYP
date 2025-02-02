import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import NavBar from "./components/navbar";
import AdminSidebar from "./components/Adminsidebar"; // Import AdminSidebar component
import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Music from "./Pages/music";
import Tattoo from "./Pages/tattoo";
import ForgotPassword from "./Pages/forgotpassword";
import ResetPassword from "./Pages/passwordrest";
import AppointmentPage from "./Pages/appointment";
import AppointmentsList from "./Pages/AdminAppointment";
import UserList from "./Pages/userlist";
import MyAppointments from "./Pages/myaapointment";

import Chat from "./Pages/Chat";
import FAQ from "./Pages/Faq";
import { login } from "./Utils/api";
import TattooGallery from "./Pages/TattooGallery";
import AdminTattooGallery from "./Pages/AdminTattooGallery";

const App = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(""); // Track the role of the user

  // Check if the user is logged in and retrieve the role from localStorage
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const role = localStorage.getItem("user_role"); // Use the exact key as in localStorage
    console.log("User role from localStorage:", role); // Debugging
    if (token && role) {
      setIsUserLoggedIn(true);
      setUserRole(role); // Set role from localStorage
    } else {
      setIsUserLoggedIn(false);
      setUserRole(""); // Reset role if no token found
    }
  }, []);

  const handleLogin = async (credentials) => {
    try {
      console.log("Login credentials:", credentials); // Debugging
      const data = await login(credentials);
      localStorage.setItem("auth_token", data.access_token);
      localStorage.setItem("user_role", data.role); // Save role to localStorage (ensure the key is 'user_role')
      setIsUserLoggedIn(true);
      setUserRole(data.role); // Update the role in state
      console.log("Login successful, role:", data.role); // Debugging
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = () => {
    localStorage.clear(); // Clear auth token
  };

  // Routes that do not require the navbar and sidebar
  const routesWithoutNavBar = [
    "/tattoo",
    "/gallery",
    "/Booking",
    "/faq",
    "/events",
    "/artists",
    "/music",
    "/appointment",
  ];

  const AppContent = () => {
    const location = useLocation();
    const showNavBar = !routesWithoutNavBar.includes(location.pathname);

    return (
      <>
        {showNavBar && (
          <>
            <NavBar
              isUserLoggedIn={isUserLoggedIn}
              onLogin={handleLogin}
              onLogout={handleLogout}
              userRole={userRole} // Pass role to NavBar for conditional rendering
            />
            {/* Conditionally render AdminSidebar if the user is an admin */}
            {userRole === "admin" && <AdminSidebar />}
          </>
        )}
        <Routes>
          <Route path="/" element={<Navigate to="/landing" />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/music" element={<Music />} />
          <Route path="/tattoo" element={<Tattoo />} />
          <Route path="/admin/users" element={<UserList />} />

          <Route path="/Faq" element={<FAQ />} />
          <Route path="/admin/appointments" element={<AppointmentsList />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/appointment" element={<AppointmentPage />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/gallery" element={<TattooGallery />} />
          <Route
            path="/myappointments"
            element={
              isUserLoggedIn ? <MyAppointments /> : <Navigate to="/login" />
            }
          />
          <Route path="*" element={<h2>Page not found</h2>} />
          <Route
            path="/admin/tattoo-gallery"
            element={<AdminTattooGallery />}
          />
        </Routes>
      </>
    );
  };

  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
