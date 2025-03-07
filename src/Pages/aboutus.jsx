

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useSpring, useInView } from "framer-motion"
import {
  Heart,
  Zap,
  Sparkles,
  MessageCircle,
  Award,
  Clock,
  Coffee,
  Palette,
  Music,
  Calendar,
  Headphones,
  Mic,
  ArrowRight,
  ChevronRight,
  Star,
} from "lucide-react"
import axios from "axios"

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [galleryImages, setGalleryImages] = useState([])
  const [events, setEvents] = useState([])
  const [loadingGallery, setLoadingGallery] = useState(true)
  const [loadingEvents, setLoadingEvents] = useState(true)
  const [galleryError, setGalleryError] = useState(null)
  const [eventsError, setEventsError] = useState(null)
  const [hoveredEvent, setHoveredEvent] = useState(null)
  const [animateStats, setAnimateStats] = useState(false)

  // Refs for scroll animations
  const heroRef = useRef(null)
  const featuresRef = useRef(null)
  const aboutRef = useRef(null)
  const tabsRef = useRef(null)
  const teamRef = useRef(null)
  const servicesRef = useRef(null)
  const timelineRef = useRef(null)
  const galleryRef = useRef(null)
  const eventsRef = useRef(null)
  const ctaRef = useRef(null)
  const statsRef = useRef(null)

  // InView states for scroll animations
  const isHeroInView = useInView(heroRef, { once: false, amount: 0.2 })
  const isFeaturesInView = useInView(featuresRef, { once: true, amount: 0.2 })
  const isAboutInView = useInView(aboutRef, { once: true, amount: 0.2 })
  const isTabsInView = useInView(tabsRef, { once: true, amount: 0.2 })
  const isTeamInView = useInView(teamRef, { once: true, amount: 0.2 })
  const isServicesInView = useInView(servicesRef, { once: true, amount: 0.2 })
  const isTimelineInView = useInView(timelineRef, { once: true, amount: 0.2 })
  const isGalleryInView = useInView(galleryRef, { once: true, amount: 0.2 })
  const isEventsInView = useInView(eventsRef, { once: true, amount: 0.2 })
  const isCtaInView = useInView(ctaRef, { once: true, amount: 0.2 })
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.5 })

  // Scroll animations
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  const BASE_URL = "http://127.0.0.1:8000/api"

  // Set axios default base URL
  axios.defaults.baseURL = "http://127.0.0.1:8000/"

  useEffect(() => {
    setIsVisible(true)

    // Fetch tattoo gallery images
    const fetchGalleryImages = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/tattoo-gallery`)
        setGalleryImages(response.data)
        setLoadingGallery(false)
      } catch (error) {
        console.error("Error fetching gallery images", error)
        setGalleryError("Failed to load gallery images")
        setLoadingGallery(false)
      }
    }

    // Fetch music events
    const fetchEvents = async () => {
      try {
        const { data } = await axios.get("/api/events")
        setEvents(data)
        setLoadingEvents(false)
      } catch (error) {
        console.error("Error fetching events", error)
        setEventsError("Failed to load events")
        setLoadingEvents(false)
      }
    }

    fetchGalleryImages()
    fetchEvents()

    // Trigger stats animation when in view
    if (isStatsInView) {
      setAnimateStats(true)
    }

    // Add cursor trail effect
    const cursorTrail = document.createElement("div")
    cursorTrail.className = "cursor-trail"
    document.body.appendChild(cursorTrail)

    const handleMouseMove = (e) => {
      const trail = document.createElement("div")
      trail.className = "trail-particle"
      trail.style.left = `${e.clientX}px`
      trail.style.top = `${e.clientY}px`

      // Random color from theme
      const colors = ["#EC4899", "#8B5CF6", "#6366F1"]
      const randomColor = colors[Math.floor(Math.random() * colors.length)]
      trail.style.backgroundColor = randomColor

      cursorTrail.appendChild(trail)

      setTimeout(() => {
        trail.remove()
      }, 800)
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      cursorTrail.remove()
    }
  }, [isStatsInView])

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const fadeInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  }

  const fadeInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  }

  const rotateIn = {
    hidden: { opacity: 0, rotate: -5, y: 50 },
    visible: { opacity: 1, rotate: 0, y: 0 },
  }

  // Floating animation for decorative elements
  const floatingAnimation = {
    y: [0, -15, 0],
    transition: {
      duration: 6,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  }

  // Pulse animation
  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  }

  // Stats counter animation
  const counterAnimation = (value) => {
    return {
      number: [0, value],
      transition: { duration: 2, ease: "easeOut" },
    }
  }

  const iconFeatures = [
    {
      icon: <Palette className="w-8 h-8 text-pink-500" />,
      title: "Custom Tattoo Art",
      description: "Unique designs tailored to express your personal story",
    },
    {
      icon: <Music className="w-8 h-8 text-pink-500" />,
      title: "Live Music Events",
      description: "Unforgettable experiences with top-tier artists and performers",
    },
    {
      icon: <Sparkles className="w-8 h-8 text-pink-500" />,
      title: "Premium Quality",
      description: "Highest standards in both tattoo artistry and event production",
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-pink-500" />,
      title: "Personal Consultation",
      description: "Dedicated attention to bring your vision to life",
    },
  ]

  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Lead Tattoo Artist",
      image: "/placeholder.svg?height=300&width=300",
      bio: "With over 15 years of experience, Alex specializes in neo-traditional and Japanese-inspired designs.",
    },
    {
      name: "Sam Rivera",
      role: "Event Director",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Sam has produced over 200 successful music events, from intimate venue shows to major festivals.",
    },
    {
      name: "Jordan Lee",
      role: "Tattoo Artist & Music Curator",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Jordan bridges our two worlds, bringing artistic vision to both tattoo design and musical programming.",
    },
  ]

  const tabContent = [
    {
      title: "Our Mission",
      content:
        "We unite the worlds of visual art and music to create transformative experiences. Our tattoo studio delivers permanent art that tells your story, while our event management brings communities together through the power of live music. We believe in creating spaces where self-expression thrives in all its forms.",
      icon: <Award className="w-6 h-6" />,
    },
    {
      title: "Our History",
      content:
        "Founded in 2010 as a small tattoo studio with occasional music nights, we've evolved into a unique creative hub. Our founder's passion for both tattoo art and underground music scenes led to this distinctive combination. Today, we're recognized for our innovative approach to blending visual and auditory artistic experiences.",
      icon: <Clock className="w-6 h-6" />,
    },
    {
      title: "Our Process",
      content:
        "Whether you're getting a tattoo or we're producing your event, we begin with understanding your vision. For tattoos, we move from consultation to custom design to meticulous execution. For events, we handle everything from artist booking to production and promotion. Both sides of our business are united by our commitment to artistic integrity and exceptional execution.",
      icon: <Coffee className="w-6 h-6" />,
    },
  ]

  const services = [
    {
      title: "Custom Tattoo Design",
      description:
        "Personalized tattoo designs created to reflect your unique story and aesthetic preferences, from small minimalist pieces to full sleeves and back pieces.",
      icon: <Palette className="w-10 h-10 text-pink-500" />,
    },
    {
      title: "Music Event Production",
      description:
        "Full-service event management for music shows of all sizes, handling everything from venue selection to artist booking and technical production.",
      icon: <Headphones className="w-10 h-10 text-pink-500" />,
    },
    {
      title: "Artist Residencies",
      description:
        "Regular programs featuring guest tattoo artists from around the world, bringing fresh styles and techniques to our studio.",
      icon: <Zap className="w-10 h-10 text-pink-500" />,
    },
    {
      title: "Festival Curation",
      description:
        "Themed music festivals and events that showcase emerging talent alongside established acts in carefully designed experiences.",
      icon: <Mic className="w-10 h-10 text-pink-500" />,
    },
  ]

  const stats = [
    { value: 1500, label: "Tattoos Created", icon: <Palette className="w-6 h-6" /> },
    { value: 250, label: "Events Produced", icon: <Music className="w-6 h-6" /> },
    { value: 15, label: "Years Experience", icon: <Clock className="w-6 h-6" /> },
    { value: 98, label: "Satisfaction Rate", icon: <Heart className="w-6 h-6" />, suffix: "%" },
  ]

  // Format date for events
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 filter grayscale overflow-hidden">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-purple-600 z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Cursor trail styles */}
      <style jsx global>{`
        .cursor-trail {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 9999;
        }
        
        .trail-particle {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          pointer-events: none;
          opacity: 0.7;
          animation: fadeOut 0.8s forwards;
          transform: translate(-50%, -50%);
        }
        
        @keyframes fadeOut {
          0% { opacity: 0.7; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(0); }
        }
      `}</style>

      {/* Animated background particles */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-pink-500 opacity-10"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            style={{
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              filter: "blur(40px)",
            }}
          />
        ))}
      </div>

      {/* Hero Section with Animated Gradient */}
      <motion.section
        ref={heroRef}
        className="relative h-[80vh] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-gray-500 to-gray-700"
          animate={{
            background: [
              "linear-gradient(to right, #8B5CF6, #EC4899)",
              "linear-gradient(to right, #3B82F6, #10B981)",
              "linear-gradient(to right, #F59E0B, #EF4444)",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        {/* Animated overlay pattern */}
        <div className="absolute inset-0 bg-black opacity-30 z-10"></div>

        {/* Animated decorative elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full border-2 border-pink-500 opacity-20 z-5"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full border-2 border-purple-600 opacity-20 z-5"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        {/* Logo placeholder with animation */}
        <motion.div
          className="absolute top-6 left-6 z-20"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="text-white font-bold text-xl">logo here</div>
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 inline-block"
          >
            <motion.div
              className="px-4 py-1 rounded-full bg-pink-500 bg-opacity-30 border border-pink-500 text-sm font-medium text-white mb-4 backdrop-blur-sm"
              animate={pulseAnimation}
            >
              Tattoo Studio &  Music Ticketing
            </motion.div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            About{" "}
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
              style={{ backgroundSize: "200% 200%" }}
            >
              US
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-white max-w-2xl mx-auto mb-8 leading-relaxed"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Where tattoo artistry meets music event magic
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(236, 72, 153, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Explore Our Gallery</span>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 z-0"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
            <motion.button
              className="px-8 py-3 rounded-full bg-gray-800 bg-opacity-80 backdrop-blur-sm text-white font-medium border border-gray-700 hover:bg-gray-700 transition-all duration-300 relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Contact Us</span>
              <motion.span
                className="absolute inset-0 bg-gray-700 z-0"
                initial={{ y: "100%" }}
                whileHover={{ y: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>
        </div>

        {/* Animated scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          <div className="w-8 h-12 rounded-full border-2 border-white flex items-start justify-center p-1">
            <motion.div
              className="w-1 h-3 bg-white rounded-full"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 max-w-6xl relative">
        {/* Stats Section */}
        <motion.div
          ref={statsRef}
          className="mb-24 py-12 px-6 bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl relative overflow-hidden"
          initial="hidden"
          animate={isStatsInView ? "visible" : "hidden"}
          variants={scaleIn}
          transition={{ duration: 0.8 }}
        >
          {/* Background animation */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-pink-600/10 to-purple-600/10"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            style={{ backgroundSize: "200% 200%" }}
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={fadeIn}
                custom={index}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.div
                  className="w-16 h-16 mx-auto bg-gray-700 rounded-full flex items-center justify-center mb-4"
                  animate={pulseAnimation}
                >
                  {stat.icon}
                </motion.div>
                <div className="flex items-center justify-center text-3xl md:text-4xl font-bold text-white mb-2">
                  <motion.span animate={animateStats ? counterAnimation(stat.value) : {}}>
                    {animateStats ? stat.value : 0}
                  </motion.span>
                  {stat.suffix && <span>{stat.suffix}</span>}
                </div>
                <p className="text-gray-300">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Topic Section */}
        <motion.div
          ref={featuresRef}
          className="text-center mb-24"
          initial="hidden"
          animate={isFeaturesInView ? "visible" : "hidden"}
          variants={fadeIn}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block px-4 py-1 rounded-full bg-gray-800 border border-gray-700 text-sm font-medium text-pink-500 mb-4"
            variants={scaleIn}
            transition={{ duration: 0.5 }}
          >
            What We Do
          </motion.div>
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-12"
            variants={fadeIn}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Main{" "}
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
              style={{ backgroundSize: "200% 200%" }}
            >
              Topic Here
            </motion.span>
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate={isFeaturesInView ? "visible" : "hidden"}
          >
            {iconFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center p-8 bg-gray-800 rounded-2xl border border-gray-700 relative overflow-hidden group"
                variants={fadeIn}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-pink-600/20 to-purple-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="bg-gray-700 p-5 rounded-full mb-6 relative z-10 group-hover:bg-gray-600 transition-colors duration-300"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  {feature.icon}
                </motion.div>
                <motion.h3
                  className="font-bold text-xl mb-3 text-white relative z-10"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {feature.title}
                </motion.h3>
                <p className="text-gray-300 relative z-10">{feature.description}</p>

                {/* Animated corner accent */}
                <motion.div
                  className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-pink-500/20 to-transparent opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1, rotate: 45 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Topic with Image */}
        <motion.div
          ref={aboutRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24"
          initial="hidden"
          animate={isAboutInView ? "visible" : "hidden"}
          variants={staggerContainer}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="overflow-hidden rounded-2xl relative group"
            variants={fadeInLeft}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-300"
              whileHover={{ opacity: 0.3 }}
              transition={{ duration: 0.3 }}
            />
            <motion.img
              src="/placeholder.svg?height=600&width=700"
              alt="Tattoo Studio"
              className="w-full h-auto object-cover rounded-2xl shadow-2xl"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.7 }}
            />
            <motion.div
              className="absolute bottom-6 left-6 z-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <motion.div
                className="px-3 py-1 rounded-full bg-pink-500 bg-opacity-70 backdrop-blur-sm text-xs font-medium text-white inline-block mb-2"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                Our Studio
              </motion.div>
            </motion.div>

            {/* Animated corner accents */}
            <motion.div
              className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-pink-500 opacity-0 group-hover:opacity-100"
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-pink-500 opacity-0 group-hover:opacity-100"
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          <div className="space-y-8">
            <motion.div
              className="inline-block px-4 py-1 rounded-full bg-gray-800 border border-gray-700 text-sm font-medium text-pink-500 mb-2"
              variants={fadeIn}
              transition={{ duration: 0.5 }}
            >
              About Us
            </motion.div>
            <motion.h2
              className="text-4xl font-bold text-white leading-tight"
              variants={fadeInRight}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Topic{" "}
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600"
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
                style={{ backgroundSize: "200% 200%" }}
              >
                Here
              </motion.span>
            </motion.h2>

            <motion.p
              className="text-gray-300 text-lg leading-relaxed"
              variants={fadeInRight}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Our unique studio combines the precision of tattoo artistry with the energy of live music events. We've
              created a space where visual and auditory art forms converge, offering clients and audiences
              transformative experiences that engage multiple senses.
            </motion.p>

            <motion.p
              className="text-gray-300 text-lg leading-relaxed"
              variants={fadeInRight}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              From intimate tattoo sessions that result in lifelong art to immersive music events that create
              unforgettable memories, our team brings passion, creativity, and technical excellence to everything we do.
            </motion.p>

            <motion.div variants={fadeInRight} transition={{ duration: 0.5, delay: 0.5 }}>
              <motion.button
                className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 relative overflow-hidden"
                whileHover={{ scale: 1.05, x: 5, boxShadow: "0 10px 25px -5px rgba(236, 72, 153, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Explore More</span>
                <motion.span
                  className="relative z-10"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 z-0"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Tabs Section */}
        <motion.div
          ref={tabsRef}
          className="mb-24"
          initial="hidden"
          animate={isTabsInView ? "visible" : "hidden"}
          variants={fadeIn}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <motion.div
              className="inline-block px-4 py-1 rounded-full bg-gray-800 border border-gray-700 text-sm font-medium text-pink-500 mb-4"
              variants={scaleIn}
              transition={{ duration: 0.5 }}
            >
              Our Journey
            </motion.div>
            <motion.h2
              className="text-4xl md:text-5xl font-bold"
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Our{" "}
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600"
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
                style={{ backgroundSize: "200% 200%" }}
              >
                Story
              </motion.span>
            </motion.h2>
          </div>

          <motion.div
            className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl border border-gray-700 relative"
            variants={scaleIn}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Animated background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-pink-600/5 to-purple-600/5"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
              style={{ backgroundSize: "200% 200%" }}
            />

            <div className="flex flex-wrap border-b border-gray-700 relative z-10">
              {tabContent.map((tab, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center px-8 py-5 text-sm font-medium transition-colors duration-300 ${
                    activeTab === index
                      ? "bg-gray-700 text-white border-b-2 border-pink-500"
                      : "text-gray-400 hover:text-white hover:bg-gray-700"
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  <motion.span
                    className="mr-2"
                    animate={activeTab === index ? { rotate: [0, 15, 0, -15, 0] } : {}}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    {tab.icon}
                  </motion.span>
                  {tab.title}
                </motion.button>
              ))}
            </div>

            <div className="p-10 relative z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-gray-300 leading-relaxed text-lg"
                >
                  <motion.h3
                    className="text-2xl font-bold mb-6 text-white"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    {tabContent[activeTab].title}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    {tabContent[activeTab].content}
                  </motion.p>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          ref={teamRef}
          className="mb-24"
          initial="hidden"
          animate={isTeamInView ? "visible" : "hidden"}
          variants={fadeIn}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <motion.div
              className="inline-block px-4 py-1 rounded-full bg-gray-800 border border-gray-700 text-sm font-medium text-pink-500 mb-4"
              variants={scaleIn}
              transition={{ duration: 0.5 }}
            >
              Our Artists
            </motion.div>
            <motion.h2
              className="text-4xl md:text-5xl font-bold"
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Meet Our{" "}
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600"
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
                style={{ backgroundSize: "200% 200%" }}
              >
                Team
              </motion.span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl border border-gray-700 group"
                variants={rotateIn}
                custom={index}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.2 }}
                whileHover={{ y: -15, transition: { duration: 0.3 } }}
              >
                <div className="relative overflow-hidden h-80">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10 opacity-70"
                    whileHover={{ opacity: 0.4 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.7 }}
                  />
                  <motion.div
                    className="absolute top-4 right-4 z-20"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  >
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.6 + i * 0.1 }}
                        >
                          <Star key={i} className="w-4 h-4 fill-pink-500 text-pink-500" />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
                <div className="p-8 relative">
                  <motion.div
                    className="absolute -top-12 left-8 bg-pink-500 text-white rounded-full p-3 shadow-lg"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {index === 0 ? (
                      <Palette className="w-6 h-6" />
                    ) : index === 1 ? (
                      <Music className="w-6 h-6" />
                    ) : (
                      <Zap className="w-6 h-6" />
                    )}
                  </motion.div>
                  <motion.h3
                    className="text-2xl font-bold text-white mb-1"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    {member.name}
                  </motion.h3>
                  <motion.p
                    className="text-pink-500 text-lg mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                  >
                    {member.role}
                  </motion.p>
                  <motion.p
                    className="text-gray-300"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  >
                    {member.bio}
                  </motion.p>
                  <motion.div
                    className="mt-6 pt-6 border-t border-gray-700"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                  >
                    <motion.button
                      className="text-white flex items-center gap-2 group/btn"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span>View Portfolio</span>
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </motion.span>
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Services Section */}
        <motion.div
          ref={servicesRef}
          className="mb-24"
          initial="hidden"
          animate={isServicesInView ? "visible" : "hidden"}
          variants={fadeIn}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <motion.div
              className="inline-block px-4 py-1 rounded-full bg-gray-800 border border-gray-700 text-sm font-medium text-pink-500 mb-4"
              variants={scaleIn}
              transition={{ duration: 0.5 }}
            >
              Our Services
            </motion.div>
            <motion.h2
              className="text-4xl md:text-5xl font-bold"
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Second{" "}
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600"
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
                style={{ backgroundSize: "200% 200%" }}
              >
                Topic Here
              </motion.span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700 flex items-start gap-6 group hover:bg-gray-800/80 transition-colors duration-300 relative overflow-hidden"
                variants={index % 2 === 0 ? fadeInLeft : fadeInRight}
                custom={index}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
                  transition: { duration: 0.3 },
                }}
              >
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-pink-600/10 to-purple-600/5 opacity-0 group-hover:opacity-100"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />

                <motion.div
                  className="bg-gradient-to-br from-pink-600 to-purple-700 p-4 rounded-2xl shadow-lg relative z-10"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  {service.icon}
                </motion.div>
                <div className="flex-1 relative z-10">
                  <motion.h3
                    className="text-2xl font-bold text-white mb-3"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {service.title}
                  </motion.h3>
                  <p className="text-gray-300 mb-4">{service.description}</p>
                  <motion.button
                    className="text-pink-500 flex items-center gap-2 text-sm font-medium group/btn"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span>Learn more</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </motion.span>
                  </motion.button>
                </div>

                {/* Animated corner accent */}
                <motion.div
                  className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline Section */}
        <motion.div
          ref={timelineRef}
          className="mb-24"
          initial="hidden"
          animate={isTimelineInView ? "visible" : "hidden"}
          variants={fadeIn}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <motion.div
              className="inline-block px-4 py-1 rounded-full bg-gray-800 border border-gray-700 text-sm font-medium text-pink-500 mb-4"
              variants={scaleIn}
              transition={{ duration: 0.5 }}
            >
              Our History
            </motion.div>
            <motion.h2
              className="text-4xl md:text-5xl font-bold"
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Our{" "}
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600"
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
                style={{ backgroundSize: "200% 200%" }}
              >
                Journey
              </motion.span>
            </motion.h2>
          </div>

          <div className="relative border-l-2 border-pink-500 pl-10 ml-6 space-y-16">
            {[
              {
                year: "2010",
                title: "Our Beginning",
                content:
                  "Opened our first tattoo studio with a small team of two artists and began hosting monthly acoustic sessions in our intimate back room, creating a unique space where art and music could coexist.",
              },
              {
                year: "2015",
                title: "Expansion",
                content:
                  "Expanded to a larger location with dedicated event space and launched our first music festival, featuring tattoo artists creating live during performances, blending visual and auditory art forms.",
              },
              {
                year: "2018",
                title: "International Recognition",
                content:
                  "Began our international artist residency program and expanded our event management to include venue partnerships across the city, bringing diverse artistic talents together.",
              },
              {
                year: "2023",
                title: "New Era",
                content:
                  "Celebrated our growth with a new flagship studio featuring state-of-the-art equipment and an integrated performance venue with custom sound system, creating the ultimate space for artistic expression.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="relative"
                variants={fadeInLeft}
                custom={index}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
              >
                <motion.div
                  className="absolute -left-[3.25rem] mt-1.5 h-10 w-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-white font-bold">{index + 1}</span>
                </motion.div>
                <motion.div
                  className="bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-xl relative overflow-hidden group"
                  whileHover={{ y: -5, x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Animated background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-pink-600/10 to-purple-600/5 opacity-0 group-hover:opacity-100"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  <motion.div
                    className="inline-block px-3 py-1 rounded-full bg-pink-500/20 text-pink-500 text-sm font-medium mb-4 relative z-10"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.year}
                  </motion.div>
                  <motion.h3
                    className="text-2xl font-bold text-white mb-4 relative z-10"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.title}
                  </motion.h3>
                  <p className="text-gray-300 mb-4 leading-relaxed relative z-10">{item.content}</p>

                  {/* Animated corner accent */}
                  <motion.div
                    className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tattoo Gallery Section */}
        <motion.div
          ref={galleryRef}
          className="mb-24"
          initial="hidden"
          animate={isGalleryInView ? "visible" : "hidden"}
          variants={fadeIn}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <motion.div
              className="inline-block px-4 py-1 rounded-full bg-gray-800 border border-gray-700 text-sm font-medium text-pink-500 mb-4"
              variants={scaleIn}
              transition={{ duration: 0.5 }}
            >
              Our Portfolio
            </motion.div>
            <motion.h2
              className="text-4xl md:text-5xl font-bold"
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Tattoo{" "}
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600"
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
                style={{ backgroundSize: "200% 200%" }}
              >
                Gallery
              </motion.span>
            </motion.h2>
          </div>

          {loadingGallery ? (
            <div className="flex justify-center items-center h-60">
              <motion.div
                className="relative w-20 h-20"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-700 rounded-full"></div>
                <motion.div
                  className="absolute top-0 left-0 w-full h-full border-4 border-t-pink-500 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                ></motion.div>
              </motion.div>
            </div>
          ) : galleryError ? (
            <motion.div
              className="text-center py-12 bg-gray-800 rounded-2xl border border-gray-700"
              variants={scaleIn}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="text-red-400 text-xl mb-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {galleryError}
              </motion.div>
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setLoadingGallery(true)
                  setGalleryError(null)
                  axios
                    .get(`${BASE_URL}/tattoo-gallery`)
                    .then((response) => {
                      setGalleryImages(response.data)
                      setLoadingGallery(false)
                    })
                    .catch((error) => {
                      console.error("Error fetching gallery images", error)
                      setGalleryError("Failed to load gallery images")
                      setLoadingGallery(false)
                    })
                }}
              >
                Try Again
              </motion.button>
            </motion.div>
          ) : (
            <>
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-6"
                variants={staggerContainer}
                initial="hidden"
                animate={isGalleryInView ? "visible" : "hidden"}
              >
                {galleryImages.length > 0
                  ? galleryImages.slice(0, 8).map((image, index) => (
                      <motion.div
                        key={image.id || index}
                        className="relative overflow-hidden rounded-xl aspect-square group"
                        variants={scaleIn}
                        custom={index}
                        transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                        whileHover={{ scale: 1.05, rotate: 2, transition: { duration: 0.3 } }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                        <motion.img
                          src={image.image_url || image.url || `/placeholder.svg?height=300&width=300`}
                          alt={image.title || `Tattoo artwork ${index + 1}`}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.15 }}
                          transition={{ duration: 0.7 }}
                        />
                        <motion.div
                          className="absolute inset-0 flex flex-col justify-end p-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          initial={{ opacity: 0, y: 20 }}
                          whileHover={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.h3
                            className="text-white font-bold text-lg mb-2"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                          >
                            {image.title || `Tattoo Design #${index + 1}`}
                          </motion.h3>
                          <motion.p
                            className="text-gray-300 text-sm"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                          >
                            {image.description || "Custom tattoo design by our talented artists"}
                          </motion.p>
                        </motion.div>

                        {/* Animated corner accents */}
                        <motion.div
                          className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-pink-500 opacity-0 group-hover:opacity-100"
                          initial={{ scale: 0 }}
                          whileHover={{ scale: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                        <motion.div
                          className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-pink-500 opacity-0 group-hover:opacity-100"
                          initial={{ scale: 0 }}
                          whileHover={{ scale: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                    ))
                  : // Fallback placeholders if no images are returned
                    Array(8)
                      .fill()
                      .map((_, index) => (
                        <motion.div
                          key={index}
                          className="relative overflow-hidden rounded-xl aspect-square group"
                          variants={scaleIn}
                          custom={index}
                          transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                          whileHover={{ scale: 1.05, rotate: 2, transition: { duration: 0.3 } }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                          <motion.img
                            src={`/placeholder.svg?height=300&width=300`}
                            alt={`Tattoo artwork ${index + 1}`}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.15 }}
                            transition={{ duration: 0.7 }}
                          />
                          <motion.div
                            className="absolute inset-0 flex flex-col justify-end p-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            whileHover={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <motion.h3
                              className="text-white font-bold text-lg mb-2"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: 0.1 }}
                            >
                              Tattoo Design #{index + 1}
                            </motion.h3>
                            <motion.p
                              className="text-gray-300 text-sm"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: 0.2 }}
                            >
                              Custom tattoo design by our talented artists
                            </motion.p>
                          </motion.div>

                          {/* Animated corner accents */}
                          <motion.div
                            className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-pink-500 opacity-0 group-hover:opacity-100"
                            initial={{ scale: 0 }}
                            whileHover={{ scale: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                          <motion.div
                            className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-pink-500 opacity-0 group-hover:opacity-100"
                            initial={{ scale: 0 }}
                            whileHover={{ scale: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                        </motion.div>
                      ))}
              </motion.div>

              <div className="text-center mt-12">
                <motion.button
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto relative overflow-hidden"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(236, 72, 153, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  variants={scaleIn}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <span className="relative z-10">View Full Gallery</span>
                  <motion.span
                    className="relative z-10"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.span>
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 z-0"
                    initial={{ x: "100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </div>
            </>
          )}
        </motion.div>

        {/* Upcoming Events Section */}
        <motion.div
          ref={eventsRef}
          className="mb-24"
          initial="hidden"
          animate={isEventsInView ? "visible" : "hidden"}
          variants={fadeIn}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <motion.div
              className="inline-block px-4 py-1 rounded-full bg-gray-800 border border-gray-700 text-sm font-medium text-pink-500 mb-4"
              variants={scaleIn}
              transition={{ duration: 0.5 }}
            >
              Music Events
            </motion.div>
            <motion.h2
              className="text-4xl md:text-5xl font-bold"
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Upcoming{" "}
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600"
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
                style={{ backgroundSize: "200% 200%" }}
              >
                Events
              </motion.span>
            </motion.h2>
          </div>

          {loadingEvents ? (
            <div className="flex justify-center items-center h-60">
              <motion.div
                className="relative w-20 h-20"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-700 rounded-full"></div>
                <motion.div
                  className="absolute top-0 left-0 w-full h-full border-4 border-t-pink-500 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                ></motion.div>
              </motion.div>
            </div>
          ) : eventsError ? (
            <motion.div
              className="text-center py-12 bg-gray-800 rounded-2xl border border-gray-700"
              variants={scaleIn}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="text-red-400 text-xl mb-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {eventsError}
              </motion.div>
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setLoadingEvents(true)
                  setEventsError(null)
                  axios
                    .get("/api/events")
                    .then((response) => {
                      setEvents(response.data)
                      setLoadingEvents(false)
                    })
                    .catch((error) => {
                      console.error("Error fetching events", error)
                      setEventsError("Failed to load events")
                      setLoadingEvents(false)
                    })
                }}
              >
                Try Again
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              animate={isEventsInView ? "visible" : "hidden"}
            >
              {events.length > 0
                ? events.slice(0, 6).map((event, index) => (
                    <motion.div
                      key={event.id || index}
                      className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl border border-gray-700 group"
                      variants={fadeIn}
                      custom={index}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                      whileHover={{ y: -15, transition: { duration: 0.3 } }}
                      onHoverStart={() => setHoveredEvent(index)}
                      onHoverEnd={() => setHoveredEvent(null)}
                    >
                      <div className="relative h-56 overflow-hidden">
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"
                          whileHover={{ opacity: 0.6 }}
                          transition={{ duration: 0.3 }}
                        />
                        <motion.img
                          src={event.image_url || event.image || `/placeholder.svg?height=300&width=500`}
                          alt={event.title || `Event ${index + 1}`}
                          className="w-full h-full object-cover"
                          animate={hoveredEvent === index ? { scale: 1.1 } : { scale: 1 }}
                          transition={{ duration: 0.7 }}
                        />
                        <motion.div
                          className="absolute top-4 left-4 z-20"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                        >
                          <motion.div
                            className="px-3 py-1 rounded-full bg-pink-500 bg-opacity-70 backdrop-blur-sm text-xs font-medium text-white inline-block"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                          >
                            {event.category || "Music Event"}
                          </motion.div>
                        </motion.div>

                        {/* Animated corner accents */}
                        <motion.div
                          className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-pink-500 opacity-0 group-hover:opacity-100"
                          initial={{ scale: 0 }}
                          whileHover={{ scale: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                        <motion.div
                          className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-pink-500 opacity-0 group-hover:opacity-100"
                          initial={{ scale: 0 }}
                          whileHover={{ scale: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      <div className="p-8">
                        <motion.div
                          className="flex items-center gap-2 mb-3"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                        >
                          <Calendar className="w-5 h-5 text-pink-500" />
                          <div className="text-pink-500 text-sm font-medium">
                            {event.date ? formatDate(event.date) : "Coming Soon"}
                          </div>
                        </motion.div>
                        <motion.h3
                          className="text-2xl font-bold text-white mb-3"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                        >
                          {event.title || `Music Event ${index + 1}`}
                        </motion.h3>
                        <motion.p
                          className="text-gray-300 mb-6"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                        >
                          {event.description || "Join us for an unforgettable night of music and art."}
                        </motion.p>
                        <motion.div
                          className="flex justify-between items-center"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                        >
                          <div className="text-white font-medium">{event.price || "From $25"}</div>
                          <motion.button
                            className="px-5 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full text-sm font-medium relative overflow-hidden"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <span className="relative z-10">Get Tickets</span>
                            <motion.span
                              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 z-0"
                              initial={{ x: "100%" }}
                              whileHover={{ x: 0 }}
                              transition={{ duration: 0.3 }}
                            />
                          </motion.button>
                        </motion.div>
                      </div>
                    </motion.div>
                  ))
                : // Fallback placeholders if no events are returned
                  Array(3)
                    .fill()
                    .map((_, index) => (
                      <motion.div
                        key={index}
                        className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl border border-gray-700 group"
                        variants={fadeIn}
                        custom={index}
                        transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                        whileHover={{ y: -15, transition: { duration: 0.3 } }}
                        onHoverStart={() => setHoveredEvent(index)}
                        onHoverEnd={() => setHoveredEvent(null)}
                      >
                        <div className="relative h-56 overflow-hidden">
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"
                            whileHover={{ opacity: 0.6 }}
                            transition={{ duration: 0.3 }}
                          />
                          <motion.img
                            src={`/placeholder.svg?height=300&width=500`}
                            alt={`Event ${index + 1}`}
                            className="w-full h-full object-cover"
                            animate={hoveredEvent === index ? { scale: 1.1 } : { scale: 1 }}
                            transition={{ duration: 0.7 }}
                          />
                          <motion.div
                            className="absolute top-4 left-4 z-20"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                          >
                            <motion.div
                              className="px-3 py-1 rounded-full bg-pink-500 bg-opacity-70 backdrop-blur-sm text-xs font-medium text-white inline-block"
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.2 }}
                            >
                              Music Event
                            </motion.div>
                          </motion.div>
                        </div>
                        <div className="p-8">
                          <motion.div
                            className="flex items-center gap-2 mb-3"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                          >
                            <Calendar className="w-5 h-5 text-pink-500" />
                            <div className="text-pink-500 text-sm font-medium">
                              {new Date(Date.now() + 1000 * 60 * 60 * 24 * (index + 7)).toLocaleDateString(undefined, {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </div>
                          </motion.div>
                          <motion.h3
                            className="text-2xl font-bold text-white mb-3"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                          >
                            Upcoming Music Event {index + 1}
                          </motion.h3>
                          <motion.p
                            className="text-gray-300 mb-6"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                          >
                            Join us for an unforgettable night of music and art.
                          </motion.p>
                          <motion.div
                            className="flex justify-between items-center"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                          >
                            <div className="text-white font-medium">From $25</div>
                            <motion.button
                              className="px-5 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full text-sm font-medium"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Get Tickets
                            </motion.button>
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
            </motion.div>
          )}

          <div className="text-center mt-12">
            <motion.button
              className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto relative overflow-hidden"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(236, 72, 153, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              variants={scaleIn}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <span className="relative z-10">View All Events</span>
              <motion.span
                className="relative z-10"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.span>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 z-0"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          ref={ctaRef}
          className="text-center py-16 bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-2xl relative overflow-hidden"
          initial="hidden"
          animate={isCtaInView ? "visible" : "hidden"}
          variants={scaleIn}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          {/* Animated background pattern */}
          <motion.div className="absolute inset-0 opacity-10" animate={floatingAnimation}>
            <motion.div
              className="absolute -top-24 -right-24 w-96 h-96 bg-pink-500 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 45, 0],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-600 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [45, 0, 45],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          </motion.div>

          <div className="relative z-10">
            <motion.div
              className="inline-block px-4 py-1 rounded-full bg-pink-500/20 text-pink-500 text-sm font-medium mb-6"
              variants={scaleIn}
              transition={{ duration: 0.5 }}
            >
              Get Started Today
            </motion.div>
            <motion.h3
              className="text-3xl md:text-4xl font-bold mb-6 text-white"
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Ready to transform your vision into reality?
            </motion.h3>
            <motion.p
              className="text-gray-300 max-w-2xl mx-auto mb-10 text-lg"
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Whether you're looking for a custom tattoo design or planning your next music event, our team is ready to
              bring your ideas to life with creativity and precision.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-6"
              variants={staggerContainer}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.button
                className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                variants={fadeIn}
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(236, 72, 153, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Book a Tattoo Consultation</span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 z-0"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
              <motion.button
                className="px-8 py-4 rounded-full bg-gray-700 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 border border-gray-600 relative overflow-hidden"
                variants={fadeIn}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Discuss Your Event</span>
                <motion.span
                  className="absolute inset-0 bg-gray-600 z-0"
                  initial={{ y: "100%" }}
                  whileHover={{ y: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

