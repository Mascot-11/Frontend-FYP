import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Image,
  Users,
  ChevronLeft,
  ChevronRight,
  Droplet,
  Sun,
  Heart,
  Star,
} from "lucide-react";
import Header from "../components/subnavbar";
import Tattoo1 from "../assets/Tattoing1.jpeg";
import Tattoo2 from "../assets/Tattoing2.jpeg";
import Tattoo3 from "../assets/Tattoing3.jpeg";

const TattooStudio = () => {
  const navItems = [
    { title: "Tattoo", path: "/tattoo", icon: Image },
    { title: "Gallery", path: "/gallery", icon: Image },
    { title: "Artists", path: "/artists", icon: Users },
    { title: "Appointment", path: "/appointment", icon: Users },
    { title: "FAQs", path: "/faq", icon: Users },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const images = [Tattoo1, Tattoo2, Tattoo3];
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, []);

  const careTips = [
    {
      icon: Droplet,
      tip: "Keep it clean: Wash your tattoo gently with unscented soap.",
    },
    {
      icon: Sun,
      tip: "Avoid direct sunlight: Protect your tattoo from UV rays.",
    },
    {
      icon: Heart,
      tip: "Moisturize: Apply a thin layer of unscented lotion to keep skin hydrated.",
    },
  ];

  const featuredArtists = [
    {
      name: "Alex Ink",
      specialty: "Black and Grey Realism",
      experience: "10 years",
    },
    { name: "Sam Colors", specialty: "Watercolor", experience: "8 years" },
    { name: "Jordan Lines", specialty: "Minimalist", experience: "5 years" },
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      quote:
        "Absolutely love my new tattoo! The artists here are true professionals.",
    },
    {
      name: "Mike R.",
      quote:
        "Great atmosphere and even better results. Will definitely be coming back!",
    },
    {
      name: "Emily T.",
      quote:
        "The attention to detail is amazing. They turned my idea into a masterpiece.",
    },
  ];

  return (
    <div className="flex flex-col items-center pb-32 bg-stone-950 text-neutral-400 overflow-hidden">
      <Header navItems={navItems} />

      {/* Hero Section */}
      <motion.div
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white text-center mb-6"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          Ink Your Story
        </motion.h1>
        <motion.p
          className="text-xl sm:text-2xl md:text-3xl text-center mb-12 max-w-3xl mx-auto"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.2 }}
        >
          Where art meets skin, and stories come to life.
        </motion.p>
        <motion.div
          className="flex justify-center space-x-4"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.4 }}
        >
          <a
            href="/booking"
            className="bg-white text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-all duration-300"
          >
            Book Now
          </a>
          <a
            href="/gallery"
            className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-white hover:text-black transition-all duration-300"
          >
            View Gallery
          </a>
        </motion.div>
      </motion.div>

      {/* Studio Style Section */}
      <motion.div
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-8">
          Our Unique Style
        </h2>
        <p className="text-lg sm:text-xl text-center max-w-3xl mx-auto mb-12">
          At our studio, we blend traditional techniques with modern innovation.
          Our artists specialize in a wide range of styles, from intricate
          dotwork to vibrant watercolors, ensuring that every piece of art is as
          unique as the individual wearing it.
        </p>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          {["Precision", "Creativity", "Safety"].map((value, index) => (
            <motion.div
              key={index}
              className="bg-stone-900 p-6 rounded-lg text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-2xl font-semibold text-white mb-4">
                {value}
              </h3>
              <p className="text-neutral-400">
                Our core values that guide every stroke and every interaction.
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Image Slider */}
      <motion.div
        className="w-full max-w-4xl mt-12 sm:mt-24 relative px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImage}
            src={images[currentImage]}
            alt={`Tattoo artwork ${currentImage + 1}`}
            className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        </AnimatePresence>
        <button
          onClick={prevImage}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75 transition-all"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75 transition-all"
          aria-label="Next image"
        >
          <ChevronRight size={24} />
        </button>
      </motion.div>

      {/* Featured Artists Section */}
      <motion.div
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-12">
          Featured Artists
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredArtists.map((artist, index) => (
            <motion.div
              key={index}
              className="bg-stone-900 p-6 rounded-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-2xl font-semibold text-white mb-2">
                {artist.name}
              </h3>
              <p className="text-purple-400 mb-2">{artist.specialty}</p>
              <p className="text-neutral-400">
                {artist.experience} of experience
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Tattoo Care Tips */}
      <motion.div
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-12">
          Tattoo Care Tips
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {careTips.map((tip, index) => (
            <motion.div
              key={index}
              className="bg-stone-900 p-6 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <tip.icon className="w-12 h-12 mb-4 text-purple-500" />
              <p className="text-lg">{tip.tip}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Testimonials Section */}
      <motion.div
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-12">
          What Our Clients Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-stone-900 p-6 rounded-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Star className="w-8 h-8 text-yellow-400 mb-4" />
              <p className="text-lg mb-4">"{testimonial.quote}"</p>
              <p className="text-purple-400 font-semibold">
                {testimonial.name}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8">
          Ready to Ink Your Story?
        </h2>
        <a
          href="/booking"
          className="inline-block bg-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-purple-700 transition-all duration-300"
        >
          Book Your Session Now
        </a>
      </motion.div>
    </div>
  );
};

export default TattooStudio;
