import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  // State for search query input value
  const [searchQuery, setSearchQuery] = useState("");
  // State to track if search dropdown is open/focused
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  // State for recent searches stored in localStorage
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem("recentSearches");
    return saved ? JSON.parse(saved) : [];
  });
  // Reference to search container for detecting outside clicks
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Popular location suggestions for search dropdown
  const suggestions = [
    "New York",
    "Los Angeles",
    "Miami",
    "Chicago",
    "San Francisco",
  ];

  useEffect(() => {
    // Handle clicks outside the search dropdown to close it
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Add to recent searches (avoid duplicates and limit to 5)
      const updatedSearches = [
        searchQuery.trim(),
        ...recentSearches.filter((search) => search !== searchQuery.trim()),
      ].slice(0, 5);

      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
      navigate(`/listings?location=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/listings");
    }
  };

  // Function to handle click on a search suggestion
  const handleSuggestionClick = (suggestion) => {
    // Add to recent searches
    const updatedSearches = [
      suggestion,
      ...recentSearches.filter((search) => search !== suggestion),
    ].slice(0, 5);

    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
    navigate(`/listings?location=${encodeURIComponent(suggestion)}`);
  };

  // Function to clear all recent searches from localStorage
  const clearRecentSearches = () => {
    localStorage.setItem("recentSearches", JSON.stringify([]));
    setRecentSearches([]);
  };

  // Sample featured destinations data
  const destinations = [
    {
      id: 1,
      name: "New York",
      image:
        "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      properties: 120,
    },
    {
      id: 2,
      name: "Los Angeles",
      image:
        "https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      properties: 94,
    },
    {
      id: 3,
      name: "Miami",
      image:
        "https://images.unsplash.com/photo-1535498730771-e735b998cd64?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      properties: 85,
    },
    {
      id: 4,
      name: "Chicago",
      image:
        "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      properties: 73,
    },
  ];

  // Sample popular experiences data
  const experiences = [
    {
      id: 1,
      title: "City Tours",
      image:
        "https://images.unsplash.com/photo-1473396413399-6717ef7c4093?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
      id: 2,
      title: "Outdoor Adventures",
      image:
        "https://images.unsplash.com/photo-1533692328991-08159ff19fca?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
      id: 3,
      title: "Local Cuisine",
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero section with background image and search form */}
      <div className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Luxurious vacation home"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30"></div>
        </div>

        {/* <div className="relative max-w-6xl mx-auto px-4 sm:px-6 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-shadow-lg">
              Find your next perfect stay
            </h1>
            <p className="text-xl mb-8 text-shadow">
              Discover the best vacation rentals, homes, and unique places to
              stay around the world.
            </p>

            {/* Main search form */}
        {/* <div className="bg-white rounded-2xl shadow-lg p-4">
              <div className="text-center text-neutral-800">
                Search options removed
              </div>
            </div>
          </div>
        </div>  */}
      </div>

      {/* Featured destinations section */}
      <div className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold mb-2 text-neutral-800">
          Inspiration for your next trip
        </h2>
        <p className="text-neutral-600 mb-8">
          Explore top destinations with perfect vacation rentals
        </p>

        {/* Featured destinations grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination) => (
            <Link to="/listings" key={destination.id} className="group">
              <div className="overflow-hidden rounded-2xl shadow-card hover:shadow-card-hover transition duration-300">
                <div className="relative h-72">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h3 className="text-xl font-bold">{destination.name}</h3>
                    <p className="text-sm">
                      {destination.properties} properties
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Property types section */}
      <div className="py-16 bg-neutral-50 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold mb-2 text-neutral-800">
            Stay anywhere
          </h2>
          <p className="text-neutral-600 mb-8">
            Unique accommodations for every style and budget
          </p>

          {/* Property types grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Apartments property type */}
            <Link to="/listings?type=apartment" className="group">
              <div className="rounded-xl overflow-hidden">
                <div className="h-60 relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                    alt="Apartments"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-lg font-medium text-neutral-800 group-hover:text-primary-500 transition duration-300">
                    Apartments
                  </h3>
                  <p className="text-neutral-600 text-sm">Urban comfort</p>
                </div>
              </div>
            </Link>
            {/* Houses property type */}
            <Link to="/listings?type=house" className="group">
              <div className="rounded-xl overflow-hidden">
                <div className="h-60 relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                    alt="Houses"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-lg font-medium text-neutral-800 group-hover:text-primary-500 transition duration-300">
                    Houses
                  </h3>
                  <p className="text-neutral-600 text-sm">Entire homes</p>
                </div>
              </div>
            </Link>
            {/* Cabins property type */}
            <Link to="/listings?type=cabin" className="group">
              <div className="rounded-xl overflow-hidden">
                <div className="h-60 relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                    alt="Cabins"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-lg font-medium text-neutral-800 group-hover:text-primary-500 transition duration-300">
                    Cabins
                  </h3>
                  <p className="text-neutral-600 text-sm">Rustic retreats</p>
                </div>
              </div>
            </Link>
            {/* Villas property type */}
            <Link to="/listings?type=villa" className="group">
              <div className="rounded-xl overflow-hidden">
                <div className="h-60 relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                    alt="Villas"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-lg font-medium text-neutral-800 group-hover:text-primary-500 transition duration-300">
                    Villas
                  </h3>
                  <p className="text-neutral-600 text-sm">Luxury stays</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Experiences section */}
      <div className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold mb-2 text-neutral-800">
          Discover experiences
        </h2>
        <p className="text-neutral-600 mb-8">
          Find activities hosted by local experts
        </p>

        {/* Experiences grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {experiences.map((experience) => (
            <div key={experience.id} className="group cursor-pointer">
              <div className="rounded-2xl overflow-hidden shadow-card">
                <div className="h-80 relative overflow-hidden">
                  <img
                    src={experience.image}
                    alt={experience.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-medium text-neutral-800 group-hover:text-primary-500 transition duration-300">
                    {experience.title}
                  </h3>
                  <p className="text-neutral-600">Explore with local guides</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Become a host CTA section */}
      <div className="py-16 px-4 sm:px-6 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <div className="bg-primary-500 rounded-3xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Become a host
                </h2>
                <p className="text-white text-lg mb-8 max-w-md">
                  Share your space, earn extra income, and connect with guests
                  from around the world.
                </p>
                {/* Learn more button for host sign-up */}
                <Link
                  to="/host/become-a-host"
                  className="inline-block bg-white text-primary-500 font-medium px-6 py-3 rounded-lg hover:bg-neutral-100 transition duration-300 w-fit"
                >
                  Learn more
                </Link>
              </div>
              <div className="md:w-1/2">
                <img
                  src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  alt="Become a host"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
