import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import NavBar from "./components/navbar";
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
import AdminChat from "./Pages/AdminChat";
import Chat from "./Pages/Chat";
import FAQ from "./Pages/Faq";
import { login } from "./Utils/api";

const App = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  // Check if the user is logged in on page load
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    console.log("Token from localStorage:", token);
    setIsUserLoggedIn(!!token);
  }, []);

  const handleLogin = async (credentials) => {
    try {
      console.log("Login credentials:", credentials);
      const data = await login(credentials);
      localStorage.setItem("auth_token", data.access_token);
      setIsUserLoggedIn(true);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    setIsUserLoggedIn(false);
  };

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
          <NavBar
            isUserLoggedIn={isUserLoggedIn}
            onLogin={handleLogin}
            onLogout={handleLogout}
          />
        )}
        <Routes>
          <Route path="/" element={<Navigate to="/landing" />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/music" element={<Music />} />
          <Route path="/tattoo" element={<Tattoo />} />
          <Route path="/userlist" element={<UserList />} />
          <Route path="/Faq" element={<FAQ />} />
          <Route path="/appointmentslist" element={<AppointmentsList />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/appointment" element={<AppointmentPage />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/adminchat" element={<AdminChat />} />
          <Route path="*" element={<h2>Page not found</h2>} />
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
