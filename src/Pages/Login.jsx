import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../Utils/api";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from "lucide-react"; // Import icons for password visibility toggle

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login({ email, password });

      // Ensure we only store simple, safe data in localStorage (avoiding circular references)
      const userData = {
        id: data.user.id,
        name: data.user.name,
        role: data.user.role,
      };

      // Store the token and user data
      localStorage.setItem("auth_token", data.access_token);
      localStorage.setItem("user_id", userData.id);
      localStorage.setItem("user_data", JSON.stringify(userData)); // Store user data safely

      // Show a success message
      toast.success(`Welcome, ${userData.name}!`);

      // Redirect based on role
      if (userData.role === "admin") {
        window.location.href = "/landing";
      } else if (userData.role === "tattoo_artist") {
        window.location.href = "/landing";
      } else {
        window.location.href = "/landing";
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(`${error.response.data.message}`);
      } else if (error.message) {
        toast.error(` ${error.message}`);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-xl max-w-md w-full">
        <div className="p-8">
          <h3 className="text-3xl font-bold text-black mb-2">Login</h3>
          <p className="text-gray-600 mb-6">
            Enter your credentials to access your account
          </p>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email address"
                autoComplete="username" // Added autocomplete for email
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"} // Toggle between text and password type
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  autoComplete="current-password" // Added autocomplete for password
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)} // Toggle password visibility
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                >
                  {passwordVisible ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember Me
              </label>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-md text-lg font-semibold hover:bg-gray-800 transition duration-300 mt-6"
              >
                Login
              </button>
            </div>
          </form>
          <div className="mt-6 text-center">
            <Link
              to="/forgotpassword"
              className="text-sm text-gray-600 hover:text-black"
            >
              Forgot password?
            </Link>
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-black hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Toast container to display messages */}
      <ToastContainer />
    </section>
  );
};

export default Login;
