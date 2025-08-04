import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import ClientOnly from "./ClientOnly";

// Fix Leaflet's default icon issue
const DefaultIcon = L.icon({
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  iconShadow: require("leaflet/dist/images/marker-shadow.png"),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const LoadingSpinner = () => (
  <div className="h-[400px] w-full bg-neutral-100 rounded-lg flex items-center justify-center">
    <div className="flex flex-col items-center">
      <div className="h-12 w-12 animate-spin border-4 border-neutral-300 border-t-primary-500 rounded-full mb-4"></div>
      <p className="text-neutral-500">Loading map...</p>
    </div>
  </div>
);

const StaticMap = ({ address, city, state, country, zoom = 13, isConfirmedBooking = false }) => {
  const [position, setPosition] = useState([40.7128, -74.006]); // New York as fallback
  const [loading, setLoading] = useState(false);
  const [locationName, setLocationName] = useState("");

  useEffect(() => {
    const locationQuery = [city, state, country].filter(Boolean).join(", ");
    if (!locationQuery) return;

    setLoading(true);
    // Use less precise location when not a confirmed booking
    const searchQuery = isConfirmedBooking ? [address, locationQuery].filter(Boolean).join(", ") : locationQuery;

    fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        searchQuery
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setPosition([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
          // Set location name based on booking status
          setLocationName(isConfirmedBooking 
            ? [address, city, state, country].filter(Boolean).join(", ")
            : [city, state, country].filter(Boolean).join(", "));
        }
      })
      .catch((error) => {
        console.error("Geocoding error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [address, city, state, country, isConfirmedBooking]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="h-[400px] w-full bg-neutral-100 rounded-lg">
      <ClientOnly>
        <div className="h-full w-full relative">
          <MapContainer
            center={position}
            zoom={zoom}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%", borderRadius: "0.5rem" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                {isConfirmedBooking ? (
                  <span>{locationName}</span>
                ) : (
                  <div>
                    <p>{locationName}</p>
                    <p className="text-sm text-neutral-500 mt-1">
                      Exact location shared after booking
                    </p>
                  </div>
                )}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </ClientOnly>
    </div>
  );
};

export default StaticMap;

