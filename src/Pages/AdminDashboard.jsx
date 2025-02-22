import { useEffect, useState } from "react";
import PropTypes from "prop-types";

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
  Users,
  Calendar,
  Image as ImageIcon,
  MessageCircle,
  Brush,
} from "lucide-react";
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
  const [setShowModal] = useState(false);

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

  const chartColors = {
    primary: "#8b5cf6",
    secondary: "#ec4899",
    tertiary: "#06b6d4",
    quaternary: "#f59e0b",
    accent1: "#22c55e",
    accent2: "#ef4444",
    background: "#111827",
    cardBg: "#ffffff",
    text: "#f3f4f6",
    muted: "#9ca3af",
  };

  const pieColors = ["#8b5cf6", "#ec4899", "#06b6d4", "#f59e0b", "#22c55e"];

  const pieData = [
    { name: "Confirmed", value: stats.appointmentStatus.confirmed },
    { name: "Pending", value: stats.appointmentStatus.pending },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <ClimbingBoxLoader color={chartColors.primary} size={30} />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-8"
        >
          <h1 className="text-3xl font-bold text-gray-100 mb-8">
            Dashboard Overview
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <StatsCard
              title="Total Users"
              value={stats.totalUsers}
              icon={<Users className="w-6 h-6" />}
              color={chartColors.primary}
            />
            <StatsCard
              title="Appointments"
              value={stats.totalAppointments}
              icon={<Calendar className="w-6 h-6" />}
              color={chartColors.secondary}
            />
            <StatsCard
              title="Gallery Items"
              value={stats.totalImages}
              icon={<ImageIcon className="w-6 h-6" />}
              color={chartColors.tertiary}
            />
            <StatsCard
              title="Active Chats"
              value={stats.ongoingChats}
              icon={<MessageCircle className="w-6 h-6" />}
              color={chartColors.quaternary}
            />
            <StatsCard
              title="Artists"
              value={stats.totalArtists}
              icon={<Brush className="w-6 h-6" />}
              color={chartColors.accent1}
              onClick={() => setShowModal(true)}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-6">
                User Growth
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={stats.userRegistrations}>
                  <XAxis
                    dataKey="date"
                    stroke={chartColors.muted}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis stroke={chartColors.muted} tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "none",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="registrations"
                    stroke={chartColors.primary}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-6">
                Appointment Status
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    innerRadius={60}
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={pieColors[index % pieColors.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "none",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    iconType="circle"
                  />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-6">
                Artist Performance
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats.artistsPopularity}>
                  <XAxis
                    dataKey="artistName"
                    stroke={chartColors.muted}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis stroke={chartColors.muted} tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "none",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Bar dataKey="appointments" radius={[4, 4, 0, 0]}>
                    {stats.artistsPopularity.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={pieColors[index % pieColors.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const StatsCard = ({ title, value, icon, color, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow duration-300"
      onClick={onClick}
    >
      <div className="flex items-center space-x-4">
        <div
          className="p-3 rounded-xl"
          style={{ backgroundColor: `${color}15` }}
        >
          <div style={{ color }}>{icon}</div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
      </div>
    </motion.div>
  );
};
StatsCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  icon: PropTypes.node.isRequired,
  color: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Dashboard;
