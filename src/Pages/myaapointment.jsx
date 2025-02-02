import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { FaCheckCircle, FaClock } from "react-icons/fa";
import { ClimbingBoxLoader } from "react-spinners";
import { Eye } from "lucide-react"; // Import Eye icon from Lucide React

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false); // For tracking image loading state
  const [hasError, setHasError] = useState(false);

  // Fetch appointments from the backend
  const fetchAppointments = useCallback(async () => {
    try {
      const token = localStorage.getItem("auth_token");

      if (!token) {
        setError("No authentication token found.");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        "http://127.0.0.1:8000/api/user/appointments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data); // Log data to inspect
      setAppointments(Array.isArray(response.data) ? response.data : []);
      setLoading(false);
    } catch (err) {
      console.error(err); // Log the error for debugging
      setError("An error occurred while fetching appointments.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  // Function to format the date and time
  const formatDate = (datetime) => {
    const date = new Date(datetime);
    if (isNaN(date)) {
      return "Invalid date";
    }
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-indexed
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const hour = hours % 12 || 12; // Convert 24hr format to 12hr format
    const formattedTime = `${hour}:${
      minutes < 10 ? "0" + minutes : minutes
    } ${ampm}`;
    return `${day}-${month}-${year} ${formattedTime}`;
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setImageLoading(true); // Start loading the image when clicked
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleImageLoad = () => {
    setImageLoading(false); // Stop loading once the image is loaded
  };

  // Error Boundary functionality
  if (hasError) {
    return (
      <div className="error-container text-center text-red-600 mt-10">
        <h2>Something went wrong. Please try again later.</h2>
      </div>
    );
  }

  try {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <ClimbingBoxLoader color="#4A90E2" size={15} loading={loading} />
        </div>
      );
    }

    if (error) {
      return <div className="text-center text-red-600 mt-10">{error}</div>;
    }

    if (appointments.length === 0) {
      return (
        <div className="text-center text-gray-600 mt-10">
          No appointments found for this user.
        </div>
      );
    }

    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Your Appointments
        </h2>
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left text-gray-700 font-bold">
                Artist Name
              </th>
              <th className="py-3 px-4 text-left text-gray-700 font-bold">
                Date
              </th>
              <th className="py-3 px-4 text-left text-gray-700 font-bold">
                Description
              </th>
              <th className="py-3 px-4 text-left text-gray-700 font-bold">
                Status
              </th>
              <th className="py-3 px-4 text-left text-gray-700 font-bold">
                View Image
              </th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => {
              const isPending = appointment.status === "pending";
              const imageUrl = appointment.image_url || ""; // Get image_url from backend

              return (
                <tr
                  key={appointment.id}
                  className="appointment-row border-t hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="py-3 px-4 font-semibold text-gray-800">
                    {appointment.artist_name}
                  </td>
                  <td className="py-3 px-4 font-semibold text-gray-800">
                    {formatDate(appointment.appointment_datetime)}
                  </td>
                  <td className="py-3 px-4 font-semibold text-gray-800">
                    {appointment.description || "No description provided"}
                  </td>
                  <td className="py-3 px-4 font-semibold">
                    <span
                      className={`flex items-center ${
                        isPending ? "opacity-50" : ""
                      } ${
                        appointment.status === "confirmed"
                          ? "text-green-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {appointment.status === "confirmed" ? (
                        <FaCheckCircle className="mr-2" />
                      ) : (
                        <FaClock className="mr-2" />
                      )}
                      {appointment.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {imageUrl && (
                      <button
                        onClick={() => handleImageClick(imageUrl)}
                        className="text-blue-500"
                      >
                        <Eye className="w-6 h-6" /> {/* Lucide Eye icon */}
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Image Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out">
            <div className="relative bg-white p-6 rounded-lg shadow-lg w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 max-w-xl overflow-hidden">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-red-600 font-bold text-2xl"
              >
                ✖
              </button>
              <div className="flex justify-center items-center">
                {imageLoading && (
                  <div className="absolute z-10">
                    <ClimbingBoxLoader
                      color="#4A90E2"
                      size={15}
                      loading={true}
                    />
                  </div>
                )}
                <img
                  src={selectedImage}
                  alt="Appointment"
                  className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
                  loading="lazy" // Lazy load the image
                  onLoad={handleImageLoad} // Trigger the image loading state change
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    setHasError(true); // If error occurs in rendering, set error state
    console.error("Error during rendering:", error);
  }
};

export default MyAppointments;
