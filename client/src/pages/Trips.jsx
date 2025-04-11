/**
 * Trips Component
 * Displays user's trips organized by status (upcoming, current, past)
 * Features trip details, host information, and trip management options
 * Includes review functionality for completed trips
 */
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Trips = () => {
  const location = useLocation();
  // State management for tabs and review modal
  const [activeTab, setActiveTab] = useState("upcoming"); // Track active tab selection
  const [showReviewModal, setShowReviewModal] = useState(false); // Control review modal visibility
  const [currentReviewTrip, setCurrentReviewTrip] = useState(null); // Track which trip is being reviewed
  const [reviewData, setReviewData] = useState({
    rating: 5, // Default to 5-star rating
    comment: "", // User's review text
  });

  // Initialize trips state with empty arrays
  const [trips, setTrips] = useState({
    upcoming: [

      {
        id: 1,
        property: {
          name: "Luxury Apartment with Ocean View",
          image:
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
          location: "Miami, FL",
          rating: 4.9,
        },
        host: {
          name: "Sarah Johnson",
          image: "https://randomuser.me/api/portraits/women/44.jpg",
        },
        dates: {
          checkin: "Jun 15, 2023",
          checkout: "Jun 20, 2023",
        },
        guests: 2,
        totalPrice: "$1,250",
        status: "confirmed", // Trip is confirmed but not started
      },
      {
        id: 2,
        property: {
          name: "Modern Loft in Art District",
          image:
            "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
          location: "New York, NY",
          rating: 4.7,
        },
        host: {
          name: "Michael Brown",
          image: "https://randomuser.me/api/portraits/men/67.jpg",
        },
        dates: {
          checkin: "Jul 10, 2023",
          checkout: "Jul 15, 2023",
        },
        guests: 3,
        totalPrice: "$950",
        status: "pending", // Trip is pending host approval
      },
    ], // No active trips in this example
    current: [],
    past: [
      {
        id: 3,
        property: {
          name: "Beachfront Villa with Pool",
          image:
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
          location: "Malibu, CA",
          rating: 5.0,
        },
        host: {
          name: "John Smith",
          image: "https://randomuser.me/api/portraits/men/32.jpg",
        },
        dates: {
          checkin: "May 5, 2023",
          checkout: "May 10, 2023",
        },
        guests: 4,
        totalPrice: "$2,100",
        status: "completed", // Trip is completed, eligible for review
      },
    ],
  });

  // Effect to handle successful payment and add new trip
  useEffect(() => {
    if (location.state?.paymentSuccess && location.state?.propertyId) {
      // Get property from session storage
      const propertyData = JSON.parse(
        sessionStorage.getItem("currentProperty")
      );

      if (propertyData) {
        // Check if property already exists in upcoming trips
        const propertyExists = trips.upcoming.some(
          (trip) => trip.property.name === propertyData.title
        );

        // Only add if property doesn't exist
        if (!propertyExists) {
          // Create new trip object
          const newTrip = {
            id: Date.now(), // Generate unique ID
            property: {
              name: propertyData.title,
              image:
                propertyData.images?.[0] || "https://via.placeholder.com/400",
              location: `${propertyData.location?.city || ""}, ${
                propertyData.location?.country || ""
              }`,
              rating: propertyData.averageRating || 5.0,
            },
            host: {
              name: propertyData.host?.name || "Host",
              image:
                propertyData.host?.image ||
                "https://randomuser.me/api/portraits/men/1.jpg",
            },
            dates: {
              checkin: new Date(
                Date.now() + 7 * 24 * 60 * 60 * 1000
              ).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }),
              checkout: new Date(
                Date.now() + 12 * 24 * 60 * 60 * 1000
              ).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }),
            },
            guests: 2,
            totalPrice: `$${(
              propertyData.price * 5 +
              60 +
              75
            ).toLocaleString()}`,
            status: "confirmed",
          };

          // Add new trip to upcoming trips using functional update
          setTrips((prevTrips) => {
            // Check again if property exists in the current state
            const exists = prevTrips.upcoming.some(
              (trip) => trip.property.name === propertyData.title
            );

            if (exists) {
              console.log("Property already exists in upcoming trips");
              return prevTrips;
            }

            return {
              ...prevTrips,
              upcoming: [newTrip, ...prevTrips.upcoming],
            };
          });

          // Set active tab to upcoming
          setActiveTab("upcoming");
        } else {
          // Property already exists in upcoming trips
          console.log("Property already booked in upcoming trips");
        }
      }
    }
  }, [location.state?.paymentSuccess, location.state?.propertyId]); // Only run when payment success or property ID changes

  /**
   * Opens the review modal for a specific trip
   * @param {Object} trip - The trip being reviewed
   */
  const handleOpenReviewModal = (trip) => {
    setCurrentReviewTrip(trip);
    setShowReviewModal(true);
    // Reset review data to defaults
    setReviewData({
      rating: 5,
      comment: "",
    });
  };

  /**
   * Closes the review modal and resets state
   */
  const handleCloseReviewModal = () => {
    setShowReviewModal(false);
    setCurrentReviewTrip(null);
  };

  /**
   * Handles review submission
   * @param {Event} e - Form submit event
   */
  const handleSubmitReview = (e) => {
    e.preventDefault();
    // In a real app, this would make an API call to submit the review
    alert(
      `Review submitted: ${reviewData.rating} stars, "${reviewData.comment}"`
    );
    handleCloseReviewModal();
  };

  /**
   * Updates review data as user inputs changes
   * @param {Event} e - Input change event
   */
  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prev) => ({
      ...prev,
      [name]: name === "rating" ? parseInt(value) : value,
    }));
  };

  /**
   * Renders an individual trip card
   * @param {Object} trip - Trip data to render
   * @returns {JSX.Element} - Trip card UI
   */
  const renderTripCard = (trip) => {
    return (
      <div
        key={trip.id}
        className="bg-white rounded-lg shadow-sm overflow-hidden mb-6"
      >
        <div className="md:flex">
          {/* Property Image Section */}
          <div className="md:flex-shrink-0 md:w-1/3">
            <img
              className="h-48 w-full object-cover md:h-full"
              src={trip.property.image}
              alt={trip.property.name}
            />
          </div>
          <div className="p-6 md:w-2/3">
            {/* Property Information Header */}
            <div className="flex justify-between items-start">
              <div>
                {/* Property Name */}
                <h3 className="text-lg font-medium text-neutral-900">
                  {trip.property.name}
                </h3>
                {/* Property Location */}
                <p className="mt-1 text-sm text-neutral-600">
                  {trip.property.location}
                </p>
                {/* Property Rating */}
                <div className="mt-1 flex items-center">
                  <svg
                    className="h-4 w-4 text-primary-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 15.585l-7.071 3.535a1 1 0 01-1.414-1.414l3.535-7.071-3.535-7.071a1 1 0 011.414-1.414l7.071 3.535 7.071-3.535a1 1 0 011.414 1.414l-3.535 7.071 3.535 7.071a1 1 0 01-1.414 1.414L10 15.585z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-1 text-sm text-neutral-700">
                    {trip.property.rating} rating
                  </span>
                </div>
              </div>
              {/* Trip Status Badge - Visual indicator of trip status */}
              <div className="ml-4 flex-shrink-0">
                <span
                  className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    trip.status === "confirmed"
                      ? "bg-green-100 text-green-800"
                      : trip.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-neutral-100 text-neutral-800"
                  }`}
                >
                  {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                </span>
              </div>
            </div>

            {/* Trip Details Section - Shows booking information */}
            <div className="mt-4 border-t border-neutral-200 pt-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Check-in Date */}
                <div>
                  <h4 className="text-xs font-medium text-neutral-500 uppercase">
                    Check-in
                  </h4>
                  <p className="mt-1 text-sm font-medium text-neutral-900">
                    {trip.dates.checkin}
                  </p>
                </div>
                {/* Check-out Date */}
                <div>
                  <h4 className="text-xs font-medium text-neutral-500 uppercase">
                    Check-out
                  </h4>
                  <p className="mt-1 text-sm font-medium text-neutral-900">
                    {trip.dates.checkout}
                  </p>
                </div>
                {/* Number of Guests */}
                <div>
                  <h4 className="text-xs font-medium text-neutral-500 uppercase">
                    Guests
                  </h4>
                  <p className="mt-1 text-sm font-medium text-neutral-900">
                    {trip.guests} {trip.guests === 1 ? "guest" : "guests"}
                  </p>
                </div>
                {/* Total Price */}
                <div>
                  <h4 className="text-xs font-medium text-neutral-500 uppercase">
                    Total price
                  </h4>
                  <p className="mt-1 text-sm font-medium text-neutral-900">
                    {trip.totalPrice}
                  </p>
                </div>
              </div>
            </div>

            {/* Host Information and Action Buttons */}
            <div className="mt-6 flex items-center justify-between">
              {/* Host Profile - Shows host picture and name */}
              <div className="flex items-center">
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src={trip.host.image}
                  alt={trip.host.name}
                />
                <p className="ml-2 text-sm text-neutral-700">
                  Hosted by{" "}
                  <span className="font-medium">{trip.host.name}</span>
                </p>
              </div>

              {/* Action Buttons - Contextual actions based on trip status */}
              <div className="flex space-x-2">
                {/* Message Host Button - Available for all trips */}
                <Link
                  to={`/messages?property=${trip.id}`}
                  className="inline-flex items-center px-3 py-1.5 border border-neutral-300 text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50"
                >
                  <svg
                    className="-ml-0.5 mr-1.5 h-4 w-4 text-neutral-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                  Message
                </Link>

                {/* Manage/View Trip Button - Only for active/upcoming trips */}
                {trip.status !== "completed" && (
                  <Link
                    to={`/trips/${trip.id}/manage`}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 cursor-pointer"
                  >
                    {trip.status === "confirmed" ? "Manage" : "View"}
                  </Link>
                )}

                {/* Leave Review Button - Only for completed trips */}
                {trip.status === "completed" && (
                  <button
                    onClick={() => handleOpenReviewModal(trip)}
                    className="inline-flex items-center px-3 py-1.5 border border-neutral-300 text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50"
                  >
                    <svg
                      className="-ml-0.5 mr-1.5 h-4 w-4 text-neutral-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                    Leave a review
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="container mx-auto px-4">
        {/* Page Title */}
        <h1 className="text-2xl font-bold text-neutral-800 mb-6">Trips</h1>

        {/* Tab Navigation - Switch between upcoming, current, and past trips */}
        <div className="border-b border-neutral-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {/* Upcoming Trips Tab Button */}
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "upcoming"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
              }`}
            >
              Upcoming
              {trips.upcoming.length > 0 && (
                <span className="ml-2 py-0.5 px-2 rounded-full text-xs bg-primary-100 text-primary-700">
                  {trips.upcoming.length}
                </span>
              )}
            </button>

            {/* Current Trips Tab Button */}
            <button
              onClick={() => setActiveTab("current")}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "current"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
              }`}
            >
              Current
              {trips.current.length > 0 && (
                <span className="ml-2 py-0.5 px-2 rounded-full text-xs bg-primary-100 text-primary-700">
                  {trips.current.length}
                </span>
              )}
            </button>

            {/* Past Trips Tab Button */}
            <button
              onClick={() => setActiveTab("past")}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "past"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
              }`}
            >
              Past
              {trips.past.length > 0 && (
                <span className="ml-2 py-0.5 px-2 rounded-full text-xs bg-neutral-100 text-neutral-700">
                  {trips.past.length}
                </span>
              )}
            </button>
          </nav>
        </div>

        {/* Trip List Content Area - Shows trips or empty state */}
        <div>
          {/* Conditionally render trip cards or empty state message */}
          {trips[activeTab].length > 0 ? (
            trips[activeTab].map((trip) => renderTripCard(trip))
          ) : (
            <div className="text-center py-12">
              {/* Empty state icon */}
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
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
              {/* Empty state title */}
              <h3 className="mt-2 text-sm font-medium text-neutral-900">
                No {activeTab} trips
              </h3>
              {/* Empty state description */}
              <p className="mt-1 text-sm text-neutral-500">
                You don't have any {activeTab} trips.
              </p>
              {/* Call-to-action button to explore listings */}
              <div className="mt-6">
                <Link
                  to="/listings"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
                >
                  Explore places to stay
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Review Modal - Appears when user clicks "Leave a review" */}
      {showReviewModal && currentReviewTrip && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden">
            {/* Modal Header */}
            <div className="bg-neutral-50 px-6 py-4 border-b border-neutral-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-neutral-900">
                  Review your stay
                </h3>
                <button
                  onClick={handleCloseReviewModal}
                  className="text-neutral-400 hover:text-neutral-500"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Property Info - Shows which property is being reviewed */}
            <div className="px-6 py-4 border-b border-neutral-200">
              <div className="flex items-center">
                <img
                  className="h-16 w-16 object-cover rounded"
                  src={currentReviewTrip.property.image}
                  alt={currentReviewTrip.property.name}
                />
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-neutral-900">
                    {currentReviewTrip.property.name}
                  </h4>
                  <p className="text-sm text-neutral-500">
                    {currentReviewTrip.property.location}
                  </p>
                  <p className="text-sm text-neutral-500">
                    {currentReviewTrip.dates.checkin} to{" "}
                    {currentReviewTrip.dates.checkout}
                  </p>
                </div>
              </div>
            </div>

            {/* Review Form - Rating and comment fields */}
            <form onSubmit={handleSubmitReview} className="px-6 py-4">
              {/* Rating - 5-star selection system */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Rating
                </label>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() =>
                        setReviewData({ ...reviewData, rating: star })
                      }
                      className="focus:outline-none"
                    >
                      <svg
                        className={`h-8 w-8 ${
                          reviewData.rating >= star
                            ? "text-yellow-400" // Filled star
                            : "text-neutral-300" // Empty star
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-neutral-500">
                    {reviewData.rating} out of 5 stars
                  </span>
                </div>
              </div>

              {/* Review Comment - Text area for detailed feedback */}
              <div className="mb-4">
                <label
                  htmlFor="comment"
                  className="block text-sm font-medium text-neutral-700 mb-2"
                >
                  Your review
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  rows={4}
                  value={reviewData.comment}
                  onChange={handleReviewChange}
                  placeholder="Share your experience at this property..."
                  className="block w-full border border-neutral-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  required
                />
              </div>

              {/* Action Buttons - Submit or cancel review */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseReviewModal}
                  className="mr-3 inline-flex items-center px-4 py-2 border border-neutral-300 text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
                >
                  Submit review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trips;
