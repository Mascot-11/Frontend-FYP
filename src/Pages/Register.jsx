import React, { useState } from "react";
import { register } from "../Utils/api";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for styling

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== passwordConfirmation) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const data = await register({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
      toast.success("Registration successful!");
    } catch (error) {
      toast.error(`Error: ${error.response?.data.message || error.message}`);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-xl max-w-md w-full">
        <div className="p-8">
          <h3 className="text-3xl font-bold text-black mb-2">Register</h3>
          <p className="text-gray-600 mb-6">
            Create your account to get started
          </p>
          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your full name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
              />
            </div>
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
            <div>
              <label
                htmlFor="passwordConfirmation"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="passwordConfirmation"
                name="passwordConfirmation"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
                placeholder="Confirm your password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-md text-lg font-semibold hover:bg-gray-800 transition duration-300 mt-6"
              >
                Register
              </button>
            </div>
          </form>
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <a href="#" className="font-medium text-black hover:underline">
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Toast container to display messages */}
      <ToastContainer />
    </section>
  );
};

export default Register;
