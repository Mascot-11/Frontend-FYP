import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion"; // For framer-motion animation

axios.defaults.baseURL = "http://127.0.0.1:8000/";

const EventViewPage = () => {
  const [event, setEvent] = useState(null);
  const { eventId } = useParams();

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
        className="event-details space-y-4 mb-6"
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

      {/* "Get Tickets" Button */}
      <motion.div
        className="mt-6 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <a
          href={`/ticket-purchase/${event.id}`} // Updated link to the ticket purchase page
          className="px-8 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-full shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-300"
        >
          Get Tickets
        </a>
      </motion.div>

      <motion.div
        className="mt-6"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.img
          src={event.image_url || "https://via.placeholder.com/150"}
          alt={event.name}
          className="w-full h-80 object-cover rounded-xl shadow-lg"
        />
      </motion.div>
    </motion.div>
  );
};

export default EventViewPage;
