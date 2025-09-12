import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-white pt-16 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">
              <span className="text-primary-500">Smart</span>RentSystem
            </h3>
            <p className="text-neutral-400 mb-6 leading-relaxed">
              Find your perfect home away from home. SmartRent provides a secure
              platform for property rental with verified hosts and quality
              listings.
            </p>
            <div className="flex space-x-5">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-neutral-800 hover:bg-primary-600 text-white h-10 w-10 rounded-full flex items-center justify-center transition duration-300"
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
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-neutral-400 hover:text-primary-400 transition duration-300 flex items-center"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <i className="fas fa-chevron-right text-xs mr-2 text-primary-500"></i>
                  Home
                </Link>
              </li>

              {/* Become a Host */}
              {/* <li>
                <Link
                  to="/become-host"
                  className="text-neutral-400 hover:text-primary-400 transition duration-300 flex items-center"
                >
                  <i className="fas fa-chevron-right text-xs mr-2 text-primary-500"></i>
                  Become a Host
                </Link>
              </li> */}

              <li>
                <Link
                  to="/about"
                  className="text-neutral-400 hover:text-primary-400 transition duration-300 flex items-center"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <i className="fas fa-chevron-right text-xs mr-2 text-primary-500"></i>
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-neutral-400 hover:text-primary-400 transition duration-300 flex items-center"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <i className="fas fa-chevron-right text-xs mr-2 text-primary-500"></i>
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-neutral-400 hover:text-primary-400 transition duration-300 flex items-center"
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
                  className="text-neutral-400 hover:text-primary-400 transition duration-300 flex items-center"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <i className="fas fa-chevron-right text-xs mr-2 text-primary-500"></i>
                  Help
                </Link>
              </li>
              <li>
                <Link
                  to="/safety"
                  className="text-neutral-400 hover:text-primary-400 transition duration-300 flex items-center"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <i className="fas fa-chevron-right text-xs mr-2 text-primary-500"></i>
                  Safety Information
                </Link>
              </li>
              <li>
                <Link
                  to="/cancellation"
                  className="text-neutral-400 hover:text-primary-400 transition duration-300 flex items-center"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <i className="fas fa-chevron-right text-xs mr-2 text-primary-500"></i>
                  Cancellation Options
                </Link>
              </li>
              <li>
                <Link
                  to="/report-concern"
                  className="text-neutral-400 hover:text-primary-400 transition duration-300 flex items-center"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <i className="fas fa-chevron-right text-xs mr-2 text-primary-500"></i>
                  Report Concern
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-neutral-400 hover:text-primary-400 transition duration-300 flex items-center"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <i className="fas fa-chevron-right text-xs mr-2 text-primary-500"></i>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">
              Contact Us
            </h3>
            <ul className="space-y-4 text-neutral-400">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3 text-primary-500"></i>
                <span>123 Rent Street, City, Country</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone-alt mr-3 text-primary-500"></i>
                <span>+1 (123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-3 text-primary-500"></i>
                <span>info@smartrentsystem.com</span>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-3 text-white">
                Subscribe to Newsletter
              </h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 w-full text-sm text-neutral-800 bg-neutral-100 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button className="bg-primary-600 hover:bg-primary-700 text-white px-3 py-2 rounded-r-md transition duration-300">
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear}{" "}
            <span className="text-white">SmartRentSystem</span>. All rights
            reserved.
          </p>
          <div className="flex space-x-6">
            <Link
              to="/privacy"
              className="text-neutral-400 hover:text-primary-400 text-sm transition duration-300"
              onClick={() => window.scrollTo(0, 0)}
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-neutral-400 hover:text-primary-400 text-sm transition duration-300"
              onClick={() => window.scrollTo(0, 0)}
            >
              Terms of Service
            </Link>
            <Link
              to="/cookies"
              className="text-neutral-400 hover:text-primary-400 text-sm transition duration-300"
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
