import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import PropertyImage from "../components/PropertyImage";
import StaticMap from "../components/StaticMap";
import { dummyProperties } from "../data/dummyProperties";

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [isSaved, setIsSaved] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showReserveModal, setShowReserveModal] = useState(false);
  const [showContinueButton, setShowContinueButton] = useState(false);
  const [review, setReview] = useState({
    rating: 5,
    comment: "",
  });
  const [reservation, setReservation] = useState({
    checkIn: "",
    checkOut: "",
    guests: 1,
  });
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        setLoading(true);
        setError(false);

        console.log("Fetching property with ID:", id);

        // First check if we have the property in session storage
        let sessionProperty = null;
        try {
          // Try to get property from session storage
          const storedProperty = sessionStorage.getItem("currentProperty");
          const storedPropertyId = sessionStorage.getItem(
            "lastViewedPropertyId"
          );

          if (storedProperty) {
            const parsedProperty = JSON.parse(storedProperty);

            // Verify this is the correct property by checking ID matches
            if (parsedProperty && String(parsedProperty._id) === String(id)) {
              console.log("Found matching property in session storage");
              sessionProperty = parsedProperty;

              // We found the property, set it and stop loading
              setProperty(sessionProperty);
              setLoading(false);
              console.log(
                "Using session storage property data:",
                sessionProperty
              );
              return;
            } else if (storedPropertyId === String(id)) {
              // IDs match but property object might be corrupted
              console.log(
                "Property ID matches but object is invalid. Fetching from API."
              );
            } else {
              console.log("Stored property doesn't match requested ID");
            }
          } else {
            console.log("No property data in session storage");
          }
        } catch (sessionError) {
          console.error("Error accessing session storage:", sessionError);
        }

        // If we didn't find a valid property in session storage, fetch from API
        console.log("Attempting to fetch property from API");
        const baseUrl = process.env.REACT_APP_API_URL || "/api";
        const apiUrl = baseUrl.startsWith("http")
          ? `${baseUrl}/properties/${id}`
          : `http://localhost:8000/api/properties/${id}`;

        try {
          const response = await axios.get(apiUrl);
          if (response.data) {
            console.log(
              "Successfully fetched property from API:",
              response.data
            );
            setProperty(response.data);
            setLoading(false);
            return;
          }
        } catch (mongoError) {
          console.log("API fetch error:", mongoError.message);

          // If API fetch fails, but we already have session property, use it as fallback
          if (sessionProperty) {
            console.log("Using session property as fallback");
            setProperty(sessionProperty);
            setLoading(false);
            return;
          }

          // If no session property, try dummy data
          console.log("Looking in dummy data for ID:", id);

          // Try to match ID, accounting for possible type differences
          let dummyProperty = dummyProperties.find(
            (p) => String(p._id) === String(id)
          );

          if (dummyProperty) {
            console.log("Found matching dummy property:", dummyProperty);
            setProperty(dummyProperty);
            setLoading(false);
            return;
          }

          // If we still don't have a property, use the first dummy property as a fallback
          if (dummyProperties.length > 0) {
            console.log("Using first dummy property as final fallback");
            setProperty(dummyProperties[0]);
            setLoading(false);
            return;
          }

          // If absolutely no properties available
          console.error("No property data available from any source");
          setLoading(false);
          setError(true);
        }
      } catch (err) {
        console.error("Error in property detail loading:", err);
        setLoading(false);
        setError(true);
      }
    };

    if (id) {
      fetchPropertyDetails();
    } else {
      console.error("No property ID provided in URL");
      setLoading(false);
      setError(true);
    }

    // Cleanup function
    return () => {
      // When navigating away, preserve the current property data
      if (property && !error) {
        try {
          // Store current property for potential navigation back
          sessionStorage.setItem("currentProperty", JSON.stringify(property));
          sessionStorage.setItem("lastViewedPropertyId", String(property._id));
          console.log("Preserved property data for navigation:", property._id);
        } catch (err) {
          console.error("Failed to preserve property data:", err);
        }
      }
    };
  }, [id]);

  useEffect(() => {
    const checkBookingStatus = async () => {
      try {
        const response = await axios.get(`/api/bookings/check/${id}`);
        setIsBooked(response.data.isConfirmed);
      } catch (error) {
        console.error("Error checking booking status:", error);
        setIsBooked(false);
      }
    };

    if (property) {
      checkBookingStatus();
    }
  }, [id, property]);

  const handleSave = async () => {
    try {
      // Here you would typically make an API call to save the property
      setIsSaved(!isSaved);
      // You can also add a toast notification here
    } catch (error) {
      console.error("Error saving property:", error);
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: property.title,
          text: property.description,
          url: window.location.href,
        });
      } else {
        setShowShareModal(true);
      }
    } catch (error) {
      console.error("Error sharing property:", error);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      // Here you would typically make an API call to submit the review
      console.log("Submitting review:", review);
      setShowReviewModal(false);
      setReview({ rating: 5, comment: "" });
      // You can also add a toast notification here
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const handleReserve = async (e) => {
    e.preventDefault();
    try {
      // Here you would typically make an API call to create a reservation
      console.log("Creating reservation:", reservation);
      setShowReserveModal(false);
      setReservation({ checkIn: "", checkOut: "", guests: 1 });
      // You can also add a toast notification here
    } catch (error) {
      console.error("Error creating reservation:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Loading Property Details...
            </h2>
            <div className="animate-pulse mt-8">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-8 mx-auto"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="h-96 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="grid grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-24 bg-gray-200 rounded-lg"
                      ></div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-32 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Property Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              We couldn't find the property you're looking for.
            </p>
            <Link
              to="/listings"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Return to Listings
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Back button */}
        <Link
          to="/"
          className="inline-flex items-center text-neutral-600 hover:text-primary-600 mb-6 transition-colors"
          onClick={() => window.history.back()}
        >
          <i className="fas fa-arrow-left mr-2"></i>
          Back to Home
        </Link>

        {/* Property Title */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-neutral-800 mb-2">
            {property.title}
          </h1>
          <div className="flex flex-wrap items-center text-neutral-600 gap-3">
            <div className="flex items-center">
              <i className="fas fa-star text-yellow-400 mr-1"></i>
              <span className="font-medium">
                {property.averageRating || 4.8}
              </span>
              <span className="mx-1">·</span>
              <span className="underline">32 reviews</span>
            </div>
            <span>·</span>
            <div className="flex items-center">
              <i className="fas fa-map-marker-alt mr-1 text-primary-600"></i>
              <span>
                {property.location && property.location.city
                  ? `${property.location.city}, ${
                      property.location.country || ""
                    }`
                  : "Location not specified"}
              </span>
            </div>
            <div className="ml-auto flex gap-3">
              <button
                onClick={handleSave}
                className={`flex items-center ${
                  isSaved
                    ? "text-red-600"
                    : "text-neutral-600 hover:text-primary-600"
                }`}
              >
                <i className={`${isSaved ? "fas" : "far"} fa-heart mr-1`}></i>
                {isSaved ? "Saved" : "Save"}
              </button>
              <button
                onClick={handleShare}
                className="flex items-center text-neutral-600 hover:text-primary-600"
              >
                <i className="fas fa-share mr-1"></i>
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Property Images */}
        <div className="mb-8 bg-white rounded-xl overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
            <div className="md:col-span-1 h-96 rounded-tl-xl rounded-bl-xl overflow-hidden">
              {property.images && property.images.length > 0 ? (
                <PropertyImage
                  images={property.images}
                  alt={property.title}
                  className="w-full h-full object-cover"
                  showGallery={true}
                  id={`property-image-main-${property._id}`}
                  propertyId={property._id}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-neutral-100">
                  <i className="fas fa-home text-6xl text-neutral-300"></i>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2 h-96">
              {property.images && property.images.length > 1
                ? property.images.slice(1, 5).map((image, index) => (
                    <div
                      key={`thumbnail-${index}`}
                      className={`relative h-[188px] overflow-hidden ${
                        index === 0 ? "rounded-tr-xl" : ""
                      } ${index === 3 ? "rounded-br-xl" : ""}`}
                    >
                      <PropertyImage
                        images={property.images}
                        alt={`${property.title} - ${index + 2}`}
                        className="w-full h-full object-cover"
                        showGallery={true}
                        id={`property-image-${index + 2}-${property._id}`}
                        propertyId={property._id}
                      />
                      {index === 3 && property.images.length > 5 && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <span className="text-white text-lg font-semibold">
                            +{property.images.length - 5} more
                          </span>
                        </div>
                      )}
                    </div>
                  ))
                : // Placeholder images with different categories
                  [
                    { id: 1, category: "bedroom" },
                    { id: 2, category: "kitchen" },
                    { id: 3, category: "bathroom" },
                    { id: 4, category: "living" },
                  ].map((item) => (
                    <div
                      key={`placeholder-${item.id}`}
                      className={`relative h-[188px] overflow-hidden bg-neutral-100 ${
                        item.id === 1 ? "rounded-tr-xl" : ""
                      } ${item.id === 4 ? "rounded-br-xl" : ""}`}
                    >
                      <PropertyImage
                        image={`https://source.unsplash.com/random/300x200?${item.category}`}
                        alt={`Additional view ${item.id}`}
                        className="w-full h-full object-cover"
                        showGallery={true}
                        id={`property-image-placeholder-${item.id}`}
                        propertyId={property._id}
                      />
                    </div>
                  ))}
            </div>
          </div>
        </div>

        {/* Property Info and Booking */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Host Info */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <div className="flex justify-between items-center border-b border-neutral-100 pb-6 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-neutral-800 mb-1">
                    {property.propertyType || "Entire place"} hosted by{" "}
                    {property.host?.name || "Host"}
                  </h2>
                  <div className="text-neutral-600">
                    {property.capacity?.guests || 4} guests ·{" "}
                    {property.capacity?.bedrooms || 2} bedrooms ·{" "}
                    {property.capacity?.beds || 2} beds ·{" "}
                    {property.capacity?.bathrooms || 1} bathrooms
                  </div>
                </div>
                <div className="w-14 h-14 rounded-full bg-neutral-100 flex items-center justify-center">
                  <i className="fas fa-user text-2xl text-neutral-400"></i>
                </div>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="flex items-start">
                  <i className="fas fa-medal text-xl text-neutral-600 mt-1 mr-4"></i>
                  <div>
                    <h3 className="font-medium text-neutral-800">
                      Experienced host
                    </h3>
                    <p className="text-sm text-neutral-600">
                      Hosted for over 5 years
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <i className="fas fa-key text-xl text-neutral-600 mt-1 mr-4"></i>
                  <div>
                    <h3 className="font-medium text-neutral-800">
                      Self check-in
                    </h3>
                    <p className="text-sm text-neutral-600">
                      Check in with keypad
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <i className="fas fa-map-marker-alt text-xl text-neutral-600 mt-1 mr-4"></i>
                  <div>
                    <h3 className="font-medium text-neutral-800">
                      Great location
                    </h3>
                    <p className="text-sm text-neutral-600">
                      95% of guests rated it 5-star
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <p className="text-neutral-700 leading-relaxed">
                  {property.description ||
                    "No description available for this property."}
                </p>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
              <div className="flex border-b border-neutral-200">
                <button
                  className={`px-6 py-4 font-medium text-sm ${
                    activeTab === "overview"
                      ? "text-primary-600 border-b-2 border-primary-600"
                      : "text-neutral-600"
                  }`}
                  onClick={() => setActiveTab("overview")}
                >
                  Overview
                </button>
                <button
                  className={`px-6 py-4 font-medium text-sm ${
                    activeTab === "amenities"
                      ? "text-primary-600 border-b-2 border-primary-600"
                      : "text-neutral-600"
                  }`}
                  onClick={() => setActiveTab("amenities")}
                >
                  Amenities
                </button>
                <button
                  className={`px-6 py-4 font-medium text-sm ${
                    activeTab === "reviews"
                      ? "text-primary-600 border-b-2 border-primary-600"
                      : "text-neutral-600"
                  }`}
                  onClick={() => setActiveTab("reviews")}
                >
                  Reviews
                </button>
                <button
                  className={`px-6 py-4 font-medium text-sm ${
                    activeTab === "location"
                      ? "text-primary-600 border-b-2 border-primary-600"
                      : "text-neutral-600"
                  }`}
                  onClick={() => setActiveTab("location")}
                >
                  Location
                </button>
              </div>

              <div className="p-6">
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-800 mb-3">
                        About this space
                      </h3>
                      <p className="text-neutral-700 leading-relaxed">
                        {property.description ||
                          "No description available for this property."}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-neutral-800 mb-3">
                        The space
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center">
                          <i className="fas fa-home text-neutral-500 mr-3"></i>
                          <span className="text-neutral-700">
                            {property.propertyType || "Entire home"} -{" "}
                            {property.size || 100} m²
                          </span>
                        </div>
                        <div className="flex items-center">
                          <i className="fas fa-user-friends text-neutral-500 mr-3"></i>
                          <span className="text-neutral-700">
                            {property.capacity?.guests || 4} guests maximum
                          </span>
                        </div>
                        <div className="flex items-center">
                          <i className="fas fa-bed text-neutral-500 mr-3"></i>
                          <span className="text-neutral-700">
                            {property.capacity?.bedrooms || 2} bedrooms ·{" "}
                            {property.capacity?.beds || 2} beds
                          </span>
                        </div>
                        <div className="flex items-center">
                          <i className="fas fa-bath text-neutral-500 mr-3"></i>
                          <span className="text-neutral-700">
                            {property.capacity?.bathrooms || 1} bathrooms
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "amenities" && (
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-800 mb-4">
                      What this place offers
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {property.amenities?.wifi && (
                        <div className="flex items-center">
                          <i className="fas fa-wifi text-neutral-500 mr-3"></i>
                          <span>WiFi</span>
                        </div>
                      )}
                      {property.amenities?.kitchen && (
                        <div className="flex items-center">
                          <i className="fas fa-utensils text-neutral-500 mr-3"></i>
                          <span>Kitchen</span>
                        </div>
                      )}
                      {property.amenities?.pool && (
                        <div className="flex items-center">
                          <i className="fas fa-swimming-pool text-neutral-500 mr-3"></i>
                          <span>Pool</span>
                        </div>
                      )}
                      {property.amenities?.parking && (
                        <div className="flex items-center">
                          <i className="fas fa-parking text-neutral-500 mr-3"></i>
                          <span>Free parking</span>
                        </div>
                      )}
                      {property.amenities?.ac && (
                        <div className="flex items-center">
                          <i className="fas fa-snowflake text-neutral-500 mr-3"></i>
                          <span>Air conditioning</span>
                        </div>
                      )}
                      {property.amenities?.petFriendly && (
                        <div className="flex items-center">
                          <i className="fas fa-paw text-neutral-500 mr-3"></i>
                          <span>Pet friendly</span>
                        </div>
                      )}
                      {property.amenities?.washer && (
                        <div className="flex items-center">
                          <i className="fas fa-tshirt text-neutral-500 mr-3"></i>
                          <span>Washer</span>
                        </div>
                      )}
                      {property.amenities?.dryer && (
                        <div className="flex items-center">
                          <i className="fas fa-wind text-neutral-500 mr-3"></i>
                          <span>Dryer</span>
                        </div>
                      )}
                      {property.amenities?.workspace && (
                        <div className="flex items-center">
                          <i className="fas fa-laptop text-neutral-500 mr-3"></i>
                          <span>Dedicated workspace</span>
                        </div>
                      )}
                      {property.amenities?.breakfast && (
                        <div className="flex items-center">
                          <i className="fas fa-coffee text-neutral-500 mr-3"></i>
                          <span>Breakfast</span>
                        </div>
                      )}
                      {property.amenities?.hotTub && (
                        <div className="flex items-center">
                          <i className="fas fa-hot-tub text-neutral-500 mr-3"></i>
                          <span>Hot tub</span>
                        </div>
                      )}
                      {property.amenities?.gym && (
                        <div className="flex items-center">
                          <i className="fas fa-dumbbell text-neutral-500 mr-3"></i>
                          <span>Gym</span>
                        </div>
                      )}
                      {/* Default amenities if none are specified */}
                      {!property.amenities ||
                        (Object.keys(property.amenities).length === 0 && (
                          <>
                            <div className="flex items-center">
                              <i className="fas fa-wifi text-neutral-500 mr-3"></i>
                              <span>WiFi</span>
                            </div>
                            <div className="flex items-center">
                              <i className="fas fa-utensils text-neutral-500 mr-3"></i>
                              <span>Kitchen</span>
                            </div>
                            <div className="flex items-center">
                              <i className="fas fa-parking text-neutral-500 mr-3"></i>
                              <span>Free parking</span>
                            </div>
                            <div className="flex items-center">
                              <i className="fas fa-snowflake text-neutral-500 mr-3"></i>
                              <span>Air conditioning</span>
                            </div>
                          </>
                        ))}
                    </div>
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <i className="fas fa-star text-yellow-400 text-xl mr-2"></i>
                        <span className="text-xl font-semibold">
                          {property.averageRating || 4.8}
                        </span>
                        <span className="mx-2">·</span>
                        <span className="text-neutral-700">32 reviews</span>
                      </div>
                      <button
                        onClick={() => setShowReviewModal(true)}
                        className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        Write a Review
                      </button>
                    </div>

                    <div className="space-y-6">
                      <p className="text-neutral-600">
                        No reviews available yet.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === "location" && (
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-800 mb-3">
                      Where you'll be
                    </h3>
                    <p className="text-neutral-700 mb-4">
                      {property.city
                        ? `${property.city}, ${property.state || ""}, ${property.country || ""}`
                        : "Location details not available"}
                    </p>
                    <div className="h-[400px] w-full rounded-lg overflow-hidden">
                      <StaticMap
                        address={isBooked ? property.address : undefined}
                        city={property.city}
                        state={property.state}
                        country={property.country}
                        isConfirmedBooking={isBooked}
                        zoom={13}
                      />
                    </div>
                    {!isBooked && (
                      <p className="mt-4 text-sm text-neutral-500">
                        <i className="fas fa-info-circle mr-2"></i>
                        Exact location will be provided after your booking is
                        confirmed
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* House Rules */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <h3 className="text-lg font-semibold text-neutral-800 mb-4">
                House Rules
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-neutral-700">
                <div className="flex items-start">
                  <i className="fas fa-clock text-neutral-500 mr-3 mt-1"></i>
                  <div>
                    <p className="font-medium">Check-in</p>
                    <p>After 3:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <i className="fas fa-clock text-neutral-500 mr-3 mt-1"></i>
                  <div>
                    <p className="font-medium">Checkout</p>
                    <p>Before 11:00 AM</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <i className="fas fa-user-friends text-neutral-500 mr-3 mt-1"></i>
                  <div>
                    <p className="font-medium">Guests</p>
                    <p>No unauthorized guests</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <i className="fas fa-smoking-ban text-neutral-500 mr-3 mt-1"></i>
                  <div>
                    <p className="font-medium">Smoking</p>
                    <p>Not allowed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-2xl font-bold text-neutral-800">
                    ${property.price || 100}
                  </span>
                  <span className="text-neutral-600"> / night</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-star text-yellow-400 mr-1"></i>
                  <span className="font-medium">
                    {property.averageRating || 4.8}
                  </span>
                  <span className="mx-1 text-neutral-400">·</span>
                  <span className="text-neutral-600 underline">32 reviews</span>
                </div>
              </div>

              {/* Booking Form */}
              <div className="border border-neutral-200 rounded-lg overflow-hidden mb-4">
                <div className="grid grid-cols-2">
                  <div className="p-4 border-r border-b border-neutral-200">
                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                      CHECK-IN
                    </label>
                    <input
                      type="date"
                      className="w-full border-none p-0 text-neutral-800 focus:ring-0"
                    />
                  </div>
                  <div className="p-4 border-b border-neutral-200">
                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                      CHECKOUT
                    </label>
                    <input
                      type="date"
                      className="w-full border-none p-0 text-neutral-800 focus:ring-0"
                    />
                  </div>
                </div>
                <div className="p-4">
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    GUESTS
                  </label>
                  <select className="w-full border-none p-0 text-neutral-800 focus:ring-0 bg-transparent">
                    <option>1 guest</option>
                    <option>2 guests</option>
                    <option>3 guests</option>
                    <option>4 guests</option>
                    <option>5 guests</option>
                    <option>6 guests</option>
                  </select>
                </div>
              </div>

              <button
                onClick={() => {
                  // Check if user is logged in
                  const isLoggedIn = localStorage.getItem("token"); // or however you check login status
                  if (!isLoggedIn) {
                    // Redirect to login page
                    window.location.href = "/login";
                    return;
                  }
                  // If logged in, show continue button
                  setShowContinueButton(true);
                  setShowReserveModal(true);
                }}
                className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors mb-4"
              >
                Reserve
              </button>

              {showContinueButton && (
                <button
                  onClick={() => {
                    // Navigate to payment page with property details
                    navigate("/payment", {
                      state: {
                        propertyId: property._id,
                        property: property,
                      },
                    });
                  }}
                  className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors mb-4"
                >
                  Continue to Payment
                </button>
              )}

              <p className="text-center text-neutral-600 text-sm mb-6">
                You won't be charged yet
              </p>

              {/* Price breakdown */}
              <div className="space-y-4 text-neutral-800">
                <div className="flex justify-between">
                  <span className="underline">
                    ${property.price || 100} x 5 nights
                  </span>
                  <span>${(property.price || 100) * 5}</span>
                </div>
                <div className="flex justify-between">
                  <span className="underline">Cleaning fee</span>
                  <span>$60</span>
                </div>
                <div className="flex justify-between">
                  <span className="underline">Service fee</span>
                  <span>$75</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-neutral-200 font-semibold">
                  <span>Total before taxes</span>
                  <span>${(property.price || 100) * 5 + 60 + 75}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Share Modal */}
        {showShareModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
              <h3 className="text-xl font-semibold mb-4">Share Property</h3>
              <div className="space-y-4">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    // Add toast notification
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  <i className="fas fa-link"></i>
                  Copy Link
                </button>
                <button
                  onClick={() =>
                    window.open(
                      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        window.location.href
                      )}`,
                      "_blank"
                    )
                  }
                  className="w-full flex items-center justify-center gap-2 bg-blue-800 text-white py-2 rounded-lg hover:bg-blue-900"
                >
                  <i className="fab fa-facebook"></i>
                  Share on Facebook
                </button>
                <button
                  onClick={() =>
                    window.open(
                      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                        window.location.href
                      )}&text=${encodeURIComponent(property.title)}`,
                      "_blank"
                    )
                  }
                  className="w-full flex items-center justify-center gap-2 bg-blue-400 text-white py-2 rounded-lg hover:bg-blue-500"
                >
                  <i className="fab fa-twitter"></i>
                  Share on Twitter
                </button>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="w-full py-2 text-neutral-600 hover:text-neutral-800"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Review Modal */}
        {showReviewModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
              <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Rating
                  </label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReview({ ...review, rating: star })}
                        className="text-2xl focus:outline-none"
                      >
                        <i
                          className={`fas fa-star ${
                            star <= review.rating
                              ? "text-yellow-400"
                              : "text-neutral-300"
                          }`}
                        ></i>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Comment
                  </label>
                  <textarea
                    value={review.comment}
                    onChange={(e) =>
                      setReview({ ...review, comment: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    rows="4"
                    required
                  ></textarea>
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700"
                  >
                    Submit Review
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowReviewModal(false)}
                    className="flex-1 py-2 text-neutral-600 hover:text-neutral-800"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Reserve Modal */}
        {/* {showReserveModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
              <h3 className="text-xl font-semibold mb-4">Reserve Property</h3>
              <form onSubmit={handleReserve} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Check-in
                    </label>
                    <input
                      type="date"
                      value={reservation.checkIn}
                      onChange={(e) =>
                        setReservation({
                          ...reservation,
                          checkIn: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Check-out
                    </label>
                    <input
                      type="date"
                      value={reservation.checkOut}
                      onChange={(e) =>
                        setReservation({
                          ...reservation,
                          checkOut: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Number of Guests
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={reservation.guests}
                    onChange={(e) =>
                      setReservation({
                        ...reservation,
                        guests: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700"
                  >
                    Reserve Now
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowReserveModal(false)}
                    className="flex-1 py-2 text-neutral-600 hover:text-neutral-800"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default PropertyDetail;
