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

  // Fetch Event Details
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

  // Handle Ticket Purchase
  const handlePurchase = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("user_data")) || {};

      const response = await axios.post(
        "/api/tickets/purchase",
        {
          event_id: eventId,
          event_name: event.name,
          event_date: event.date,
          event_price: event.price,
          available_tickets: event.available_tickets,
          event_description: event.description,
          event_image: event.image_url,
          quantity,
          payment_method: "khalti",
          user_id: userData.id,
          user_name: userData.name,
          user_role: userData.role,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      );
      // ✅ Redirecting user from frontend instead of Laravel
      if (response.data.khalti_url) {
        window.location.href = response.data.khalti_url; // Open Khalti payment page
      }
    } catch (error) {
      console.error("Error purchasing ticket:", error);
    }
  };

  // Handle Khalti Payment Success
  const handlePaymentSuccess = async (paymentData) => {
    try {
      const response = await axios.post(
        "/api/tickets/verify-khalti-payment",
        paymentData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      );

      if (response.data.message === "Payment successful") {
        navigate(`/tickets/${response.data.ticket.id}`);
      } else {
        alert("Payment verification failed");
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      alert("Error verifying payment");
    }
  };

  // Check Khalti Payment Status from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentStatus = params.get("status");
    if (paymentStatus === "success") {
      const paymentData = {
        pidx: params.get("pidx"),
        amount: params.get("amount"),
        mobile: params.get("mobile"),
        purchase_order_id: params.get("purchase_order_id"),
        purchase_order_name: params.get("purchase_order_name"),
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
          Purchase Ticket via Khalti
        </button>
      </motion.div>
    </motion.div>
  );
};

export default TicketPurchasePage;
