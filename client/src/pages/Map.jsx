"use client";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Leaflet marker icons fix (using CDN)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const PropertyMap = () => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const baseUrl = process.env.REACT_APP_API_URL || "/api";
        const apiUrl = baseUrl.startsWith("http")
          ? `${baseUrl}/properties/${id}`
          : `http://localhost:8000/api/properties/${id}`;

        const response = await axios.get(apiUrl);
        if (response.data) {
          setProperty(response.data);
        } else {
          setError("No property data received");
        }
      } catch (err) {
        console.error("Error fetching property:", err);
        setError(err.response?.data?.message || "Failed to load property data");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  // ✅ Default coordinates if location is missing
  const defaultCoords = [28.6139, 77.209]; // Delhi
  const mapCenter =
    property?.location?.latitude && property?.location?.longitude
      ? [property.location.latitude, property.location.longitude]
      : defaultCoords;

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="container mx-auto px-4">
        {/* Back button */}
        <Link
          to={`/property/${id}`}
          className="inline-flex items-center text-neutral-600 hover:text-primary-600 mb-6 transition-colors"
        >
          <svg
            className="mr-2 h-5 w-5"
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
          Back to Property
        </Link>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">
            {property?.title || "Property Location"}
          </h1>
          <p className="text-neutral-600 mb-6">
            View the property location on the map below.
          </p>

          {loading ? (
            <div className="flex justify-center items-center h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
              <div className="mt-4">
                <p className="text-sm">Showing default location:</p>
                <div className="mt-2">
                  <MapContainer
                    center={defaultCoords}
                    zoom={13}
                    style={{ height: "300px", width: "100%" }}
                    className="rounded-lg"
                    whenCreated={(map) => {
                      setTimeout(() => map.invalidateSize(), 100);
                    }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={defaultCoords}>
                      <Popup>Default Location</Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <MapContainer
                center={mapCenter}
                zoom={13}
                style={{ height: "400px", width: "100%" }}
                className="rounded-lg"
                whenCreated={(map) => {
                  setTimeout(() => map.invalidateSize(), 100);
                }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={mapCenter}>
                  <Popup>
                    <div>
                      <h3 className="font-semibold">
                        {property?.title || "Property Location"}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {property?.location?.address || "Address not available"}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>

              <div className="bg-neutral-50 p-6 rounded-lg">
                <h2 className="text-lg font-semibold text-neutral-800 mb-3">
                  Location Details
                </h2>
                <div className="space-y-2">
                  <p className="text-neutral-700">
                    <span className="font-medium">Address:</span>{" "}
                    {property?.location?.address || "Address not available"}
                  </p>
                  <p className="text-neutral-700">
                    <span className="font-medium">City:</span>{" "}
                    {property?.location?.city || "City not available"}
                  </p>
                  <p className="text-neutral-700">
                    <span className="font-medium">State:</span>{" "}
                    {property?.location?.state || "State not available"}
                  </p>
                  <p className="text-neutral-700">
                    <span className="font-medium">Country:</span>{" "}
                    {property?.location?.country || "Country not available"}
                  </p>
                  <p className="text-neutral-700">
                    <span className="font-medium">Postal Code:</span>{" "}
                    {property?.location?.postalCode ||
                      "Postal code not available"}
                  </p>
                  <p className="text-neutral-700">
                    <span className="font-medium">Coordinates:</span>{" "}
                    {property?.location?.latitude &&
                    property?.location?.longitude
                      ? `${property.location.latitude}, ${property.location.longitude}`
                      : "Coordinates not available"}
                  </p>
                </div>
              </div>

              <div className="bg-neutral-50 p-6 rounded-lg">
                <h2 className="text-lg font-semibold text-neutral-800 mb-3">
                  Nearby Places
                </h2>
                <p className="text-neutral-600">
                  Location details and nearby places information will be
                  displayed here.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyMap;
