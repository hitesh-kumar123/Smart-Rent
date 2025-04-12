import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Fallback image in case property image fails to load
const FALLBACK_IMAGE_URL =
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop";

const HostListings = () => {
  // State to manage the active tab filter (all, active, or inactive listings)
  const [activeTab, setActiveTab] = useState("all");
  // State to store the host's property listings
  const [listings, setListings] = useState([]);
  // State to track loading status while fetching listings
  const [loading, setLoading] = useState(true);
  // Track image loading errors
  const [imgErrors, setImgErrors] = useState({});
  // Track loading state for image
  const [isLoading, setIsLoading] = useState(true);

  // Handle image load errors
  const handleImageError = (listingId) => {
    setImgErrors((prev) => ({
      ...prev,
      [listingId]: true,
    }));
    console.error(`Failed to load image for listing ${listingId}`);
  };

  // Check if an image URL exists and is valid
  const getValidImageUrl = (listing) => {
    // If we've already determined this image has an error, use fallback
    if (imgErrors[listing.id]) {
      console.log(
        `Using fallback for listing ${listing.id} due to previous error`
      );
      return FALLBACK_IMAGE_URL;
    }

    // Check if images array exists
    if (
      !listing.images ||
      !Array.isArray(listing.images) ||
      listing.images.length === 0
    ) {
      console.log(`No images array for listing ${listing.id}`);
      return FALLBACK_IMAGE_URL;
    }

    // Get the first image
    const imageObject = listing.images[0];

    // Check if we have a valid image object
    if (!imageObject) {
      console.log(`Invalid image object for listing ${listing.id}`);
      return FALLBACK_IMAGE_URL;
    }

    // Check for various possible image URL formats
    try {
      // Handle different URL formats
      if (typeof imageObject === "string") {
        return imageObject; // If the image is directly a string URL
      } else if (imageObject.secure_url) {
        return imageObject.secure_url;
      } else if (imageObject.url) {
        return imageObject.url;
      } else if (
        imageObject.publicId &&
        imageObject.publicId.startsWith("local-")
      ) {
        // This might be a local image from Object URL
        if (imageObject.url) return imageObject.url;
        return FALLBACK_IMAGE_URL;
      }

      // No valid URL found
      console.log(
        `No valid URL in image object for listing ${listing.id}`,
        imageObject
      );
      return FALLBACK_IMAGE_URL;
    } catch (error) {
      console.error(
        `Error getting image URL for listing ${listing.id}:`,
        error
      );
      return FALLBACK_IMAGE_URL;
    }
  };

  // Fetch user's listings (in a real app this would call the API)
  useEffect(() => {
    // Mock API call
    const fetchListings = async () => {
      setLoading(true);
      try {
        // In a real app: const response = await fetch('/api/properties/my-listings');
        // const data = await response.json();

        // Get any newly created listings from localStorage if available
        let newListings = [];
        try {
          const storedListings = localStorage.getItem("hostListings");
          if (storedListings) {
            // Parse the stored listings
            newListings = JSON.parse(storedListings);
            console.log("Loaded listings from localStorage:", newListings);

            // Process the listings to ensure images are properly formatted
            newListings = newListings.map((listing) => {
              // Ensure images is an array
              if (!listing.images || !Array.isArray(listing.images)) {
                console.warn(`Fixing missing images for listing ${listing.id}`);
                listing.images = [
                  {
                    url: FALLBACK_IMAGE_URL,
                    secure_url: FALLBACK_IMAGE_URL,
                    publicId: "fallback-storage-fix",
                  },
                ];
              }

              // Validate each image has a URL
              listing.images = listing.images.map((image) => {
                // Convert string images to objects
                if (typeof image === "string") {
                  return {
                    url: image,
                    secure_url: image,
                    publicId: "converted-image",
                  };
                }

                // Make sure we have both url and secure_url
                if (!image.url && image.secure_url) {
                  image.url = image.secure_url;
                } else if (!image.secure_url && image.url) {
                  image.secure_url = image.url;
                }

                // Check if we have either URL and fix property names
                if (image.publicId && !image.public_id) {
                  image.public_id = image.publicId;
                } else if (image.public_id && !image.publicId) {
                  image.publicId = image.public_id;
                }

                // If still no URL, use fallback
                if (!image.url && !image.secure_url) {
                  return {
                    url: FALLBACK_IMAGE_URL,
                    secure_url: FALLBACK_IMAGE_URL,
                    publicId: "fallback-storage-fix",
                  };
                }

                return image;
              });

              return listing;
            });
          }
        } catch (storageError) {
          console.error(
            "Error loading listings from localStorage:",
            storageError
          );
          newListings = [];
        }

        // Combine with mock data
        const allListings = [...mockListings, ...newListings];
        setListings(allListings);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  // Prefetch the listing images to ensure they load correctly
  useEffect(() => {
    if (!loading && listings.length > 0) {
      // Prefetch all listing images
      let loadedImages = 0;
      const totalImages = listings.length;

      listings.forEach((listing) => {
        if (
          listing.images &&
          listing.images.length > 0 &&
          (listing.images[0].url || listing.images[0].secure_url)
        ) {
          const imageUrl =
            listing.images[0].url || listing.images[0].secure_url;
          const img = new Image();

          // Handle successful image load
          img.onload = () => {
            loadedImages++;
            if (loadedImages >= totalImages) {
              setIsLoading(false);
            }
          };

          // Handle image error
          img.onerror = () => {
            // Mark this image as errored
            handleImageError(listing.id);
            loadedImages++;
            if (loadedImages >= totalImages) {
              setIsLoading(false);
            }
          };

          // Start loading the image
          img.src = imageUrl;
        } else {
          // No valid image URL found
          handleImageError(listing.id);
          loadedImages++;
          if (loadedImages >= totalImages) {
            setIsLoading(false);
          }
        }
      });

      // Safety timeout to make sure loading state is cleared even if image loading fails
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    } else {
      // No listings or still loading listings
      setIsLoading(false);
    }
  }, [listings, loading]);

  // Mock data for host's listings
  const mockListings = [
    {
      id: 1,
      title: "Modern Apartment with City View",
      description:
        "Stylish 2-bedroom apartment in the heart of downtown with amazing city views.",
      location: {
        address: "123 Park Ave",
        city: "New York",
        state: "NY",
        country: "United States",
      },
      images: [
        {
          url: "https://plus.unsplash.com/premium_photo-1661915661139-5b6a4e4a6fcc?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          publicId: "mock1",
        },
      ],
      price: 150,
      category: "Apartment",
      capacity: {
        bedrooms: 2,
        bathrooms: 1,
        guests: 4,
      },
      rating: 4.8,
      reviewCount: 24,
      status: "active",
      bookedDates: [
        { checkIn: "2023-06-10", checkOut: "2023-06-15" },
        { checkIn: "2023-07-05", checkOut: "2023-07-10" },
      ],
    },
    {
      id: 2,
      title: "Cozy Beach House with Ocean Views",
      description:
        "Beautiful beach house just steps from the ocean with stunning views and modern amenities.",
      location: {
        address: "456 Ocean Drive",
        city: "Malibu",
        state: "CA",
        country: "United States",
      },
      images: [
        {
          url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
          publicId: "mock2",
        },
      ],
      price: 350,
      category: "House",
      capacity: {
        bedrooms: 3,
        bathrooms: 2,
        guests: 6,
      },
      rating: 4.95,
      reviewCount: 42,
      status: "active",
      bookedDates: [
        { checkIn: "2023-05-20", checkOut: "2023-05-25" },
        { checkIn: "2023-06-15", checkOut: "2023-06-22" },
      ],
    },
    {
      id: 3,
      title: "Luxury Downtown Loft",
      description:
        "Spacious and luxurious loft in the arts district with high ceilings and industrial charm.",
      location: {
        address: "789 Arts District",
        city: "Los Angeles",
        state: "CA",
        country: "United States",
      },
      images: [
        {
          url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
          publicId: "mock3",
        },
      ],
      price: 200,
      category: "Loft",
      capacity: {
        bedrooms: 1,
        bathrooms: 1,
        guests: 2,
      },
      rating: 4.7,
      reviewCount: 18,
      status: "inactive",
      bookedDates: [],
    },
  ];

  // Filter listings based on the active tab selection
  const filteredListings =
    activeTab === "all"
      ? listings
      : listings.filter((listing) => listing.status === activeTab);

  // Function to toggle a listing's status between active and inactive
  const toggleListingStatus = (id) => {
    setListings(
      listings.map((listing) =>
        listing.id === id
          ? {
              ...listing,
              status: listing.status === "active" ? "inactive" : "active",
            }
          : listing
      )
    );
  };

  // Function to delete a listing after confirmation
  const deleteListing = (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this listing? This action cannot be undone."
      )
    ) {
      setListings(listings.filter((listing) => listing.id !== id));

      // Update localStorage
      const updatedListings = listings.filter((listing) => listing.id !== id);
      localStorage.setItem(
        "hostListings",
        JSON.stringify(
          updatedListings.filter(
            (listing) => !mockListings.find((mock) => mock.id === listing.id)
          )
        )
      );
    }
  };

  // Loading state while fetching listings
  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-primary-600 text-xl font-semibold flex items-center">
          <i className="fas fa-spinner fa-spin mr-3 text-2xl"></i>
          Loading your listings...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="container mx-auto px-4">
        {/* Page header with title and Add new listing button */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-2xl font-bold text-neutral-800 mb-4 md:mb-0">
            Manage Listings
          </h1>

          {/* Add new listing button */}
          <Link
            to="/host/become-a-host"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
          >
            <svg
              className="-ml-1 mr-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Add new listing
          </Link>
        </div>

        {/* Tab navigation to filter listings */}
        <div className="border-b border-neutral-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {/* All listings tab button */}
            <button
              onClick={() => setActiveTab("all")}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "all"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
              }`}
            >
              All listings
              <span className="ml-2 py-0.5 px-2 rounded-full text-xs bg-neutral-100 text-neutral-700">
                {listings.length}
              </span>
            </button>

            {/* Active listings tab button */}
            <button
              onClick={() => setActiveTab("active")}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "active"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
              }`}
            >
              Active
              <span className="ml-2 py-0.5 px-2 rounded-full text-xs bg-green-100 text-green-700">
                {listings.filter((l) => l.status === "active").length}
              </span>
            </button>

            {/* Inactive listings tab button */}
            <button
              onClick={() => setActiveTab("inactive")}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "inactive"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
              }`}
            >
              Inactive
              <span className="ml-2 py-0.5 px-2 rounded-full text-xs bg-neutral-100 text-neutral-700">
                {listings.filter((l) => l.status === "inactive").length}
              </span>
            </button>
          </nav>
        </div>

        {/* Listings display section */}
        <div className="space-y-6">
          {filteredListings.length > 0 ? (
            filteredListings.map((listing) => (
              <div
                key={listing.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden border border-neutral-200"
              >
                <div className="md:flex">
                  {/* Property image */}
                  <div className="md:flex-shrink-0 md:w-1/4 relative">
                    {isLoading ? (
                      <div className="h-48 w-full bg-neutral-200 animate-pulse"></div>
                    ) : (
                      <>
                        <img
                          className="h-48 w-full object-cover md:h-full"
                          src={getValidImageUrl(listing)}
                          alt={listing.title || "Property image"}
                          onError={() => handleImageError(listing.id)}
                        />
                        {imgErrors[listing.id] && (
                          <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 bg-opacity-30">
                            <div className="text-xs text-center px-2 py-1 bg-white bg-opacity-90 rounded">
                              Using backup image
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  <div className="p-6 md:w-3/4">
                    {/* Property header with title, location, and status */}
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-neutral-900">
                          {listing.title}
                        </h3>
                        <p className="mt-1 text-sm text-neutral-600">
                          {listing.location?.city}, {listing.location?.state}
                        </p>
                        {/* Rating display */}
                        <div className="mt-1 flex items-center">
                          <svg
                            className="h-4 w-4 text-primary-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="ml-1 text-sm text-neutral-700">
                            {listing.rating
                              ? `${listing.rating} (${listing.reviewCount} reviews)`
                              : "No reviews yet"}
                          </span>
                        </div>
                      </div>
                      {/* Property status badge (active/inactive) */}
                      <div className="ml-4 flex-shrink-0">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            listing.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-neutral-100 text-neutral-800"
                          }`}
                        >
                          {listing.status
                            ? listing.status.charAt(0).toUpperCase() +
                              listing.status.slice(1)
                            : "Draft"}
                        </span>
                      </div>
                    </div>

                    {/* Property features/tags */}
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
                          {listing.category}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
                          {listing.capacity?.bedrooms}{" "}
                          {listing.capacity?.bedrooms === 1
                            ? "bedroom"
                            : "bedrooms"}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
                          {listing.capacity?.bathrooms}{" "}
                          {listing.capacity?.bathrooms === 1
                            ? "bathroom"
                            : "bathrooms"}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
                          {listing.capacity?.guests}{" "}
                          {listing.capacity?.guests === 1 ? "guest" : "guests"}
                        </span>
                      </div>
                    </div>

                    {/* Property description */}
                    <div className="mt-4">
                      <p className="text-sm text-neutral-600 line-clamp-2">
                        {listing.description}
                      </p>
                    </div>

                    {/* Price and action buttons */}
                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-lg font-medium text-neutral-900">
                        ${listing.price}{" "}
                        <span className="text-neutral-500 font-normal text-sm">
                          night
                        </span>
                      </div>

                      <div className="flex space-x-2">
                        {/* Toggle active/inactive status button */}
                        <button
                          onClick={() => toggleListingStatus(listing.id)}
                          className={`inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md ${
                            listing.status === "active"
                              ? "text-yellow-700 bg-yellow-100 hover:bg-yellow-200"
                              : "text-green-700 bg-green-100 hover:bg-green-200"
                          }`}
                        >
                          {listing.status === "active"
                            ? "Deactivate"
                            : "Activate"}
                        </button>

                        {/* Edit listing button */}
                        {/* <Link
                          to={`/host/edit-listing/${listing.id}`}
                          className="inline-flex items-center px-3 py-1.5 border border-neutral-300 text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50"
                        >
                          Edit
                        </Link> */}

                        {/* Delete listing button */}
                        <button
                          onClick={() => deleteListing(listing.id)}
                          className="inline-flex items-center px-3 py-1.5 border border-neutral-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 hover:border-red-300"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    {/* Booking details section (if any) */}
                    {listing.bookedDates.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-neutral-200">
                        <h4 className="text-sm font-medium text-neutral-900 mb-2">
                          Upcoming bookings
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {listing.bookedDates.map((booking, idx) => (
                            <div
                              key={idx}
                              className="flex items-center space-x-2 text-sm text-neutral-600"
                            >
                              <svg
                                className="h-4 w-4 text-primary-500"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                              <span>
                                {booking.checkIn} to {booking.checkOut}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Empty state when no listings match the current filter
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-neutral-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              {/* Empty state title */}
              <h3 className="mt-2 text-sm font-medium text-neutral-900">
                No listings found
              </h3>
              {/* Empty state description */}
              <p className="mt-1 text-sm text-neutral-500">
                {activeTab === "all"
                  ? "Get started by creating a new listing"
                  : `You don't have any ${activeTab} listings`}
              </p>
              {/* Call-to-action button to add a new listing */}
              <div className="mt-6">
                <Link
                  to="/host/become-a-host"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
                >
                  <svg
                    className="-ml-1 mr-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Add new listing
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HostListings;
