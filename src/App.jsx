import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
import MyAppointments from "./Pages/myaapointment";
import Dashboard from "./Pages/AdminDashboard";
import Chat from "./Pages/Chat";
import FAQ from "./Pages/Faq";
import { login } from "./Utils/api";
import TattooGallery from "./Pages/TattooGallery";
import AdminTattooGallery from "./Pages/AdminTattooGallery";
import EventViewPage from "./Pages/EventViewPage";
import EventCrudPage from "./Pages/EventCrudPage";
import EventEditPage from "./Pages/EventEditPage";
import TicketPurchase from "./Pages/TicketPurchase";
import PaymentSuccess from "./components/PaymentSuccess";
import TicketConfirmation from "./Pages/TicketConfirmation";
import AdminLayout from "./components/AdminLayout";

// Create a QueryClient instance
const queryClient = new QueryClient();

// Function to check if the user is logged in
const isLoggedIn = () => !!localStorage.getItem("auth_token");

const App = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(isLoggedIn());
  const [userRole, setUserRole] = useState(localStorage.getItem("user_role") || "");

  useEffect(() => {
    setIsUserLoggedIn(isLoggedIn());
    setUserRole(localStorage.getItem("user_role") || "");
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const data = await login(credentials);
      localStorage.setItem("auth_token", data.access_token);
      localStorage.setItem("user_role", data.role);
      setIsUserLoggedIn(true);
      setUserRole(data.role);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsUserLoggedIn(false);
    setUserRole("");
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
        {showNavBar && <NavBar onLogin={handleLogin} onLogout={handleLogout} />}
        <div className={showNavBar ? "content-with-navbar" : "content"}>
          <Routes>
            <Route path="/" element={<Navigate to="/landing" />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/music" element={isUserLoggedIn ? <Music /> : <Navigate to="/login" />} />
            <Route path="/tattoo" element={<Tattoo />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/appointment" element={isUserLoggedIn ? <AppointmentPage /> : <Navigate to="/login" />} />
            <Route path="/chat" element={isUserLoggedIn ? <Chat /> : <Navigate to="/login" />} />
            <Route path="/gallery" element={<TattooGallery />} />
            <Route path="/events" element={isUserLoggedIn ? <EventCrudPage /> : <Navigate to="/login" />} />
            <Route path="/events/:eventId/edit" element={<EventEditPage />} />
            <Route path="/events/:eventId" element={<EventViewPage />} />
            <Route path="/ticket-purchase/:eventId" element={<TicketPurchase />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/ticket-confirmation" element={<TicketConfirmation />} />
            <Route path="/myappointments" element={isUserLoggedIn ? <MyAppointments /> : <Navigate to="/login" />} />
            <Route path="/landing" element={<Landing />} />

            {/* Admin Routes */}
            <Route element={<AdminLayout />}>
              <Route path="/admin/landing" element={<Landing />} />
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/users" element={<UserList />} />
              <Route path="/events/:eventId/edit" element={<EventEditPage />} />
              <Route path="/admin/appointments" element={<AppointmentsList />} />
              <Route path="/admin/tattoo-gallery" element={<AdminTattooGallery />} />
            </Route>

            {/* 404 Route */}
            <Route path="*" element={<h2>Page not found</h2>} />
          </Routes>
        </div>
      </>
    );
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppContent />
      </Router>
    </QueryClientProvider>
  );
};

export default App;
