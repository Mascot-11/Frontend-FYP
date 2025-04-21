import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Droplet,
  Sun,
  Heart,
 
} from "lucide-react";
import Subnav from "../components/subnavbar";
import { Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL;

const TattooStudio = () => {
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${BASE_URL}/tattoo-gallery`);
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          const shuffled = data.sort(() => 0.5 - Math.random()).slice(0, 3);
          setImages(shuffled);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch(`${BASE_URL}/artists`);
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          const shuffled = data.sort(() => 0.5 - Math.random()).slice(0, 3);
          setArtists(shuffled);
        }
      } catch (error) {
        console.error("Error fetching artists:", error);
      }
    };

    fetchArtists();
  }, []);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, [images]);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const navItems = [
    { title: "Home", path: "/" },
    { title: "Gallery", path: "/gallery" },
  
    { title: "Appointment", path: "/appointment" },
    { title: "FAQs", path: "/faq" },
  ]

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black text-gray-100 min-h-screen relative">
      <Subnav backButton={true} navItems={navItems} />
      <main className="max-w-6xl mx-auto px-4 py-12 space-y-24">
        

        <motion.section
          className="text-center"
          initial="initial"
          animate="animate"
          variants={staggerChildren}
        >
          <motion.h1
            className="text-6xl font-bold text-white mb-6 tracking-tight"
            variants={fadeInUp}
          >
            Ink Your Story
          </motion.h1>
          <motion.p className="text-2xl mb-8 text-gray-300" variants={fadeInUp}>
            Where art meets skin, and stories come to life.
          </motion.p>
          <motion.div className="space-x-4" variants={fadeInUp}>
            <Link
              to="/appointment"
              className="bg-white text-black px-8 py-3 rounded-full hover:bg-gray-200 transition-colors text-lg font-semibold inline-block"
            >
              Book an Appointment
            </Link>
            <Link
              to="/gallery"
              className="border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-black transition-colors text-lg font-semibold inline-block"
            >
              View Gallery
            </Link>
          </motion.div>
        </motion.section>

        <motion.section
          className="relative h-[600px] rounded-xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <AnimatePresence mode="wait">
            {images.length > 0 ? (
              <motion.img
                key={currentImage}
                src={images[currentImage].image_url}
                alt={`Tattoo artwork ${currentImage + 1}`}
                className="w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-800 text-white text-2xl">
                No images available
              </div>
            )}
          </AnimatePresence>
          <motion.button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-3 rounded-full text-white hover:bg-opacity-75 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={24} />
          </motion.button>
          <motion.button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-3 rounded-full text-white hover:bg-opacity-75 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={24} />
          </motion.button>
        </motion.section>

        <motion.section
          initial="initial"
          animate="animate"
          variants={staggerChildren}
          className="bg-gray-800 p-8 rounded-xl shadow-xl"
        >
          <motion.h2
            className="text-4xl font-bold text-white mb-6"
            variants={fadeInUp}
          >
            Our Unique Style
          </motion.h2>
          <motion.p className="mb-6 text-lg text-gray-300" variants={fadeInUp}>
            At our studio, we blend traditional techniques with modern
            innovation. Our artists specialize in a wide range of styles, from
            intricate dotwork to vibrant watercolors, ensuring that every piece
            of art is as unique as the individual wearing it.
          </motion.p>
          <motion.ul
            className="list-disc list-inside space-y-2 text-gray-300"
            variants={staggerChildren}
          >
            {[
              "Precision in every stroke",
              "Creativity that pushes boundaries",
              "Safety and hygiene as top priorities",
            ].map((item, index) => (
              <motion.li key={index} variants={fadeInUp} className="text-lg">
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </motion.section>

        <motion.section
          initial="initial"
          animate="animate"
          variants={staggerChildren}
        >
          <motion.h2
            className="text-4xl font-bold text-white mb-8"
            variants={fadeInUp}
          >
            Featured Artists
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerChildren}
          >
            {artists.length > 0 ? (
              artists.map((artist, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-800 p-6 rounded-xl shadow-lg"
                >
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    {artist.name}
                  </h3>
                  <p className="text-gray-300">
                    Specializing in {artist.specialty}
                  </p>
                  <p className="text-gray-400 mt-2">
                    {artist.experience} of experience
                  </p>
                </motion.div>
              ))
            ) : (
              <div className="text-white">No artists available</div>
            )}
          </motion.div>
        </motion.section>

        <motion.section
          initial="initial"
          animate="animate"
          variants={staggerChildren}
          className="bg-gray-800 p-8 rounded-xl shadow-xl"
        >
          <motion.h2
            className="text-4xl font-bold text-white mb-8"
            variants={fadeInUp}
          >
            Essential Tattoo Care Tips
          </motion.h2>
          <motion.ul className="space-y-6" variants={staggerChildren}>
            {[
              {
                icon: Droplet,
                tip: "Keep it clean: Wash your tattoo gently with unscented soap and lukewarm water. Pat dry with a clean, soft towel.",
              },
              {
                icon: Sun,
                tip: "Avoid direct sunlight: Protect your new tattoo from UV rays. Once healed, always use a high SPF sunscreen on tattooed areas when exposed to the sun.",
              },
              {
                icon: Heart,
                tip: "Moisturize: Apply a thin layer of unscented, hypoallergenic lotion to keep your skin hydrated and promote healing.",
              },
            ].map((item, index) => (
              <motion.li
                key={index}
                className="flex items-start"
                variants={fadeInUp}
              >
                <item.icon className="w-8 h-8 mr-4 text-white flex-shrink-0" />
                <p className="text-gray-300 text-lg">{item.tip}</p>
              </motion.li>
            ))}
          </motion.ul>
          <motion.div className="mt-8" variants={fadeInUp}>
            <h3 className="text-2xl font-semibold text-white mb-4">
              Long-term Tattoo Care
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>
                Keep your tattoo moisturized, especially in dry climates or
                seasons.
              </li>
              <li>
                Protect your tattoo from prolonged sun exposure to prevent
                fading.
              </li>
              <li>
                Maintain a healthy lifestyle to keep your skin and tattoo
                looking their best.
              </li>
              <li>
                Touch up your tattoo after several years to keep it vibrant.
              </li>
            </ul>
          </motion.div>
        </motion.section>
      </main>
    </div>
  );
};

export default TattooStudio;
