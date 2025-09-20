import React from "react";
import { Link } from "react-router-dom";

const NavProfile = ({
  isProfileMenuOpen,
  setIsProfileMenuOpen,
  currentUser,
  isAuthenticated,
  handleLogout,
  getText,
}) => {
  return (
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
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-card border border-neutral-200 divide-neutral-100 py-1 z-[1000]">
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
  );
};

export default NavProfile;
