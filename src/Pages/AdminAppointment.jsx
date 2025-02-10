import { useState, useEffect } from "react";
import {  Trash2, CheckCircle, XCircle } from "lucide-react";
import {
  fetchAppointments,
  updateAppointmentStatus,
  deleteAppointment,
} from "../Utils/api";

// Custom Button Component
const Button = ({
  children,
  className = "",
  variant = "primary",
  size = "default",
  disabled = false,
  onClick,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50";
  const variants = {
    primary: "bg-black text-white hover:bg-gray-800",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-900",
  };
  const sizes = {
    default: "h-9 px-4 py-2",
    icon: "h-9 w-9",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAppointments();
        setAppointments(data);
      } catch (err) {
        setError(err.message || "Failed to fetch appointments.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await updateAppointmentStatus(id, status);
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment.id === id ? { ...appointment, status } : appointment
        )
      );
    } catch (err) {
      setError(err.message || "Failed to update appointment status.");
    }
  };

  const handleDeleteAppointment = async (id) => {
    try {
      await deleteAppointment(id);
      setAppointments((prev) =>
        prev.filter((appointment) => appointment.id !== id)
      );
    } catch (err) {
      setError(err.message || "Failed to delete appointment.");
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-sm border">
      {/* Card Header */}
      <div className="px-6 py-4 border-b flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Appointments List</h2>
      </div>

      {/* Card Content */}
      <div className="p-6">
        {error && (
          <div className="bg-red-500 text-white p-3 mb-4 rounded">
            <p>{error}</p>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-black"></div>
          </div>
        ) : appointments.length === 0 ? (
          <p className="text-gray-600 text-center p-8">
            No appointments available.
          </p>
        ) : (
          <div className="relative">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-black text-white">
                  <th className="text-left p-3 font-medium">S.N</th>
                  <th className="text-left p-3 font-medium">USER</th>
                  <th className="text-left p-3 font-medium">ARTIST</th>
                  <th className="text-left p-3 font-medium">DATE & TIME</th>
                  <th className="text-left p-3 font-medium">STATUS</th>
                  <th className="text-left p-3 font-medium">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment, index) => (
                  <tr
                    key={appointment.id}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{appointment.user.name}</td>
                    <td className="p-3">{appointment.artist.name}</td>
                    <td className="p-3">{appointment.appointment_datetime}</td>
                    <td className="p-3">
                      <span
                        className={`inline-block px-2 py-1 rounded text-sm ${
                          appointment.status === "confirmed"
                            ? "bg-green-100 text-green-800"
                            : appointment.status === "canceled"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        {/* Confirm Button */}
                        <Button
                          variant="secondary"
                          size="icon"
                          onClick={() =>
                            handleUpdateStatus(appointment.id, "confirmed")
                          }
                          disabled={
                            appointment.status === "confirmed" ||
                            appointment.status === "canceled"
                          }
                        >
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </Button>

                        {/* Cancel Button */}
                        <Button
                          variant="secondary"
                          size="icon"
                          onClick={() =>
                            handleUpdateStatus(appointment.id, "canceled")
                          }
                          disabled={
                            appointment.status === "canceled" ||
                            appointment.status === "confirmed"
                          }
                        >
                          <XCircle className="w-4 h-4 text-red-600" />
                        </Button>

                        {/* Delete Appointment Button */}
                        <Button
                          variant="secondary"
                          size="icon"
                          className="bg-gray-200 hover:bg-gray-300"
                          onClick={() =>
                            handleDeleteAppointment(appointment.id)
                          }
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAppointments;
