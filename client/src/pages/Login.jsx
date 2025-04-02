import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

/**
 * Login Component
 * Handles user authentication with email/password
 * Features: Login, password reset, form validation, show/hide password
 */
const Login = () => {
  // State for form data and UI controls
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // Loading state during API calls
  const [error, setError] = useState(""); // Error message display
  const [showForgotPassword, setShowForgotPassword] = useState(false); // Toggle between login and forgot password
  const [resetEmail, setResetEmail] = useState(""); // Email for password reset
  const [resetSent, setResetSent] = useState(false); // Track if reset email was sent
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [rememberMe, setRememberMe] = useState(false); // Remember me checkbox state
  const [socialLoading, setSocialLoading] = useState(""); // Tracks which social login is in progress

  // Auth context provides login functionality and authentication state
  const { login, isAuthenticated, error: authError, resetPassword } = useAuth();
  const navigate = useNavigate(); // For redirecting after login
  const location = useLocation(); // To get redirect path from location state

  // Redirect if user is already logged in
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  // Set error from auth context when it changes
  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  // Handle input changes for email and password fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle checkbox state changes
  const handleCheckboxChange = (e) => {
    setRememberMe(e.target.checked);
  };

  // Handle form submission for login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Email validation: Check if email contains ".com" twice
    if ((formData.email.match(/\.com/g) || []).length > 1) {
      setError(
        "Invalid email address. Email contains multiple '.com' domains."
      );
      return;
    }

    // Validate remember me checkbox must be checked
    if (!rememberMe) {
      setError("Please agree to the terms by checking the box.");
      return;
    }

    setLoading(true);

    try {
      // Attempt to login with provided credentials
      const result = await login(formData.email, formData.password);
      if (result.success) {
        // Redirect to homepage after successful login
        navigate("/", { replace: true });
      } else {
        // Custom error message for invalid credentials
        if (
          result.error &&
          (result.error.includes("Invalid email or password") ||
            result.error.includes("Invalid credentials"))
        ) {
          setError("Password invalid");
        } else {
          setError(result.error);
        }
      }
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle password reset request
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Call the reset password function from auth context
      await resetPassword(resetEmail);
      setResetSent(true); // Show success message
    } catch (err) {
      setError(err.message || "Failed to send password reset email.");
    } finally {
      setLoading(false);
    }
  };

  // Handle email input change for password reset
  const handleResetEmailChange = (e) => {
    setResetEmail(e.target.value);
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    setSocialLoading("google");
    setError("");

    try {
      // Open Google OAuth popup
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

      // Open the Google login popup
      window.location.href = `${googleAuthUrl}?${params.toString()}`;
    } catch (err) {
      setError("Google login failed. Please try again.");
      setSocialLoading("");
    }
  };

  // Handle Facebook login
  const handleFacebookLogin = async () => {
    setSocialLoading("facebook");
    setError("");

    try {
      // Facebook login URL and parameters
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
    } catch (err) {
      setError("Facebook login failed. Please try again.");
      setSocialLoading("");
    }
  };

  // Component UI render
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Header section with title and link to register */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-neutral-900">
          {showForgotPassword
            ? "Reset your password"
            : "Log in to your account"}
        </h2>
        <p className="mt-2 text-center text-sm text-neutral-600">
          {showForgotPassword ? (
            <>
              Remember your password?{" "}
              <button
                onClick={() => setShowForgotPassword(false)}
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                Back to login
              </button>
            </>
          ) : (
            <>
              Or{" "}
              <Link
                to="/register"
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                create a new account
              </Link>
            </>
          )}
        </p>
      </div>

      {/* Main form container */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Error message display */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 relative">
              {error}
              <button
                type="button"
                className="absolute top-1 right-1 text-red-500 hover:text-red-700"
                onClick={() => setError("")}
                aria-label="Close error message"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          )}

          {/* Success message for password reset */}
          {resetSent && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
              Password reset email sent. Please check your inbox.
            </div>
          )}

          {/* Conditional rendering based on showForgotPassword state */}
          {showForgotPassword ? (
            // Password reset form
            <form className="space-y-6" onSubmit={handlePasswordReset}>
              <div>
                <label
                  htmlFor="resetEmail"
                  className="block text-sm font-medium text-neutral-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="resetEmail"
                    name="resetEmail"
                    type="email"
                    autoComplete="email"
                    required
                    value={resetEmail}
                    onChange={handleResetEmailChange}
                    className="appearance-none block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  {loading ? "Sending..." : "Send reset link"}
                </button>
              </div>
            </form>
          ) : (
            // Login form
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email input field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-neutral-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
              </div>

              {/* Password input field with show/hide toggle */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-neutral-700"
                >
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                  {/* Show/hide password button */}
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      // Hide password icon (eye with slash)
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </svg>
                    ) : (
                      // Show password icon (eye)
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Remember me checkbox and forgot password link */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                  />
                  <label
                    htmlFor="remember_me"
                    className="ml-2 block text-sm text-neutral-700"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <button
                    type="button"
                    onClick={() => {
                      if (!formData.email || formData.email.trim() === "") {
                        setError(
                          "Please enter your email address before requesting a password reset."
                        );
                      } else {
                        setShowForgotPassword(true);
                        setResetEmail(formData.email); // Pre-populate the reset email field with the login email
                      }
                    }}
                    className="font-medium text-primary-600 hover:text-primary-500"
                  >
                    Forgot your password?
                  </button>
                </div>
              </div>

              {/* Login button */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  {loading ? "Logging in..." : "Log in"}
                </button>
              </div>
            </form>
          )}

          {/* Social login options section */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-neutral-500">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social login buttons */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              {/* Google login button */}
              <div>
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={socialLoading !== ""}
                  className="w-full inline-flex justify-center py-2 px-4 border border-neutral-300 rounded-md shadow-sm bg-white text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                >
                  <span className="sr-only">Sign in with Google</span>
                  {socialLoading === "google" ? (
                    <span className="animate-spin h-5 w-5 border-t-2 border-r-2 border-blue-500 rounded-full" />
                  ) : (
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                  )}
                </button>
              </div>

              {/* Facebook login button */}
              <div>
                <button
                  type="button"
                  onClick={handleFacebookLogin}
                  disabled={socialLoading !== ""}
                  className="w-full inline-flex justify-center py-2 px-4 border border-neutral-300 rounded-md shadow-sm bg-white text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                >
                  <span className="sr-only">Sign in with Facebook</span>
                  {socialLoading === "facebook" ? (
                    <span className="animate-spin h-5 w-5 border-t-2 border-r-2 border-blue-500 rounded-full" />
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="#1877F2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
