import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import Header from "../components/subnavbar";
import Party1 from "../assets/pexels-sebastian-ervi-866902-1763075.jpg";
import Party2 from "../assets/pexels-wendywei-1190297.jpg";
import Party3 from "../assets/pexels-wendywei-1190298.jpg";
import Colormode from "../assets/Blak.jpg";

const ColorModeEvents = () => {
  const [,] = useState(null);

  const navItems = [
    { title: "Home", path: "/" },
    { title: "Events", path: "/events" },
    { title: "About", path: "/about" },
    { title: "Contact", path: "/contact" },
    { title: "FAQ", path: "/faq" },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Kathmandu City Groove",
      date: "2024-05-15",
      location: "Kathmandu",
      description:
        "Experience the vibrant nightlife of Kathmandu with local and international DJs.",
      image: Party1,
    },
    {
      id: 2,
      title: "Pokhara Lake Festival",
      date: "2024-06-20",
      location: "Pokhara",
      description:
        "A lakeside music festival featuring Nepal's top indie bands and stunning views.",
      image: Party2,
    },
    {
      id: 3,
      title: "Chitwan Jungle Beats",
      date: "2024-07-10",
      location: "Chitwan",
      description:
        "An eco-friendly electronic music event in the heart of Chitwan National Park.",
      image: Party3,
    },
  ];

  const pastEvents = [
    {
      id: 4,
      title: "Everest Base Camp Rave",
      location: "Everest Region",
      date: "2023-09-05",
    },
    {
      id: 5,
      title: "Lumbini Peace Concert",
      location: "Lumbini",
      date: "2023-10-15",
    },
    {
      id: 6,
      title: "Thamel Street Party",
      location: "Kathmandu",
      date: "2023-11-30",
    },
    {
      id: 7,
      title: "Thamel After Party",
      location: "Kathmandu",
      date: "2023-12-01",
    },
  ];

  const locations = [
    "Kathmandu",
    "Pokhara",
    "Chitwan",
    "Lumbini",
    "Bhaktapur",
    "Nagarkot",
    "Lalitpur",
    "Ilam",
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header navItems={navItems} />

      <main className="container mx-auto px-4 py-8">
        <motion.h1
          className="text-5xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Events Across Nepal
        </motion.h1>

        {/* Hero Section */}
        <motion.section
          className="relative h-96 rounded-xl overflow-hidden mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <img
            src={Colormode}
            alt="Nepal Music Scene"
            className="w-full h-full object-fit rounded-xl"
          />
          <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">
                Experience the Rhythm of Nepal
              </h2>
              <p className="text-xl mb-8">
                Join us for unforgettable music events in breathtaking locations
              </p>
              <motion.button
                className="bg-white text-black px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-200 transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Events
              </motion.button>
            </div>
          </div>
        </motion.section>

        {/* Upcoming Events Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Upcoming Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <motion.div
                key={event.id}
                className="bg-white bg-opacity-10 rounded-lg overflow-hidden shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">{event.title}</h3>
                  <p className="text-sm mb-4 flex items-center">
                    <Calendar className="mr-2" size={16} />
                    {new Date(event.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-sm mb-4 flex items-center">
                    <MapPin className="mr-2" size={16} />
                    {event.location}
                  </p>
                  <p className="text-sm mb-4">{event.description}</p>
                  <motion.button
                    className="bg-white text-black px-4 py-2 rounded-full font-bold text-sm hover:bg-gray-200 transition duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get Tickets
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Past Events Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Past Events
          </h2>
          <div className="bg-white bg-opacity-10 rounded-lg overflow-hidden shadow-lg">
            {pastEvents.map((event, index) => (
              <motion.div
                key={event.id}
                className={`p-4 ${
                  index !== pastEvents.length - 1
                    ? "border-b border-white border-opacity-30"
                    : ""
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-bold">{event.title}</h3>
                  <div className="text-sm">
                    <span className="mr-4">{event.location}</span>
                    <span>
                      {new Date(event.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Explore by Location Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Explore by Location
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {locations.map((location, index) => (
              <motion.button
                key={index}
                className="bg-white bg-opacity-10 hover:bg-opacity-20 text-white font-bold py-4 px-6 rounded-lg transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                {location}
              </motion.button>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="mb-16">
          <div className="bg-white bg-opacity-10 rounded-lg p-8 text-center">
            <h2 className="text-3xl font-semibold mb-4">Stay Updated</h2>
            <p className="mb-6">
              Subscribe to our newsletter for the latest Color Mode event
              updates and exclusive offers.
            </p>
            <form className="flex flex-col md:flex-row justify-center items-center gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-full bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white w-full md:w-auto"
                required
              />
              <motion.button
                type="submit"
                className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-gray-200 transition duration-300 w-full md:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ColorModeEvents;
