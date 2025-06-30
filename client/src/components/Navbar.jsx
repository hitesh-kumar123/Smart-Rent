import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppSettings } from "../contexts/AppSettingsContext";
import { useAuth } from "../contexts/AuthContext";
import logoSvg from "../logo.svg";

/**
 * Navbar Component
 *
 * Main navigation bar with responsive design for desktop
 * Features: Logo, search, user profile menu, language/currency settings
 */
const Navbar = () => {
  // State for UI controls
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem("recentSearches");
    return saved ? JSON.parse(saved) : [];
  });
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);
  const searchRef = useRef(null);
  const settingsRef = useRef(null);
  const { pathname } = useLocation();
  const location = useLocation();
  const navigate = useNavigate();

  // Use auth context
  const { currentUser, logout, isAuthenticated } = useAuth();

  // Use the app settings context
  const {
    language,
    languageName,
    currency,
    changeLanguage,
    changeCurrency,
    supportedLanguages,
    getText,
    isTranslating,
    isLoadingRates,
  } = useAppSettings();

  // Popular suggestions
  const suggestions = [
    "New York",
    "Los Angeles",
    "Miami",
    "Chicago",
    "San Francisco",
  ];

  // Available currencies
  const currencies = [
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "EUR", symbol: "€", name: "Euro" },
    { code: "GBP", symbol: "£", name: "British Pound" },
    { code: "JPY", symbol: "¥", name: "Japanese Yen" },
    { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
    { code: "AUD", symbol: "A$", name: "Australian Dollar" },
    { code: "INR", symbol: "₹", name: "Indian Rupee" },
  ];

  // Close profile and settings menus on route change
  useEffect(() => {
    setIsProfileMenuOpen(false);
    setIsSettingsMenuOpen(false);
  }, [location.pathname]);

  // Handle clicks outside dropdown menus to close them
  useEffect(() => {
    // Handle clicks outside the search dropdown
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setIsSettingsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Control body scrolling when settings modal is open
  useEffect(() => {
    // Prevent body scrolling when settings modal is open
    if (isSettingsMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup function to restore scrolling when component unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSettingsMenuOpen]);

  // Persist recent searches to localStorage
  useEffect(() => {
    // Save recent searches to localStorage whenever it changes
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  }, [recentSearches]);

  // Handler for search input changes
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handler for search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Add to recent searches (avoid duplicates and limit to 5)
      const updatedSearches = [
        searchQuery.trim(),
        ...recentSearches.filter((search) => search !== searchQuery.trim()),
      ].slice(0, 5);

      setRecentSearches(updatedSearches);
      navigate(`/listings?location=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsSearchFocused(false);
    }
  };

  // Handler for clicking a search suggestion
  const handleSuggestionClick = (suggestion) => {
    // Add to recent searches
    const updatedSearches = [
      suggestion,
      ...recentSearches.filter((search) => search !== suggestion),
    ].slice(0, 5);

    setRecentSearches(updatedSearches);
    navigate(`/listings?location=${encodeURIComponent(suggestion)}`);
    setIsSearchFocused(false);
  };

  // Handler to clear all recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  // Handler for changing language
  const handleLanguageChange = (langCode, langName) => {
    changeLanguage(langCode, langName);
    setIsSettingsMenuOpen(false);
  };

  // Handler for changing currency
  const handleCurrencyChange = (currencyCode) => {
    changeCurrency(currencyCode);
    setIsSettingsMenuOpen(false);
  };

  // Handler for user logout action
  const handleLogout = () => {
    logout();
    setIsProfileMenuOpen(false);
    navigate("/");
  };

  return (
    <nav className="bg-white  py-4 px-4 md:px-6 sticky top-0 z-20">
      <div className="container mx-auto">
        {/* Main navigation bar with logo and menu items */}
        <div className="flex justify-between items-center ">
          {/* Logo */}

          <Link to="/" className="flex items-center ml-5 ">
            {/* Logo image (SVG) */}
            <img
              src={logoSvg}
              alt="Smart Rent System Logo"
              className="h-14 w-14 object-contain"
              style={{ maxWidth: 48 }}
            />
            {/* Logo text */}
            <div className="ml-3">
              <div className="text-xl md:text-2xl font-bold text-neutral-800 hover:text-red-500 transition-colors duration-300">
                Smart Rent
              </div>
              <div className="text-sm md:text-base font-medium text-red-500 -mt-1 tracking-wider">
                SYSTEM
              </div>
            </div>
          </Link>

          {/* Explore Button - Added next to the logo */}
          {location.pathname === "/" && (
            <div className="hidden md:block ml-12">
              <Link
                to="/listings"
                className="flex items-center px-4 py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-full transition duration-300 shadow-sm hover:shadow-md gap-2"
                aria-label="Explore Properties"
              >
                <i className="fas fa-compass text-lg"></i>
                <span className="font-medium">Explore</span>
              </Link>
            </div>
          )}

          {/* Center search bar - Only on medium and larger screens */}
          {location.pathname === "/" && (
            <div
              ref={searchRef}
              className="hidden md:flex relative mx-auto max-w-md w-full rounded-full border border-neutral-200 shadow-search hover:shadow-md transition duration-200"
            >
              <form onSubmit={handleSearchSubmit} className="w-full">
                <input
                  type="text"
                  placeholder={getText("common", "search")}
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => setIsSearchFocused(true)}
                  className="w-full px-8 py-2.5 rounded-full focus:outline-none text-sm text-neutral-700 pr-12"
                />
                {/* Search Button */}

                <button
                  type="submit"
                  className="absolute right-1.5 top-[40%] transform -translate-y-1/2 bg-[#FF4C6D] text-white    rounded-full hover:bg-[#E03F5A] transition duration-200 flex items-center justify-center w-8 h-8 m-1"
                >
                  <i className="fas fa-search text-sm"></i>
                </button>
              </form>

              {/* Search Dropdown - appears when search is focused */}
              {isSearchFocused && (
                <div className="absolute w-full mt-1 top-full left-0 bg-white rounded-xl shadow-lg border border-neutral-200 overflow-hidden z-20">
                  {/* Recent Searches Section */}
                  {recentSearches.length > 0 && (
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-semibold text-neutral-800">
                          Recent Searches
                        </h3>
                        <button
                          onClick={clearRecentSearches}
                          className="text-xs text-neutral-500 hover:text-neutral-700"
                        >
                          Clear all
                        </button>
                      </div>
                      <div className="space-y-2">
                        {recentSearches.map((search, index) => (
                          <div
                            key={index}
                            onClick={() => handleSuggestionClick(search)}
                            className="flex items-center p-2 hover:bg-neutral-50 rounded-md cursor-pointer"
                          >
                            <i className="fas fa-history text-neutral-400 mr-3"></i>
                            <span className="text-sm text-neutral-700">
                              {search}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Popular Destinations Section */}
                  <div className="p-4 border-t border-neutral-100">
                    <h3 className="text-sm font-semibold text-neutral-800">
                      Popular Destinations
                    </h3>
                    <div className="space-y-2">
                      {suggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="flex items-center p-2 hover:bg-neutral-50 rounded-md cursor-pointer"
                        >
                          <i className="fas fa-map-marker-alt text-neutral-400 mr-3"></i>
                          <span className="text-sm text-neutral-700">
                            {suggestion}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Navigation - Desktop */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Become a host link */}
            <Link
              to="/host/become-a-host"
              className="text-neutral-700 hover:text-neutral-900 px-4 py-2 rounded-full text-sm font-medium"
            >
              {getText("common", "becomeHost")}
            </Link>

            {/* Language and Currency Selector */}
            <div ref={settingsRef} className="relative">
              <button
                onClick={() => setIsSettingsMenuOpen(!isSettingsMenuOpen)}
                className="flex items-center justify-center p-2 text-neutral-700 hover:text-neutral-900 transition duration-200"
                aria-label="Language and Currency Settings"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12H22"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Language and Currency Modal */}
              {isSettingsMenuOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center animate-fadeIn">
                  <div
                    className="bg-white rounded-xl shadow-xl max-w-xl w-full max-h-[90vh] overflow-y-auto mx-4 transform transition-all duration-300 ease-out"
                    style={{ animation: "fadeInUp 0.3s ease-out" }}
                  >
                    {/* Header with close button */}
                    <div className="flex justify-between items-center p-4 border-b border-neutral-200 sticky top-0 bg-white z-10">
                      <h2 className="text-xl font-bold text-neutral-800">
                        Language and Currency
                      </h2>
                      <div className="flex items-center">
                        <span className="text-sm text-neutral-500 mr-3">
                          Currently: {languageName}, {currency}
                        </span>
                        <button
                          onClick={() => setIsSettingsMenuOpen(false)}
                          className="text-neutral-500 hover:text-neutral-700 p-2 rounded-full hover:bg-neutral-100 transition duration-200"
                          aria-label="Close"
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                    </div>

                    {/* Language Selection Section */}
                    <div className="p-6 border-b border-neutral-200">
                      <h3 className="text-lg font-semibold text-neutral-800 mb-4">
                        Select a language
                      </h3>

                      {isTranslating ? (
                        <div className="flex justify-center py-8">
                          <i className="fas fa-spinner fa-spin text-primary-500 mr-2 text-xl"></i>
                          <span className="text-neutral-700">
                            Loading translations...
                          </span>
                        </div>
                      ) : (
                        <>
                          {/* Language regions */}
                          <div className="mb-6">
                            <div className="font-medium text-neutral-700 mb-2">
                              Suggested languages
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                              {supportedLanguages.slice(0, 6).map((lang) => (
                                <button
                                  key={lang.code}
                                  onClick={() =>
                                    handleLanguageChange(lang.code, lang.name)
                                  }
                                  className={`flex items-center px-4 py-3 text-sm rounded-lg transition-all duration-200 ${
                                    language === lang.code
                                      ? "bg-primary-50 text-primary-600 font-medium border-2 border-primary-200"
                                      : "text-neutral-700 hover:bg-neutral-50 border border-neutral-200 hover:border-neutral-300"
                                  }`}
                                >
                                  <span>{lang.name}</span>
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <div className="font-medium text-neutral-700 mb-2">
                              All languages
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                              {supportedLanguages.map((lang) => (
                                <button
                                  key={lang.code}
                                  onClick={() =>
                                    handleLanguageChange(lang.code, lang.name)
                                  }
                                  className={`flex items-center px-4 py-3 text-sm rounded-lg transition-all duration-200 ${
                                    language === lang.code
                                      ? "bg-primary-50 text-primary-600 font-medium border-2 border-primary-200"
                                      : "text-neutral-700 hover:bg-neutral-50 border border-neutral-200 hover:border-neutral-300"
                                  }`}
                                >
                                  <span>{lang.name}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Currency Selection Section */}
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-neutral-800 mb-4">
                        Select a currency
                      </h3>

                      {isLoadingRates ? (
                        <div className="flex justify-center py-8">
                          <i className="fas fa-spinner fa-spin text-primary-500 mr-2 text-xl"></i>
                          <span className="text-neutral-700">
                            Loading exchange rates...
                          </span>
                        </div>
                      ) : (
                        <>
                          {/* Popular currencies */}
                          <div className="mb-6">
                            <div className="font-medium text-neutral-700 mb-2">
                              Popular currencies
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {currencies.slice(0, 4).map((curr) => (
                                <button
                                  key={curr.code}
                                  onClick={() =>
                                    handleCurrencyChange(curr.code)
                                  }
                                  className={`flex items-center px-4 py-3 text-sm rounded-lg transition-all duration-200 ${
                                    currency === curr.code
                                      ? "bg-primary-50 text-primary-600 font-medium border-2 border-primary-200"
                                      : "text-neutral-700 hover:bg-neutral-50 border border-neutral-200 hover:border-neutral-300"
                                  }`}
                                >
                                  <span className="mr-2 font-bold">
                                    {curr.symbol}
                                  </span>
                                  <span>
                                    {curr.code} - {curr.name}
                                  </span>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* All currencies */}
                          <div>
                            <div className="font-medium text-neutral-700 mb-2">
                              All currencies
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {currencies.map((curr) => (
                                <button
                                  key={curr.code}
                                  onClick={() =>
                                    handleCurrencyChange(curr.code)
                                  }
                                  className={`flex items-center px-4 py-3 text-sm rounded-lg transition-all duration-200 ${
                                    currency === curr.code
                                      ? "bg-primary-50 text-primary-600 font-medium border-2 border-primary-200"
                                      : "text-neutral-700 hover:bg-neutral-50 border border-neutral-200 hover:border-neutral-300"
                                  }`}
                                >
                                  <span className="mr-2 font-bold">
                                    {curr.symbol}
                                  </span>
                                  <span>
                                    {curr.code} - {curr.name}
                                  </span>
                                </button>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User profile menu */}

            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center space-x-2 border border-neutral-300 p-2 rounded-full hover:shadow-md transition duration-200"
                aria-label="User menu"
              >
                <i className="fas fa-bars text-neutral-500"></i>
                {isAuthenticated && currentUser ? (
                  <div className="bg-primary-500 text-white rounded-full w-8 h-8 flex items-center justify-center overflow-hidden">
                    {currentUser.profileImage ? (
                      <img
                        src={currentUser.profileImage}
                        alt={`${currentUser.firstName} ${currentUser.lastName}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.onerror = null;
                          e.target.style.display = "none";
                          e.target.parentNode.innerHTML = `<span class="text-sm font-medium">${currentUser.firstName?.[0]}${currentUser.lastName?.[0]}</span>`;
                        }}
                      />
                    ) : (
                      <span className="text-sm font-medium">
                        {currentUser.firstName?.[0]}
                        {currentUser.lastName?.[0]}
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="bg-neutral-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
                    <i className="fas fa-user"></i>
                  </div>
                )}
              </button>

              {/* User dropdown menu */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-card border border-neutral-200 divide-y divide-neutral-100 py-1 z-30">
                  {!isAuthenticated ? (
                    // Not logged in menu options
                    <div className="py-1">
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        {getText("common", "login")}
                      </Link>
                      <Link
                        to="/register"
                        className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        {getText("common", "signup")}
                      </Link>
                      <Link
                        to="/host/become-a-host"
                        className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        {getText("common", "becomeHost")}
                      </Link>
                      <Link
                        to="/help"
                        className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        {getText("common", "help")}
                      </Link>
                    </div>
                  ) : (
                    // Logged in user menu options
                    <>
                      {/* User profile summary */}
                      <div className="p-4">
                        <div className="flex items-center">
                          <div className="bg-primary-500 text-white rounded-full w-10 h-10 mr-3 flex items-center justify-center overflow-hidden">
                            {currentUser.profileImage ? (
                              <img
                                src={currentUser.profileImage}
                                alt={`${currentUser.firstName} ${currentUser.lastName}`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.onerror = null;
                                  e.target.style.display = "none";
                                  e.target.parentNode.innerHTML = `<span class="text-sm font-medium">${currentUser.firstName?.[0]}${currentUser.lastName?.[0]}</span>`;
                                }}
                              />
                            ) : (
                              <span className="text-sm font-medium">
                                {currentUser.firstName?.[0]}
                                {currentUser.lastName?.[0]}
                              </span>
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-neutral-800">
                              {currentUser.firstName} {currentUser.lastName}
                            </p>
                            <p className="text-xs text-neutral-500">
                              {currentUser.email}
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* User activity links */}
                      <div className="py-1">
                        <Link
                          to="/messages"
                          className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          {getText("common", "messages")}
                        </Link>
                        <Link
                          to="/trips"
                          className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          {getText("common", "trips")}
                        </Link>
                        <Link
                          to="/wishlist"
                          className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          {getText("common", "wishlist")}
                        </Link>
                      </div>
                      {/* Account management links */}
                      <div className="py-1">
                        <Link
                          to="/host/listings"
                          className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          Manage listings
                        </Link>
                        <Link
                          to="/account"
                          className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          {getText("common", "account")}
                        </Link>
                        <button
                          className="w-full text-left block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                          onClick={handleLogout}
                        >
                          {getText("common", "logout")}
                        </button>
                        <Link
                          to="/help"
                          className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          {getText("common", "help")}
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search - Only visible on mobile - Currently disabled */}
        {/* <div ref={searchRef} className="mt-4 md:hidden">
          <form onSubmit={handleSearchSubmit} className="w-full">
            <div className="relative rounded-full border border-neutral-200 shadow-sm">
              <input
                type="text"
                placeholder={getText("common", "search")}
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full px-4 py-2 rounded-full focus:outline-none text-sm pr-16"
              />
              <button
                type="submit"
                className="absolute right-3 top-[58%] transform -translate-y-1/2 bg-[#FF4C6D] text-white p-2 rounded-full hover:bg-[#E03F5A] transition duration-200 flex items-center justify-center w-10 h-10 m-1"
              >
                <i className="fas fa-search text-sm"></i>
              </button>
            </div>
          </form>
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar;
