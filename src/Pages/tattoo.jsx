import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Droplet, Sun, Heart } from "lucide-react";
import Subnav from "../components/subnavbar"; // Import the Subnav component

const TattooStudio = () => {
  const images = ["/Tattoing1.jpeg", "/Tattoing2.jpeg", "/Tattoing3.jpeg"];
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

  // Define navItems for the Subnav component
  const navItems = [
    { title: "Home", path: "/" },
    { title: "Gallery", path: "/gallery" },
    { title: "Artists", path: "/artists" },
    { title: "Appointment", path: "/appointment" },
    { title: "FAQs", path: "/faq" },
  ];

  return (
    <div className="bg-black text-gray-300 min-h-screen">
      <Subnav backButton={true} navItems={navItems} />
      <main className="max-w-4xl mx-auto px-4 py-12 space-y-24">
        <motion.section
          className="text-center"
          initial="initial"
          animate="animate"
          variants={staggerChildren}
        >
          <motion.h1
            className="text-5xl font-bold text-white mb-6"
            variants={fadeInUp}
          >
            Ink Your Story
          </motion.h1>
          <motion.p className="text-xl mb-8" variants={fadeInUp}>
            Where art meets skin, and stories come to life.
          </motion.p>
          <motion.div className="space-x-4" variants={fadeInUp}>
            <a
              href="/booking"
              className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 transition-colors"
            >
              Book Now
            </a>
            <a
              href="/gallery"
              className="border border-white text-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition-colors"
            >
              View Gallery
            </a>
          </motion.div>
        </motion.section>

        <motion.section
          className="relative h-[400px]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImage}
              src={images[currentImage] || "/placeholder.svg"}
              alt={`Tattoo artwork ${currentImage + 1}`}
              className="w-full h-full object-cover rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>
          <motion.button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft />
          </motion.button>
          <motion.button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight />
          </motion.button>
        </motion.section>

        <motion.section
          initial="initial"
          animate="animate"
          variants={staggerChildren}
        >
          <motion.h2
            className="text-3xl font-bold text-white mb-6"
            variants={fadeInUp}
          >
            Our Unique Style
          </motion.h2>
          <motion.p className="mb-6" variants={fadeInUp}>
            At our studio, we blend traditional techniques with modern
            innovation. Our artists specialize in a wide range of styles, from
            intricate dotwork to vibrant watercolors, ensuring that every piece
            of art is as unique as the individual wearing it.
          </motion.p>
          <motion.ul
            className="list-disc list-inside space-y-2"
            variants={staggerChildren}
          >
            {[
              "Precision in every stroke",
              "Creativity that pushes boundaries",
              "Safety and hygiene as top priorities",
            ].map((item, index) => (
              <motion.li key={index} variants={fadeInUp}>
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
            className="text-3xl font-bold text-white mb-6"
            variants={fadeInUp}
          >
            Featured Artists
          </motion.h2>
          <motion.div className="space-y-6" variants={staggerChildren}>
            {[
              {
                name: "Alex Ink",
                specialty: "Black and Grey Realism",
                experience: "10 years",
              },
              {
                name: "Sam Colors",
                specialty: "Watercolor",
                experience: "8 years",
              },
              {
                name: "Jordan Lines",
                specialty: "Minimalist",
                experience: "5 years",
              },
            ].map((artist, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800 p-4 rounded-lg"
              >
                <h3 className="text-xl font-semibold text-white">
                  {artist.name}
                </h3>
                <p>
                  Specializing in {artist.specialty} with {artist.experience} of
                  experience
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          initial="initial"
          animate="animate"
          variants={staggerChildren}
        >
          <motion.h2
            className="text-3xl font-bold text-white mb-6"
            variants={fadeInUp}
          >
            Essential Tattoo Care Tips
          </motion.h2>
          <motion.ul className="space-y-4" variants={staggerChildren}>
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
                <item.icon className="w-6 h-6 mr-2 text-white flex-shrink-0" />
                <p>{item.tip}</p>
              </motion.li>
            ))}
          </motion.ul>
          <motion.div className="mt-6" variants={fadeInUp}>
            <h3 className="text-2xl font-semibold text-white mb-4">
              Long-term Tattoo Care
            </h3>
            <ul className="list-disc list-inside space-y-2">
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
                Touch up your tattoo as needed to maintain its vibrancy over the
                years.
              </li>
            </ul>
          </motion.div>
        </motion.section>

        <motion.section
          initial="initial"
          animate="animate"
          variants={staggerChildren}
        >
          <motion.h2
            className="text-3xl font-bold text-white mb-6"
            variants={fadeInUp}
          >
            Tattoo Myths Debunked
          </motion.h2>
          <motion.div className="space-y-6" variants={staggerChildren}>
            {[
              {
                myth: "Tattoos are only for rebels",
                reality:
                  "People from all walks of life get tattoos for various personal reasons, including art appreciation, memorials, and self-expression.",
              },
              {
                myth: "You can't donate blood if you have a tattoo",
                reality:
                  "In most cases, you can donate blood after getting a tattoo. The waiting period varies by location and tattoo studio regulations.",
              },
              {
                myth: "Tattoos fade quickly",
                reality:
                  "With proper care and protection from the sun, tattoos can maintain their vibrancy for many years.",
              },
              {
                myth: "Removing a tattoo is easy",
                reality:
                  "While tattoo removal techniques have improved, the process can be lengthy, expensive, and may not result in complete removal.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800 p-4 rounded-lg"
              >
                <h3 className="text-xl font-semibold text-white">
                  Myth: {item.myth}
                </h3>
                <p>Reality: {item.reality}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          initial="initial"
          animate="animate"
          variants={staggerChildren}
        >
          <motion.h2
            className="text-3xl font-bold text-white mb-6"
            variants={fadeInUp}
          >
            A Brief History of Tattoos
          </motion.h2>
          <motion.div className="space-y-6" variants={staggerChildren}>
            {[
              "Tattooing has been practiced across the globe since at least Neolithic times. Ötzi the Iceman, dating from the 4th to 5th millennium BC, was found to have 61 tattoos.",
              "In ancient Egypt, tattoos were found on female mummies dating to c. 2000 BC. The ancient Greeks and Romans used tattoos to mark slaves and criminals.",
              "In Polynesian culture, tattoos have long been considered a sacred rite of passage, often telling the story of the wearer's life and achievements.",
              'The word "tattoo" itself comes from the Tahitian word "tatau," which means "to mark." It was introduced to Europe by explorers in the 18th century.',
              "In the late 19th century, the electric tattoo machine was invented, revolutionizing the art form and making tattoos more accessible.",
              "Today, tattooing is recognized as a legitimate art form, with styles ranging from traditional to hyper-realistic, abstract, and everything in between.",
            ].map((paragraph, index) => (
              <motion.p key={index} variants={fadeInUp}>
                {paragraph}
              </motion.p>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          initial="initial"
          animate="animate"
          variants={staggerChildren}
        >
          <motion.h2
            className="text-3xl font-bold text-white mb-6"
            variants={fadeInUp}
          >
            Tattoo Styles
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={staggerChildren}
          >
            {[
              {
                style: "Traditional",
                description:
                  "Bold lines and bright colors, often featuring iconic imagery like anchors, roses, and eagles.",
              },
              {
                style: "Realism",
                description:
                  "Highly detailed tattoos that look like photographs, often portraits or nature scenes.",
              },
              {
                style: "Watercolor",
                description:
                  "Soft, painterly style with blended colors and minimal use of black outlines.",
              },
              {
                style: "Geometric",
                description:
                  "Precise, symmetrical designs often incorporating shapes and patterns.",
              },
              {
                style: "Tribal",
                description:
                  "Bold, black designs inspired by indigenous tattoo traditions.",
              },
              {
                style: "Neo-Traditional",
                description:
                  "A modern take on traditional style, with a broader color palette and more complex designs.",
              },
              {
                style: "Blackwork",
                description:
                  "Large areas of solid black ink, often with intricate patterns or negative space designs.",
              },
              {
                style: "Japanese",
                description:
                  "Traditional Japanese imagery like koi fish, dragons, and cherry blossoms, often covering large areas of the body.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800 p-4 rounded-lg"
              >
                <h3 className="text-xl font-semibold text-white">
                  {item.style}
                </h3>
                <p>{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          initial="initial"
          animate="animate"
          variants={staggerChildren}
        >
          <motion.h2
            className="text-3xl font-bold text-white mb-6"
            variants={fadeInUp}
          >
            What Our Clients Say
          </motion.h2>
          <motion.div className="space-y-6" variants={staggerChildren}>
            {[
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
              {
                name: "John D.",
                quote:
                  "I was nervous about getting my first tattoo, but the team made me feel so comfortable.",
              },
              {
                name: "Lisa K.",
                quote:
                  "The creativity and skill of the artists here are unmatched. Highly recommend!",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800 p-4 rounded-lg"
              >
                <p className="italic mb-2">"{testimonial.quote}"</p>
                <p className="text-white">- {testimonial.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          className="text-center"
          initial="initial"
          animate="animate"
          variants={staggerChildren}
        >
          <motion.h2
            className="text-3xl font-bold text-white mb-6"
            variants={fadeInUp}
          >
            Ready to Ink Your Story?
          </motion.h2>
          <motion.a
            href="/booking"
            className="inline-block bg-white text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-200 transition-colors"
            variants={fadeInUp}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Book Your Session Now
          </motion.a>
        </motion.section>
      </main>

      <motion.footer
        className="bg-gray-900 text-white py-8 mt-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p>&copy; 2023 Ink Your Story Tattoo Studio. All rights reserved.</p>
          <p className="mt-2">
            123 Main St, Anytown, USA | Phone: (555) 123-4567 | Email:
            info@inkyourstory.com
          </p>
        </div>
      </motion.footer>
    </div>
  );
};

export default TattooStudio;
