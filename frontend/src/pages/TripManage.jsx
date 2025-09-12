import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

/**
 * Trip Management Page
 * Handles both viewing and managing trip details
 */
const TripManage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [trip, setTrip] = useState(null);
  const [error, setError] = useState("");

  // Mock data for the trip - in a real app, this would be fetched from an API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // Mock trip data based on ID
      const mockTrip = {
        id: parseInt(id),
        property: {
          name: "Luxury Apartment with Ocean View",
          image:
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
          location: "Miami, FL",
          address: "123 Ocean Drive, Miami, FL 33139",
          rating: 4.9,
        },
        host: {
          name: "Sarah Johnson",
          image: "https://randomuser.me/api/portraits/women/44.jpg",
          phone: "+1 (555) 123-4567",
          email: "sarah.johnson@example.com",
        },
        dates: {
          checkin: "Jun 15, 2023",
          checkout: "Jun 20, 2023",
          checkinTime: "3:00 PM",
          checkoutTime: "11:00 AM",
        },
        guests: 2,
        totalPrice: "$1,250",
        status: id % 2 === 0 ? "pending" : "confirmed", // Alternate between statuses based on ID
        paymentMethod: "Visa ending in 4242",
        amenities: [
          "Wi-Fi",
          "Kitchen",
          "Pool",
          "Air conditioning",
          "Free parking",
        ],
        houseRules: [
          "Check-in: 3:00 PM - 8:00 PM",
          "Checkout: 11:00 AM",
          "No smoking",
          "No pets",
          "No parties or events",
        ],
        cancellationPolicy:
          "Free cancellation for 48 hours. After that, cancel before Jun 8 for a partial refund.",
      };

      setTrip(mockTrip);
      setLoading(false);
    }, 1000);
  }, [id]);

  // Handle trip cancellation
  const handleCancelTrip = () => {
    if (window.confirm("Are you sure you want to cancel this trip?")) {
      // In a real app, this would make an API call to cancel the trip
      alert("Your trip has been cancelled successfully.");
      navigate("/trips");
    }
  };

  // Handle trip modification
  const handleModifyTrip = () => {
    // In a real app, this would navigate to a form to modify the trip details
    alert("Trip modification is not available in this demo.");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center py-12">
            <h2 className="text-xl font-medium text-red-600">Error</h2>
            <p className="mt-2 text-neutral-600">{error}</p>
            <Link
              to="/trips"
              className="mt-4 inline-block text-primary-600 hover:text-primary-700"
            >
              Back to trips
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen bg-neutral-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center py-12">
            <h2 className="text-xl font-medium text-neutral-900">
              Trip not found
            </h2>
            <p className="mt-2 text-neutral-600">
              The trip you're looking for doesn't exist.
            </p>
            <Link
              to="/trips"
              className="mt-4 inline-block text-primary-600 hover:text-primary-700"
            >
              Back to trips
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header with navigation */}
        <div className="mb-6">
          <Link
            to="/trips"
            className="inline-flex items-center text-sm text-primary-600 hover:text-primary-700"
          >
            <svg
              className="mr-1 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to trips
          </Link>
        </div>

        {/* Trip status banner */}
        <div
          className={`mb-6 rounded-lg p-4 ${
            trip.status === "confirmed" ? "bg-green-100" : "bg-yellow-100"
          }`}
        >
          <div className="flex items-center">
            <svg
              className={`h-5 w-5 ${
                trip.status === "confirmed"
                  ? "text-green-500"
                  : "text-yellow-500"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              {trip.status === "confirmed" ? (
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              )}
            </svg>
            <span
              className={`ml-2 text-sm font-medium ${
                trip.status === "confirmed"
                  ? "text-green-800"
                  : "text-yellow-800"
              }`}
            >
              {trip.status === "confirmed"
                ? "Your reservation is confirmed"
                : "Your reservation is pending approval"}
            </span>
          </div>
        </div>

        {/* Main content */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Property image and details header */}
          <div className="relative">
            <img
              className="w-full h-64 object-cover"
              src={trip.property.image}
              alt={trip.property.name}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
              <div className="p-6 text-white">
                <h1 className="text-2xl font-bold">{trip.property.name}</h1>
                <p className="mt-1">{trip.property.location}</p>
              </div>
            </div>
          </div>

          {/* Trip details */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left column - Dates, guests, cost */}
              <div>
                <h2 className="text-lg font-medium text-neutral-900 mb-4">
                  Reservation Details
                </h2>

                <div className="space-y-4">
                  {/* Date information */}
                  <div className="border-b border-neutral-200 pb-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-neutral-500">
                          Check-in
                        </h3>
                        <p className="mt-1 text-neutral-900">
                          {trip.dates.checkin}
                        </p>
                        <p className="text-sm text-neutral-500">
                          {trip.dates.checkinTime}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-neutral-500">
                          Check-out
                        </h3>
                        <p className="mt-1 text-neutral-900">
                          {trip.dates.checkout}
                        </p>
                        <p className="text-sm text-neutral-500">
                          {trip.dates.checkoutTime}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Guest information */}
                  <div className="border-b border-neutral-200 pb-4">
                    <h3 className="text-sm font-medium text-neutral-500">
                      Guests
                    </h3>
                    <p className="mt-1 text-neutral-900">
                      {trip.guests} {trip.guests === 1 ? "guest" : "guests"}
                    </p>
                  </div>

                  {/* Payment information */}
                  <div>
                    <h3 className="text-sm font-medium text-neutral-500">
                      Payment
                    </h3>
                    <p className="mt-1 text-neutral-900">
                      Total: {trip.totalPrice}
                    </p>
                    <p className="text-sm text-neutral-500">
                      {trip.paymentMethod}
                    </p>
                  </div>

                  {/* Cancellation policy */}
                  <div className="border-t border-neutral-200 pt-4">
                    <h3 className="text-sm font-medium text-neutral-500">
                      Cancellation Policy
                    </h3>
                    <p className="mt-1 text-sm text-neutral-700">
                      {trip.cancellationPolicy}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right column - Host, location, house rules */}
              <div>
                <h2 className="text-lg font-medium text-neutral-900 mb-4">
                  Host & Location
                </h2>

                {/* Host information */}
                <div className="border-b border-neutral-200 pb-4 mb-4">
                  <div className="flex items-center">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={trip.host.image}
                      alt={trip.host.name}
                    />
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-neutral-900">
                        {trip.host.name}
                      </h3>
                      <Link
                        to={`/messages?property=${trip.id}`}
                        className="text-sm text-primary-600 hover:text-primary-700"
                      >
                        Message host
                      </Link>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1 text-sm">
                    <p className="text-neutral-700">
                      <span className="font-medium">Email:</span>{" "}
                      {trip.host.email}
                    </p>
                    <p className="text-neutral-700">
                      <span className="font-medium">Phone:</span>{" "}
                      {trip.host.phone}
                    </p>
                  </div>
                </div>

                {/* Location information */}
                <div className="border-b border-neutral-200 pb-4 mb-4">
                  <h3 className="text-sm font-medium text-neutral-500">
                    Location
                  </h3>
                  <p className="mt-1 text-neutral-900">
                    {trip.property.address}
                  </p>
                  <div className="mt-3 h-32 bg-neutral-200 rounded-md flex items-center justify-center">
                    <span className="text-neutral-500">Map placeholder</span>
                  </div>
                </div>

                {/* House rules */}
                <div>
                  <h3 className="text-sm font-medium text-neutral-500">
                    House Rules
                  </h3>
                  <ul className="mt-2 space-y-1">
                    {trip.houseRules.map((rule, index) => (
                      <li
                        key={index}
                        className="text-sm text-neutral-700 flex items-start"
                      >
                        <svg
                          className="h-4 w-4 text-neutral-400 mr-2 mt-0.5 flex-shrink-0"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-8 border-t border-neutral-200 pt-6 flex flex-wrap gap-3 justify-end">
              {trip.status === "confirmed" && (
                <>
                  <button
                    onClick={handleModifyTrip}
                    className="inline-flex items-center px-4 py-2 border border-neutral-300 text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50"
                  >
                    Modify reservation
                  </button>
                  <button
                    onClick={handleCancelTrip}
                    className="inline-flex items-center px-4 py-2 border border-neutral-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-neutral-50"
                  >
                    Cancel reservation
                  </button>
                </>
              )}

              {trip.status === "pending" && (
                <button
                  onClick={handleCancelTrip}
                  className="inline-flex items-center px-4 py-2 border border-neutral-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-neutral-50"
                >
                  Cancel request
                </button>
              )}

              <Link
                to={`/properties/${trip.id}`}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
              >
                View property details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripManage;
