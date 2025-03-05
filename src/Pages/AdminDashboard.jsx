"use client"

import { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { format, isAfter, startOfToday } from "date-fns"

import axios from "axios"
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
} from "recharts"
import { Users, Calendar, ImageIcon, MessageCircle, Brush } from "lucide-react"
import { ClimbingBoxLoader } from "react-spinners"
import { motion } from "framer-motion"

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
    totalActiveEvents: 0,
    events: [],
  })

  const [loading, setLoading] = useState(true)
  const [setShowModal] = useState(false)

  useEffect(() => {
    const fetchStats = async () => {
      const authToken = localStorage.getItem("auth_token")

      if (!authToken) {
        console.error("No authentication token found")
        return
      }

      try {
        const headers = {
          Authorization: `Bearer ${authToken}`,
        }

        const users = await axios.get("http://127.0.0.1:8000/api/users", {
          headers,
        })
        const appointments = await axios.get("http://127.0.0.1:8000/api/appointments", { headers })
        const gallery = await axios.get("http://127.0.0.1:8000/api/tattoo-gallery", { headers })
        const chats = await axios.get("http://127.0.0.1:8000/api/chats", {
          headers,
        })
        const artists = await axios.get("http://127.0.0.1:8000/api/artists", {
          headers,
        })
        const events = await axios.get("http://127.0.0.1:8000/api/events", { headers })

        const appointmentStatus = appointments.data.reduce(
          (acc, appointment) => {
            if (appointment.status === "confirmed") {
              acc.confirmed += 1
            } else if (appointment.status === "pending") {
              acc.pending += 1
            } else {
              acc.completed += 1
            }
            return acc
          },
          { confirmed: 0, pending: 0, completed: 0 },
        )

        const appointmentsByDate = appointments.data.map((appointment) => ({
          date: appointment.created_at.split("T")[0],
          appointments: 1,
        }))

        const threeMonthsAgo = new Date()
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)
        const userRegistrations = users.data
          .filter((user) => new Date(user.created_at) > threeMonthsAgo)
          .reduce((acc, user) => {
            const date = user.created_at.split("T")[0]
            acc[date] = (acc[date] || 0) + 1
            return acc
          }, {})

        const formattedUserRegistrations = Object.keys(userRegistrations).map((date) => ({
          date,
          registrations: userRegistrations[date],
        }))

        const pendingAppointmentsByDate = appointments.data
          .filter((appointment) => appointment.status === "pending")
          .map((appointment) => ({
            date: appointment.created_at.split("T")[0],
            appointments: 1,
          }))

        const artistsPopularity = appointments.data.reduce((acc, appointment) => {
          const artistId = appointment.artist_id
          if (!acc[artistId]) acc[artistId] = 0
          acc[artistId]++
          return acc
        }, {})

        const formattedArtistsPopularity = Object.keys(artistsPopularity).map((artistId) => {
          const artist = artists.data.find((a) => a.id === Number.parseInt(artistId))
          return {
            artistName: artist ? artist.name : `Artist ${artistId}`,
            appointments: artistsPopularity[artistId],
          }
        })

        // Filter events to only include current and future events
        const today = startOfToday()
        const activeEvents = events.data.filter((event) => {
          const eventDate = new Date(event.date || event.event_date)
          return isAfter(eventDate, today) || format(eventDate, "yyyy-MM-dd") === format(today, "yyyy-MM-dd")
        })

        setStats({
          totalUsers: users.data.length,
          totalAppointments: appointments.data.length,
          pendingAppointments: appointments.data.filter((a) => a.status === "pending").length,
          totalImages: gallery.data.length,
          ongoingChats: chats.data.length,
          appointmentStatus,
          appointmentsByDate,
          userRegistrations: formattedUserRegistrations,
          totalArtists: artists.data.length,
          artistsData: artists.data,
          pendingAppointmentsByDate,
          artistsPopularity: formattedArtistsPopularity,
          totalActiveEvents: activeEvents.length,
          events: activeEvents,
        })

        setLoading(false)
      } catch (error) {
        console.error("Error fetching stats", error)
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  
  const pieData = [
    { name: "Confirmed", value: stats.appointmentStatus.confirmed },
    { name: "Pending", value: stats.appointmentStatus.pending },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <ClimbingBoxLoader color="#000000" size={30} />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">Dashboard Overview</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatsCard
              title="Total Users"
              value={stats.totalUsers}
              icon={<Users className="w-8 h-8" />}
              color="#000000"
            />
            <StatsCard
              title="Appointments"
              value={stats.totalAppointments}
              icon={<Calendar className="w-8 h-8" />}
              color="#000000"
            />
            <StatsCard
              title="Gallery Items"
              value={stats.totalImages}
              icon={<ImageIcon className="w-8 h-8" />}
              color="#000000"
            />
            <StatsCard
              title="Active Chats"
              value={stats.ongoingChats}
              icon={<MessageCircle className="w-8 h-8" />}
              color="#000000"
            />
            <StatsCard
              title="Artists"
              value={stats.totalArtists}
              icon={<Brush className="w-8 h-8" />}
              color="#000000"
              onClick={() => setShowModal(true)}
            />
            <StatsCard
              title="Active Events"
              value={stats.totalActiveEvents}
              icon={<Calendar className="w-8 h-8" />}
              color="#000000"
            />
          </div>

          {stats.events.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Events</h2>
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Event Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Price
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {stats.events.slice(0, 5).map((event, index) => (
                        <tr key={event.id || index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {event.name || event.title}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {format(new Date(event.date || event.event_date), "MMM dd, yyyy")}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            NPR {event.price || event.ticket_price || "Free"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Active
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-6">User Growth</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={stats.userRegistrations}>
                  <XAxis dataKey="date" stroke="#6b7280" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
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
                    stroke="#000000"
                    strokeWidth={2}
                    dot={{ fill: "#000000", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Appointment Status</h2>
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
                      <Cell key={`cell-${index}`} fill={index === 0 ? "#000000" : "#9CA3AF"} />
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
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Artist Performance</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats.artistsPopularity}>
                  <XAxis dataKey="artistName" stroke="#6b7280" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "none",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Bar dataKey="appointments" fill="#000000" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

const StatsCard = ({ title, value, icon, color, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl shadow-sm p-8 cursor-pointer hover:shadow-md transition-shadow duration-300"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-4 rounded-xl" style={{ backgroundColor: `${color}10` }}>
          <div style={{ color }}>{icon}</div>
        </div>
        <p className="text-4xl font-bold text-gray-800">{value}</p>
      </div>
      <p className="text-lg font-medium text-gray-500">{title}</p>
    </motion.div>
  )
}
StatsCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  icon: PropTypes.node.isRequired,
  color: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

export default Dashboard

