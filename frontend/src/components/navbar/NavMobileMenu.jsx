import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NavMobileMenu = ({
  isMenuOpen,
  setIsMenuOpen,
  isSearchFocused,
  setIsSearchFocused,
  searchQuery,
  setSearchQuery,
  handleSearchSubmit,
  handleSuggestionClick,
  recentSearches,
  clearRecentSearches,
  suggestions,
  getText,
  isAuthenticated,
  handleLogout,
  setIsSettingsMenuOpen,
  location,
}) => {
  return (
    <>
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div className="bg-white h-screen w-4/5 max-w-sm py-4 px-6 overflow-y-auto">
            {/* Mobile Menu Content */}
            <div className="space-y-4">
              {/* Mobile Search - Only on homepage */}
              {location.pathname === "/" && (
                <div className="relative">
                  <form onSubmit={handleSearchSubmit} className="w-full">
                    <input
                      type="text"
                      placeholder={getText("common", "search")}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-neutral-500"
                    >
                      <i className="fas fa-search"></i>
                    </button>
                  </form>
                </div>
              )}

              {/* Mobile Menu Items */}
              <div className="space-y-2">
                <Link
                  to="/host/become-a-host"
                  className="block px-4 py-2 text-neutral-700 hover:bg-neutral-50 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {getText("common", "becomeHost")}
                </Link>

                {!isAuthenticated ? (
                  <>
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-neutral-700 hover:bg-neutral-50 rounded-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {getText("common", "login")}
                    </Link>
                    <Link
                      to="/register"
                      className="block px-4 py-2 text-neutral-700 hover:bg-neutral-50 rounded-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {getText("common", "signup")}
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/messages"
                      className="block px-4 py-2 text-neutral-700 hover:bg-neutral-50 rounded-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {getText("common", "messages")}
                    </Link>
                    <Link
                      to="/trips"
                      className="block px-4 py-2 text-neutral-700 hover:bg-neutral-50 rounded-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {getText("common", "trips")}
                    </Link>
                    <Link
                      to="/wishlist"
                      className="block px-4 py-2 text-neutral-700 hover:bg-neutral-50 rounded-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {getText("common", "wishlist")}
                    </Link>
                    <Link
                      to="/host/listings"
                      className="block px-4 py-2 text-neutral-700 hover:bg-neutral-50 rounded-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Manage listings
                    </Link>
                    <Link
                      to="/account"
                      className="block px-4 py-2 text-neutral-700 hover:bg-neutral-50 rounded-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {getText("common", "account")}
                    </Link>
                    <button
                      className="w-full text-left px-4 py-2 text-neutral-700 hover:bg-neutral-50 rounded-lg"
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                    >
                      {getText("common", "logout")}
                    </button>
                  </>
                )}

                <Link
                  to="/help"
                  className="block px-4 py-2 text-neutral-700 hover:bg-neutral-50 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {getText("common", "help")}
                </Link>
              </div>

              {/* Language and Currency Section in Mobile Menu */}
              <div className="mt-6 pt-6 border-t border-neutral-200">
                <button
                  onClick={() => {
                    setIsSettingsMenuOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 px-4 py-2 text-neutral-700 hover:bg-neutral-50 rounded-lg w-full"
                >
                  <i className="fas fa-globe"></i>
                  <span>Language & Currency</span>
                </button>
              </div>
            </div>
          </div>
          {/* Close menu when clicking outside */}
          <div
            className="h-full w-1/5 ml-auto"
            onClick={() => setIsMenuOpen(false)}
          ></div>
        </div>
      )}

      {/* Mobile Search Overlay */}
      {isSearchFocused && location.pathname === "/" && (
        <div className="fixed inset-0 bg-white z-50 md:hidden p-4">
          <div className="flex items-center mb-4">
            <button
              onClick={() => setIsSearchFocused(false)}
              className="p-2 hover:bg-neutral-100 rounded-full"
            >
              <i className="fas fa-arrow-left text-neutral-700"></i>
            </button>
            <span className="ml-4 text-lg font-semibold">Search</span>
          </div>

          <div className="relative">
            <form onSubmit={handleSearchSubmit} className="w-full">
              <input
                type="text"
                placeholder={getText("common", "search")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                autoFocus
              />
            </form>

            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold">Recent Searches</h3>
                  <button
                    onClick={clearRecentSearches}
                    className="text-xs text-neutral-500"
                  >
                    Clear all
                  </button>
                </div>
                <div className="space-y-2">
                  {recentSearches.map((search, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        handleSuggestionClick(search);
                        setIsSearchFocused(false);
                      }}
                      className="flex items-center p-2 hover:bg-neutral-50 rounded-lg"
                    >
                      <i className="fas fa-history text-neutral-400 mr-3"></i>
                      <span className="text-sm">{search}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Destinations */}
            <div className="mt-4">
              <h3 className="text-sm font-semibold mb-2">
                Popular Destinations
              </h3>
              <div className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      handleSuggestionClick(suggestion);
                      setIsSearchFocused(false);
                    }}
                    className="flex items-center p-2 hover:bg-neutral-50 rounded-lg"
                  >
                    <i className="fas fa-map-marker-alt text-neutral-400 mr-3"></i>
                    <span className="text-sm">{suggestion}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavMobileMenu;
