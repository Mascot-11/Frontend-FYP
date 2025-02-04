import { useEffect, useState } from "react";
import axios from "axios";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";

import {
  FaUsers,
  FaClipboardList,
  FaImages,
  FaComments,
  FaPaintBrush,
} from "react-icons/fa";
import { ClimbingBoxLoader } from "react-spinners";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAppointments: 0,
    pendingAppointments: 0,
    totalImages: 0,
    ongoingChats: 0,
    appointmentStatus: [],
    appointmentsByDate: [],
    userRegistrations: [],
    totalArtists: 0,
    artistsData: [],
    pendingAppointmentsByDate: [],
    artistsPopularity: [],
  });

  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      const authToken = localStorage.getItem("auth_token");

      if (!authToken) {
        console.error("No authentication token found");
        return;
      }

      try {
        const headers = {
          Authorization: `Bearer ${authToken}`,
        };

        const users = await axios.get("http://127.0.0.1:8000/api/users", {
          headers,
        });
        const appointments = await axios.get(
          "http://127.0.0.1:8000/api/appointments",
          { headers }
        );
        const gallery = await axios.get(
          "http://127.0.0.1:8000/api/tattoo-gallery",
          { headers }
        );
        const chats = await axios.get("http://127.0.0.1:8000/api/chats", {
          headers,
        });
        const artists = await axios.get("http://127.0.0.1:8000/api/artists", {
          headers,
        });

        const appointmentStatus = appointments.data.reduce(
          (acc, appointment) => {
            if (appointment.status === "confirmed") {
              acc.confirmed += 1;
            } else if (appointment.status === "pending") {
              acc.pending += 1;
            } else {
              acc.completed += 1;
            }
            return acc;
          },
          { confirmed: 0, pending: 0, completed: 0 }
        );

        const appointmentsByDate = appointments.data.map((appointment) => ({
          date: appointment.created_at.split("T")[0],
          appointments: 1,
        }));

        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
        const userRegistrations = users.data
          .filter((user) => new Date(user.created_at) > threeMonthsAgo)
          .reduce((acc, user) => {
            const date = user.created_at.split("T")[0];
            acc[date] = (acc[date] || 0) + 1;
            return acc;
          }, {});

        const formattedUserRegistrations = Object.keys(userRegistrations).map(
          (date) => ({
            date,
            registrations: userRegistrations[date],
          })
        );

        const pendingAppointmentsByDate = appointments.data
          .filter((appointment) => appointment.status === "pending")
          .map((appointment) => ({
            date: appointment.created_at.split("T")[0],
            appointments: 1,
          }));

        const artistsPopularity = appointments.data.reduce(
          (acc, appointment) => {
            const artistId = appointment.artist_id;
            if (!acc[artistId]) acc[artistId] = 0;
            acc[artistId]++;
            return acc;
          },
          {}
        );

        const formattedArtistsPopularity = Object.keys(artistsPopularity).map(
          (artistId) => {
            const artist = artists.data.find(
              (a) => a.id === parseInt(artistId)
            );
            return {
              artistName: artist ? artist.name : `Artist ${artistId}`,
              appointments: artistsPopularity[artistId],
            };
          }
        );

        setStats({
          totalUsers: users.data.length,
          totalAppointments: appointments.data.length,
          pendingAppointments: appointments.data.filter(
            (a) => a.status === "pending"
          ).length,
          totalImages: gallery.data.length,
          ongoingChats: chats.data.length,
          appointmentStatus,
          appointmentsByDate,
          userRegistrations: formattedUserRegistrations,
          totalArtists: artists.data.length,
          artistsData: artists.data,
          pendingAppointmentsByDate,
          artistsPopularity: formattedArtistsPopularity,
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching stats", error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const chartColors = ["#4CAF50", "#2196F3", "#FFC107", "#E91E63", "#9C27B0"];

  const pieData = [
    { name: "Confirmed", value: stats.appointmentStatus.confirmed },
    { name: "Pending", value: stats.appointmentStatus.pending },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <ClimbingBoxLoader color="#000" size={50} />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <StatsCard
                title="Total Users"
                value={stats.totalUsers}
                icon={<FaUsers />}
                color="#4CAF50"
              />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <StatsCard
                title="Appointments"
                value={stats.totalAppointments}
                icon={<FaClipboardList />}
                color="#2196F3"
              />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <StatsCard
                title="Gallery Items"
                value={stats.totalImages}
                icon={<FaImages />}
                color="#FFC107"
              />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <StatsCard
                title="Active Chats"
                value={stats.ongoingChats}
                icon={<FaComments />}
                color="#E91E63"
              />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <StatsCard
                title="Tattoo Artists"
                value={stats.totalArtists}
                icon={<FaPaintBrush />}
                color="#9C27B0"
                onClick={() => setShowModal(true)}
              />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm p-4"
            >
              <h2 className="text-lg font-medium mb-6">
                User Registrations (Last 3 Months)
              </h2>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={stats.userRegistrations}>
                  <XAxis dataKey="date" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="registrations"
                    stroke="#2563eb"
                    strokeWidth={2}
                    dot={false}
                    animationDuration={2000}
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-sm p-4"
            >
              <h2 className="text-lg font-medium mb-6">Appointment Status</h2>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    animationDuration={2000}
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={chartColors[index % chartColors.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-sm p-4"
            >
              <h2 className="text-lg font-medium mb-6">Artist Popularity</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats.artistsPopularity}>
                  <XAxis dataKey="artistName" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="appointments" fill="#2563eb" />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;

const StatsCard = ({ title, value, icon, color, onClick }) => {
  return (
    <div
      className={`bg-white p-6 rounded-xl shadow-md hover:shadow-lg cursor-pointer transition-all duration-300 ${color}`}
      onClick={onClick}
    >
      <div className="flex items-center">
        <div
          className="w-12 h-12 bg-white flex justify-center items-center rounded-full shadow-md mr-4"
          style={{ backgroundColor: color }}
        >
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
};
