import React, { useState } from "react";
import { Link } from "react-router-dom";

const Wishlist = () => {
  // Mock data for wishlist collections
  const [collections, setCollections] = useState([
    {
      id: 1,
      name: "Summer Vacation",
      items: [
        {
          id: 101,
          title: "Beachfront Villa with Private Pool",
          location: "Malibu, CA",
          image:
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
          price: "$350",
          rating: 4.92,
          reviews: 128,
          beds: 4,
          baths: 3,
          saved: true,
        },
        {
          id: 102,
          title: "Luxury Oceanfront Condo",
          location: "Miami Beach, FL",
          image:
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
          price: "$220",
          rating: 4.78,
          reviews: 95,
          beds: 2,
          baths: 2,
          saved: true,
        },
      ],
    },
    {
      id: 2,
      name: "City Getaways",
      items: [
        {
          id: 103,
          title: "Modern Loft in Downtown",
          location: "New York, NY",
          image:
            "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
          price: "$180",
          rating: 4.85,
          reviews: 74,
          beds: 1,
          baths: 1,
          saved: true,
        },
      ],
    },
    {
      id: 3,
      name: "Dream Homes",
      items: [],
    },
  ]);

  const [activeTab, setActiveTab] = useState("all");

  const handleRemoveFromWishlist = (collectionId, itemId) => {
    const updatedCollections = collections.map((collection) => {
      if (collection.id === collectionId) {
        return {
          ...collection,
          items: collection.items.filter((item) => item.id !== itemId),
        };
      }
      return collection;
    });

    setCollections(updatedCollections);
  };

  // Get total number of saved properties
  const totalSaved = collections.reduce(
    (total, collection) => total + collection.items.length,
    0
  );

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-neutral-800">Wishlist</h1>

          <button className="text-sm font-medium text-primary-600 hover:text-primary-700">
            Create new collection
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-neutral-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("all")}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "all"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
              }`}
            >
              All properties
              <span className="ml-2 py-0.5 px-2 rounded-full text-xs bg-neutral-100 text-neutral-700">
                {totalSaved}
              </span>
            </button>

            {collections.map((collection) => (
              <button
                key={collection.id}
                onClick={() => setActiveTab(collection.id)}
                className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === collection.id
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
                }`}
              >
                {collection.name}
                <span className="ml-2 py-0.5 px-2 rounded-full text-xs bg-neutral-100 text-neutral-700">
                  {collection.items.length}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div>
          {activeTab === "all" ? (
            // Show all collections
            <div className="space-y-8">
              {collections.map(
                (collection) =>
                  collection.items.length > 0 && (
                    <div key={collection.id}>
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-neutral-800">
                          {collection.name}
                        </h2>
                        <Link
                          to={`/wishlist/${collection.id}`}
                          className="text-sm text-primary-600 hover:text-primary-700"
                        >
                          View all ({collection.items.length})
                        </Link>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {collection.items.map((item) => (
                          <div
                            key={item.id}
                            className="bg-white rounded-lg shadow-sm overflow-hidden"
                          >
                            <div className="relative">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="h-48 w-full object-cover"
                              />
                              <button
                                onClick={() =>
                                  handleRemoveFromWishlist(
                                    collection.id,
                                    item.id
                                  )
                                }
                                className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm text-primary-500 hover:text-primary-700"
                              >
                                <svg
                                  className="h-5 w-5"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                            </div>

                            <div className="p-4">
                              <div className="flex items-center mb-1">
                                <svg
                                  className="h-4 w-4 text-primary-500"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="ml-1 text-sm text-neutral-700">
                                  {item.rating}
                                </span>
                                <span className="ml-1 text-sm text-neutral-500">
                                  ({item.reviews} reviews)
                                </span>
                              </div>

                              <h3 className="font-medium text-neutral-900 mb-1">
                                {item.title}
                              </h3>

                              <p className="text-sm text-neutral-500 mb-2">
                                {item.location}
                              </p>

                              <p className="text-sm text-neutral-700 mb-2">
                                {item.beds} {item.beds === 1 ? "bed" : "beds"} ·{" "}
                                {item.baths}{" "}
                                {item.baths === 1 ? "bath" : "baths"}
                              </p>

                              <p className="font-medium text-neutral-900">
                                {item.price}{" "}
                                <span className="text-neutral-500 font-normal">
                                  night
                                </span>
                              </p>

                              <div className="mt-4">
                                <Link
                                  to={`/listings/${item.id}`}
                                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
                                >
                                  View property
                                </Link>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
              )}

              {totalSaved === 0 && (
                <div className="text-center py-12">
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
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-neutral-900">
                    No saved properties
                  </h3>
                  <p className="mt-1 text-sm text-neutral-500">
                    Start saving properties by clicking the heart icon.
                  </p>
                  <div className="mt-6">
                    <Link
                      to="/listings"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
                    >
                      Explore properties
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Show specific collection
            <div>
              {collections.find((c) => c.id === activeTab)?.items.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {collections
                    .find((c) => c.id === activeTab)
                    ?.items.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white rounded-lg shadow-sm overflow-hidden"
                      >
                        <div className="relative">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-48 w-full object-cover"
                          />
                          <button
                            onClick={() =>
                              handleRemoveFromWishlist(activeTab, item.id)
                            }
                            className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm text-primary-500 hover:text-primary-700"
                          >
                            <svg
                              className="h-5 w-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>

                        <div className="p-4">
                          <div className="flex items-center mb-1">
                            <svg
                              className="h-4 w-4 text-primary-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="ml-1 text-sm text-neutral-700">
                              {item.rating}
                            </span>
                            <span className="ml-1 text-sm text-neutral-500">
                              ({item.reviews} reviews)
                            </span>
                          </div>

                          <h3 className="font-medium text-neutral-900 mb-1">
                            {item.title}
                          </h3>

                          <p className="text-sm text-neutral-500 mb-2">
                            {item.location}
                          </p>

                          <p className="text-sm text-neutral-700 mb-2">
                            {item.beds} {item.beds === 1 ? "bed" : "beds"} ·{" "}
                            {item.baths} {item.baths === 1 ? "bath" : "baths"}
                          </p>

                          <p className="font-medium text-neutral-900">
                            {item.price}{" "}
                            <span className="text-neutral-500 font-normal">
                              night
                            </span>
                          </p>

                          <div className="mt-4">
                            <Link
                              to={`/listings/${item.id}`}
                              className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
                            >
                              View property
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-12">
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
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-neutral-900">
                    No saved properties in this collection
                  </h3>
                  <p className="mt-1 text-sm text-neutral-500">
                    Start adding properties to this collection.
                  </p>
                  <div className="mt-6">
                    <Link
                      to="/listings"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
                    >
                      Explore properties
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
