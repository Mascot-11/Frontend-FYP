"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import axios from "axios"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Subnav from "../components/subnavbar"

gsap.registerPlugin(ScrollTrigger)

const navItems = [
  { title: "Home", path: "/" },
  { title: "Gallery", path: "/gallery" },
  { title: "Artists", path: "/artists" },
  { title: "Appointment", path: "/appointment" },
  { title: "FAQs", path: "/faq" },
]

const IMAGES_PER_PAGE = 9

const TattooGallery = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [images, setImages] = useState([])
  const [displayedImages, setDisplayedImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const containerRef = useRef(null)
  const observerRef = useRef(null)
  const loadMoreRef = useRef(null)

  // Fetch all images initially
  useEffect(() => {
    axios
      .get(`${BASE_URL}/tattoo-gallery`)
      .then((response) => {
        const allImages = response.data
        setImages(allImages)
        setDisplayedImages(allImages.slice(0, IMAGES_PER_PAGE))
        setHasMore(allImages.length > IMAGES_PER_PAGE)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching images", error)
        toast.error("Failed to fetch images")
        setLoading(false)
      })
  }, [])

  // Load more images when user scrolls to bottom
  const loadMoreImages = useCallback(() => {
    if (loadingMore || !hasMore) return

    setLoadingMore(true)

    const nextPage = page + 1
    const startIndex = (nextPage - 1) * IMAGES_PER_PAGE
    const endIndex = nextPage * IMAGES_PER_PAGE

    // Simulate a delay to show loading state
    setTimeout(() => {
      const newImages = images.slice(startIndex, endIndex)
      setDisplayedImages((prev) => [...prev, ...newImages])
      setPage(nextPage)
      setHasMore(endIndex < images.length)
      setLoadingMore(false)
    }, 800)
  }, [loadingMore, hasMore, page, images])

  // Set up intersection observer for infinite scroll
  useEffect(() => {
    if (loading) return

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreImages()
      }
    }, options)

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    observerRef.current = observer

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [loading, hasMore, loadMoreImages])

  // Set up animations when images are loaded
  useEffect(() => {
    if (!loading && containerRef.current) {
      // Clear any existing ScrollTriggers
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())

      // Get all image containers
      const imageContainers = containerRef.current.querySelectorAll(".image-container")

      // Set up animations for each image
      imageContainers.forEach((container, index) => {
        // Determine if this is a left or right image based on column position
        // For a 3-column grid, indices 0, 3, 6, etc. are left column
        // Indices 2, 5, 8, etc. are right column
        const column = index % 3
        let xStart = 0

        if (column === 0) {
          // Left column - come from left
          xStart = -100
        } else if (column === 2) {
          // Right column - come from right
          xStart = 100
        }

        // Initial state - hidden and moved from appropriate direction
        gsap.set(container, {
          opacity: 0,
          x: xStart,
          y: 30,
        })

        // Create the reveal animation with a more delayed start
        gsap.to(container, {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 1.2, // Longer duration
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            start: "top bottom-=50", // Start animation when element is more visible
            end: "center center",
            toggleActions: "play none none none",
          },
          delay: 0.2 + index * 0.15, // More delay between elements
        })
      })
    }

    // Clean up all ScrollTriggers when component unmounts or changes
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [loading])

  return (
    <div className="min-h-screen bg-black text-white">
      <Subnav backButton={true} navItems={navItems} />
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
        <h1 className="text-5xl font-bold text-center mb-12">Tattoo Gallery</h1>

        {loading ? (
          <p className="text-center mt-6 text-xl">Loading images...</p>
        ) : (
          <>
            <div ref={containerRef} className="max-w-7xl mx-auto rounded-xl p-4 md:p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-auto gap-4">
                {displayedImages.map((image, index) => {
                  // Determine the grid span based on index for a more interesting layout
                  const spans = [
                    "md:col-span-2 md:row-span-2", // Large
                    "", // Small
                    "", // Small
                    "md:col-span-1 md:row-span-2", // Tall
                    "md:col-span-2 md:row-span-1", // Wide
                    "", // Small
                    "md:col-span-2 md:row-span-1", // Wide
                    "", // Small
                    "md:col-span-1 md:row-span-2", // Tall
                  ]

                  const spanClass = spans[index % spans.length]

                  return (
                    <div
                      key={image.id}
                      className={`relative rounded-xl overflow-hidden shadow-md ${spanClass} image-container`}
                    >
                      <div className="relative w-full h-full aspect-square">
                        <img
                          src={image.image_url || "/placeholder.svg"}
                          alt="Tattoo"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 p-3 text-white w-full ">
                          <p className="text-base font-medium">{image.description || "No description"}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Loading indicator and intersection observer target */}
              <div ref={loadMoreRef} className="mt-12 text-center">
                {loadingMore && (
                  <div className="flex justify-center items-center py-8">
                    <div className="w-8 h-8 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
                  </div>
                )}
                {!hasMore && displayedImages.length > 0 && (
                  <p className="text-gray-400 py-8">You have reached the end of the gallery</p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default TattooGallery

