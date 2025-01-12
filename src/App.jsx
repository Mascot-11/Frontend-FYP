import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NavBar from "./components/navbar";
import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Music from "./Pages/music";
import Tattoo from "./Pages/tattoo";
import AppointmentPage from "./Pages/appointment";
import AppointmentsList from "./Pages/AdminAppointment"; // Import the AppointmentsList component
import UserList from "./Pages/userlist"; // Import the UserList component
import { login } from "./Utils/api"; // Import the login function

const App = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  // Check if the user is logged in on page load
  useEffect(() => {
    const token = localStorage.getItem("auth_token"); // Check for 'auth_token' in localStorage
    console.log("Token from localStorage:", token);
    setIsUserLoggedIn(!!token); // Set login state based on the token presence
  }, []);

  const handleLogin = async (credentials) => {
    try {
      // Ensure credentials is an object with valid data
      console.log(credentials); // Add this to check what is being passed
      const data = await login(credentials);
      localStorage.setItem("auth_token", data.access_token);
      setIsUserLoggedIn(true);
    } catch (error) {
      console.error("Login failed:", error); // This will log the error details
    }
  };

  const handleLogout = () => {
    // Remove the token from localStorage and update login state
    localStorage.removeItem("auth_token");
    setIsUserLoggedIn(false);
  };

  return (
    <Router>
      <NavBar
        isUserLoggedIn={isUserLoggedIn} // Pass isUserLoggedIn as prop
        onLogin={handleLogin} // Pass handleLogin as prop
        onLogout={handleLogout} // Pass handleLogout as prop
      />
      <Routes>
        <Route path="/" element={<Navigate to="/landing" />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/music" element={<Music />} />
        <Route path="/tattoo" element={<Tattoo />} />
        <Route path="/userlist" element={<UserList />} />
        <Route path="/appointmentslist" element={<AppointmentsList />} />
        <Route path="/appointment" element={<AppointmentPage />} />
        <Route path="*" element={<h2>Page not found</h2>} />
      </Routes>
    </Router>
  );
};

export default App;
