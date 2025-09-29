import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollProgress from "./ScrollProgress";
import ErrorBoundary from "./ErrorBoundary";

const Layout = ({ children }) => {
  const location = useLocation();

  // Handle scroll restoration
  useEffect(() => {
    // Check if there's a stored scroll position for this location
    const savedPosition = sessionStorage.getItem(`scroll_${location.key}`);
    if (savedPosition) {
      // Restore the scroll position
      window.scrollTo(0, parseInt(savedPosition, 10));
      // Clear the stored position after restoration
      sessionStorage.removeItem(`scroll_${location.key}`);
    } else {
      // If no stored position, scroll to top
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  // Save scroll position before navigation
  useEffect(() => {
    const handleScroll = () => {
      sessionStorage.setItem(
        `scroll_${location.key}`,
        window.pageYOffset.toString()
      );
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.key]);

  return (
    <ErrorBoundary>
      <div className="flex flex-col min-h-screen">
        <ScrollProgress />
        <Navbar />
        <main className="flex-grow">
          <ErrorBoundary>{children}</ErrorBoundary>
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default Layout;
