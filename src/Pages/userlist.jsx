import React, { useEffect, useState } from "react";
import { getUsers, deleteUser, addUser, updateUser } from "../Utils/api";
import { Pencil, Trash2, Plus, Eye, EyeOff } from "lucide-react";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "", // Add role field
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
    // Validate the form fields
    if (
      !newUser.name ||
      !newUser.email ||
      !newUser.role || // Role must be selected
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
          role: newUser.role, // Update role
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
          role: newUser.role, // Send role when adding user
        });
        setUsers([...users, addedUser]);
      }
      setNewUser({ name: "", email: "", password: "", confirmPassword: "" });
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
      role: user.role, // Set the role for editing
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 bg-white min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">
        User List
      </h2>

      <div className="mb-6">
        {showForm ? (
          <div className="bg-gray-200 p-4 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">
              {isEditing ? "Edit User" : "Add User"}
            </h3>
            {error && <div className="text-red-600 mb-4">{error}</div>}
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
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={newUser.password}
                    onChange={(e) =>
                      setNewUser({ ...newUser, password: e.target.value })
                    }
                    placeholder="Password"
                    className="w-full px-4 py-2 border rounded-md mb-4 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-2 flex items-center"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <div className="relative">
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
                    className="w-full px-4 py-2 border rounded-md mb-4 pr-10"
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
            <div className="flex justify-between">
              <button
                onClick={handleAddUser}
                className={`px-4 py-2 ${
                  isSubmitting ? "bg-gray-400" : "bg-black"
                } text-white rounded-md`}
                disabled={isSubmitting}
              >
                {isEditing ? "Update" : "Add"} User
              </button>
              <button
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
                className="px-4 py-2 bg-gray-300 text-black rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-black text-white rounded-md flex items-center"
          >
            <Plus size={20} className="mr-2" /> Add New User
          </button>
        )}
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-black text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                S.N
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Updated At
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-200 hover:bg-gray-100 transition duration-300"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(user.created_at)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(user.updated_at)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-600 hover:text-red-800 ml-4"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
