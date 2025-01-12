import React, { useState, useEffect, useRef } from "react";
import { Calendar } from "react-date-range";
import { ChevronDown, Paperclip, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import axios from "axios";
import { bookAppointment } from "../Utils/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format, setHours, setMinutes } from "date-fns";

const TattooAppointment = () => {
  const [artistId, setArtistId] = useState("");
  const [description, setDescription] = useState("");
  const [artists, setArtists] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeRange, setTimeRange] = useState({
    startTime: setHours(setMinutes(new Date(), 0), 9),
    endTime: setHours(setMinutes(new Date(), 0), 10),
  });
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Welcome to our tattoo studio! How can we help you today?",
      sender: "admin",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const response = await axios.get("http://127.0.0.1:8000/api/artists", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setArtists(response.data);
      } catch (error) {
        console.error("Error fetching artists:", error);
      }
    };

    fetchArtists();
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeRangeChange = (e, type) => {
    const [hours, minutes] = e.target.value.split(":").map(Number);
    const newTime = setHours(setMinutes(new Date(), minutes), hours);
    setTimeRange((prev) => ({ ...prev, [type]: newTime }));
  };

  const handleAppointment = async (e) => {
    e.preventDefault();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      toast.error("You cannot book an appointment for a past date.");
      return;
    }

    if (!artistId) {
      toast.error("Please select an artist.");
      return;
    }

    if (!description.trim()) {
      toast.error("Please provide a description for your tattoo.");
      return;
    }

    if (timeRange.endTime <= timeRange.startTime) {
      toast.error("End time must be later than the start time.");
      return;
    }

    try {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      const formattedStartTime = format(timeRange.startTime, "HH:mm");
      const formattedEndTime = format(timeRange.endTime, "HH:mm");

      const startDateTime = `${formattedDate} ${formattedStartTime}`;
      const endDateTime = `${formattedDate} ${formattedEndTime}`;

      const response = await bookAppointment({
        artist_id: artistId,
        appointment_datetime: startDateTime,
        end_datetime: endDateTime,
        description,
      });

      console.log("Appointment booked:", response);
      toast.success("Your appointment has been successfully booked!");
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#000000", "#FFFFFF"],
      });
    } catch (error) {
      toast.error(
        error.message || "An error occurred while booking your appointment."
      );
    }
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { text: inputMessage, sender: "user" }]);
      setInputMessage("");
      toast.success("Message sent successfully!");
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            text: "Thanks for your message. An artist will respond shortly!",
            sender: "admin",
          },
        ]);
      }, 1000);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const image = e.target?.result;
        setMessages([
          ...messages,
          { text: "Attached image:", sender: "user", image },
        ]);
        toast.info("Image attached successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white text-gray-900">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-70"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Ink Your Story
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-10 text-gray-300"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Where Art Meets Skin, Your Vision Comes to Life
          </motion.p>
          <motion.a
            href="#booking"
            className="bg-white text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-200 transition duration-300 shadow-lg inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book Your Session
          </motion.a>
        </div>
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="text-white w-12 h-12" />
        </motion.div>
      </section>

      {/* Booking Section */}
      <section
        id="booking"
        className="max-w-6xl mx-auto my-20 p-8 bg-white rounded-xl shadow-2xl"
      >
        <h2 className="text-4xl font-bold mb-10 text-center">
          Design Your Experience
        </h2>
        <form onSubmit={handleAppointment} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-8">
              {/* Artist Selection */}
              <div>
                <label className="block text-lg font-semibold mb-2">
                  Select Artist
                </label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition duration-200"
                  value={artistId}
                  onChange={(e) => setArtistId(e.target.value)}
                >
                  <option value="">Choose an Artist</option>
                  {artists.map((artist) => (
                    <option key={artist.id} value={artist.id}>
                      {artist.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-lg font-semibold mb-2">
                  Select Date
                </label>
                <Calendar
                  date={selectedDate}
                  onChange={handleDateChange}
                  className="rounded-lg shadow-md mx-auto"
                  color="#000000"
                />
              </div>
            </div>

            <div className="space-y-8">
              {/* Time Range */}
              <div>
                <label className="block text-lg font-semibold mb-2">
                  Select Time
                </label>
                <div className="flex flex-col space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Start Time
                    </label>
                    <input
                      type="time"
                      value={format(timeRange.startTime, "HH:mm")}
                      onChange={(e) => handleTimeRangeChange(e, "startTime")}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      End Time
                    </label>
                    <input
                      type="time"
                      value={format(timeRange.endTime, "HH:mm")}
                      onChange={(e) => handleTimeRangeChange(e, "endTime")}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition duration-200"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-lg font-semibold mb-2">
                  Tattoo Description
                </label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition duration-200"
                  rows="6"
                  placeholder="Describe your tattoo idea..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center mt-8">
            <button
              type="submit"
              className="bg-black text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition duration-300"
            >
              Book Appointment
            </button>
          </div>
        </form>
      </section>

      {/* Toast Notification */}
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default TattooAppointment;
