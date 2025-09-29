import React, { useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeStatus, setSubscribeStatus] = useState(null); // null | 'success' | 'error'

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setSubscribeStatus("error");
      return;
    }

    setIsSubscribing(true);
    setSubscribeStatus(null);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubscribeStatus("success");
      setEmail("");
    } catch (error) {
      setSubscribeStatus("error");
    } finally {
      setIsSubscribing(false);
    }
  };
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-neutral-900 text-white pt-12 sm:pt-16 pb-8 sm:pb-10"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12 text-center sm:text-left"
          role="navigation"
          aria-label="Footer navigation"
        >
          {/* Company Info */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-white inline-flex items-center">
              <span className="text-primary-500 font-bold">Smart</span>
              <span className="font-light">RentSystem</span>
            </h3>
            <p className="text-neutral-400 mb-6 leading-relaxed max-w-sm">
              Find your perfect home away from home. SmartRent provides a secure
              platform for property rental with verified hosts and quality
              listings.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-neutral-800/80 hover:bg-primary-600 text-white h-9 w-9 sm:h-10 sm:w-10 rounded-full 
                  flex items-center justify-center 
                  transition-all duration-300 
                  hover:scale-110 active:scale-95 
                  shadow-lg hover:shadow-primary-500/20
                  hover:rotate-[360deg]"
                aria-label="Follow us on Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-neutral-800 hover:bg-primary-600 text-white h-10 w-10 rounded-full flex items-center justify-center transition duration-300"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-neutral-800 hover:bg-primary-600 text-white h-10 w-10 rounded-full flex items-center justify-center transition duration-300"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-neutral-800 hover:bg-primary-600 text-white h-10 w-10 rounded-full flex items-center justify-center transition duration-300"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-4 sm:mt-0">
            <h3 className="text-lg font-semibold mb-4 sm:mb-6 text-white inline-block border-b-2 border-primary-500 pb-1">
              Quick Links
            </h3>
            <ul className="space-y-2.5 sm:space-y-3">
              <li>
                <Link
                  to="/"
                  className="group text-neutral-400 hover:text-primary-400 transition-all duration-300 inline-flex items-center hover:translate-x-1 active:translate-x-0.5"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <i className="fas fa-chevron-right text-xs mr-2 text-primary-500"></i>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-neutral-400 hover:text-primary-400 transition duration-300 inline-flex items-center"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <i className="fas fa-chevron-right text-xs mr-2 text-primary-500"></i>
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-neutral-400 hover:text-primary-400 transition duration-300 inline-flex items-center"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <i className="fas fa-chevron-right text-xs mr-2 text-primary-500"></i>
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-neutral-400 hover:text-primary-400 transition duration-300 inline-flex items-center"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <i className="fas fa-chevron-right text-xs mr-2 text-primary-500"></i>
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/help"
                  className="text-neutral-400 hover:text-primary-400 transition duration-300 inline-flex items-center"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <i className="fas fa-chevron-right text-xs mr-2 text-primary-500"></i>
                  Help
                </Link>
              </li>
              <li>
                <Link
                  to="/safety"
                  className="text-neutral-400 hover:text-primary-400 transition duration-300 inline-flex items-center"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <i className="fas fa-chevron-right text-xs mr-2 text-primary-500"></i>
                  Safety Information
                </Link>
              </li>
              <li>
                <Link
                  to="/cancellation"
                  className="text-neutral-400 hover:text-primary-400 transition duration-300 inline-flex items-center"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <i className="fas fa-chevron-right text-xs mr-2 text-primary-500"></i>
                  Cancellation Options
                </Link>
              </li>
              <li>
                <Link
                  to="/report-concern"
                  className="text-neutral-400 hover:text-primary-400 transition duration-300 inline-flex items-center"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <i className="fas fa-chevron-right text-xs mr-2 text-primary-500"></i>
                  Report Concern
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-neutral-400 hover:text-primary-400 transition duration-300 inline-flex items-center"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <i className="fas fa-chevron-right text-xs mr-2 text-primary-500"></i>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="mt-4 sm:mt-0">
            <h3 className="text-lg font-semibold mb-4 sm:mb-6 text-white inline-block border-b-2 border-primary-500 pb-1">
              Contact Us
            </h3>
            <ul className="space-y-4 text-neutral-400">
              <li className="flex items-start justify-center sm:justify-start group">
                <i className="fas fa-map-marker-alt mt-1 mr-3 text-primary-500 group-hover:scale-110 transition-transform duration-300"></i>
                <span className="group-hover:text-neutral-300 transition-colors duration-300">
                  123 Rent Street, City, Country
                </span>
              </li>
              <li className="flex items-center justify-center sm:justify-start group">
                <i className="fas fa-phone-alt mr-3 text-primary-500 group-hover:scale-110 transition-transform duration-300"></i>
                <a
                  href="tel:+11234567890"
                  className="group-hover:text-neutral-300 transition-colors duration-300"
                >
                  +1 (123) 456-7890
                </a>
              </li>
              <li className="flex items-center justify-center sm:justify-start group">
                <i className="fas fa-envelope mr-3 text-primary-500 group-hover:scale-110 transition-transform duration-300"></i>
                <a
                  href="mailto:info@smartrentsystem.com"
                  className="group-hover:text-neutral-300 transition-colors duration-300"
                >
                  info@smartrentsystem.com
                </a>
              </li>
            </ul>
            <div className="mt-8">
              <h4 className="text-sm font-semibold mb-4 text-white">
                Subscribe to Newsletter
              </h4>
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex max-w-sm mx-auto sm:mx-0 group focus-within:scale-[1.02] transition-transform duration-300">
                  <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full text-sm text-neutral-800 bg-neutral-100 rounded-l-lg px-4 py-2.5 
                      focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white
                      transition-all duration-300 placeholder:text-neutral-400
                      disabled:opacity-50 disabled:cursor-not-allowed
                      ${
                        subscribeStatus === "error" ? "ring-2 ring-red-500" : ""
                      }`}
                    disabled={isSubscribing}
                    aria-label="Email for newsletter"
                    aria-invalid={subscribeStatus === "error"}
                    aria-describedby="newsletter-feedback"
                  />
                  <button
                    type="submit"
                    className={`bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white px-4 py-2.5 rounded-r-lg 
                      transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/20
                      flex items-center justify-center min-w-[48px]
                      disabled:opacity-50 disabled:cursor-not-allowed
                      ${isSubscribing ? "animate-pulse" : ""}`}
                    disabled={isSubscribing}
                    aria-label={
                      isSubscribing
                        ? "Subscribing..."
                        : "Subscribe to newsletter"
                    }
                  >
                    {isSubscribing ? (
                      <i className="fas fa-circle-notch fa-spin"></i>
                    ) : (
                      <i className="fas fa-paper-plane group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"></i>
                    )}
                  </button>
                </div>
                {subscribeStatus && (
                  <p
                    id="newsletter-feedback"
                    className={`text-sm ${
                      subscribeStatus === "success"
                        ? "text-green-400"
                        : "text-red-400"
                    } transition-all duration-300 animate-fadeIn text-center sm:text-left`}
                  >
                    {subscribeStatus === "success"
                      ? "Thank you for subscribing!"
                      : "Please enter a valid email address."}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
          <p className="text-neutral-400 text-sm mb-4 sm:mb-0 group">
            &copy; {currentYear}{" "}
            <span className="text-white font-medium group-hover:text-primary-400 transition-colors duration-300">
              SmartRentSystem
            </span>
            . All rights reserved.
          </p>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 sm:items-center">
            <Link
              to="/privacy"
              className="text-neutral-400 hover:text-primary-400 text-sm transition-all duration-300 hover:translate-y-[-1px]"
              onClick={() => window.scrollTo(0, 0)}
            >
              Privacy Policy
            </Link>
            <span className="hidden sm:block text-neutral-600">•</span>
            <Link
              to="/terms"
              className="text-neutral-400 hover:text-primary-400 text-sm transition-all duration-300 hover:translate-y-[-1px]"
              onClick={() => window.scrollTo(0, 0)}
            >
              Terms of Service
            </Link>
            <span className="hidden sm:block text-neutral-600">•</span>
            <Link
              to="/cookies"
              className="text-neutral-400 hover:text-primary-400 text-sm transition-all duration-300 hover:translate-y-[-1px]"
              onClick={() => window.scrollTo(0, 0)}
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
