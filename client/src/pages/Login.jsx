import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const { login, isAuthenticated, error: authError, resetPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if they're already logged in
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  // Set error from auth context
  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        // Redirect to homepage after successful login
        navigate("/", { replace: true });
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await resetPassword(resetEmail);
      setResetSent(true);
    } catch (err) {
      setError(err.message || "Failed to send password reset email.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetEmailChange = (e) => {
    setResetEmail(e.target.value);
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
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

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {resetSent && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
              Password reset email sent. Please check your inbox.
            </div>
          )}

          {showForgotPassword ? (
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
            <form className="space-y-6" onSubmit={handleSubmit}>
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

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-neutral-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
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
                    onClick={() => setShowForgotPassword(true)}
                    className="font-medium text-primary-600 hover:text-primary-500"
                  >
                    Forgot your password?
                  </button>
                </div>
              </div>

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

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <a
                  href="#"
                  className="w-full inline-flex justify-center py-2 px-4 border border-neutral-300 rounded-md shadow-sm bg-white text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                >
                  <span className="sr-only">Sign in with Google</span>
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12.545 12.151L12.545 12.151L12.545 12.151Q12.545 11.315 12.081 10.759Q11.618 10.203 10.674 10.203L10.674 10.203L10.674 10.203Q9.831 10.203 9.287 10.738Q8.742 11.272 8.742 12.151L8.742 12.151L8.742 12.151Q8.742 13.029 9.287 13.563Q9.831 14.098 10.674 14.098L10.674 14.098L10.674 14.098Q11.618 14.098 12.081 13.542Q12.545 12.986 12.545 12.151L12.545 12.151L12.545 12.151ZM10.674 16.905L10.674 16.905L10.674 16.905Q8.539 16.905 7.286 15.603Q6.033 14.301 6.033 12.151L6.033 12.151L6.033 12.151Q6.033 10 7.286 8.688Q8.539 7.376 10.674 7.376L10.674 7.376L10.674 7.376Q12.226 7.376 13.261 8.226Q14.297 9.075 14.559 10.482L14.559 10.482L14.559 10.482Q14.6 10.707 14.621 10.973Q14.642 11.24 14.642 11.486L14.642 11.486L14.642 11.486Q14.642 11.9 14.57 12.324L14.57 12.324L9.062 12.324L9.062 12.324Q9.184 13.101 9.678 13.563Q10.172 14.026 10.85 14.026L10.85 14.026L10.85 14.026Q11.436 14.026 11.829 13.798Q12.222 13.57 12.353 13.161L12.353 13.161L14.479 13.796L14.479 13.796Q14.195 14.987 13.226 15.946Q12.257 16.905 10.674 16.905L10.674 16.905L10.674 16.905ZM17.967 16.664L17.967 16.664L16.642 16.664L16.642 16.664Q16.305 16.664 16.043 16.428Q15.78 16.193 15.78 15.885L15.78 15.885L15.78 8.35L15.78 8.35Q15.78 8.001 16.043 7.765Q16.305 7.529 16.642 7.529L16.642 7.529L17.967 7.529L17.967 7.529Q18.304 7.529 18.566 7.765Q18.829 8.001 18.829 8.35L18.829 8.35L18.829 15.885L18.829 15.885Q18.829 16.193 18.566 16.428Q18.304 16.664 17.967 16.664L17.967 16.664L17.967 16.664Z" />
                  </svg>
                </a>
              </div>

              <div>
                <a
                  href="#"
                  className="w-full inline-flex justify-center py-2 px-4 border border-neutral-300 rounded-md shadow-sm bg-white text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                >
                  <span className="sr-only">Sign in with Facebook</span>
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
