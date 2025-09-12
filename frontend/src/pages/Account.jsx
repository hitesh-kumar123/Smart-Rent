import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const {
    currentUser,
    logout,
    updateProfile,
    updateProfileImage,
    removeProfileImage,
  } = useAuth();
  const navigate = useNavigate();

  // Default form state from currentUser
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
    profileImage: "",
  });

  // Update userData when currentUser changes
  useEffect(() => {
    if (currentUser) {
      setUserData({
        firstName: currentUser.firstName || "",
        lastName: currentUser.lastName || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
        dateOfBirth: currentUser.dateOfBirth || "",
        address: {
          street: currentUser.address?.street || "",
          city: currentUser.address?.city || "",
          state: currentUser.address?.state || "",
          zipCode: currentUser.address?.zipCode || "",
          country: currentUser.address?.country || "",
        },
        profileImage: currentUser.profileImage || "",
      });
    }
  }, [currentUser]);

  // Mock payment methods (we can keep this as is until payment integration is implemented)
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: "credit_card",
      brand: "Visa",
      last4: "4242",
      expMonth: 12,
      expYear: 2025,
      isDefault: true,
    },
    {
      id: 2,
      type: "credit_card",
      brand: "Mastercard",
      last4: "5555",
      expMonth: 8,
      expYear: 2024,
      isDefault: false,
    },
  ]);

  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "payment", label: "Payment Methods" },
    { id: "security", label: "Security" },
    { id: "notifications", label: "Notifications" },
    { id: "privacy", label: "Privacy" },
  ];

  const handleUserDataChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setUserData({
        ...userData,
        [parent]: {
          ...userData[parent],
          [child]: value,
        },
      });
    } else {
      setUserData({
        ...userData,
        [name]: value,
      });
    }
  };

  const handleSubmitProfile = async (e) => {
    e.preventDefault();
    try {
      const result = await updateProfile(userData);
      if (result.success) {
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile: " + result.error);
      }
    } catch (err) {
      alert("An error occurred while updating profile");
      console.error(err);
    }
  };

  const handleSetDefaultPaymentMethod = (id) => {
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      }))
    );
  };

  const handleRemovePaymentMethod = (id) => {
    if (
      window.confirm("Are you sure you want to remove this payment method?")
    ) {
      setPaymentMethods(paymentMethods.filter((method) => method.id !== id));
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-800 mb-4">
            You must be logged in to view this page
          </h1>
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-neutral-800 mb-6">
          Account Settings
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-8">
              <div className="p-6 text-center border-b border-neutral-200">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  {/* Display profile image or initials */}
                  {userData.profileImage ? (
                    <img
                      src={userData.profileImage}
                      alt={`${userData.firstName} ${userData.lastName}`}
                      className="rounded-full object-cover w-24 h-24"
                      onError={(e) => {
                        e.onerror = null;
                        e.target.style.display = "none";
                        const parent = e.target.parentNode;
                        const initials = document.createElement("div");
                        initials.className =
                          "rounded-full w-full h-full bg-primary-500 text-white flex items-center justify-center text-xl font-medium";
                        initials.innerHTML = `${userData.firstName?.[0]}${userData.lastName?.[0]}`;
                        parent.appendChild(initials);
                      }}
                    />
                  ) : (
                    <div className="rounded-full w-full h-full bg-primary-500 text-white flex items-center justify-center text-xl font-medium">
                      {userData.firstName?.[0]}
                      {userData.lastName?.[0]}
                    </div>
                  )}

                  {/* Show either upload or delete button based on whether an image exists */}
                  {userData.profileImage &&
                  userData.profileImage !==
                    "https://res.cloudinary.com/dyem5b45p/image/upload/v1624917250/wanderlust/default-avatar_gjqyxn.png" ? (
                    /* Delete button - shown only when profile image exists and is not the default image */
                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to remove your profile image?"
                          )
                        ) {
                          removeProfileImage()
                            .then((result) => {
                              if (result.success) {
                                setUserData((prev) => ({
                                  ...prev,
                                  profileImage: "",
                                }));
                              } else {
                                console.error(
                                  "Error removing profile image:",
                                  result.error
                                );
                              }
                            })
                            .catch((err) => {
                              console.error(
                                "Error removing profile image:",
                                err
                              );
                            });
                        }
                      }}
                      className="absolute bottom-0 right-0 bg-red-500 text-white rounded-full p-1.5 shadow-md border-2 border-white text-xs hover:bg-red-600 transition-all"
                      title="Remove profile image"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  ) : (
                    /* Upload button - shown when no profile image exists or it's the default image */
                    <button
                      onClick={() =>
                        document.getElementById("profilePicUpload").click()
                      }
                      className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-md border-2 border-white text-primary-500 hover:text-primary-600 transition-all"
                      title="Upload profile image"
                    >
                      <input
                        type="file"
                        id="profilePicUpload"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            // Create temporary URL for preview
                            const previewUrl = URL.createObjectURL(file);
                            setUserData((prev) => ({
                              ...prev,
                              profileImage: previewUrl,
                            }));

                            // Use AuthContext function to upload
                            updateProfileImage(file)
                              .then((result) => {
                                if (result.success) {
                                  console.log(
                                    "Profile image uploaded successfully:",
                                    result.profileImage
                                  );

                                  // Force image reload to prevent cache issues
                                  const img = new Image();
                                  img.src =
                                    result.profileImage +
                                    "?t=" +
                                    new Date().getTime();

                                  // Update userData with the actual image URL from server
                                  setUserData((prev) => ({
                                    ...prev,
                                    profileImage: result.profileImage,
                                  }));

                                  // Force re-render to update the UI
                                  setTimeout(() => {
                                    const profileImg = document.querySelector(
                                      ".rounded-full.object-cover.w-24.h-24"
                                    );
                                    if (profileImg) {
                                      profileImg.src =
                                        result.profileImage +
                                        "?t=" +
                                        new Date().getTime();
                                    }
                                  }, 500);
                                } else {
                                  console.error(
                                    "Error uploading profile image:",
                                    result.error
                                  );
                                  alert(
                                    "Failed to upload profile image: " +
                                      result.error
                                  );
                                }
                              })
                              .catch((err) => {
                                console.error(
                                  "Error uploading profile image:",
                                  err
                                );
                                alert(
                                  "An error occurred while uploading profile image"
                                );
                              });
                          }
                        }}
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </button>
                  )}
                </div>

                <h2 className="text-lg font-medium text-neutral-900">
                  {userData.firstName} {userData.lastName}
                </h2>
                <p className="text-sm text-neutral-500">{userData.email}</p>
              </div>

              <nav className="p-4">
                <ul className="space-y-2">
                  {tabs.map((tab) => (
                    <li key={tab.id}>
                      <button
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                          activeTab === tab.id
                            ? "bg-primary-50 text-primary-700"
                            : "text-neutral-700 hover:bg-neutral-100"
                        }`}
                      >
                        {tab.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="p-4 border-t border-neutral-200">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 border border-red-300 text-red-700 rounded-md text-sm font-medium hover:bg-red-50"
                >
                  Log out
                </button>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Profile */}
              {activeTab === "profile" && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-neutral-900 mb-6">
                    Profile Information
                  </h2>

                  <form onSubmit={handleSubmitProfile}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="firstName"
                          className="block text-sm font-medium text-neutral-700 mb-1"
                        >
                          First name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={userData.firstName}
                          onChange={handleUserDataChange}
                          className="appearance-none block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="lastName"
                          className="block text-sm font-medium text-neutral-700 mb-1"
                        >
                          Last name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={userData.lastName}
                          onChange={handleUserDataChange}
                          className="appearance-none block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-neutral-700 mb-1"
                        >
                          Email address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={userData.email}
                          onChange={handleUserDataChange}
                          className="appearance-none block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          disabled
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-neutral-700 mb-1"
                        >
                          Phone number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={userData.phone}
                          onChange={handleUserDataChange}
                          className="appearance-none block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="dateOfBirth"
                          className="block text-sm font-medium text-neutral-700 mb-1"
                        >
                          Date of birth
                        </label>
                        <input
                          type="date"
                          id="dateOfBirth"
                          name="dateOfBirth"
                          value={userData.dateOfBirth}
                          onChange={handleUserDataChange}
                          className="appearance-none block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <h3 className="text-lg font-medium text-neutral-900 mt-8 mb-4">
                      Address
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label
                          htmlFor="street"
                          className="block text-sm font-medium text-neutral-700 mb-1"
                        >
                          Street address
                        </label>
                        <input
                          type="text"
                          id="street"
                          name="address.street"
                          value={userData.address.street}
                          onChange={handleUserDataChange}
                          className="appearance-none block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium text-neutral-700 mb-1"
                        >
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="address.city"
                          value={userData.address.city}
                          onChange={handleUserDataChange}
                          className="appearance-none block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="state"
                          className="block text-sm font-medium text-neutral-700 mb-1"
                        >
                          State / Province
                        </label>
                        <input
                          type="text"
                          id="state"
                          name="address.state"
                          value={userData.address.state}
                          onChange={handleUserDataChange}
                          className="appearance-none block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="zipCode"
                          className="block text-sm font-medium text-neutral-700 mb-1"
                        >
                          ZIP / Postal code
                        </label>
                        <input
                          type="text"
                          id="zipCode"
                          name="address.zipCode"
                          value={userData.address.zipCode}
                          onChange={handleUserDataChange}
                          className="appearance-none block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium text-neutral-700 mb-1"
                        >
                          Country
                        </label>
                        <select
                          id="country"
                          name="address.country"
                          value={userData.address.country}
                          onChange={handleUserDataChange}
                          className="mt-1 block w-full py-2 px-3 border border-neutral-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        >
                          <option>United States</option>
                          <option>Canada</option>
                          <option>Mexico</option>
                          <option>United Kingdom</option>
                        </select>
                      </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                      <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        Save changes
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Payment Methods */}
              {activeTab === "payment" && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-neutral-900 mb-6">
                    Payment Methods
                  </h2>

                  {paymentMethods.length > 0 ? (
                    <div className="space-y-4 mb-8">
                      {paymentMethods.map((method) => (
                        <div
                          key={method.id}
                          className={`border rounded-lg p-4 ${
                            method.isDefault
                              ? "border-primary-500 bg-primary-50"
                              : "border-neutral-200"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              {method.brand === "Visa" && (
                                <svg
                                  className="h-8 w-12 text-primary-500"
                                  viewBox="0 0 48 32"
                                  fill="currentColor"
                                >
                                  <path d="M44 0H4C1.8 0 0 1.8 0 4v24c0 2.2 1.8 4 4 4h40c2.2 0 4-1.8 4-4V4c0-2.2-1.8-4-4-4zm0 28H4V4h40v24z" />
                                  <path d="M13 15.1l2.8-6.8h2L15.1 16h-2.1l-2.7-7.7h2l.7 7.8zm7.6 1.2c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3zm0-4.3c-.7 0-1.3.6-1.3 1.3s.6 1.3 1.3 1.3 1.3-.6 1.3-1.3-.6-1.3-1.3-1.3zm7 4.3c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3c0 1.6-1.4 3-3 3zm0-4.3c-.7 0-1.3.6-1.3 1.3s.6 1.3 1.3 1.3 1.3-.6 1.3-1.3-.6-1.3-1.3-1.3z" />
                                </svg>
                              )}

                              {method.brand === "Mastercard" && (
                                <svg
                                  className="h-8 w-12 text-primary-500"
                                  viewBox="0 0 48 32"
                                  fill="currentColor"
                                >
                                  <path
                                    d="M4 0C1.8 0 0 1.8 0 4v24c0 2.2 1.8 4 4 4h40c2.2 0 4-1.8 4-4V4c0-2.2-1.8-4-4-4H4z"
                                    fillOpacity=".2"
                                  />
                                  <path d="M44 0H4C1.8 0 0 1.8 0 4v24c0 2.2 1.8 4 4 4h40c2.2 0 4-1.8 4-4V4c0-2.2-1.8-4-4-4zM44 28H4V4h40v24z" />
                                  <path
                                    d="M24 23c3.9 0 7-3.1 7-7s-3.1-7-7-7-7 3.1-7 7 3.1 7 7 7z"
                                    fillOpacity=".7"
                                  />
                                  <path
                                    d="M24 23c3.9 0 7-3.1 7-7s-3.1-7-7-7V23z"
                                    fillOpacity=".5"
                                  />
                                </svg>
                              )}

                              <div className="ml-3">
                                <div className="text-sm font-medium text-neutral-900">
                                  {method.brand} ending in {method.last4}
                                </div>
                                <div className="text-xs text-neutral-500">
                                  Expires {method.expMonth}/{method.expYear}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center">
                              {method.isDefault ? (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                                  Default
                                </span>
                              ) : (
                                <button
                                  onClick={() =>
                                    handleSetDefaultPaymentMethod(method.id)
                                  }
                                  className="text-sm text-primary-600 hover:text-primary-700 mr-4"
                                >
                                  Set as default
                                </button>
                              )}

                              <button
                                onClick={() =>
                                  handleRemovePaymentMethod(method.id)
                                }
                                className="text-sm text-red-600 hover:text-red-700 ml-4"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 border border-dashed border-neutral-300 rounded-md mb-8">
                      <svg
                        className="mx-auto h-12 w-12 text-neutral-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        />
                      </svg>
                      <h3 className="mt-2 text-sm font-medium text-neutral-900">
                        No payment methods
                      </h3>
                      <p className="mt-1 text-sm text-neutral-500">
                        Add a payment method to easily book properties.
                      </p>
                    </div>
                  )}

                  <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                    Add payment method
                  </button>
                </div>
              )}

              {/* Security */}
              {activeTab === "security" && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-neutral-900 mb-6">
                    Security
                  </h2>

                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-medium text-neutral-900 mb-4">
                        Change password
                      </h3>
                      <form className="space-y-4">
                        <div>
                          <label
                            htmlFor="currentPassword"
                            className="block text-sm font-medium text-neutral-700 mb-1"
                          >
                            Current password
                          </label>
                          <input
                            type="password"
                            id="currentPassword"
                            name="currentPassword"
                            className="appearance-none block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="newPassword"
                            className="block text-sm font-medium text-neutral-700 mb-1"
                          >
                            New password
                          </label>
                          <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            className="appearance-none block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-neutral-700 mb-1"
                          >
                            Confirm new password
                          </label>
                          <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            className="appearance-none block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          />
                        </div>

                        <div className="pt-2">
                          <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                          >
                            Update password
                          </button>
                        </div>
                      </form>
                    </div>

                    <div className="pt-6 border-t border-neutral-200">
                      <h3 className="text-lg font-medium text-neutral-900 mb-4">
                        Two-factor authentication
                      </h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-neutral-500">
                            Add an extra layer of security to your account by
                            enabling two-factor authentication.
                          </p>
                        </div>
                        <button className="ml-4 inline-flex items-center px-3 py-1.5 border border-neutral-300 shadow-sm text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                          Enable
                        </button>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-neutral-200">
                      <h3 className="text-lg font-medium text-neutral-900 mb-4">
                        Account activity
                      </h3>
                      <p className="text-sm text-neutral-500 mb-4">
                        Here's a list of devices that have logged into your
                        account. Revoke any sessions that you do not recognize.
                      </p>

                      <div className="border rounded-md overflow-hidden">
                        <div className="bg-neutral-50 px-4 py-3 border-b">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-neutral-900">
                              Current session
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Active now
                            </span>
                          </div>
                        </div>

                        <div className="px-4 py-3 flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-neutral-900">
                              Windows PC
                            </p>
                            <p className="text-xs text-neutral-500">
                              San Francisco, CA, USA · March 20, 2023 at 2:30 PM
                            </p>
                          </div>
                          <button className="text-sm text-primary-600 hover:text-primary-700">
                            Log out
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications tab */}
              {activeTab === "notifications" && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-neutral-900 mb-6">
                    Notification Preferences
                  </h2>

                  {/* Email Notifications Section */}
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-neutral-900 mb-4">
                      Email Notifications
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-3 border-b border-neutral-200">
                        <div>
                          <h4 className="text-sm font-medium text-neutral-900">
                            Booking confirmations
                          </h4>
                          <p className="text-xs text-neutral-500">
                            Receive emails when your booking is confirmed
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            defaultChecked
                          />
                          <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between py-3 border-b border-neutral-200">
                        <div>
                          <h4 className="text-sm font-medium text-neutral-900">
                            Booking reminders
                          </h4>
                          <p className="text-xs text-neutral-500">
                            Receive reminder emails before your scheduled
                            bookings
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            defaultChecked
                          />
                          <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between py-3 border-b border-neutral-200">
                        <div>
                          <h4 className="text-sm font-medium text-neutral-900">
                            Messages
                          </h4>
                          <p className="text-xs text-neutral-500">
                            Receive emails when you get new messages
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            defaultChecked
                          />
                          <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between py-3 border-b border-neutral-200">
                        <div>
                          <h4 className="text-sm font-medium text-neutral-900">
                            Promotions and tips
                          </h4>
                          <p className="text-xs text-neutral-500">
                            Receive emails about promotions, discounts and
                            travel tips
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between py-3">
                        <div>
                          <h4 className="text-sm font-medium text-neutral-900">
                            Account updates
                          </h4>
                          <p className="text-xs text-neutral-500">
                            Receive important updates about your account and our
                            service
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            defaultChecked
                          />
                          <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Push Notifications Section */}
                  <div>
                    <h3 className="text-lg font-medium text-neutral-900 mb-4">
                      Push Notifications
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-3 border-b border-neutral-200">
                        <div>
                          <h4 className="text-sm font-medium text-neutral-900">
                            Booking updates
                          </h4>
                          <p className="text-xs text-neutral-500">
                            Receive notifications about your bookings status
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            defaultChecked
                          />
                          <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between py-3 border-b border-neutral-200">
                        <div>
                          <h4 className="text-sm font-medium text-neutral-900">
                            Messages
                          </h4>
                          <p className="text-xs text-neutral-500">
                            Receive notifications for new messages
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            defaultChecked
                          />
                          <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between py-3">
                        <div>
                          <h4 className="text-sm font-medium text-neutral-900">
                            Special offers
                          </h4>
                          <p className="text-xs text-neutral-500">
                            Receive notifications about special offers and
                            discounts
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                      Save preferences
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "privacy" && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-neutral-900 mb-6">
                    Privacy Settings
                  </h2>

                  {/* Data Sharing Section */}
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-neutral-900 mb-4">
                      Data Sharing & Personalization
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-3 border-b border-neutral-200">
                        <div>
                          <h4 className="text-sm font-medium text-neutral-900">
                            Personalized recommendations
                          </h4>
                          <p className="text-xs text-neutral-500">
                            Allow us to use your browsing history and
                            preferences to show personalized recommendations
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            defaultChecked
                          />
                          <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between py-3 border-b border-neutral-200">
                        <div>
                          <h4 className="text-sm font-medium text-neutral-900">
                            Analytics cookies
                          </h4>
                          <p className="text-xs text-neutral-500">
                            Allow us to collect analytics data to improve our
                            services
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            defaultChecked
                          />
                          <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between py-3 border-b border-neutral-200">
                        <div>
                          <h4 className="text-sm font-medium text-neutral-900">
                            Third-party data sharing
                          </h4>
                          <p className="text-xs text-neutral-500">
                            Allow us to share anonymized data with trusted third
                            parties
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Profile Visibility Section */}
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-neutral-900 mb-4">
                      Profile Visibility
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-3 border-b border-neutral-200">
                        <div>
                          <h4 className="text-sm font-medium text-neutral-900">
                            Show my profile to
                          </h4>
                          <p className="text-xs text-neutral-500">
                            Control who can see your profile information
                          </p>
                        </div>
                        <select className="bg-white border border-neutral-300 text-neutral-700 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5">
                          <option value="everyone">Everyone</option>
                          <option value="hosts">Only hosts I book with</option>
                          <option value="nobody">Nobody</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-between py-3 border-b border-neutral-200">
                        <div>
                          <h4 className="text-sm font-medium text-neutral-900">
                            Show activity status
                          </h4>
                          <p className="text-xs text-neutral-500">
                            Let others see when you're online
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            defaultChecked
                          />
                          <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Data Management Section */}
                  <div>
                    <h3 className="text-lg font-medium text-neutral-900 mb-4">
                      Data Management
                    </h3>
                    <div className="space-y-6">
                      <div className="border border-neutral-200 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-neutral-900 mb-2">
                          Download your data
                        </h4>
                        <p className="text-xs text-neutral-500 mb-4">
                          Get a copy of all the personal data we have stored for
                          your account.
                        </p>
                        <button className="text-sm bg-neutral-100 hover:bg-neutral-200 text-neutral-700 py-2 px-4 rounded">
                          Request data export
                        </button>
                      </div>

                      <div className="border border-neutral-200 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-neutral-900 mb-2">
                          Delete your account
                        </h4>
                        <p className="text-xs text-neutral-500 mb-4">
                          Permanently delete your account and all associated
                          data. This action cannot be undone.
                        </p>
                        <button className="text-sm bg-red-100 hover:bg-red-200 text-red-700 py-2 px-4 rounded">
                          Delete account
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                      Save privacy settings
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
