import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Layout component that wraps all pages
import Layout from "./components/Layout";
// Page imports
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import PropertyDetail from "./pages/PropertyDetail";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Messages from "./pages/Messages";
import Trips from "./pages/Trips";
import TripManage from "./pages/TripManage";
import Wishlist from "./pages/Wishlist";
import HostListings from "./pages/HostListings";
import Account from "./pages/Account";
import Help from "./pages/Help";
import BecomeHost from "./pages/BecomeHost";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Safety from "./pages/Safety";
import Cancellation from "./pages/Cancellation";
import ReportConcern from "./pages/ReportConcern";
import FAQ from "./pages/FAQ";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import ResetPassword from "./pages/ResetPassword";
import Map from "./pages/Map";
import PropertyMap from "./pages/PropertyMap";
// Component to protect routes that require authentication
import ProtectedRoute from "./components/ProtectedRoute";
// Import ScrollToTop component
import ScrollToTop from "./components/ScrollToTop";
// Context providers
import { AppSettingsProvider } from "./contexts/AppSettingsContext";
import { AuthProvider } from "./contexts/AuthContext";
import "./App.css";
import PaymentPage from "./pages/PaymentPage";
// import ForgotPassword from "./pages/ForgotPassword";

function App() {
  // Set browser's scrollRestoration to manual to take control of scrolling
  useEffect(() => {
    // Take control of scroll restoration
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Force an immediate scroll to top on initial load
    window.scrollTo(0, 0);

    // Create a function to handle link clicks
    const handleLinkClick = (e) => {
      const link = e.target.closest("a");
      if (
        link &&
        !link.getAttribute("target") &&
        link.getAttribute("href") &&
        link.getAttribute("href").startsWith("/")
      ) {
        // For internal links, force scroll reset
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 0);
      }
    };

    // Attach event listener for link clicks
    document.addEventListener("click", handleLinkClick);

    // Clean up
    return () => {
      document.removeEventListener("click", handleLinkClick);
    };
  }, []);

  return (
    // Application settings context provider
    <AppSettingsProvider>
      {/* Authentication context provider */}
      <AuthProvider>
        {/* Browser router for handling navigation */}
        <BrowserRouter>
          {/* Add ScrollToTop to handle scrolling on route changes */}
          <ScrollToTop />
          {/* Global layout component (header, footer, etc.) */}
          <Layout>
            <Routes>
              {/* Public routes - accessible to all users */}
              <Route path="/" element={<Home />} />
              <Route path="/listings" element={<Listings />} />
              <Route path="/properties/:id" element={<PropertyDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/help" element={<Help />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/safety" element={<Safety />} />
              <Route path="/cancellation" element={<Cancellation />} />
              <Route path="/report-concern" element={<ReportConcern />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/cookies" element={<Cookies />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route
                path="/reset-password/:token"
                element={<ResetPassword />}
              />
              <Route path="/map" element={<Map />} />
              <Route path="/property/:id/map" element={<PropertyMap />} />
              {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}

              {/* Protected routes - require user authentication */}
              <Route
                path="/messages"
                element={
                  <ProtectedRoute>
                    <Messages />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/trips"
                element={
                  <ProtectedRoute>
                    <Trips />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/trips/:id/manage"
                element={
                  <ProtectedRoute>
                    <TripManage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/wishlist"
                element={
                  <ProtectedRoute>
                    <Wishlist />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/host/listings"
                element={
                  <ProtectedRoute>
                    <HostListings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/host/become-a-host"
                element={
                  <ProtectedRoute>
                    <BecomeHost />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/account"
                element={
                  <ProtectedRoute>
                    <Account />
                  </ProtectedRoute>
                }
              />

              {/* Not found - catches all unmatched routes */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </AuthProvider>
    </AppSettingsProvider>
  );
}

export default App;
