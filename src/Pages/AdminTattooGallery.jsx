import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate

gsap.registerPlugin(ScrollTrigger);

const AdminTattooGallery = () => {
  const BASE_URL = "http://127.0.0.1:8000/api";
  const [images, setImages] = useState([]);
  const [newImage, setNewImage] = useState(null);
  const [description, setDescription] = useState("");
  const containerRef = useRef(null);
  const navigate = useNavigate(); // Use navigate instead of useHistory

  // Check for admin role on component mount
  useEffect(() => {
    const userRole = localStorage.getItem("role"); // Assume role is saved in localStorage

    if (userRole !== "admin") {
      // Redirect to a different page if not an admin
      navigate("/unauthorized"); // Example redirect to unauthorized page
      toast.error("You do not have access to this page");
    } else {
      axios
        .get(`${BASE_URL}/tattoo-gallery`)
        .then((response) => {
          setImages(response.data);
        })
        .catch((error) => {
          console.error("Error fetching images", error);
          toast.error("Failed to fetch images");
        });

      if (containerRef.current) {
        gsap.from(containerRef.current.children, {
          opacity: 0,
          y: 50,
          stagger: 0.2,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }
  }, [navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 10 * 1024 * 1024) {
      // 10MB limit
      setNewImage(file);
    } else {
      toast.error("Image size should be 10MB or less");
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageUpload = (e) => {
    e.preventDefault();

    if (!newImage) {
      toast.error("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", newImage);
    formData.append("description", description);

    const token = localStorage.getItem("auth_token");

    axios
      .post(`${BASE_URL}/tattoo-gallery`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setImages([...images, response.data]);
        setDescription("");
        setNewImage(null);
        toast.success("Image uploaded successfully");
      })
      .catch((error) => {
        console.error("Error uploading image", error);
        toast.error("Failed to upload image");
      });
  };

  const handleDelete = (imageId) => {
    const token = localStorage.getItem("auth_token");

    axios
      .delete(`${BASE_URL}/tattoo-gallery/${imageId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setImages(images.filter((image) => image.id !== imageId));
        toast.success("Image deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting image", error);
        toast.error("Failed to delete image");
      });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="container mx-auto px-4 py-12">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl font-bold text-center mb-12"
        >
          Admin Tattoo Gallery
        </motion.h1>

        <motion.form
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 mb-12 bg-gray-900 p-6 rounded-lg shadow-xl"
          onSubmit={handleImageUpload}
        >
          <div className="flex flex-col">
            <label className="text-lg font-medium mb-2">
              Upload Image (Max 10MB)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
              className="border border-gray-700 bg-gray-800 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-lg font-medium mb-2">Description</label>
            <textarea
              placeholder="Add a description"
              value={description}
              onChange={handleDescriptionChange}
              className="border border-gray-700 bg-gray-800 p-2 rounded-md h-24 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-white text-black font-bold py-2 px-4 rounded-md hover:bg-gray-200 transition duration-300"
          >
            Upload Image
          </motion.button>
        </motion.form>

        <div
          ref={containerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {images.map((image) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-900 rounded-lg shadow-xl overflow-hidden group perspective"
              >
                <div className="relative w-full h-64 transition-all duration-500 preserve-3d group-hover:my-rotate-y-180">
                  <div className="absolute backface-hidden w-full h-full">
                    <img
                      src={image.image_url || "/placeholder.svg"}
                      alt="Tattoo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute my-rotate-y-180 backface-hidden w-full h-full bg-gray-900 overflow-hidden">
                    <div className="text-center flex flex-col items-center justify-center h-full text-gray-300 px-2 pb-24">
                      {image.description || "No description"}
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 flex justify-center w-full p-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDelete(image.id)}
                    className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300"
                  >
                    Delete
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AdminTattooGallery;
