"use client"

import { useState, useEffect, createContext, useContext } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import AboutPage from "./Pages/aboutus"
import NavBar from "./components/navbar"
import Landing from "./Pages/Landing"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Music from "./Pages/music"
import Tattoo from "./Pages/tattoo"
import ForgotPassword from "./Pages/forgotpassword"
import ResetPassword from "./Pages/passwordrest"
import AppointmentPage from "./Pages/appointment"
import AppointmentsList from "./Pages/AdminAppointment"
import UserList from "./Pages/userlist"
import MyAppointments from "./Pages/myaapointment"
import Dashboard from "./Pages/AdminDashboard"
import Chat from "./Pages/Chat"
import FAQ from "./Pages/Faq"
import { login } from "./Utils/api"
import TattooGallery from "./Pages/TattooGallery"
import AdminTattooGallery from "./Pages/AdminTattooGallery"
import EventViewPage from "./Pages/EventViewPage"
import EventCrudPage from "./Pages/EventCrudPage"
import EventEditPage from "./Pages/EventEditPage"
import TicketPurchase from "./Pages/TicketPurchase"
import PaymentSuccess from "./components/PaymentSuccess"
import TicketConfirmation from "./Pages/TicketConfirmation"
import AdminLayout from "./components/AdminLayout"
import ChatPopup from "./components/ChatPop"
import UserPayments from "./Pages/User Payment"
import AllPayments from "./Pages/AllPayments"

// Create a QueryClient instance
const queryClient = new QueryClient()

// Create an auth context to share authentication state
const AuthContext = createContext(null)

export const useAuth = () => useContext(AuthContext)

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isUserLoggedIn } = useAuth()
  const location = useLocation()

  if (!isUserLoggedIn) {
    // Redirect to login but save the location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

const App = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check authentication status on mount
    const checkAuth = () => {
      const token = localStorage.getItem("auth_token")
      const role = localStorage.getItem("user_role")

      if (token && role) {
        setIsUserLoggedIn(true)
        setUserRole(role)
      } else {
        setIsUserLoggedIn(false)
        setUserRole("")
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const handleLogin = async (credentials) => {
    try {
      const data = await login(credentials)
      localStorage.setItem("auth_token", data.access_token)
      localStorage.setItem("user_role", data.role)
      setIsUserLoggedIn(true)
      setUserRole(data.role)
      return true // Return success status
    } catch (error) {
      console.error("Login failed:", error)
      return false // Return failure status
    }
  }

  const handleLogout = () => {
    localStorage.clear()
    setIsUserLoggedIn(false)
    setUserRole("")
  }

  const routesWithoutNavBar = [
    "/tattoo",
    "/gallery",
    "/Booking",
    "/faq",
    "/events",
    "/artists",
    "/music",
    "/appointment",
    "/userpayments",
  ]

  // If still checking auth status, show loading
  if (isLoading) {
    return <div>Loading...</div>
  }

  const AppContent = () => {
    const location = useLocation()
    const showNavBar = !routesWithoutNavBar.includes(location.pathname)

    return (
      <>
        {showNavBar && <NavBar onLogin={handleLogin} onLogout={handleLogout} />}
        {userRole !== "admin" && <ChatPopup />}
        <div className={showNavBar ? "content-with-navbar" : "content"}>
          <Routes>
            <Route path="/" element={<Navigate to="/landing" />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/music" element={<Music />} />
            <Route path="/tattoo" element={<Tattoo />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/appointment" element={<AppointmentPage />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/gallery" element={<TattooGallery />} />
            <Route path="/events" element={<EventCrudPage />} />
            <Route path="/events/:eventId/edit" element={<EventEditPage />} />
            <Route path="/events/:eventId" element={<EventViewPage />} />
            <Route path="/ticket-purchase/:eventId" element={<TicketPurchase />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/ticket-confirmation" element={<TicketConfirmation />} />
            <Route path="/aboutus" element={<AboutPage />} />

            {/* Protected route using the component */}
            <Route
              path="/myappointments"
              element={
                <ProtectedRoute>
                  <MyAppointments />
                </ProtectedRoute>
              }
            />
<Route
              path="/userpayments"
              element={
                <ProtectedRoute>
                  <UserPayments />
                </ProtectedRoute>
              }
            />

            <Route path="/landing" element={<Landing />} />

            <Route element={<AdminLayout />}>
              <Route path="/admin/landing" element={<Landing />} />
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/users" element={<UserList />} />
              <Route path="/events/:eventId/edit" element={<EventEditPage />} />
              <Route path="/admin/appointments" element={<AppointmentsList />} />
              <Route path="/admin/tattoo-gallery" element={<AdminTattooGallery />} />
              <Route path="/admin/payments" element={<AllPayments />} />
              
            </Route>
            <Route path="*" element={<h2>Page not found</h2>} />
          </Routes>
        </div>
      </>
    )
  }

  return (
    <AuthContext.Provider value={{ isUserLoggedIn, userRole }}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <AppContent />
        </Router>
      </QueryClientProvider>
    </AuthContext.Provider>
  )
}

export default App

