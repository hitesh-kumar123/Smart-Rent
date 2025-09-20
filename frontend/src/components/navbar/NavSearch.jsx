import React from "react";
import { useNavigate } from "react-router-dom";

const NavSearch = ({
  searchQuery,
  setSearchQuery,
  isSearchFocused,
  setIsSearchFocused,
  recentSearches,
  setRecentSearches,
  getText,
  suggestions,
}) => {
  const navigate = useNavigate();
  const searchRef = React.useRef(null);

  // Handle clicks outside the search dropdown
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsSearchFocused]);

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

  return (
    <div
      ref={searchRef}
      className="hidden md:flex relative mx-auto max-w-md w-full rounded-full border border-neutral-200 shadow-search hover:shadow-md transition duration-200"
    >
      <form onSubmit={handleSearchSubmit} className="w-full">
        <input
          type="text"
          placeholder={getText("common", "search")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          className="w-full px-8 py-2.5 rounded-full focus:outline-none text-sm text-neutral-700 pr-12"
        />
        <button
          type="submit"
          className="absolute right-1.5 top-[40%] transform -translate-y-1/2 bg-[#FF4C6D] text-white rounded-full hover:bg-[#E03F5A] transition duration-200 flex items-center justify-center w-8 h-8 m-1"
        >
          <i className="fas fa-search text-sm"></i>
        </button>
      </form>

      {/* Search Dropdown */}
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
                    <span className="text-sm text-neutral-700">{search}</span>
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
                  <span className="text-sm text-neutral-700">{suggestion}</span>
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
