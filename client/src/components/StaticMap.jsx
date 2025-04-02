import React from 'react';

const StaticMap = ({ address, city, state, country, zoom = 13 }) => {
  // Combine address components into a single query string
  const locationQuery = [address, city, state, country].filter(Boolean).join(',+');
  
  // Use Google Maps Static API - no API key for now, which limits usage but works for demo
  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(locationQuery)}&zoom=${zoom}&size=600x400&markers=color:red%7C${encodeURIComponent(locationQuery)}&key=`;
  
  // Fallback image when no location is provided
  const fallbackMapUrl = 'https://maps.googleapis.com/maps/api/staticmap?center=New+York&zoom=12&size=600x400&key=';
  
  const displayUrl = locationQuery ? mapUrl : fallbackMapUrl;
  
  return (
    <div className="relative h-full w-full bg-neutral-100 flex items-center justify-center">
      {locationQuery ? (
        <img 
          src={displayUrl} 
          alt={`Map of ${locationQuery}`}
          className="w-full h-full object-cover rounded-md"
        />
      ) : (
        <div className="flex flex-col items-center justify-center">
          <div className="h-48 w-48 bg-neutral-200 rounded-full flex items-center justify-center mb-4">
            <svg className="h-12 w-12 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </div>
          <p className="text-neutral-500 text-center">
            Enter an address to see the location on the map
          </p>
        </div>
      )}
    </div>
  );
};

export default StaticMap; 