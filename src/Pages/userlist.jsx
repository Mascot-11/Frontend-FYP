import { useEffect, useState } from "react";
import { getUsers, deleteUser, addUser, updateUser } from "../Utils/api";
import { Pencil, Trash2, Plus, Eye, EyeOff } from "lucide-react";

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

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await getUsers();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch users");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    if (
      !newUser.name ||
      !newUser.email ||
      !newUser.role ||
      (!isEditing && (!newUser.password || !newUser.confirmPassword))
    ) {
      setError("All fields are required");
      return;
    }

    if (!isEditing && newUser.password !== newUser.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setIsSubmitting(true);
      if (isEditing) {
        const updatedUser = await updateUser(editUser.id, {
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        });
        setUsers(
          users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
        );
      } else {
        const addedUser = await addUser({
          name: newUser.name,
          email: newUser.email,
          password: newUser.password,
          password_confirmation: newUser.confirmPassword,
          role: newUser.role,
        });
        setUsers([...users, addedUser]);
      }
      setNewUser({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
      });
      setIsSubmitting(false);
      setShowForm(false);
      setIsEditing(false);
      setError(null);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          `Failed to ${isEditing ? "update" : "add"} user`
      );
      setIsSubmitting(false);
    }
  };

  const handleEditUser = (user) => {
    setIsEditing(true);
    setEditUser(user);
    setNewUser({
      name: user.name,
      email: user.email,
      password: "",
      confirmPassword: "",
      role: user.role,
    });
    setShowForm(true);
  };

  const handleDeleteUser = async (id) => {
    try {
      setIsSubmitting(true);
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
      setIsSubmitting(false);
    } catch (err) {
      setError("Failed to delete user");
      setIsSubmitting(false);
    }
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-sm border">
      {/* Card Header */}
      <div className="px-6 py-4 border-b flex items-center justify-between">
        <h2 className="text-2xl font-semibold">User List</h2>
        <Button onClick={() => setShowForm(true)} disabled={showForm}>
          <Plus className="w-4 h-4 mr-2" /> Add New User
        </Button>
      </div>

      {/* Card Content */}
      <div className="p-6">
        {error && (
          <div className="bg-red-500 text-white p-3 mb-4 rounded">
            <p>{error}</p>
          </div>
        )}

        {showForm && (
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <h3 className="text-xl font-semibold mb-4">
              {isEditing ? "Edit User" : "Add User"}
            </h3>
            <input
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              placeholder="Name"
              className="w-full px-4 py-2 border rounded-md mb-4"
            />
            <input
              type="email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-md mb-4"
            />
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="w-full px-4 py-2 border rounded-md mb-4"
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="tattoo_artist">Tattoo Artist</option>
            </select>
            {!isEditing && (
              <>
                <div className="relative mb-4">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={newUser.password}
                    onChange={(e) =>
                      setNewUser({ ...newUser, password: e.target.value })
                    }
                    placeholder="Password"
                    className="w-full px-4 py-2 border rounded-md pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <div className="relative mb-4">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={newUser.confirmPassword}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        confirmPassword: e.target.value,
                      })
                    }
                    placeholder="Confirm Password"
                    className="w-full px-4 py-2 border rounded-md pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </>
            )}
            <div className="flex justify-end space-x-2">
              <Button
                variant="secondary"
                onClick={() => {
                  setShowForm(false);
                  setIsEditing(false);
                  setNewUser({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    role: "",
                  });
                  setError(null);
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleAddUser} disabled={isSubmitting}>
                {isEditing ? "Update" : "Add"} User
              </Button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-black"></div>
          </div>
        ) : users.length === 0 ? (
          <p className="text-gray-600 text-center p-8">No users available.</p>
        ) : (
          <div className="relative overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-black text-white">
                  <th className="text-left p-3 font-medium">S.N</th>
                  <th className="text-left p-3 font-medium">NAME</th>
                  <th className="text-left p-3 font-medium">EMAIL</th>
                  <th className="text-left p-3 font-medium">ROLE</th>
                  <th className="text-left p-3 font-medium">CREATED AT</th>
                  <th className="text-left p-3 font-medium">UPDATED AT</th>
                  <th className="text-left p-3 font-medium">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={user.id}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">
                      <span
                        className={`inline-block px-2 py-1 rounded text-sm ${
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-800"
                            : user.role === "tattoo_artist"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="p-3">{formatDate(user.created_at)}</td>
                    <td className="p-3">{formatDate(user.updated_at)}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="secondary"
                          size="icon"
                          onClick={() => handleEditUser(user)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="bg-gray-200 hover:bg-gray-300"
                          onClick={() => handleDeleteUser(user.id)}
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

export default UserList;
