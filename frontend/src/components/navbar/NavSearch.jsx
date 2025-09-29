// src/components/navbar/NavSearch.js
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSettings } from "../../contexts/AppSettingsContext";

/**
 * A self-contained, responsive search component with a dropdown for recent and popular searches.
 * @param {object} props
 * @param {function} [props.onSearchComplete] - Optional callback to run after a search is executed.
 * @param {boolean} [props.isMobileLayout=false] - Determines if it should render in a mobile-first, vertical layout.
 */
const NavSearch = ({ onSearchComplete, isMobileLayout = false }) => {
  // --- STATE IS NOW MANAGED INTERNALLY ---
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState(() => {
    // Load recent searches from localStorage on initial render
    const saved = localStorage.getItem("recentSearches");
    return saved ? JSON.parse(saved) : [];
  });

  const navigate = useNavigate();
  const searchContainerRef = useRef(null);
  const { getText } = useAppSettings();

  // This can be fetched from an API or be static
  const popularSuggestions = ["New York", "Los Angeles", "Miami", "Chicago"];

  // --- EFFECTS ---
  // Effect to handle clicking outside the component to lose focus
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Effect to save recent searches whenever they change
  useEffect(() => {
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  }, [recentSearches]);

  // --- HANDLERS ---
  const executeSearch = async (searchTerm) => {
    if (searchTerm.trim()) {
      setIsSearching(true);

      // Add to recent searches (avoid duplicates, limit to 5)
      const updatedSearches = [
        searchTerm.trim(),
        ...recentSearches.filter((s) => s !== searchTerm.trim()),
      ].slice(0, 5);
      setRecentSearches(updatedSearches);

      // Navigate to the listings page
      navigate(`/listings?location=${encodeURIComponent(searchTerm.trim())}`);

      // Clean up UI
      setQuery("");
      setIsFocused(false);

      // Notify parent component if callback is provided
      if (onSearchComplete) {
        await onSearchComplete();
      }

      setIsSearching(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    executeSearch(query);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  return (
    <div
      ref={searchContainerRef}
      className={`${
        isMobileLayout
          ? "w-full px-4 sm:px-0"
          : "relative mx-auto w-full max-w-[420px] lg:max-w-lg"
      } transition-all duration-300`}
    >
      {/* --- Main Search Input and Form --- */}
      <form onSubmit={handleFormSubmit} className="relative w-full">
        <input
          type="text"
          placeholder={getText("common", "search")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className={`w-full pl-6 pr-14 py-3.5 sm:py-3 text-base text-neutral-800 
            ${isMobileLayout ? "bg-white" : "bg-neutral-100"} 
            ${isSearching ? "opacity-75" : ""} 
            border-2 border-transparent rounded-full 
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 
            focus:bg-white transition-all duration-300
            shadow-sm hover:shadow-md
            placeholder:text-neutral-400`}
          disabled={isSearching}
          autoFocus={isMobileLayout} // Autofocus on mobile overlay
        />
        <button
          type="submit"
          aria-label="Search"
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 
            bg-primary-500 text-white rounded-full 
            hover:bg-primary-600 active:bg-primary-700
            transition-all duration-200 
            flex items-center justify-center 
            w-10 h-10 sm:w-9 sm:h-9
            shadow-md hover:shadow-lg active:shadow-sm
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
        >
          {isSearching ? (
            <i className="fas fa-circle-notch fa-spin text-sm"></i>
          ) : (
            <i className="fas fa-search text-sm"></i>
          )}
        </button>
      </form>

      {/* --- Search Dropdown --- */}
      {isFocused && (
        <div
          className={`overflow-hidden z-20 animate-fadeIn backdrop-blur-sm
            ${
              isMobileLayout
                ? "mt-4 bg-white/95"
                : "absolute w-full mt-2 top-full left-0 bg-white rounded-2xl shadow-xl border border-neutral-200"
            }`}
        >
          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="p-4 sm:p-3">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-semibold text-neutral-700">
                  {getText("search", "recentSearches")}
                </h3>
                <button
                  onClick={clearRecentSearches}
                  className="text-xs text-primary-600 hover:text-primary-700 hover:underline px-2 py-1 rounded-md transition-colors"
                >
                  {getText("common", "clear")}
                </button>
              </div>
              <div className="space-y-1">
                {recentSearches.map((search, index) => (
                  <div
                    key={index}
                    onClick={() => executeSearch(search)}
                    className="flex items-center p-2.5 -mx-1 text-neutral-600 hover:bg-neutral-100 
                      rounded-lg cursor-pointer transition-all duration-200 group"
                  >
                    <i className="fas fa-history text-neutral-400 w-8 text-center group-hover:text-primary-500 transition-colors"></i>
                    <span className="group-hover:text-neutral-900">
                      {search}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Popular Destinations */}
          <div
            className={`p-4 sm:p-3 ${
              recentSearches.length > 0 ? "border-t border-neutral-100" : ""
            }`}
          >
            <h3 className="text-sm font-semibold text-neutral-700 mb-3">
              {getText("search", "popularDestinations")}
            </h3>
            <div className="space-y-1">
              {popularSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  onClick={() => executeSearch(suggestion)}
                  className="flex items-center p-2.5 -mx-1 text-neutral-600 hover:bg-neutral-100 
                    rounded-lg cursor-pointer transition-all duration-200 group"
                >
                  <i className="fas fa-map-marker-alt text-neutral-400 w-8 text-center group-hover:text-primary-500 transition-colors"></i>
                  <span className="group-hover:text-neutral-900">
                    {suggestion}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavSearch;
