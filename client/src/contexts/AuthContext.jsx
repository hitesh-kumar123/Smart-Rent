import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Configure axios based on environment
// If running with Create React App proxy, this will work for development
const isLocalDev =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

if (isLocalDev) {
  // In local development, use relative URLs which will be proxied to the backend
  console.log("Running in local development mode - using proxy");
  axios.defaults.baseURL = ""; // Empty baseURL will use the proxy defined in package.json
} else {
  // In production, use the full URL to the backend
  console.log("Running in production mode - using remote backend");
  axios.defaults.baseURL = "https://srm-backend.onrender.com";
}

// Set axios to include credentials in requests
axios.defaults.withCredentials = true;

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

      console.log("Registering with data:", userData);
      const res = await axios.post("/api/users/register", userData);
      console.log("Registration response:", res.data);

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
      console.error("Registration error:", err);
      console.error("Response data:", err.response?.data);
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

      console.log("Logging in with:", { email });
      const res = await axios.post("/api/users/login", { email, password });
      console.log("Login response:", res.data);

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
      console.error("Login error:", err);
      console.error("Response data:", err.response?.data);
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

  // Update profile image
  const updateProfileImage = async (file) => {
    try {
      setError("");
      const formData = new FormData();
      formData.append("profileImage", file);

      console.log("Uploading profile image...");
      const res = await axios.post("/api/users/profile/image", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Profile image upload response:", res.data);

      if (res.data && res.data.profileImage) {
        // Add timestamp to force refresh of image
        const profileImageUrl = res.data.profileImage.includes("?")
          ? res.data.profileImage
          : `${res.data.profileImage}?t=${new Date().getTime()}`;

        console.log("Setting profile image to:", profileImageUrl);

        setCurrentUser((prevUser) => ({
          ...prevUser,
          profileImage: profileImageUrl,
        }));

        return { success: true, profileImage: profileImageUrl };
      } else {
        console.error("Invalid response format from server:", res.data);
        return { success: false, error: "Invalid response from server" };
      }
    } catch (err) {
      console.error("Error in updateProfileImage:", err);
      const errorMessage = err.response?.data?.message || "Image upload failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Remove profile image
  const removeProfileImage = async () => {
    try {
      setError("");
      const res = await axios.delete("/api/users/profile/image", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data && res.data.success) {
        setCurrentUser((prevUser) => ({
          ...prevUser,
          profileImage: "",
        }));
      }

      return { success: true };
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to remove profile image";
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

  // Reset password (forgot password)
  const resetPassword = async (email) => {
    try {
      setError("");
      const res = await axios.post("/api/users/forgot-password", { email });
      return { success: true, message: "Password reset email sent" };
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Password reset request failed";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  // Social login (Google, Facebook)
  const socialLogin = async (provider) => {
    try {
      setError("");

      if (provider === "google") {
        // Google OAuth configuration
        const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth";
        const redirectUri = window.location.origin + "/auth/google/callback";

        const params = new URLSearchParams({
          client_id:
            process.env.REACT_APP_GOOGLE_CLIENT_ID || "your-google-client-id",
          redirect_uri: redirectUri,
          response_type: "code",
          scope: "email profile",
          prompt: "select_account",
        });

        // Redirect to Google login
        window.location.href = `${googleAuthUrl}?${params.toString()}`;
      } else if (provider === "facebook") {
        // Facebook OAuth configuration
        const fbAuthUrl = "https://www.facebook.com/v12.0/dialog/oauth";
        const redirectUri = window.location.origin + "/auth/facebook/callback";

        const params = new URLSearchParams({
          client_id:
            process.env.REACT_APP_FACEBOOK_APP_ID || "your-facebook-app-id",
          redirect_uri: redirectUri,
          response_type: "code",
          scope: "email,public_profile",
        });

        // Redirect to Facebook login
        window.location.href = `${fbAuthUrl}?${params.toString()}`;
      }

      return { success: true };
    } catch (err) {
      const errorMessage = `${provider} login failed`;
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
    resetPassword,
    socialLogin,
    updateProfileImage,
    removeProfileImage,
    isAuthenticated: !!currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
