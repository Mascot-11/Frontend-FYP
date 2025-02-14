import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

axios.defaults.baseURL = "http://127.0.0.1:8000/"; // Set base URL for all axios requests

const EventCrudPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdding, setIsAdding] = useState(false); // State to toggle between view and add event form
  const [newEvent, setNewEvent] = useState({
    name: "",
    description: "",
    date: "",
    price: "",
    available_tickets: "",
    image: null,
  });
  const navigate = useNavigate();

  // Get user role and auth token from localStorage
  const userRole = localStorage.getItem("user_role");
  const authToken = localStorage.getItem("auth_token");

  // Set axios authorization token in the headers for all requests
  useEffect(() => {
    if (authToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
    }
  }, [authToken]);

  // Fetch events from the API using axios
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/events"); // Use axios for the API request
        console.log(response.data); // Log the response to check the data structure
        if (Array.isArray(response.data)) {
          // Remove unwanted fields from the event data
          const eventsWithoutTimestamps = response.data.map(
            ({ created_at, updated_at, ...rest }) => rest
          );
          setEvents(eventsWithoutTimestamps); // Set events data
        } else {
          setError("Unexpected data format received");
        }
      } catch (error) {
        setError("Failed to fetch events: " + error.message); // Handle error
      } finally {
        setLoading(false); // Stop loading state
      }
    };

    fetchEvents();
  }, []);

  const handleEditClick = (eventId) => {
    if (userRole === "admin") {
      // Redirect to the edit page if the user is an admin
      navigate(`/events/${eventId}/edit`);
    } else {
      // Redirect to the view-only page if the user is not an admin
      navigate(`/events/${eventId}`);
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
    formData.append("image", newEvent.image); // Add image file

    try {
      const response = await axios.post("/api/events", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set proper content type for file upload
        },
      });
      setEvents((prevEvents) => [...prevEvents, response.data]); // Add the newly created event to the list
      setIsAdding(false); // Close the add event form
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
    return (
      <div className="container mx-auto p-6">
        <p className="text-center text-xl text-gray-500">Loading events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <p className="text-center text-xl text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Event List</h1>
      {userRole === "admin" && (
        <div className="mb-4">
          <motion.button
            onClick={() => setIsAdding(true)}
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Add New Event
          </motion.button>
        </div>
      )}
      {isAdding ? (
        <motion.div
          className="bg-white shadow-md rounded-lg p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Add Event</h2>
          <form onSubmit={handleAddEvent} encType="multipart/form-data">
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700">Event Name</label>
                <input
                  type="text"
                  name="name"
                  value={newEvent.name}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={newEvent.description}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700">Event Date</label>
                <input
                  type="date"
                  name="date"
                  value={newEvent.date}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700">Price</label>
                <input
                  type="number"
                  name="price"
                  value={newEvent.price}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700">Available Tickets</label>
                <input
                  type="number"
                  name="available_tickets"
                  value={newEvent.available_tickets}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700">Event Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                  Save Event
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {events.length === 0 ? (
            <div className="text-center text-gray-500">No events available</div>
          ) : (
            events.map((event) => (
              <motion.div
                key={event.id}
                className="bg-white shadow-md rounded-lg overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={
                    event.image_url
                      ? event.image_url
                      : "https://via.placeholder.com/150"
                  }
                  alt={event.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold">{event.name}</h2>
                  <p className="text-gray-600">{event.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-gray-500">
                      {new Date(event.date).toLocaleDateString()}
                    </span>
                    <span className="font-semibold">${event.price}</span>
                  </div>
                  <div className="mt-2">
                    <button
                      onClick={() => handleEditClick(event.id)}
                      className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 w-full"
                    >
                      {userRole === "admin" ? "Edit" : "View"}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      )}
    </div>
  );
};

export default EventCrudPage;
