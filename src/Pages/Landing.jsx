import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Tattoo1 from "../assets/Tattoing1.jpeg";
import Tattoo2 from "../assets/Tattoing2.jpeg";
import Tattoo3 from "../assets/Tattoing3.jpeg";
import MusicEvent1 from "../assets/Musicevent1.jpeg";
import MusicEvent12 from "../assets/Musicevent2.jpeg";
import MusicEvent13 from "../assets/Musicevent3.jpeg";
import MusicEvent14 from "../assets/Musicevent4.jpeg";

export default function LandingPage() {
  const [currentTattooSlide, setCurrentTattooSlide] = useState(0);
  const tattooSlides = [Tattoo3, Tattoo1, Tattoo2];

  const [currentEventSlide, setCurrentEventSlide] = useState(0);
  const eventSlides = [MusicEvent1, MusicEvent12, MusicEvent13, MusicEvent14];

  const nextSlide = (setSlide, slides) => {
    if (slides.length === 0) return;
    setSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = (setSlide, slides) => {
    if (slides.length === 0) return;
    setSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <main className="flex-1 w-full">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <motion.h1
                  className="text-3xl font-extrabold tracking-widest sm:text-4xl md:text-5xl lg:text-6xl"
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  Color Mode
                </motion.h1>
                <motion.p
                  className="mx-auto max-w-[700px] text-gray-500 md:text-xl"
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.3 }}
                >
                  Welcome to Color Mode, where creativity meets artistry.
                  Discover a place that fuses tattoo artistry with unforgettable
                  music events.
                </motion.p>
              </div>
              <div className="space-x-4">
                <Link
                  to="/Booking"
                  className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950"
                >
                  About Us
                </Link>
                <Link
                  to="/faq"
                  className="inline-flex h-9 items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950"
                >
                  Learn more
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Tattoo Studio Section */}
        <section
          id="tattoo"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100"
        >
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <motion.h2
                className="text-3xl font-bold tracking-tighter sm:text-5xl"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                Tattoo Studio
              </motion.h2>
              <motion.p
                className="max-w-[900px] text-gray-500 md:text-xl"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                Our Tattoo Studio combines skill and creativity to offer you
                custom-designed tattoos that are as unique as you are. Whether
                you want something classic or trendy, our professional artists
                will help bring your vision to life.
              </motion.p>
              <motion.p
                className="max-w-[900px] text-gray-500 md:text-xl"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                From simple designs to complex masterpieces, we pride ourselves
                on creating high-quality tattoos in a clean, comfortable, and
                friendly environment. Join us and start your tattoo journey
                today!
              </motion.p>
            </div>

            {/* 3D Tattoo Slider */}
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="relative w-full h-64 lg:h-96 mx-auto overflow-hidden">
                <div className="perspective-1000px">
                  <AnimatePresence initial={false}>
                    <motion.img
                      key={currentTattooSlide}
                      src={tattooSlides[currentTattooSlide]}
                      alt={`Tattoo Slide ${currentTattooSlide + 1}`}
                      className="absolute w-full h-full object-cover rounded-xl transform transition-transform duration-1000 ease-in-out"
                      initial={{ opacity: 0, rotateY: -50 }}
                      animate={{ opacity: 1, rotateY: 0 }}
                      exit={{ opacity: 0, rotateY: 50 }}
                    />
                  </AnimatePresence>
                </div>
                <button
                  onClick={() => prevSlide(setCurrentTattooSlide, tattooSlides)}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={() => nextSlide(setCurrentTattooSlide, tattooSlides)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Tattoo Info */}
              <div className="flex flex-col justify-center space-y-4">
                <motion.ul
                  className="grid gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.5 }}
                >
                  {["Custom Designs", "Expert Artists", "Safe Environment"].map(
                    (item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 * index }}
                      >
                        <div className="grid gap-1">
                          <h3 className="text-xl font-bold">{item}</h3>
                          <p className="text-gray-500">
                            {item === "Custom Designs"
                              ? "Bring your unique vision to life."
                              : item === "Expert Artists"
                              ? "Skilled professionals with years of experience."
                              : "Sterile equipment and hygienic practices."}
                          </p>
                        </div>
                      </motion.li>
                    )
                  )}
                </motion.ul>
                <div className="flex justify-center">
                  <Link
                    to="/appointment"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Music Events Section */}
        <section
          id="events"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-300"
        >
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <motion.h2
                className="text-3xl font-bold tracking-tighter sm:text-5xl"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                Music Events
              </motion.h2>
              <motion.p
                className="max-w-[900px] text-gray-500 md:text-xl"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                Color Mode is not just a place for tattoos, it's also your
                gateway to unforgettable live music events. From live bands to
                DJ nights, we bring a variety of performances to keep you
                grooving all night long. Our venue is designed for music lovers
                who appreciate great sound, stunning visuals, and an
                electrifying atmosphere.
              </motion.p>
            </div>

            {/* 3D Music Event Slider */}
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="relative w-full h-64 lg:h-96 mx-auto overflow-hidden">
                <div className="perspective-1000px">
                  <AnimatePresence initial={false}>
                    <motion.img
                      key={currentEventSlide}
                      src={eventSlides[currentEventSlide]}
                      alt={`Event Slide ${currentEventSlide + 1}`}
                      className="absolute w-full h-full object-cover rounded-xl transform transition-transform duration-1000 ease-in-out"
                      initial={{ opacity: 0, rotateY: -50 }}
                      animate={{ opacity: 1, rotateY: 0 }}
                      exit={{ opacity: 0, rotateY: 50 }}
                    />
                  </AnimatePresence>
                </div>
                <button
                  onClick={() => prevSlide(setCurrentEventSlide, eventSlides)}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={() => nextSlide(setCurrentEventSlide, eventSlides)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Event Info */}
              <div className="flex flex-col justify-center space-y-4">
                <motion.ul
                  className="grid gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.5 }}
                >
                  {[
                    "Live Performances",
                    "Vibrant Atmosphere",
                    "Wide Range of Genres",
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 * index }}
                    >
                      <div className="grid gap-1">
                        <h3 className="text-xl font-bold">{item}</h3>
                        <p className="text-gray-500">
                          {item === "Live Performances"
                            ? "Experience your favorite artists live."
                            : item === "Vibrant Atmosphere"
                            ? "Vibrant lights, crowd, and music."
                            : "Genres for every music lover."}
                        </p>
                      </div>
                    </motion.li>
                  ))}
                </motion.ul>
                <div className="flex justify-center">
                  <Link
                    to="/events"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950"
                  >
                    Book Tickets
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
