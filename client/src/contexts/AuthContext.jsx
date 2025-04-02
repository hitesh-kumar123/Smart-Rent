import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if user is already logged in (via token in localStorage)
    const checkLoggedIn = async () => {
      if (localStorage.getItem("token")) {
        try {
          const res = await axios.get("/api/users/profile", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

          if (res.data) {
            // Explicitly set all user properties
            setCurrentUser({
              _id: res.data._id,
              username: res.data.username,
              email: res.data.email,
              firstName: res.data.firstName,
              lastName: res.data.lastName,
              role: res.data.role,
              profileImage: res.data.profileImage,
              referralCode: res.data.referralCode || "",
            });
            console.log("User session restored:", res.data);
          }
        } catch (err) {
          clearUserData();
          console.error("Session expired or invalid", err);
        }
      }
      setLoading(false);
    };

    checkLoggedIn();
  }, []);

  // Register a new user
  const register = async (userData) => {
    try {
      setError("");
      // Clear any existing user data first
      localStorage.removeItem("token");
      setCurrentUser(null);

      const res = await axios.post("/api/users/register", userData);

      if (res.data && res.data.token) {
        localStorage.setItem("token", res.data.token);
        // Explicitly set all user properties to ensure complete update
        setCurrentUser({
          _id: res.data._id,
          username: res.data.username,
          email: res.data.email,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          role: res.data.role,
          profileImage: res.data.profileImage,
          referralCode: res.data.referralCode || "",
        });
        console.log("New user registered:", res.data);
      }

      return { success: true, data: res.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Registration failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      setError("");
      // Clear any existing user data first
      localStorage.removeItem("token");
      setCurrentUser(null);

      const res = await axios.post("/api/users/login", { email, password });

      if (res.data && res.data.token) {
        localStorage.setItem("token", res.data.token);
        // Explicitly set all user properties to ensure complete update
        setCurrentUser({
          _id: res.data._id,
          username: res.data.username,
          email: res.data.email,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          role: res.data.role,
          profileImage: res.data.profileImage,
          referralCode: res.data.referralCode || "",
        });
        console.log("User logged in:", res.data);
      }

      return { success: true, data: res.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Invalid credentials";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Clear all user data
  const clearUserData = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    setError("");
  };

  // Logout user
  const logout = () => {
    clearUserData();
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      setError("");
      const res = await axios.put("/api/users/profile", userData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setCurrentUser(res.data);
      return { success: true, data: res.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Update failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Update password
  const updatePassword = async (passwordData) => {
    try {
      setError("");
      const res = await axios.put("/api/users/password", passwordData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      return { success: true, message: "Password updated successfully" };
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Password update failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const value = {
    currentUser,
    loading,
    error,
    register,
    login,
    logout,
    clearUserData,
    updateProfile,
    updatePassword,
    isAuthenticated: !!currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
