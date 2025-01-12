import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Tattoo1 from "../assets/Tattoing1.jpeg";
import Tattoo2 from "../assets/Tattoing2.jpeg";
import Tattoo3 from "../assets/Tattoing3.jpeg";
import Mural1 from "../assets/Mural1.jpeg";
import Mural2 from "../assets/Mural2.jpeg";
import Mural3 from "../assets/Mural4.jpeg";
import Mural4 from "../assets/Mural5.jpeg";
import MusicEvent1 from "../assets/Musicevent1.jpeg";
import MusicEvent12 from "../assets/Musicevent2.jpeg";
import MusicEvent13 from "../assets/Musicevent3.jpeg";
import MusicEvent14 from "../assets/Musicevent4.jpeg";

export default function LandingPage() {
  const [currentTattooSlide, setCurrentTattooSlide] = useState(0);
  const tattooSlides = [Tattoo3, Tattoo1, Tattoo2];

  const [currentMuralSlide, setCurrentMuralSlide] = useState(0);
  const muralSlides = [Mural1, Mural2, Mural3, Mural4];

  const [currentEventSlide, setCurrentEventSlide] = useState(0);
  const eventSlides = [MusicEvent1, MusicEvent12, MusicEvent13, MusicEvent14];

  const nextSlide = (setSlide, slides) => {
    if (slides.length === 0) return; // Guard against empty slides
    setSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = (setSlide, slides) => {
    if (slides.length === 0) return; // Guard against empty slides
    setSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };
  return (
    <div className="min-h-screen flex flex-col items-center">
      <header className="w-full px-4 lg:px-6 h-14 flex items-center justify-center">
        <a className="flex items-center justify-center" href="#">
          <span className="sr-only">REDc</span>
        </a>
      </header>
      <main className="flex-1 w-full">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-extrabold tracking-widest sm:text-4xl md:text-5xl lg:text-6xl">
                  Color Mode
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Welcome to Color Mode, your one-stop destination for tattoos,
                </p>
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
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Tattoo Studio
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl">
                  Express yourself with our custom tattoo designs. Our
                  experienced artists bring your ideas to life.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="relative w-full h-64 lg:h-96 mx-auto">
                <AnimatePresence initial={false}>
                  <motion.img
                    key={currentTattooSlide}
                    src={tattooSlides[currentTattooSlide]}
                    alt={`Tattoo Slide ${currentTattooSlide + 1}`}
                    className="absolute w-full h-full object-cover rounded-xl"
                    initial={{ opacity: 0, rotateY: -90 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    exit={{ opacity: 0, rotateY: 90 }}
                    transition={{ duration: 0.5 }}
                  />
                </AnimatePresence>
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
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  {["Custom Designs", "Expert Artists", "Safe Environment"].map(
                    (item, index) => (
                      <li key={index}>
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
                      </li>
                    )
                  )}
                </ul>
                <div className="flex justify-center">
                  <Link
                    to="/Booking"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mural Painting Section */}
        <section
          id="mural"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-200"
        >
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Mural Painting
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl">
                  Transform your walls into works of art with our stunning mural
                  paintings. From abstract designs to lifelike depictions, we
                  bring spaces to life.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="relative w-full h-64 lg:h-96 mx-auto">
                <AnimatePresence initial={false}>
                  <motion.img
                    key={currentMuralSlide}
                    src={muralSlides[currentMuralSlide]}
                    alt={`Mural Slide ${currentMuralSlide + 1}`}
                    className="absolute w-full h-full object-cover rounded-xl"
                    initial={{ opacity: 0, rotateY: -90 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    exit={{ opacity: 0, rotateY: 90 }}
                    transition={{ duration: 0.5 }}
                  />
                </AnimatePresence>
                <button
                  onClick={() => prevSlide(setCurrentMuralSlide, muralSlides)}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={() => nextSlide(setCurrentMuralSlide, muralSlides)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  {[
                    "Creative Designs",
                    "Experienced Artists",
                    "Vibrant Colors",
                  ].map((item, index) => (
                    <li key={index}>
                      <div className="grid gap-1">
                        <h3 className="text-xl font-bold">{item}</h3>
                        <p className="text-gray-500">
                          {item === "Creative Designs"
                            ? "Expressive and original mural designs."
                            : item === "Experienced Artists"
                            ? "Professional artists with a passion for murals."
                            : "Bright colors that bring energy to any space."}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-center">
                  <Link
                    to="/Booking"
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
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Music Events
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl">
                  Experience unforgettable music events, featuring local and
                  international artists. Come and vibe with us!
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="relative w-full h-64 lg:h-96 mx-auto">
                <AnimatePresence initial={false}>
                  <motion.img
                    key={currentEventSlide}
                    src={eventSlides[currentEventSlide]}
                    alt={`Event Slide ${currentEventSlide + 1}`}
                    className="absolute w-full h-full object-cover rounded-xl"
                    initial={{ opacity: 0, rotateY: -90 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    exit={{ opacity: 0, rotateY: 90 }}
                    transition={{ duration: 0.5 }}
                  />
                </AnimatePresence>
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
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  {[
                    "Live Performances",
                    "Vibrant Atmosphere",
                    "Diverse Music Genres",
                  ].map((item, index) => (
                    <li key={index}>
                      <div className="grid gap-1">
                        <h3 className="text-xl font-bold">{item}</h3>
                        <p className="text-gray-500">
                          {item === "Live Performances"
                            ? "Enjoy live shows by talented artists."
                            : item === "Vibrant Atmosphere"
                            ? "Feel the energy and excitement of our events."
                            : "From rock to EDM, we’ve got it all."}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-center">
                  <Link
                    to="/Booking"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950"
                  >
                    Book Now
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
