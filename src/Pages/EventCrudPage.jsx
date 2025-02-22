import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Subnav from "../components/subnavbar";

axios.defaults.baseURL = "http://127.0.0.1:8000/";

const EventCrudPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newEvent, setNewEvent] = useState({
    name: "",
    description: "",
    date: "",
    price: "",
    available_tickets: "",
    image: null,
  });
  const navigate = useNavigate();
  const userRole = localStorage.getItem("user_role");
  const authToken = localStorage.getItem("auth_token");

  useEffect(() => {
    if (authToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
    }
  }, [authToken]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/events");

        if (Array.isArray(response.data)) {
          // Filter events for non-admin users to show only upcoming events
          const today = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
          const filteredEvents =
            userRole === "admin"
              ? response.data
              : response.data.filter((event) => event.date >= today);

          setEvents(filteredEvents);
        } else {
          setError("Unexpected data format received");
        }
      } catch (error) {
        setError("Failed to fetch events: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [userRole]);

  const handleEditClick = (eventId) => {
    if (userRole === "admin") {
      navigate(`/events/${eventId}/edit`);
    } else {
      navigate(`/events/${eventId}`);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await axios.delete(`/api/events/${eventId}`);
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== eventId)
      );
    } catch (error) {
      setError("Failed to delete event: " + error.message);
    }
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", newEvent.name);
    formData.append("description", newEvent.description);
    formData.append("date", newEvent.date);
    formData.append("price", newEvent.price);
    formData.append("available_tickets", newEvent.available_tickets);
    formData.append("image", newEvent.image);

    try {
      const response = await axios.post("/api/events", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setEvents((prevEvents) => [...prevEvents, response.data]);
      setIsAdding(false);
    } catch (error) {
      setError("Failed to add event: " + error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      image: e.target.files[0],
    }));
  };

  if (loading) {
    return <div className="text-center py-10 text-xl">Loading events...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Subnav
        backButton={true}
        navItems={[
          { title: "Home", path: "/" },
          { title: "Events", path: "/events" },
          { title: "About", path: "/about" },
          { title: "Contact", path: "/contact" },
        ]}
      />
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-800">
          Events
        </h1>
      </header>

      {userRole === "admin" && (
        <div className="mb-6 text-center">
          <motion.button
            onClick={() => setIsAdding(true)}
            className="bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Add New Event
          </motion.button>
        </div>
      )}

      {isAdding ? (
        <motion.div className="bg-white p-6 shadow-xl rounded-lg mx-auto max-w-2xl">
          <h2 className="text-2xl font-semibold mb-4">Add Event</h2>
          <form onSubmit={handleAddEvent} encType="multipart/form-data">
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={newEvent.name}
                onChange={handleChange}
                required
                placeholder="Event Name"
                className="w-full p-3 border rounded"
              />
              <textarea
                name="description"
                value={newEvent.description}
                onChange={handleChange}
                required
                placeholder="Description"
                className="w-full p-3 border rounded"
              />
              <input
                type="date"
                name="date"
                value={newEvent.date}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded"
              />
              <input
                type="number"
                name="price"
                value={newEvent.price}
                onChange={handleChange}
                required
                placeholder="Price"
                className="w-full p-3 border rounded"
              />
              <input
                type="number"
                name="available_tickets"
                value={newEvent.available_tickets}
                onChange={handleChange}
                required
                placeholder="Available Tickets"
                className="w-full p-3 border rounded"
              />
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                required
                className="w-full p-3 border rounded"
              />
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                  Save Event
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.length === 0 ? (
            <div className="text-center text-gray-500 col-span-full">
              No upcoming events available
            </div>
          ) : (
            events.map((event) => (
              <motion.div
                key={event.id}
                className="bg-white shadow-xl rounded-lg overflow-hidden"
              >
                <img
                  src={event.image_url || "https://via.placeholder.com/150"}
                  alt={event.name}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {event.name}
                  </h2>
                  <p className="text-gray-600 mt-2">{event.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-gray-500">
                      {new Date(event.date).toLocaleDateString()}
                    </span>
                    <span className="font-semibold text-blue-600">
                      ${event.price}
                    </span>
                  </div>
                  <button
                    onClick={() => handleEditClick(event.id)}
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 w-full mt-3"
                  >
                    {userRole === "admin" ? "Edit" : "View"}
                  </button>
                  {userRole === "admin" && (
                    <button
                      onClick={() => handleDeleteEvent(event.id)}
                      className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 w-full mt-2"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default EventCrudPage;
