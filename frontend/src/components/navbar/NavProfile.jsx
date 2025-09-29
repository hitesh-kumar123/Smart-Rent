import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const NavProfile = ({
  isProfileMenuOpen,
  setIsProfileMenuOpen,
  currentUser,
  isAuthenticated,
  handleLogout,
  getText,
}) => {
  // Handle keyboard navigation
  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setIsProfileMenuOpen(false);
    }
  };

  // Handle click outside
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    if (isProfileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isProfileMenuOpen, setIsProfileMenuOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
        className="flex items-center space-x-2 border border-neutral-300 p-2 rounded-full hover:shadow-md hover:border-neutral-400 active:scale-95 bg-white transition-all duration-200 group"
        aria-label="User menu"
        aria-expanded={isProfileMenuOpen}
        aria-controls="profile-menu"
      >
        <i className="fas fa-bars text-neutral-500 group-hover:text-neutral-700 transition-colors"></i>
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
      <div
        className={`absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-card border border-neutral-200 divide-neutral-100 py-1 z-[1000] transform transition-all duration-200 origin-top-right ${
          isProfileMenuOpen
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
        }`}
      >
        {!isAuthenticated ? (
          // Not logged in menu options
          <div className="py-2">
            <div className="px-4 mb-2">
              <h3 className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Account
              </h3>
            </div>
            <Link
              to="/login"
              className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 transition-colors"
              onClick={() => setIsProfileMenuOpen(false)}
            >
              <i className="fas fa-sign-in-alt w-5 mr-3 text-neutral-400"></i>
              {getText("common", "login")}
            </Link>
            <Link
              to="/register"
              className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 transition-colors"
              onClick={() => setIsProfileMenuOpen(false)}
            >
              <i className="fas fa-user-plus w-5 mr-3 text-neutral-400"></i>
              {getText("common", "signup")}
            </Link>
            <div className="border-t border-neutral-100 my-2"></div>
            <div className="px-4 mb-2">
              <h3 className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Hosting
              </h3>
            </div>
            <Link
              to="/host/become-a-host"
              className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 transition-colors"
              onClick={() => setIsProfileMenuOpen(false)}
            >
              <i className="fas fa-home w-5 mr-3 text-neutral-400"></i>
              {getText("common", "becomeHost")}
            </Link>
            <Link
              to="/help"
              className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 transition-colors"
              onClick={() => setIsProfileMenuOpen(false)}
            >
              <i className="fas fa-question-circle w-5 mr-3 text-neutral-400"></i>
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
            <div className="py-2">
              <div className="px-4 mb-2">
                <h3 className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Activity
                </h3>
              </div>
              <Link
                to="/messages"
                className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 transition-colors group"
                onClick={() => setIsProfileMenuOpen(false)}
              >
                <i className="fas fa-envelope w-5 mr-3 text-neutral-400 group-hover:text-neutral-500"></i>
                {getText("common", "messages")}
              </Link>
              <Link
                to="/trips"
                className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 transition-colors group"
                onClick={() => setIsProfileMenuOpen(false)}
              >
                <i className="fas fa-suitcase w-5 mr-3 text-neutral-400 group-hover:text-neutral-500"></i>
                {getText("common", "trips")}
              </Link>
              <Link
                to="/wishlist"
                className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 transition-colors group"
                onClick={() => setIsProfileMenuOpen(false)}
              >
                <i className="fas fa-heart w-5 mr-3 text-neutral-400 group-hover:text-neutral-500"></i>
                {getText("common", "wishlist")}
              </Link>
            </div>
            {/* Account management links */}
            <div className="border-t border-neutral-100 my-1"></div>
            <div className="py-2">
              <div className="px-4 mb-2">
                <h3 className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Hosting
                </h3>
              </div>
              <Link
                to="/host/listings"
                className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 transition-colors group"
                onClick={() => setIsProfileMenuOpen(false)}
              >
                <i className="fas fa-home w-5 mr-3 text-neutral-400 group-hover:text-neutral-500"></i>
                Manage listings
              </Link>
              <div className="border-t border-neutral-100 my-1"></div>
              <div className="px-4 mb-2">
                <h3 className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Account
                </h3>
              </div>
              <Link
                to="/account"
                className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 transition-colors group"
                onClick={() => setIsProfileMenuOpen(false)}
              >
                <i className="fas fa-user-cog w-5 mr-3 text-neutral-400 group-hover:text-neutral-500"></i>
                {getText("common", "account")}
              </Link>
              <Link
                to="/help"
                className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 transition-colors group"
                onClick={() => setIsProfileMenuOpen(false)}
              >
                <i className="fas fa-question-circle w-5 mr-3 text-neutral-400 group-hover:text-neutral-500"></i>
                {getText("common", "help")}
              </Link>
              <button
                className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors group"
                onClick={handleLogout}
              >
                <i className="fas fa-sign-out-alt w-5 mr-3 text-red-400 group-hover:text-red-500"></i>
                {getText("common", "logout")}
              </button>
            </div>
          </>
        )}
      </div>
      
    </div>
  );
};

export default NavProfile;
