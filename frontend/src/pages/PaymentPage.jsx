import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: "",
  });
  const [bookingDetails, setBookingDetails] = useState({
    checkIn: "",
    checkOut: "",
    guests: 1,
  });

  useEffect(() => {
    // Check if property data is passed through location state
    if (location.state?.property) {
      setProperty(location.state.property);
      setLoading(false);
    } else if (location.state?.propertyId) {
      // If only ID is passed, fetch the property details
      fetchPropertyDetails(location.state.propertyId);
    } else {
      setError(true);
      setLoading(false);
    }
  }, [location]);

  const fetchPropertyDetails = async (id) => {
    try {
      const baseUrl = process.env.REACT_APP_API_URL || "/api";
      const apiUrl = baseUrl.startsWith("http")
        ? `${baseUrl}/properties/${id}`
        : `http://localhost:8000/api/properties/${id}`;

      const response = await axios.get(apiUrl);
      setProperty(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching property details:", err);
      setError(true);
      setLoading(false);
    }
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    try {
      // Here you would typically integrate with a payment processor
      console.log("Processing payment:", {
        paymentDetails,
        bookingDetails,
        property: property?._id,
      });

      // For now, simulate a successful payment
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Navigate to success page or trips page
      navigate("/trips", {
        state: {
          paymentSuccess: true,
          propertyId: property?._id,
        },
      });
    } catch (error) {
      console.error("Payment error:", error);
      // Handle payment error (show error message, etc.)
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Loading Payment Details...
            </h2>
            <div className="animate-pulse mt-8">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-8 mx-auto"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
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
              Error Loading Payment Details
            </h2>
            <p className="text-gray-600 mb-6">
              We couldn't load the payment details. Please try again.
            </p>
            <button
              onClick={() => navigate(-1)}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Payment Details
            </h2>
            <form onSubmit={handlePaymentSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  value={paymentDetails.cardNumber}
                  onChange={(e) =>
                    setPaymentDetails({
                      ...paymentDetails,
                      cardNumber: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    value={paymentDetails.expiryDate}
                    onChange={(e) =>
                      setPaymentDetails({
                        ...paymentDetails,
                        expiryDate: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CVV
                  </label>
                  <input
                    type="text"
                    value={paymentDetails.cvv}
                    onChange={(e) =>
                      setPaymentDetails({
                        ...paymentDetails,
                        cvv: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="123"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  value={paymentDetails.name}
                  onChange={(e) =>
                    setPaymentDetails({
                      ...paymentDetails,
                      name: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
              >
                Pay ${property.price * 5 + 60 + 75}
              </button>
            </form>
          </div>

          {/* Booking Summary */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Booking Summary
            </h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden">
                  {property.images && property.images.length > 0 ? (
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <i className="fas fa-home text-gray-400 text-2xl"></i>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {property.title}
                  </h3>
                  <p className="text-gray-600">
                    {property.location?.city}, {property.location?.country}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      ${property.price} x 5 nights
                    </span>
                    <span className="text-gray-900">${property.price * 5}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cleaning fee</span>
                    <span className="text-gray-900">$60</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service fee</span>
                    <span className="text-gray-900">$75</span>
                  </div>
                  <div className="flex justify-between pt-4 border-t border-gray-200 font-semibold">
                    <span>Total</span>
                    <span>${property.price * 5 + 60 + 75}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
