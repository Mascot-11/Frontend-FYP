import { useState, useEffect, useRef } from "react";
import { Calendar } from "react-date-range";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format, setHours, setMinutes } from "date-fns";
import Subnav from "../components/subnavbar"; 
import { FiPaperclip } from "react-icons/fi"; // Importing attachment icon
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
// Helper function to check if the user is logged in
const checkLogin = () => {
  const token = localStorage.getItem("auth_token");
  if (!token) {
    toast.error("You must be logged in to book an appointment.", {
      autoClose: 6000, // Show the toast for 6 seconds
    });
    setTimeout(() => {
      window.location.href = "/login"; // Redirecting to login page after 6 seconds
    }, 6000);
  }
};

const navItems = [
  { title: "Home", path: "/" },
  { title: "Gallery", path: "/gallery" },

  { title: "Appointment", path: "/appointment" },
  { title: "FAQs", path: "/faq" },
]

const TattooAppointment = () => {
  const [artistId, setArtistId] = useState("");
  const [description, setDescription] = useState("");
  const [artists, setArtists] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [time, setTime] = useState(setHours(setMinutes(new Date(), 0), 9));
  const [imagePreview, setImagePreview] = useState(null); // To store image preview
  const fileInputRef = useRef(null);

  useEffect(() => {
    checkLogin(); // Check if the user is logged in when the component mounts
    const fetchArtists = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const response = await axios.get("/artists", {
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

  const handleTimeChange = (e) => {
    const [hours] = e.target.value.split(":").map(Number); // Only use hours
    const newTime = setHours(setMinutes(new Date(), 0), hours); // Set minutes to 0
    setTime(newTime);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const maxFileSize = 5 * 1024 * 1024; // 5MB
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

      if (file.size > maxFileSize) {
        toast.error("File size exceeds the maximum limit of 5MB.");
        return;
      }

      if (!allowedTypes.includes(file.type)) {
        toast.error("Invalid file type. Only JPG, PNG, and GIF are allowed.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set the image preview
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAppointment = async (e) => {
    e.preventDefault();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      toast.error("You cannot book an appointment for a past date.");
      return;
    }

    // Ensure the appointment is within allowed hours (9 AM to 7 PM)
    const appointmentHour = time.getHours();
    if (appointmentHour < 9 || appointmentHour > 19) {
      toast.error("Appointments can only be made between 9 AM and 7 PM.");
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

    const file = fileInputRef.current.files[0];
    if (file && !imagePreview) {
      toast.error("Please upload a valid image.");
      return;
    }

    try {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      const formattedTime = format(time, "HH:mm");

      const appointmentDateTime = `${formattedDate} ${formattedTime}`;

      const formData = new FormData();
      formData.append("artist_id", artistId);
      formData.append("appointment_datetime", appointmentDateTime);
      formData.append("description", description);

      if (file) {
        formData.append("image", file); // Add the image file to the form data
      }

      const token = localStorage.getItem("auth_token");
      const response = await axios.post(
        "/appointments",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Ensure the content type is set
          },
        }
      );

      console.log("Appointment booked:", response);
      toast.success("Your appointment has been successfully booked!");

      // Clear all fields after successful booking
      setArtistId("");
      setDescription("");
      setSelectedDate(new Date());
      setTime(setHours(setMinutes(new Date(), 0), 9));
      setImagePreview(null);
      fileInputRef.current.value = "";
    } catch (error) {
      console.error(error); // Log error details
      toast.error(
        error.response?.data?.message ||
          "An error occurred. Please try again later."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white text-gray-900">
      <Subnav backButton={true} navItems={navItems} />
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-70"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Ink Your Story
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-300">
            Where Art Meets Skin, Your Vision Comes to Life
          </p>
          <a
            href="#booking"
            className="bg-white text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-200 transition duration-300 shadow-lg inline-block"
          >
            View Tattoo Gallery
          </a>
        </div>
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
                  Select Artist *
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
                  Select Date *
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
              {/* Time Selection */}
              <div>
                <label className="block text-lg font-semibold mb-2">
                  Select Time *
                </label>
                <div>
                  <input
                    type="time"
                    value={format(time, "HH:mm")}
                    onChange={handleTimeChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition duration-200"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-lg font-semibold mb-2">
                  Tattoo Description *
                </label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition duration-200"
                  rows="6"
                  placeholder="Describe your tattoo idea..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Image Upload with Button Icon */}
              <div>
                <label className="block text-lg font-semibold mb-2">
                  Upload Image
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="flex items-center bg-gray-300 text-black px-4 py-2 rounded-lg focus:ring-2 focus:ring-black"
                  >
                    <FiPaperclip className="mr-2" />
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  {imagePreview && (
                    <div className="mt-4">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-72 h-48 object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-black text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition duration-300"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
      <ToastContainer />
    </div>
  );
};

export default TattooAppointment;
