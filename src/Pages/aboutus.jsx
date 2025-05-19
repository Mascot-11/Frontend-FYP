
import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence, useScroll, useSpring, useInView } from "framer-motion"
import { Heart, Zap, Sparkles, Award, Clock, Palette, Music} from "lucide-react"
import img1 from "../assets/colormode.png"

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState(0)
  const [animateStats, setAnimateStats] = useState(false)

  const featuresRef = useRef(null)
  const aboutRef = useRef(null)
  const tabsRef = useRef(null)
  const servicesRef = useRef(null)
  const timelineRef = useRef(null)
  const statsRef = useRef(null)

  const isFeaturesInView = useInView(featuresRef, { once: true, amount: 0.2 })
  const isAboutInView = useInView(aboutRef, { once: true, amount: 0.2 })
  const isTabsInView = useInView(tabsRef, { once: true, amount: 0.2 })
  const isServicesInView = useInView(servicesRef, { once: true, amount: 0.2 })
  const isTimelineInView = useInView(timelineRef, { once: true, amount: 0.2 })
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.5 })

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  useEffect(() => {
    if (isStatsInView) {
      setAnimateStats(true)
    }
  }, [isStatsInView])

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

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  }

  const counterAnimation = (value) => {
    return {
      number: [0, value],
      transition: { duration: 2, ease: "easeOut" },
    }
  }

  const iconFeatures = [
    {
      icon: <Palette className="w-8 h-8 text-gray-300" />,
      title: "Design",
      description: "Minimalist designs with maximum impact",
    },
    {
      icon: <Music className="w-8 h-8 text-gray-300" />,
      title: "Experience",
      description: "Immersive artistic experiences",
    },
    {
      icon: <Sparkles className="w-8 h-8 text-gray-300" />,
      title: "Quality",
      description: "Premium quality in everything we do",
    },
    {
      icon: <Zap className="w-8 h-8 text-gray-300" />,
      title: "Innovation",
      description: "Pushing boundaries in art and design",
    },
  ]

  const tabContent = [
    {
      title: "Our Mission",
      content:
        "We unite visual art and music to create transformative experiences that tell your story and bring communities together.",
      icon: <Award className="w-6 h-6" />,
    },
    {
      title: "Our History",
      content:
        "Founded as a creative hub that evolved from a small studio into a recognized innovator in blending visual and auditory artistic experiences.",
      icon: <Clock className="w-6 h-6" />,
    },
    {
      title: "Our Process",
      content:
        "We begin with understanding your vision, then move to design and execution with a commitment to artistic integrity and exceptional results.",
      icon: <Clock className="w-6 h-6" />,
    },
  ]

  const stats = [
    { value: 1500, label: "Projects", icon: <Palette className="w-6 h-6" /> },
    { value: 250, label: "Events", icon: <Music className="w-6 h-6" /> },
    { value: 15, label: "Years", icon: <Clock className="w-6 h-6" /> },
    { value: 98, label: "Satisfaction", icon: <Heart className="w-6 h-6" />, suffix: "%" },
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-400 to-white z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Background gradient elements */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gray-700 opacity-10"
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

      {/* Hero Section */}
      <motion.section
        className="relative h-[80vh] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800"
          animate={{
            background: [
              "linear-gradient(to right, #1f1f1f, #333333)",
              "linear-gradient(to right, #333333, #1a1a1a)",
              "linear-gradient(to right, #2c2c2c, #1f1f1f)",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        <div className="absolute inset-0 bg-black opacity-30 z-10"></div>

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 inline-block"
          >
            <motion.div
              className="px-4 py-1 rounded-full bg-gray-800 bg-opacity-30 border border-gray-700 text-sm font-medium text-white mb-4 backdrop-blur-sm"
              animate={pulseAnimation}
            >
              About Us
            </motion.div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Our{" "}
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-white"
              animate={{
                backgroundPosition: ["0% 0%", "100% 90%"],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
              style={{ backgroundSize: "200% 100%" }}
            >
              Story
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Where creativity meets artistry. A place that fuses visual design with unforgettable experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              className="px-8 py-3 rounded-full bg-gradient-to-r from-gray-700 to-gray-900 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(255, 255, 255, 0.2)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/gallery" className="relative z-10">
                Explore Our Work
              </Link>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-600 z-0"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
            <motion.button
              className="px-8 py-3 rounded-full bg-transparent backdrop-blur-sm text-white font-medium border border-gray-700 hover:bg-gray-800 transition-all duration-300 relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/faq" className="relative z-10">
                FAQs
              </Link>
              <motion.span
                className="absolute inset-0 bg-gray-800 z-0"
                initial={{ y: "100%" }}
                whileHover={{ y: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>
        </div>

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

      <div className="container mx-auto px-4 py-16 max-w-6xl relative">
        {/* Stats Section */}
        <motion.div
          ref={statsRef}
          className="mb-24 py-12 px-6 bg-gray-900 rounded-2xl border border-gray-800 shadow-2xl relative overflow-hidden"
          initial="hidden"
          animate={isStatsInView ? "visible" : "hidden"}
          variants={scaleIn}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-gray-800/10 to-gray-700/10"
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
                  className="w-16 h-16 mx-auto bg-gray-800 rounded-full flex items-center justify-center mb-4"
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
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          ref={featuresRef}
          className="mb-24"
          initial="hidden"
          animate={isFeaturesInView ? "visible" : "hidden"}
          variants={fadeIn}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate={isFeaturesInView ? "visible" : "hidden"}
          >
            {iconFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center p-8 bg-gray-900 rounded-2xl border border-gray-800 relative overflow-hidden group"
                variants={fadeIn}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-gray-800/20 to-gray-900/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="bg-gray-800 p-5 rounded-full mb-6 relative z-10 group-hover:bg-gray-700 transition-colors duration-300"
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
                <p className="text-gray-400 relative z-10">{feature.description}</p>

                <motion.div
                  className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-gray-700/20 to-transparent opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1, rotate: 45 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* About Section */}
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
              src={img1}
              alt="Studio"
              className="w-full h-auto object-cover rounded-2xl shadow-2xl"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.7 }}
            />
            <motion.div
              className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-gray-400 opacity-0 group-hover:opacity-100"
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-gray-400 opacity-0 group-hover:opacity-100"
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          <div className="space-y-8">
            <motion.div
              className="inline-block px-4 py-1 rounded-full bg-gray-900 border border-gray-800 text-sm font-medium text-gray-400 mb-2"
              variants={fadeIn}
              transition={{ duration: 0.5 }}
            >
              ESTD 2010
            </motion.div>
            <motion.h2
              className="text-4xl font-bold text-white leading-tight"
              variants={fadeInRight}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Our{" "}
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-white"
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
                Philosophy
              </motion.span>
            </motion.h2>

            <motion.p
              className="text-gray-400 text-lg leading-relaxed"
              variants={fadeInRight}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              We have created a space where visual and auditory art forms converge, offering transformative experiences
              that engage multiple senses.
            </motion.p>

            <motion.p
              className="text-gray-400 text-lg leading-relaxed"
              variants={fadeInRight}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Our team brings passion, creativity, and technical excellence to everything we do, creating unforgettable
              memories and lasting impressions.
            </motion.p>
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
          <motion.div
            className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800 relative"
            variants={scaleIn}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-gray-800/5 to-gray-900/5"
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

            <div className="flex flex-wrap border-b border-gray-800 relative z-10">
              {tabContent.map((tab, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center px-8 py-5 text-sm font-medium transition-colors duration-300 ${
                    activeTab === index
                      ? "bg-gray-800 text-white border-b-2 border-gray-400"
                      : "text-gray-500 hover:text-white hover:bg-gray-800"
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
                  className="text-gray-400 leading-relaxed text-lg"
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
              className="inline-block px-4 py-1 rounded-full bg-gray-900 border border-gray-800 text-sm font-medium text-gray-400 mb-4"
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
              The{" "}
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-white"
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
                Timeline
              </motion.span>
            </motion.h2>
          </div>

          <div className="relative border-l-2 border-gray-700 pl-10 ml-6 space-y-16">
            {[
              {
                year: "2010",
                title: "Our Beginning",
                content: "Started with a small team creating a unique space where art and creativity could coexist.",
              },
              {
                year: "2015",
                title: "Expansion",
                content: "Expanded to a larger location with dedicated space for events and collaborations.",
              },
              {
                year: "2018",
                title: "Recognition",
                content: "Began our international program and expanded our partnerships across the city.",
              },
              {
                year: "2023",
                title: "New Era",
                content: "Celebrated our growth with a new flagship studio featuring state-of-the-art equipment.",
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
                  className="absolute -left-[3.25rem] mt-1.5 h-10 w-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-white font-bold">{index + 1}</span>
                </motion.div>
                <motion.div
                  className="bg-gray-900 p-8 rounded-2xl border border-gray-800 shadow-xl relative overflow-hidden group"
                  whileHover={{ y: -5, x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-gray-800/10 to-gray-700/5 opacity-0 group-hover:opacity-100"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  <motion.div
                    className="inline-block px-3 py-1 rounded-full bg-gray-800/20 text-gray-400 text-sm font-medium mb-4 relative z-10"
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
                  <p className="text-gray-400 mb-4 leading-relaxed relative z-10">{item.content}</p>

                  <motion.div
                    className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-gray-700/10 to-transparent opacity-0 group-hover:opacity-100"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
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
              className="inline-block px-4 py-1 rounded-full bg-gray-900 border border-gray-800 text-sm font-medium text-gray-400 mb-4"
              variants={scaleIn}
              transition={{ duration: 0.5 }}
            >
              What We Offer
            </motion.div>
            <motion.h2
              className="text-4xl md:text-5xl font-bold"
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Our{" "}
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-white"
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
                Services
              </motion.span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Custom Design",
                description: "Personalized designs created to reflect your unique story and aesthetic preferences.",
                icon: <Palette className="w-10 h-10 text-gray-300" />,
              },
              {
                title: "Event Production",
                description:
                  "Full-service event management handling everything from venue selection to technical production.",
                icon: <Music className="w-10 h-10 text-gray-300" />,
              },
              {
                title: "Artist Collaborations",
                description:
                  "Regular programs featuring guest artists from around the world, bringing fresh styles and techniques.",
                icon: <Zap className="w-10 h-10 text-gray-300" />,
              },
              {
                title: "Creative Curation",
                description: "Themed events and showcases that highlight emerging talent alongside established acts.",
                icon: <Sparkles className="w-10 h-10 text-gray-300" />,
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                className="bg-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-800 flex items-start gap-6 group hover:bg-gray-900/80 transition-colors duration-300 relative overflow-hidden"
                variants={index % 2 === 0 ? fadeInLeft : fadeInRight}
                custom={index}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
                  transition: { duration: 0.3 },
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-gray-800/10 to-gray-700/5 opacity-0 group-hover:opacity-100"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />

                <motion.div
                  className="bg-gradient-to-br from-gray-700 to-gray-800 p-4 rounded-2xl shadow-lg relative z-10"
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
                  <p className="text-gray-400 mb-4">{service.description}</p>
                  <motion.button
                    className="text-gray-300 flex items-center gap-2 text-sm font-medium group/btn"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    
                   
                  </motion.button>
                </div>

                <motion.div
                  className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-gray-700/10 to-transparent opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

       
        
      </div>
    </div>
  )
}


