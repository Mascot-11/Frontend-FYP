import React, { useState } from "react";
import { register } from "../Utils/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

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

  const handleShowModal = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleAcceptTerms = () => {
    setAcceptedTerms(true);
    setShowModal(false);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-xl max-w-md w-full">
        <div className="p-8">
          <h3 className="text-3xl font-bold text-black mb-2">Register</h3>
          <p className="text-gray-600 mb-6">
            Create your account to get started
          </p>
          <form
            onSubmit={acceptedTerms ? handleRegister : handleShowModal}
            className="space-y-6"
          >
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
                className={`w-full bg-black text-white py-3 rounded-md text-lg font-semibold ${
                  acceptedTerms ? "hover:bg-gray-800" : "opacity-70"
                } transition duration-300 mt-6`}
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

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-bold mb-4">Terms and Conditions</h3>
            <p className="text-sm text-gray-700 mb-4">
              Welcome to our platform! By using our services, you agree to the
              following terms and conditions:
            </p>
            <p className="text-sm text-gray-700 mb-4">
              1. You must be at least 18 years old to use this platform. <br />
              2. You are responsible for maintaining the confidentiality of your
              account and password. <br />
              3. We reserve the right to modify or terminate our services at any
              time without prior notice. <br />
              4. Any illegal activity or abuse of our platform will result in
              account termination. <br />
              5. We are not liable for any loss or damage resulting from your
              use of our services. <br />
              6. You agree to provide accurate information when registering an
              account. <br />
              7. Unauthorized reproduction or distribution of our content is
              prohibited. <br />
              8. You consent to receive notifications and updates from us.{" "}
              <br />
              9. All payments are non-refundable unless stated otherwise. <br />
              10. By accepting these terms, you agree to comply with all
              applicable laws and regulations. <br />
              11. You are solely responsible for ensuring the security of your
              devices and internet connection. <br />
              12. Any disputes will be resolved in accordance with the laws of
              the jurisdiction where our company is based.
            </p>
            <p className="text-sm text-gray-700 mb-6">
              Please read and understand these terms before proceeding. If you
              have any questions, contact our support team for clarification.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleAcceptTerms}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </section>
  );
};

export default Register;
