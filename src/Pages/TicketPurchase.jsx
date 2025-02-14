import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

axios.defaults.baseURL = "http://127.0.0.1:8000/";

const TicketPurchasePage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("esewa");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`/api/events/${eventId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        });
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };
    fetchEvent();
  }, [eventId]);

  const handlePurchase = async () => {
    try {
      const response = await axios.post(
        "/api/tickets/purchase",
        {
          event_id: eventId,
          quantity,
          payment_method: paymentMethod,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      );
      if (response.data.esewa_url) {
        // Redirect to eSewa
        window.location.href = response.data.esewa_url;
      }
    } catch (error) {
      console.error("Error purchasing ticket:", error);
    }
  };

  const handlePaymentSuccess = async (paymentData) => {
    try {
      // Send payment data to verify payment with backend
      const response = await axios.post(
        "/api/tickets/verify-esewa-payment",
        paymentData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      );
      if (response.data.message === "Payment successful") {
        // Navigate to the user's tickets page or show ticket details
        navigate(`/tickets/${response.data.ticket.id}`);
      } else {
        alert("Payment verification failed");
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      alert("Error verifying payment");
    }
  };

  useEffect(() => {
    // Check if eSewa payment was successful
    const params = new URLSearchParams(window.location.search);
    const paymentStatus = params.get("status");
    if (paymentStatus === "success") {
      const paymentData = {
        txnid: params.get("txnid"),
        amount: params.get("amount"),
        email: params.get("email"),
        firstname: params.get("firstname"),
        lastname: params.get("lastname"),
        phone: params.get("phone"),
        // Add any other payment parameters you need
      };
      handlePaymentSuccess(paymentData);
    }
  }, []);

  if (!event) return <div className="text-center p-6 text-xl">Loading...</div>;

  return (
    <motion.div
      className="container mx-auto px-6 py-12 max-w-3xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h2
        className="text-4xl font-extrabold text-gray-900 mb-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {event.name}
      </motion.h2>

      <motion.p
        className="text-lg text-gray-600 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {event.description}
      </motion.p>

      <motion.div
        className="space-y-4 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <p className="text-lg text-gray-800">
          <span className="font-semibold">Date: </span>
          {new Date(event.date).toLocaleDateString()}
        </p>
        <p className="text-lg text-gray-800">
          <span className="font-semibold">Price: </span>${event.price}
        </p>
        <p className="text-lg text-gray-800">
          <span className="font-semibold">Available Tickets: </span>
          {event.available_tickets}
        </p>
      </motion.div>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <label className="text-lg text-gray-800">Ticket Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-20 p-2 border rounded-md"
            min="1"
            max={event.available_tickets}
          />
        </div>

        <div className="flex justify-between items-center">
          <label className="text-lg text-gray-800">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="esewa">eSewa</option>
            <option value="khalti">Khalti</option>
          </select>
        </div>
      </div>

      <motion.div
        className="mt-6 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <button
          onClick={handlePurchase}
          className="px-8 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-full shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-300"
        >
          Purchase Ticket
        </button>
      </motion.div>
    </motion.div>
  );
};

export default TicketPurchasePage;
