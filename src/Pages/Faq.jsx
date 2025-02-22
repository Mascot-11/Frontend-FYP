import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image, Users, ChevronUp, ChevronDown } from "lucide-react";
import Header from "../components/subnavbar";

export default function FAQ() {
  const [activeTattooFaq, setActiveTattooFaq] = useState(null);
  const [activeMuralFaq, setActiveMuralFaq] = useState(null);

  const navItems = [
    { title: "Tattoo", path: "/tatto", icon: Image },
    { title: "Gallery", path: "/gallery", icon: Image },
    { title: "Artists", path: "/artists", icon: Users },
    { title: "Appointment", path: "/appointment", icon: Users },
    { title: "FAQs", path: "/faq", icon: Users },
  ];

  const tattooFaqs = [
    {
      question: "How painful is getting a tattoo?",
      answer:
        "Pain levels vary depending on the individual and the location of the tattoo. Generally, areas with more flesh tend to be less painful than bonier areas.",
    },
    {
      question: "How long does a tattoo take to heal?",
      answer:
        "The initial healing process typically takes 2-3 weeks, but complete healing can take up to 6 months. Proper aftercare is crucial during this time.",
    },
    {
      question: "Can I get a tattoo if I have sensitive skin?",
      answer:
        "It's possible, but you should consult with a professional tattoo artist and possibly a dermatologist before proceeding. They can advise on potential risks and precautions.",
    },
    {
      question: "How much does a tattoo typically cost?",
      answer:
        "Tattoo prices vary widely based on size, complexity, and the artist's experience. Small, simple tattoos might cost around $50-$200, while larger, more complex pieces can cost thousands.",
    },
  ];

  const musicEventFaqs = [
    {
      question: "How can I buy tickets for a music event?",
      answer:
        "You can buy tickets for our music events through our website or authorized ticketing partners. Simply choose the event and follow the instructions to purchase your tickets.",
    },
    {
      question: "Are tickets refundable?",
      answer:
        "Tickets are generally non-refundable. However, in case of event cancellation, we will offer a refund or an alternative date, depending on the circumstances.",
    },
    {
      question: "Can I transfer my ticket to someone else?",
      answer:
        "Yes, you can transfer your ticket to someone else as long as the event allows it. Please check the event's specific policies on ticket transfers before doing so.",
    },
    {
      question: "What happens if I lose my ticket?",
      answer:
        "If you lose your ticket, please contact our customer support immediately. We may be able to issue a replacement depending on the event's ticketing system.",
    },
    {
      question: "Are there age restrictions for attending music events?",
      answer:
        "Age restrictions vary by event. Please check the event details for age-related information. Some events may be 18+ or have specific age requirements.",
    },
  ];

  const toggleTattooFaq = (index) => {
    setActiveTattooFaq(activeTattooFaq === index ? null : index);
  };

  const toggleMuralFaq = (index) => {
    setActiveMuralFaq(activeMuralFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 filter grayscale">
      {/* Hero Section */}
      <Header navItems={navItems} />
      <motion.section
        className="relative h-[40vh] flex items-center justify-center overflow-hidden"
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
        <div className="relative z-10 text-center">
          <motion.h1
            className="text-5xl font-bold mb-4 text-white"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            className="text-xl text-white"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
          >
            Find answers to common questions about tattoos and music events
          </motion.p>
        </div>
      </motion.section>

      {/* Grayscale Wrapper */}
      <div className="grayscale">
        <div className="container mx-auto px-4 py-16">
          {/* Tattoo FAQ Section */}
          <motion.section
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Tattoo FAQs</h2>
            <div className="space-y-4">
              {tattooFaqs.map((faq, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.3, duration: 0.6 }}
                >
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                    onClick={() => toggleTattooFaq(index)}
                  >
                    <span className="font-semibold">{faq.question}</span>
                    {activeTattooFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  <AnimatePresence>
                    {activeTattooFaq === index && (
                      <motion.div
                        initial={{ maxHeight: 0, opacity: 0 }}
                        animate={{ maxHeight: 500, opacity: 1 }}
                        exit={{ maxHeight: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="px-6 py-4 bg-gray-50 dark:bg-gray-700 overflow-hidden"
                      >
                        <p>{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Mural FAQ Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center">
              Music Events FAQs
            </h2>
            <div className="space-y-4">
              {musicEventFaqs.map((faq, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.3, duration: 0.6 }}
                >
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                    onClick={() => toggleMuralFaq(index)}
                  >
                    <span className="font-semibold">{faq.question}</span>
                    {activeMuralFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  <AnimatePresence>
                    {activeMuralFaq === index && (
                      <motion.div
                        initial={{ maxHeight: 0, opacity: 0 }}
                        animate={{ maxHeight: 500, opacity: 1 }}
                        exit={{ maxHeight: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="px-6 py-4 bg-gray-50 dark:bg-gray-700 overflow-hidden"
                      >
                        <p>{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
