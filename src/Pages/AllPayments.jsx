import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const AllPayments = () => {
  const [payments, setPayments] = useState([]);
  const [events, setEvents] = useState({});
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPaymentsAndEvents = async () => {
      try {
        const token = localStorage.getItem("auth_token");

        // Fetch all payments
        const paymentsResponse = await axios.get("http://127.0.0.1:8000/api/payments/all", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Add a small delay to make the loading animation visible
        setTimeout(() => {
          setPayments(paymentsResponse.data.payments);
        }, 500);

        // Fetch all events
        const eventsResponse = await axios.get("http://127.0.0.1:8000/api/events");
        const eventMap = {};
        eventsResponse.data.forEach((event) => {
          eventMap[event.id] = event.name;
        });
        setEvents(eventMap);
      } catch (error) {
        console.error("Error fetching data:", error.response?.data || error.message);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 800);
      }
    };

    fetchPaymentsAndEvents();
  }, []);

  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Sort payments based on current sort order
  const getSortedPayments = () => {
    if (!payments.length) return [];

    const filtered = searchTerm
      ? payments.filter(
          (payment) =>
            (payment.user?.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (events[payment.event_id] || "").toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [...payments];

    return filtered.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();

      if (sortOrder === "newest") {
        return dateB - dateA;
      } else if (sortOrder === "oldest") {
        return dateA - dateB;
      } else if (sortOrder === "highest") {
        return b.total_amount - a.total_amount;
      } else if (sortOrder === "lowest") {
        return a.total_amount - b.total_amount;
      }
      return 0;
    });
  };

  // Skeleton loading component
  const SkeletonCard = () => (
    <div className="w-full border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-4 space-y-3">
        <div className="h-5 w-1/3 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 max-w-4xl mx-auto"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl font-bold mb-2">All Payments</h1>
        {!loading && <p className="text-lg text-gray-600">{getSortedPayments().length} payment records found</p>}
      </motion.div>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between"
        >
          <div className="w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search by user or event..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
          <div className="w-full md:w-auto">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black bg-white"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest Amount</option>
              <option value="lowest">Lowest Amount</option>
            </select>
          </div>
        </motion.div>
      )}

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {getSortedPayments().length > 0 ? (
              getSortedPayments().map((payment, index) => (
                <motion.div
                  key={payment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  whileHover={{ scale: 1.01 }}
                  className="w-full"
                >
                  <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300 bg-white">
                    <div className="p-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-bold text-lg mb-2">{events[payment.event_id] || "Unknown Event"}</h3>
                          <p className="text-gray-700 mb-1">
                            <span className="font-semibold">User:</span> {payment.user?.name || "Unknown User"}
                          </p>
                          <p className="text-gray-700 mb-1">
                            <span className="font-semibold">Quantity:</span> {payment.quantity}
                          </p>
                        </div>
                        <div className="flex flex-col justify-between">
                          <div>
                            <p className="text-gray-700 mb-1">
                              <span className="font-semibold">Payment Method:</span> {payment.payment_method}
                            </p>
                            <p className="text-gray-700 mb-1">
                              <span className="font-semibold">Date:</span> {formatDate(payment.created_at)}
                            </p>
                          </div>
                          <div className="mt-2">
                            <p className="text-xl font-bold">Rs. {payment.total_amount}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-12 border border-gray-200 rounded-lg"
              >
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5"
                  />
                </svg>
                <p className="mt-2 text-xl font-semibold text-gray-500">No payments found</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
};

export default AllPayments;
