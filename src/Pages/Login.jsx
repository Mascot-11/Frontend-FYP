import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import { login } from "../Utils/api"; // Ensure the login function is correctly implemented
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Attempt login using the credentials
      const data = await login({ email, password });

      // Store the authentication token in localStorage (or sessionStorage)
      localStorage.setItem("authToken", data.access_token); // Use the correct token property from your API response

      // Display a success message
      toast.success(`Welcome, ${data.user.name}!`);

      // Redirect to the dashboard based on the user role
      if (data.user.role === "admin") {
        navigate("/userlist");
      } else if (data.user.role === "tattoo_artist") {
        navigate("/landing");
      } else {
        navigate("/landing");
      }
    } catch (error) {
      // Display the error message
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-xl max-w-md w-full">
        <div className="p-8">
          <h3 className="text-3xl font-bold text-black mb-2">Login</h3>
          <p className="text-gray-600 mb-6">Enter your credentials to access your account</p>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
              />
            </div>
            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
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
            <Link to="/forgotpassword" className="text-sm text-gray-600 hover:text-black">
              Forgot password?
            </Link>
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Dont have an account?{" "}
              <Link to="/register" className="font-medium text-black hover:underline">
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
