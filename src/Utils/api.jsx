import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000"; // Update with your backend base URL
const AUTH_TOKEN_KEY = "auth_token";

// Create axios instance
const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  withCredentials: true, // Ensure credentials (cookies) are included in requests
});

// Helper function to get the authorization headers
const getAuthHeaders = () => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Fetch CSRF token
const getCSRFToken = async () => {
  try {
    await axios.get(`${BASE_URL}/sanctum/csrf-cookie`, {
      withCredentials: true,
    });
  } catch (error) {
    console.error("CSRF cookie error:", error);
    throw new Error("Failed to fetch CSRF token");
  }
};

// Set up default axios config to include cookies in each request
axios.defaults.withCredentials = true; // This ensures cookies are included in each request

// Login function// Login function
// Login function
// login function
export const login = async (credentials) => {
  try {
    // Log the credentials to make sure it's what you expect
    console.log("Logging in with credentials:", credentials);

    await getCSRFToken(); // Ensure CSRF token is set before making login request

    const response = await axios.post(`${BASE_URL}/api/login`, credentials);

    const { access_token } = response.data;
    if (access_token) {
      localStorage.setItem(AUTH_TOKEN_KEY, access_token);
      localStorage.setItem("user_role", user.role); // Store user role
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const register = async (userData) => {
  try {
    await getCSRFToken(); // Ensure CSRF token is set before making register request

    const response = await axios.post(`${BASE_URL}/api/register`, userData);

    // Store the token in localStorage (you can also use sessionStorage)
    const { access_token } = response.data;

    if (access_token) {
      localStorage.setItem(AUTH_TOKEN_KEY, access_token);
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const logout = async (setIsUserLoggedIn) => {
  try {
    await getCSRFToken();
    await api.post("/logout");
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setIsUserLoggedIn(false);
  } catch (error) {
    console.error("Logout error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// Password reset functions
export const forgotPassword = async (email) => {
  try {
    const response = await api.post("/forgot/password", { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Unable to send reset link." };
  }
};

export const resetPassword = async (data) => {
  try {
    const response = await api.post("/password/reset", data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to reset password." };
  }
};

// Helper function to get the token from localStorage
export const getauth_token = () => {
  const token = localStorage.getItem("auth_token");
  return token ? token : null; // Ensure null is returned if no token exists
};

// Helper function to check if the user is logged in
export const isLoggedIn = () => {
  const token = getauth_token();
  return token ? true : false; // Return true if token exists, otherwise false
};
export const isAuthenticated = () => {
  return localStorage.getItem("auth_token") !== null;
};

/**
 * Fetch all users from the backend API
 *
 * @returns {Promise<Array<object>>} An array of user objects
 * @throws {Error} If there is an error fetching users
 */
export const getUsers = async () => {
  try {
    const token = localStorage.getItem("auth_token");
    const response = await axios.get(`${BASE_URL}/api/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // Return the users array from the API response
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error.response?.data || error.message;
  }
};

// add a user
export const addUser = async (userData) => {
  try {
    const token = localStorage.getItem("auth_token");
    const response = await axios.post(`${BASE_URL}/api/users`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error adding user:",
      error.response ? error.response.data : error.message
    );
    throw error.response?.data || error.message;
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const token = localStorage.getItem("auth_token");
    const response = await axios.put(
      `${BASE_URL}/api/users/${userId}`,
      userData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error updating user:",
      error.response ? error.response.data : error.message
    );
    throw error.response?.data || error.message;
  }
};

export const deleteUser = async (userId) => {
  try {
    const token = localStorage.getItem("auth_token");
    const response = await axios.delete(`${BASE_URL}/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting user:",
      error.response ? error.response.data : error.message
    );
    throw error.response?.data || error.message;
  }
};

// Appointment functions
export const bookAppointment = async (appointmentData) => {
  try {
    const response = await api.post("/appointments", appointmentData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

export const fetchAppointments = async () => {
  try {
    const response = await api.get("/appointments", {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

export const updateAppointmentStatus = async (id, status) => {
  try {
    const response = await api.put(
      `/appointments/${id}/status`,
      { status },
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

export const deleteAppointment = async (id) => {
  try {
    const response = await api.delete(`/appointments/${id}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};
