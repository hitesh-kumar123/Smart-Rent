/**
 * Listings.jsx
 * Main property listings page component that displays a filterable grid of properties
 * with category navigation, search functionality, and property cards.
 */

import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import PropertyImage from "../components/PropertyImage";
import StaticMap from "../components/StaticMap";
import { useAppSettings } from "../contexts/AppSettingsContext";

const Listings = () => {
  // State for property data and loading indicators
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  // App settings for language and currency
  const {
    language,
    languageName,
    currency,
    changeLanguage,
    supportedLanguages,
    formatPrice,
    isTranslating,
  } = useAppSettings();

  // State for various filter settings
  const [filters, setFilters] = useState({
    priceMin: "",
    priceMax: "",
    propertyType: "",
    bedrooms: "",
    location: "",
    language: language, // Add language to filters
  });
  const [activeCategory, setActiveCategory] = useState("all");
  const [amenityFilters, setAmenityFilters] = useState({
    topRated: false,
    wifi: false,
    pool: false,
    kitchen: false,
    parking: false,
    petFriendly: false,
    ac: false,
    hotTub: false,
    breakfast: false,
    workspace: false,
    washer: false,
    dryer: false,
    gym: false,
  });

  // UI state
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [sortBy, setSortBy] = useState("price-low-high");
  const [isApiData, setIsApiData] = useState(false);

  // Routing hooks
  const location = useLocation();
  const navigate = useNavigate();

  // Reference for the categories container for horizontal scrolling
  const categoriesContainerRef = useRef(null);

  /**
   * Scrolls the categories container left or right
   * @param {string} direction - Either "left" or "right"
   */
  const scrollCategories = (direction) => {
    const container = categoriesContainerRef.current;
    if (!container) return;

    const scrollAmount = 300; // Adjust this value based on how far you want to scroll
    const currentScroll = container.scrollLeft;

    container.scrollTo({
      left:
        direction === "left"
          ? currentScroll - scrollAmount
          : currentScroll + scrollAmount,
      behavior: "smooth",
    });
  };

  /**
   * Reset all filters when component mounts
   */
  useEffect(() => {
    console.log("FILTER RESET EFFECT: Resetting all filters on mount");
    // Reset all filters when the page loads to ensure all properties show
    setFilters({
      priceMin: "",
      priceMax: "",
      propertyType: "",
      bedrooms: "",
      location: "",
      language: language, // Add language to filters
    });
    setActiveCategory("all");
    setAmenityFilters({
      topRated: false,
      wifi: false,
      pool: false,
      kitchen: false,
      parking: false,
      petFriendly: false,
      ac: false,
      hotTub: false,
      breakfast: false,
      workspace: false,
      washer: false,
      dryer: false,
      gym: false,
    });
  }, [language]);

  /**
   * Main effect for fetching properties and handling URL parameters
   * Runs when the URL search parameters change
   */
  useEffect(() => {
    // Continue with the normal location param handling
    const queryParams = new URLSearchParams(location.search);
    const locationParam = queryParams.get("location");
    const typeParam = queryParams.get("type"); // Get the type parameter from URL

    // Update filters if parameters exist
    let updatedFilters = { ...filters };

    if (locationParam) {
      console.log("Location param found:", locationParam);
      updatedFilters.location = locationParam;
    }

    if (typeParam) {
      console.log("Property type param found:", typeParam);

      // Convert URL parameter to match property categories in the system
      let propertyType = "";
      switch (typeParam.toLowerCase()) {
        case "apartment":
          propertyType = "Apartment";
          break;
        case "house":
          propertyType = "House";
          break;
        case "cabin":
          propertyType = "Cabin";
          break;
        case "villa":
          propertyType = "Villa";
          break;
        default:
          propertyType = typeParam;
      }

      updatedFilters.propertyType = propertyType;
      setActiveCategory(propertyType);
    }

    // Update filters with all changes
    setFilters(updatedFilters);

    /**
     * Fetches properties from the API or falls back to dummy data
     */
    const fetchProperties = async () => {
      setLoading(true);
      setError(null);

      try {
        // Parse URL parameters for filters
        const searchParams = new URLSearchParams(location.search);
        const locationParam = searchParams.get("location");
        const propertyTypeParam = searchParams.get("propertyType");

        // Build query string
        let queryString = "";
        if (locationParam) {
          queryString += `location=${locationParam}`;
        }
        if (propertyTypeParam) {
          if (queryString) queryString += "&";
          queryString += `propertyType=${mapCategoryToPropertyType(
            propertyTypeParam
          )}`;
        }

        // Make API call to fetch properties
        const response = await axios.get(
          `/api/properties${queryString ? `?${queryString}` : ""}`
        );

        if (response.data && Array.isArray(response.data)) {
          console.log(`Fetched ${response.data.length} properties from API`);
          // Combine MongoDB data with dummy data
          const combinedProperties = [...response.data, ...dummyProperties];
          setProperties(combinedProperties);
          setTotalCount(combinedProperties.length);
          setIsApiData(true);
        } else {
          console.log("Using dummy data (API returned invalid data)");
          setProperties(dummyProperties);
          setTotalCount(dummyProperties.length);
          setIsApiData(false);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError(
          "Unable to load properties. Please try again later or check your connection."
        );
        // Fall back to dummy data
        console.log("Using dummy data as fallback due to error");
        setProperties(dummyProperties);
        setTotalCount(dummyProperties.length);
        setIsApiData(false);
        setLoading(false);
      }
    };

    fetchProperties();
  }, [location.search, language]);

  /**
   * Handles changes to the filter inputs
   * @param {Event} e - The change event
   */
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  // Apply category filter
  const filteredProperties = properties.filter((property) => {
    // If no category filter is active, show all properties
    if (activeCategory === "all") {
      return true;
    }

    // For Trending category, only show properties marked as trending
    if (activeCategory === "Trending") {
      return property.trending === true;
    }

    // For MongoDB data, we need to be more flexible with matching
    // Get property category and type, making sure they exist
    const propertyCategory = (property.category || "").trim().toLowerCase();
    const propertyType = (property.propertyType || "").trim().toLowerCase();
    const activeCat = activeCategory.toLowerCase();

    // Debug the category matching for problematic categories
    if (
      activeCategory === "Arctic" ||
      activeCategory === "Desert" ||
      activeCategory === "Ski-in/out" ||
      activeCategory === "Vineyard"
    ) {
      console.log(`Checking match for ${activeCategory}:`, {
        property: property.title,
        propertyCategory,
        propertyType,
        activeCat,
      });
    }

    // Match based on property category and type
    // Case-insensitive matching for various property types
    switch (activeCat) {
      case "house":
        return (
          propertyCategory.includes("house") || propertyType.includes("house")
        );

      case "apartment":
        return (
          propertyCategory.includes("apartment") ||
          propertyType.includes("apartment")
        );

      case "villa":
        return (
          propertyCategory.includes("villa") || propertyType.includes("villa")
        );

      case "condo":
        return (
          propertyCategory.includes("condo") || propertyType.includes("condo")
        );

      case "cabin":
        return (
          propertyCategory.includes("cabin") || propertyType.includes("cabin")
        );

      case "beach":
        return (
          propertyCategory.includes("beach") || propertyType.includes("beach")
        );

      case "lakefront":
        return (
          propertyCategory.includes("lake") ||
          propertyType.includes("lake") ||
          propertyCategory.includes("lakefront") ||
          propertyType.includes("lakefront")
        );

      case "amazing":
        return (
          propertyCategory.includes("amazing") ||
          propertyType.includes("amazing") ||
          propertyCategory.includes("view") ||
          propertyType.includes("view")
        );

      case "tiny":
        return (
          propertyCategory.includes("tiny") || propertyType.includes("tiny")
        );

      case "mansion":
        return (
          propertyCategory.includes("mansion") ||
          propertyType.includes("mansion")
        );

      case "countryside":
        return (
          propertyCategory.includes("country") ||
          propertyType.includes("country")
        );

      case "luxury":
        return (
          propertyCategory.includes("luxury") || propertyType.includes("luxury")
        );

      case "castles":
        return (
          propertyCategory.includes("castle") || propertyType.includes("castle")
        );

      case "tropical":
        return (
          propertyCategory.includes("tropical") ||
          propertyType.includes("tropical")
        );

      case "historic":
        return (
          propertyCategory.includes("historic") ||
          propertyType.includes("historic")
        );

      case "design":
        return (
          propertyCategory.includes("design") || propertyType.includes("design")
        );

      case "farm":
        return (
          propertyCategory.includes("farm") || propertyType.includes("farm")
        );

      case "treehouse":
        return (
          propertyCategory.includes("tree") || propertyType.includes("tree")
        );

      case "boat":
        return (
          propertyCategory.includes("boat") || propertyType.includes("boat")
        );

      case "container":
        return (
          propertyCategory.includes("container") ||
          propertyType.includes("container")
        );

      case "dome":
        return (
          propertyCategory.includes("dome") || propertyType.includes("dome")
        );

      case "windmill":
        return (
          propertyCategory.includes("windmill") ||
          propertyType.includes("windmill")
        );

      case "cave":
        return (
          propertyCategory.includes("cave") || propertyType.includes("cave")
        );

      case "camping":
        return (
          propertyCategory.includes("camp") || propertyType.includes("camp")
        );

      case "arctic":
        console.log("Arctic match check:", propertyCategory, propertyType);
        return (
          propertyCategory.includes("arctic") || propertyType.includes("arctic")
        );

      case "desert":
        console.log("Desert match check:", propertyCategory, propertyType);
        return (
          propertyCategory.includes("desert") || propertyType.includes("desert")
        );

      case "ski-in/out":
        console.log("Ski match check:", propertyCategory, propertyType);
        return propertyCategory.includes("ski") || propertyType.includes("ski");

      case "vineyard":
        console.log("Vineyard match check:", propertyCategory, propertyType);
        return (
          propertyCategory.includes("vineyard") ||
          propertyType.includes("vineyard") ||
          propertyCategory.includes("vine") ||
          propertyType.includes("vine")
        );

      default:
        // For any other category, do a partial match
        return (
          propertyCategory.includes(activeCat) ||
          propertyType.includes(activeCat)
        );
    }
  });

  // Apply remaining filters (price, amenities, etc.)
  const fullyFilteredProperties = filteredProperties.filter((property) => {
    let matches = true;

    // Price filters
    if (filters.priceMin && property.price < parseInt(filters.priceMin)) {
      return false;
    }

    if (filters.priceMax && property.price > parseInt(filters.priceMax)) {
      return false;
    }

    // Bedrooms filter
    if (
      filters.bedrooms &&
      property.capacity &&
      property.capacity.bedrooms < parseInt(filters.bedrooms)
    ) {
      return false;
    }

    // Location filter
    if (
      filters.location &&
      property.location &&
      property.location.city &&
      !property.location.city
        .toLowerCase()
        .includes(filters.location.toLowerCase())
    ) {
      return false;
    }

    // Amenity filters - check each selected amenity
    if (
      amenityFilters.wifi &&
      !(property.amenities && property.amenities.wifi)
    ) {
      return false;
    }

    if (
      amenityFilters.pool &&
      !(property.amenities && property.amenities.pool)
    ) {
      return false;
    }

    if (
      amenityFilters.kitchen &&
      !(property.amenities && property.amenities.kitchen)
    ) {
      return false;
    }

    if (
      amenityFilters.parking &&
      !(property.amenities && property.amenities.parking)
    ) {
      return false;
    }

    if (
      amenityFilters.petFriendly &&
      !(property.amenities && property.amenities.petFriendly)
    ) {
      return false;
    }

    if (amenityFilters.ac && !(property.amenities && property.amenities.ac)) {
      return false;
    }

    if (
      amenityFilters.hotTub &&
      !(property.amenities && property.amenities.hotTub)
    ) {
      return false;
    }

    if (
      amenityFilters.breakfast &&
      !(property.amenities && property.amenities.breakfast)
    ) {
      return false;
    }

    if (
      amenityFilters.workspace &&
      !(property.amenities && property.amenities.workspace)
    ) {
      return false;
    }

    if (
      amenityFilters.washer &&
      !(property.amenities && property.amenities.washer)
    ) {
      return false;
    }

    if (
      amenityFilters.dryer &&
      !(property.amenities && property.amenities.dryer)
    ) {
      return false;
    }

    if (amenityFilters.gym && !(property.amenities && property.amenities.gym)) {
      return false;
    }

    return matches;
  });

  /**
   * Sort properties based on the selected sort criteria
   * Options include price (low-high/high-low), rating, newest, and bedrooms
   */
  const sortedProperties = [...fullyFilteredProperties].sort((a, b) => {
    switch (sortBy) {
      case "price-low-high":
        return a.price - b.price;
      case "price-high-low":
        return b.price - a.price;
      case "rating":
        const aRating = a.averageRating || a.rating || 0;
        const bRating = b.averageRating || b.rating || 0;
        return bRating - aRating;
      case "newest":
        const aDate = a.createdAt ? new Date(a.createdAt) : new Date(0);
        const bDate = b.createdAt ? new Date(b.createdAt) : new Date(0);
        return bDate - aDate;
      case "bedrooms":
        const aBeds = a.capacity?.bedrooms || 0;
        const bBeds = b.capacity?.bedrooms || 0;
        return bBeds - aBeds;
      default:
        return 0;
    }
  });

  /**
   * Debug logging for tracking filtered properties
   */
  useEffect(() => {
    // Create a variable to track if API data is being used
    const usingApiData = isApiData !== undefined ? isApiData : false;

    if (activeCategory !== "all") {
      console.log(`----- CATEGORY FILTER: ${activeCategory} -----`);
      console.log(`MongoDB data?: ${usingApiData ? "YES" : "NO"}`);
      console.log(
        `Properties count: ${sortedProperties.length} out of ${properties.length}`
      );

      // Check the first few properties and their categories
      if (properties.length > 0) {
        console.log("PROPERTY SAMPLE DATA:");
        properties.slice(0, 3).forEach((prop, i) => {
          console.log(`Property ${i + 1}:`, {
            id: prop._id,
            title: prop.title,
            propertyType: prop.propertyType,
            category: prop.category,
            hasImage: !!prop.image,
            imageValue: prop.image,
            hasImages: prop.images && prop.images.length > 0,
            imagesCount: prop.images ? prop.images.length : 0,
            imagesData: prop.images,
          });
        });
      }

      // Check which properties matched the category filter
      console.log("CATEGORY MATCHED PROPERTIES:");
      sortedProperties.slice(0, 3).forEach((property, idx) => {
        console.log(`Matched ${idx + 1}:`, {
          title: property.title,
          propertyType: property.propertyType,
          category: property.category,
          match:
            activeCategory === property.propertyType ||
            activeCategory === property.category,
        });
      });
    }
  }, [activeCategory, sortedProperties.length, properties.length, isApiData]);

  console.log("BEFORE FILTERS - Total properties count:", properties.length);
  console.log(
    "AFTER FILTERS - Filtered properties count:",
    sortedProperties.length
  );

  // Log filter state
  console.log("Current filter state:", {
    priceMin: filters.priceMin,
    priceMax: filters.priceMax,
    bedrooms: filters.bedrooms,
    location: filters.location,
    activeCategory: activeCategory,
    amenityFilters: amenityFilters,
  });

  // Debug filtered properties and their images
  console.log("Filtered Properties Count:", sortedProperties.length);
  console.log("First few filtered properties with images:");
  sortedProperties.slice(0, 3).forEach((property, idx) => {
    console.log(`Property ${idx}:`, {
      title: property.title,
      imageCount: property.images ? property.images.length : 0,
      images: property.images || [],
    });
  });

  /**
   * Toggles a specific amenity filter
   * @param {string} filter - The amenity filter to toggle
   */
  const handleAmenityFilter = (filter) => {
    setAmenityFilters({
      ...amenityFilters,
      [filter]: !amenityFilters[filter],
    });
  };

  /**
   * Counts the number of active filters across all filter types
   * @returns {number} - The total count of active filters
   */
  const countActiveFilters = () => {
    let count = 0;

    // Count amenity filters
    Object.values(amenityFilters).forEach((value) => {
      if (value) count++;
    });

    // Count other filters
    if (filters.priceMin) count++;
    if (filters.priceMax) count++;
    if (filters.bedrooms) count++;
    if (filters.location) count++;
    if (activeCategory !== "all") count++;

    return count;
  };

  /**
   * Resets all filters to their default values
   */
  const clearAllFilters = () => {
    setFilters({
      priceMin: "",
      priceMax: "",
      propertyType: "",
      bedrooms: "",
      location: "",
      language: language, // Add language to filters
    });
    setAmenityFilters({
      topRated: false,
      wifi: false,
      pool: false,
      kitchen: false,
      parking: false,
      petFriendly: false,
      ac: false,
      hotTub: false,
      breakfast: false,
      workspace: false,
      washer: false,
      dryer: false,
      gym: false,
    });
    setActiveCategory("all");
  };

  /**
   * Normalizes category names for consistent display and matching
   * @param {string} categoryId - The category ID to normalize
   * @returns {string} - The normalized category name
   */
  const getNormalizedCategory = (categoryId) => {
    // Special cases mapping
    const categoryMap = {
      Tiny: "Tiny homes",
      Amazing: "Amazing views",
      "Ski-in/out": "Ski-in/out",
      // Add more mappings as needed for special categories
      Castles: "Castle", // Match 'Castles' category with 'Castle' propertyType
      Trending: "Trending",
      Beach: "Beach",
      Lakefront: "Lakefront",
      Countryside: "Countryside",
      Luxury: "Luxury",
      Tropical: "Tropical",
      Historic: "Historic",
      Design: "Design",
      Farm: "Farm",
      Treehouse: "Treehouse",
      Boat: "Boat",
      Container: "Container",
      Dome: "Dome",
      Windmill: "Windmill",
      Cave: "Cave",
      Camping: "Camping",
      Arctic: "Arctic",
      Desert: "Desert",
      Vineyard: "Vineyard",
    };

    return categoryMap[categoryId] || categoryId;
  };

  /**
   * Categories for the horizontal scrolling menu
   * Each category has an ID, display label, and an icon class
   */
  const categories = [
    { id: "all", label: "All", icon: "fas fa-home" },
    { id: "Trending", label: "Trending", icon: "fas fa-fire" },
    { id: "Apartment", label: "Apartments", icon: "fas fa-building" },
    { id: "House", label: "Houses", icon: "fas fa-house-user" },
    { id: "Villa", label: "Villas", icon: "fas fa-hotel" },
    { id: "Condo", label: "Condos", icon: "fas fa-city" },
    { id: "Cabin", label: "Cabins", icon: "fas fa-campground" },
    { id: "Beach", label: "Beach", icon: "fas fa-umbrella-beach" },
    { id: "Lakefront", label: "Lakefront", icon: "fas fa-water" },
    { id: "Amazing", label: "Amazing views", icon: "fas fa-mountain" },
    { id: "Tiny", label: "Tiny homes", icon: "fas fa-home" },
    { id: "Mansion", label: "Mansions", icon: "fas fa-landmark" },
    { id: "Countryside", label: "Countryside", icon: "fas fa-tree" },
    { id: "Luxury", label: "Luxury", icon: "fas fa-crown" },
    { id: "Castles", label: "Castles", icon: "fas fa-chess-rook" },
    { id: "Tropical", label: "Tropical", icon: "fas fa-cocktail" },
    { id: "Historic", label: "Historic", icon: "fas fa-monument" },
    { id: "Design", label: "Design", icon: "fas fa-pencil-ruler" },
    { id: "Farm", label: "Farm", icon: "fas fa-tractor" },
    { id: "Treehouse", label: "Treehouse", icon: "fas fa-tree" },
    { id: "Boat", label: "Boat", icon: "fas fa-ship" },
    { id: "Container", label: "Container", icon: "fas fa-box" },
    { id: "Dome", label: "Dome", icon: "fas fa-igloo" },
    { id: "Windmill", label: "Windmill", icon: "fas fa-wind" },
    { id: "Cave", label: "Cave", icon: "fas fa-mountain" },
    { id: "Camping", label: "Camping", icon: "fas fa-campground" },
    { id: "Arctic", label: "Arctic", icon: "fas fa-snowflake" },
    { id: "Desert", label: "Desert", icon: "fas fa-sun" },
    { id: "Ski-in/out", label: "Ski-in/out", icon: "fas fa-skiing" },
    { id: "Vineyard", label: "Vineyard", icon: "fas fa-wine-glass-alt" },
  ];

  /**
   * Handles click on category filters
   * @param {string} categoryId - The ID of the clicked category
   */
  const handleCategoryClick = (categoryId) => {
    console.log("Category clicked:", categoryId);

    // Set the active category
    setActiveCategory(categoryId);

    // When 'all' is selected, clear all category-related filters
    if (categoryId === "all") {
      setFilters({
        ...filters,
        propertyType: "",
      });
    }

    // If we're in a mobile view, scroll back to the top of results
    window.scrollTo({
      top: document.querySelector(".container")?.offsetTop || 0,
      behavior: "smooth",
    });
  };

  /**
   * Navigates to property detail page
   * @param {string} propertyId - The ID of the property to view
   * @param {Event} e - The click event (optional)
   */
  const navigateToPropertyDetail = (propertyId, e) => {
    if (e) e.stopPropagation();

    console.log("Navigating to property with ID:", propertyId);

    // Ensure propertyId is a string and is valid
    const stringId = String(propertyId).trim();

    if (!stringId) {
      console.error("Invalid property ID");
      return;
    }

    // Find the full property object from the properties array
    const currentProperty = properties.find((p) => String(p._id) === stringId);

    if (currentProperty) {
      try {
        // Store entire property data in session storage
        sessionStorage.setItem(
          "currentProperty",
          JSON.stringify(currentProperty)
        );

        // Also store the property ID separately for redundancy
        sessionStorage.setItem("lastViewedPropertyId", stringId);

        console.log("Stored complete property data:", currentProperty);
      } catch (err) {
        console.error("Failed to store property in session storage:", err);
      }
    } else {
      console.error("Property not found in current properties list");
    }

    // Navigate to property detail page
    navigate(`/properties/${stringId}`);
  };

  /**
   * Converts category ID to property type for API queries
   * @param {string} categoryId - The category ID to convert
   * @returns {string} - The corresponding property type
   */
  const mapCategoryToPropertyType = (categoryId) => {
    // If no category, return empty string
    if (!categoryId) return "";

    // Map frontend category IDs to backend property types
    const categoryMap = {
      House: "House",
      Apartment: "Apartment",
      Villa: "Villa",
      Condo: "Condo",
      Cabin: "Cabin",
      Beach: "Beach",
      Lakefront: "Lakefront",
      Amazing: "Amazing views",
      Tiny: "Tiny homes",
      Mansion: "Mansion",
      Countryside: "Countryside",
      Luxury: "Luxury",
      Castles: "Castle",
      Tropical: "Tropical",
      Historic: "Historic",
      Design: "Design",
      Farm: "Farm",
      Treehouse: "Treehouse",
      Boat: "Boat",
      Container: "Container",
      Dome: "Dome",
      Windmill: "Windmill",
      Cave: "Cave",
      Camping: "Camping",
      Arctic: "Arctic",
      Desert: "Desert",
      Vineyard: "Vineyard",
    };

    return categoryMap[categoryId] || categoryId;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-primary-600 text-xl font-semibold flex items-center">
          <i className="fas fa-spinner fa-spin mr-3 text-2xl"></i>
          Loading properties...
        </div>
      </div>
    );
  }

  if (error && properties.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-red-600 text-xl flex items-center">
          <i className="fas fa-exclamation-circle mr-3 text-2xl"></i>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-50 min-h-screen mt-2">
      {/* Categories */}
      <div className="sticky top-[72px] z-30 bg-white py-4 border-b border-gray-200 transition-all duration-200 ease-in-out">
        <div className="container mx-auto px-4">
          <div className="flex justify-around items-center">
            <div className="relative max-w-4xl flex-grow overflow-hidden">
              {/* Left Arrow */}
              <button
                onClick={() => scrollCategories("left")}
                className="absolute top-1/2 -translate-y-1/2 bg-white border border-neutral-200 shadow-lg hover:shadow-xl hover:bg-neutral-100 transition-all duration-200 rounded-full w-10 h-10 flex items-center justify-center z-20 active:scale-95"
                aria-label="Scroll left"
              >
                <i className="fas fa-chevron-left text-2xl text-primary-600"></i>
              </button>

              {/* Scrollable Categories */}
              <div
                className="flex overflow-x-auto pb-2 pl-8 pr-8 scrollbar-hide"
                ref={categoriesContainerRef}
              >
                <div className="flex space-x-8">
                  {categories.map((category) => {
                    // Debug the category
                    if (activeCategory === category.id) {
                      console.log(`Active category selected: ${category.id}`);
                    }

                    return (
                      <div
                        key={category.id}
                        onClick={() => handleCategoryClick(category.id)}
                        className={`flex flex-col items-center cursor-pointer transition-all duration-300 min-w-max ${
                          activeCategory === category.id
                            ? "text-primary-600 border-b-2 border-primary-600 scale-110"
                            : "text-neutral-500 hover:text-primary-500 hover:scale-105"
                        }`}
                      >
                        <div
                          className={`rounded-full p-2 mb-1 ${
                            activeCategory === category.id
                              ? "bg-primary-50"
                              : "bg-neutral-50"
                          }`}
                        >
                          <i
                            className={`${category.icon} text-lg ${
                              activeCategory === category.id
                                ? "text-primary-600"
                                : "text-neutral-500"
                            }`}
                          ></i>
                        </div>
                        <span className="text-sm font-medium">
                          {category.label}
                          {activeCategory === category.id && (
                            <span className="ml-1 text-xs">●</span>
                          )}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Arrow */}
              <button
                onClick={() => scrollCategories("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white border border-neutral-200 shadow-lg hover:shadow-xl hover:bg-neutral-100 transition-all duration-200 rounded-full w-10 h-10 flex items-center justify-center z-20 active:scale-95"
                aria-label="Scroll right"
              >
                <i className="fas fa-chevron-right text-2xl text-primary-600"></i>
              </button>
            </div>

            {/* Filter controls on right side */}

            <div className="flex items-center gap-2 ml-4">
              {/* Filter Button */}
              <button
                onClick={() => setShowFilterModal(true)}
                className="flex items-center gap-2 bg-white hover:bg-gray-50 border border-neutral-300 text-neutral-800 px-4 py-2 rounded-full shadow-sm text-sm font-medium transition-colors duration-200 relative"
              >
                <i className="fas fa-sliders-h text-neutral-600"></i>
                <span>Filters </span>
                {countActiveFilters() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                    {countActiveFilters()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filter Modal - shows when filter button is clicked */}
        {showFilterModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                {/* Filter modal header */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-neutral-800">
                    All Filters
                  </h2>
                  <button
                    onClick={() => setShowFilterModal(false)}
                    className="text-neutral-500 hover:text-neutral-800"
                  >
                    <i className="fas fa-times text-xl"></i>
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Price Range filter */}
                  <div>
                    <h3 className="text-lg font-medium text-neutral-800 mb-3">
                      Price Range1111
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          Min Price1111
                        </label>
                        <div className="relative rounded-md">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-neutral-500">$</span>
                          </div>
                          <input
                            type="number"
                            name="priceMin"
                            value={filters.priceMin}
                            onChange={handleFilterChange}
                            className="pl-7 w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            placeholder="Min"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          Max Price1111
                        </label>
                        <div className="relative rounded-md">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-neutral-500">$</span>
                          </div>
                          <input
                            type="number"
                            name="priceMax"
                            value={filters.priceMax}
                            onChange={handleFilterChange}
                            className="pl-7 w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            placeholder="Max"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bedrooms filter */}
                  <div>
                    <h3 className="text-lg font-medium text-neutral-800 mb-3">
                      Bedrooms
                    </h3>
                    <select
                      name="bedrooms"
                      value={filters.bedrooms}
                      onChange={handleFilterChange}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="">Any</option>
                      <option value="1">1+</option>
                      <option value="2">2+</option>
                      <option value="3">3+</option>
                      <option value="4">4+</option>
                      <option value="5">5+</option>
                    </select>
                  </div>

                  {/* Location filter */}
                  <div>
                    <h3 className="text-lg font-medium text-neutral-800 mb-3">
                      Location
                    </h3>
                    <input
                      type="text"
                      name="location"
                      value={filters.location}
                      onChange={handleFilterChange}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="City"
                    />
                  </div>

                  {/* Language filter */}
                  <div>
                    <h3 className="text-lg font-medium text-neutral-800 mb-3">
                      Language
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                      {supportedLanguages.slice(0, 6).map((lang) => (
                        <button
                          key={lang.code}
                          type="button"
                          onClick={() => {
                            changeLanguage(lang.code, lang.name);
                            setFilters({
                              ...filters,
                              language: lang.code,
                            });
                          }}
                          className={`flex items-center px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                            language === lang.code
                              ? "bg-primary-50 text-primary-600 font-medium border border-primary-200"
                              : "text-neutral-700 hover:bg-neutral-50 border border-neutral-200 hover:border-neutral-300"
                          }`}
                        >
                          <span>{lang.name}</span>
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-neutral-500 mt-2">
                      {isTranslating ? (
                        <span className="flex items-center">
                          <i className="fas fa-spinner fa-spin mr-1"></i>
                          Translating content...
                        </span>
                      ) : (
                        `Showing content in ${languageName}`
                      )}
                    </p>
                  </div>

                  {/* Amenities filter checkboxes */}
                  <div>
                    <h3 className="text-lg font-medium text-neutral-800 mb-3">
                      Amenities
                    </h3>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                      {/* Checkboxes for various amenities */}
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="topRated"
                          checked={amenityFilters.topRated}
                          onChange={() => handleAmenityFilter("topRated")}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                        />
                        <label
                          htmlFor="topRated"
                          className="ml-2 text-neutral-700"
                        >
                          Top Rated
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="wifi"
                          checked={amenityFilters.wifi}
                          onChange={() => handleAmenityFilter("wifi")}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                        />
                        <label htmlFor="wifi" className="ml-2 text-neutral-700">
                          Free WiFi
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="pool"
                          checked={amenityFilters.pool}
                          onChange={() => handleAmenityFilter("pool")}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                        />
                        <label htmlFor="pool" className="ml-2 text-neutral-700">
                          Pool
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="kitchen"
                          checked={amenityFilters.kitchen}
                          onChange={() => handleAmenityFilter("kitchen")}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                        />
                        <label
                          htmlFor="kitchen"
                          className="ml-2 text-neutral-700"
                        >
                          Kitchen
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="parking"
                          checked={amenityFilters.parking}
                          onChange={() => handleAmenityFilter("parking")}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                        />
                        <label
                          htmlFor="parking"
                          className="ml-2 text-neutral-700"
                        >
                          Free Parking
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="petFriendly"
                          checked={amenityFilters.petFriendly}
                          onChange={() => handleAmenityFilter("petFriendly")}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                        />
                        <label
                          htmlFor="petFriendly"
                          className="ml-2 text-neutral-700"
                        >
                          Pet Friendly
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="ac"
                          checked={amenityFilters.ac}
                          onChange={() => handleAmenityFilter("ac")}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                        />
                        <label htmlFor="ac" className="ml-2 text-neutral-700">
                          AC
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="hotTub"
                          checked={amenityFilters.hotTub}
                          onChange={() => handleAmenityFilter("hotTub")}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                        />
                        <label
                          htmlFor="hotTub"
                          className="ml-2 text-neutral-700"
                        >
                          Hot Tub
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="breakfast"
                          checked={amenityFilters.breakfast}
                          onChange={() => handleAmenityFilter("breakfast")}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                        />
                        <label
                          htmlFor="breakfast"
                          className="ml-2 text-neutral-700"
                        >
                          Breakfast
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="workspace"
                          checked={amenityFilters.workspace}
                          onChange={() => handleAmenityFilter("workspace")}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                        />
                        <label
                          htmlFor="workspace"
                          className="ml-2 text-neutral-700"
                        >
                          Workspace
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="washer"
                          checked={amenityFilters.washer}
                          onChange={() => handleAmenityFilter("washer")}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                        />
                        <label
                          htmlFor="washer"
                          className="ml-2 text-neutral-700"
                        >
                          Washer
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="dryer"
                          checked={amenityFilters.dryer}
                          onChange={() => handleAmenityFilter("dryer")}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                        />
                        <label
                          htmlFor="dryer"
                          className="ml-2 text-neutral-700"
                        >
                          Dryer
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="gym"
                          checked={amenityFilters.gym}
                          onChange={() => handleAmenityFilter("gym")}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                        />
                        <label htmlFor="gym" className="ml-2 text-neutral-700">
                          Gym
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-4 pt-4 border-t border-neutral-200">
                    <button
                      onClick={() => {
                        setFilters({
                          priceMin: "",
                          priceMax: "",
                          propertyType: "",
                          bedrooms: "",
                          location: "",
                          language: language, // Add language to filters
                        });
                        setAmenityFilters({
                          topRated: false,
                          wifi: false,
                          pool: false,
                          kitchen: false,
                          parking: false,
                          petFriendly: false,
                          ac: false,
                          hotTub: false,
                          breakfast: false,
                          workspace: false,
                          washer: false,
                          dryer: false,
                          gym: false,
                        });
                        setActiveCategory("all");
                      }}
                      className="flex-1 px-4 py-2 border border-neutral-300 rounded-md hover:bg-neutral-100 text-neutral-600 transition-colors duration-200"
                    >
                      Clear All
                    </button>
                    <button
                      onClick={() => setShowFilterModal(false)}
                      className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors duration-200"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Property Results Section */}
        <h1 className="text-2xl font-bold text-neutral-800 mb-4">
          {sortedProperties.length}{" "}
          {sortedProperties.length === 1 ? "Property" : "Properties"} Available
          {totalCount > 0 && sortedProperties.length !== totalCount && (
            <span className="text-sm font-normal text-neutral-500 ml-2">
              (out of {totalCount} total)
            </span>
          )}
          {activeCategory !== "all" && (
            <span className="text-sm font-normal text-primary-600 ml-2">
              in{" "}
              {categories.find((cat) => cat.id === activeCategory)?.label ||
                activeCategory}
            </span>
          )}
        </h1>

        {/* No results message */}
        {sortedProperties.length === 0 ? (
          <div className="bg-white rounded-xl py-12 text-center shadow-sm">
            <div className="text-5xl text-neutral-300 mb-4">
              <i className="fas fa-search"></i>
            </div>
            <h3 className="text-xl font-semibold text-neutral-700 mb-2">
              No properties found
            </h3>
            <p className="text-neutral-500 max-w-md mx-auto mb-6">
              We couldn't find any properties matching your criteria. Try
              adjusting your filters or search for a different location.
            </p>
            <button
              onClick={clearAllFilters}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition duration-200"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          /* Property grid - displays all filtered and sorted properties */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProperties.map((property) => {
              // Handle missing image properly by adding safety checks
              const hasValidImage =
                property.image &&
                typeof property.image === "string" &&
                property.image.trim() !== "";
              const hasValidImages =
                property.images &&
                Array.isArray(property.images) &&
                property.images.length > 0 &&
                property.images.some(
                  (img) =>
                    (typeof img === "string" && img.trim() !== "") ||
                    (typeof img === "object" && img.url)
                );

              /**
               * Provides a fallback image based on property category
               * @returns {string} - URL of an appropriate fallback image
               */
              const getCategoryImage = () => {
                // For MongoDB data, ensure we normalize the property type/category
                const propertyType =
                  property.propertyType || property.category || "";
                const normalizedType = propertyType.trim().toLowerCase();

                console.log("Looking for fallback image for:", {
                  title: property.title,
                  category: property.category,
                  propertyType: property.propertyType,
                  normalizedType,
                });

                // First try matching by activeCategory to ensure UI consistency
                if (activeCategory !== "all") {
                  const activeCat = activeCategory.toLowerCase();

                  if (activeCat === "arctic") {
                    return "https://images.unsplash.com/photo-1520209268518-aec60b8bb5ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXJjdGljfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60";
                  } else if (activeCat === "desert") {
                    return "https://images.unsplash.com/photo-1509316785289-025f5b846b35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVzZXJ0JTIwaG91c2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60";
                  } else if (
                    activeCat === "ski-in/out" ||
                    activeCat.includes("ski")
                  ) {
                    return "https://images.unsplash.com/photo-1548777123-e216912df7d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2tpJTIwY2hhbGV0fGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60";
                  } else if (activeCat === "vineyard") {
                    return "https://images.unsplash.com/photo-1597736108123-090b5a0b1d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHZpbmV5YXJkfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60";
                  }
                }

                // If not in a special category, match by property's own category
                if (normalizedType.includes("house")) {
                  return "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG91c2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60";
                } else if (normalizedType.includes("apartment")) {
                  return "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60";
                } else if (normalizedType.includes("villa")) {
                  return "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmlsbGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60";
                } else if (normalizedType.includes("cabin")) {
                  return "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2FiaW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60";
                } else if (normalizedType.includes("mansion")) {
                  return "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bHV4dXJ5JTIwZXN0YXRlfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60";
                } else if (normalizedType.includes("arctic")) {
                  return "https://images.unsplash.com/photo-1520209268518-aec60b8bb5ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXJjdGljfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60";
                } else if (normalizedType.includes("desert")) {
                  return "https://images.unsplash.com/photo-1509316785289-025f5b846b35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVzZXJ0JTIwaG91c2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60";
                } else if (normalizedType.includes("ski")) {
                  return "https://images.unsplash.com/photo-1548777123-e216912df7d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2tpJTIwY2hhbGV0fGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60";
                } else if (
                  normalizedType.includes("vineyard") ||
                  normalizedType.includes("vine")
                ) {
                  return "https://images.unsplash.com/photo-1597736108123-090b5a0b1d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHZpbmV5YXJkfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60";
                } else {
                  // Default fallback
                  return "https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHJlYWwlMjBlc3RhdGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60";
                }
              };

              // Ensure property has valid images array, use fallback if needed
              const propertyImages = hasValidImages
                ? property.images
                : hasValidImage
                  ? [property.image]
                  : [getCategoryImage()];

              return (
                // Property card component
                <div
                  key={property._id}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                  onClick={() => navigateToPropertyDetail(property._id)}
                >
                  <div>
                    {/* Property image section with price tag */}
                    <div className="relative h-60 overflow-hidden">
                      <span className="absolute top-3 right-3 bg-white text-primary-600 font-semibold px-3 py-1 rounded-full text-sm shadow-sm z-10">
                        {formatPrice(property.price || 0)}/night
                      </span>

                      {/* Image carousel */}
                      <div className="relative w-full h-full">
                        {/* Main property image */}
                        <PropertyImage
                          images={propertyImages}
                          alt={property.title || "Property"}
                          className="w-full h-60 object-cover rounded-t-xl"
                          showGallery={true}
                          id={`property-image-${property._id}`}
                          fallbackImage={getCategoryImage()}
                          propertyId={property._id}
                          onClick={(e, propId) => {
                            e.stopPropagation();
                            navigateToPropertyDetail(propId, e);
                          }}
                        />

                        {/* Image counter badge */}
                        {propertyImages.length > 1 && (
                          <div className="absolute bottom-3 right-3 bg-black bg-opacity-60 text-white px-2 py-1 rounded-md text-xs z-10">
                            <i className="fas fa-images mr-1"></i>
                            {propertyImages.length} photos
                          </div>
                        )}
                      </div>

                      {/* Favorite button */}
                      <button
                        className="absolute top-3 left-3 bg-white text-neutral-600 hover:text-primary-600 h-8 w-8 rounded-full flex items-center justify-center shadow-sm transition-colors duration-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Add favorite logic here
                        }}
                      >
                        <i className="far fa-heart"></i>
                      </button>
                    </div>

                    {/* Property details section */}
                    <div className="p-5">
                      {/* Property type tag */}
                      <div className="mb-2">
                        <span className="inline-block bg-neutral-100 text-primary-700 text-xs px-2 py-1 rounded-md">
                          {property.propertyType ||
                            property.category ||
                            "Property"}
                        </span>
                      </div>

                      {/* Property title and rating */}
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-neutral-800 group-hover:text-primary-600 transition-colors duration-200">
                          {property.title || "Unnamed Property"}
                        </h3>
                        <div className="flex items-center">
                          <i className="fas fa-star text-yellow-400 mr-1 text-sm"></i>
                          <span className="text-sm font-medium text-neutral-700">
                            {property.averageRating || "4.8"}
                          </span>
                        </div>
                      </div>

                      {/* Property description */}
                      <p className="text-neutral-600 mb-3 line-clamp-2 text-sm">
                        {property.description || "No description available"}
                      </p>

                      {/* Property specs (beds, baths, size) */}
                      <div className="flex items-center text-neutral-500 text-sm mb-4">
                        <span className="flex items-center mr-3">
                          <i className="fas fa-bed mr-1"></i>{" "}
                          {property.capacity && property.capacity.bedrooms
                            ? property.capacity.bedrooms
                            : "2"}{" "}
                          Beds
                        </span>
                        <span className="flex items-center mr-3">
                          <i className="fas fa-bath mr-1"></i>{" "}
                          {property.capacity && property.capacity.bathrooms
                            ? property.capacity.bathrooms
                            : "2"}{" "}
                          Baths
                        </span>
                        <span className="flex items-center">
                          <i className="fas fa-ruler-combined mr-1"></i>{" "}
                          {property.size || "100"}m²
                        </span>
                      </div>

                      {/* Property location and view details button */}
                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-sm">
                          <i className="fas fa-map-marker-alt text-primary-500 mr-1 text-xs"></i>
                          <span className="text-neutral-600">
                            {property.location && property.location.city
                              ? property.location.city
                              : "Unknown location"}
                            {property.location && property.location.country
                              ? `, ${property.location.country}`
                              : ""}
                          </span>
                        </div>
                        <button
                          className="bg-primary-600 hover:bg-primary-700 text-white px-3 py-1.5 rounded-lg text-sm transition duration-300"
                          onClick={(e) =>
                            navigateToPropertyDetail(property._id, e)
                          }
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Dummy property data for fallback when API is unavailable
 * This data is used when the API call fails or returns invalid data
 */
const dummyProperties = [
  // Apartment category (2 properties)
  {
    _id: "1",
    title: "Modern Apartment in Downtown",
    description:
      "Beautiful apartment with stunning views of the city. Newly renovated with modern amenities and close to public transportation.",
    price: 150,
    propertyType: "Apartment",
    category: "Apartment",
    capacity: {
      bedrooms: 2,
      bathrooms: 1,
    },
    size: 85,
    rating: 4.92,
    trending: true,
    location: {
      city: "New York",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      ac: true,
      workspace: true,
    },
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
    ],
  },
  {
    _id: "2",
    title: "Stylish Downtown Loft",
    description:
      "Industrial chic loft with high ceilings and exposed brick. Perfect for urban professionals looking for style and convenience.",
    price: 220,
    propertyType: "Apartment",
    category: "Apartment",
    capacity: {
      bedrooms: 1,
      bathrooms: 1,
    },
    size: 75,
    rating: 4.75,
    location: {
      city: "Chicago",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      ac: true,
      workspace: true,
    },
    images: [
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bG9mdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
    ],
  },

  // House category (2 properties)
  {
    _id: "3",
    title: "Cozy Family Home",
    description:
      "Spacious family home in a quiet neighborhood. Perfect for families with children, featuring a large backyard and modern amenities.",
    price: 220,
    propertyType: "House",
    category: "House",
    capacity: {
      bedrooms: 3,
      bathrooms: 2,
    },
    size: 180,
    rating: 4.78,
    location: {
      city: "Portland",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      petFriendly: true,
      parking: true,
    },
    images: [
      "https://unsplash.com/photos/white-concrete-building-during-daytime-gxyeia7Syuk",
      // "https://unsplash.com/photos/white-concrete-building-during-daytime-gxyeia7Syuk",
      // "https://unsplash.com/photos/white-concrete-building-during-daytime-gxyeia7Syuk",
      // "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG91c2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
    ],
  },
  {
    _id: "4",
    title: "Modern Suburban House",
    description:
      "Contemporary design with open floor plan. Featuring a chef's kitchen, smart home technology, and spacious master suite.",
    price: 250,
    propertyType: "House",
    category: "House",
    capacity: {
      bedrooms: 4,
      bathrooms: 3,
    },
    size: 200,
    rating: 4.85,
    location: {
      city: "Austin",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      parking: true,
      ac: true,
      washer: true,
      dryer: true,
    },
    images: [
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG91c2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
    ],
  },

  // Villa category (2 properties)
  {
    _id: "5",
    title: "Luxury Beachfront Villa",
    description:
      "Luxurious villa with direct access to the beach. Perfect for family vacations with spacious living areas and private swimming pool.",
    price: 350,
    propertyType: "Villa",
    category: "Villa",
    capacity: {
      bedrooms: 4,
      bathrooms: 3,
    },
    size: 220,
    rating: 4.85,
    trending: true,
    location: {
      city: "Miami",
      country: "USA",
    },
    amenities: {
      wifi: true,
      pool: true,
      kitchen: true,
      parking: true,
    },
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmlsbGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
    ],
  },
  {
    _id: "6",
    title: "Mediterranean Villa Retreat",
    description:
      "Elegant villa with Mediterranean architecture. Features include a private pool, outdoor kitchen, and panoramic mountain views.",
    price: 380,
    propertyType: "Villa",
    category: "Villa",
    capacity: {
      bedrooms: 5,
      bathrooms: 4,
    },
    size: 280,
    rating: 4.92,
    location: {
      city: "Scottsdale",
      country: "USA",
    },
    amenities: {
      wifi: true,
      pool: true,
      kitchen: true,
      parking: true,
      ac: true,
    },
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dmlsbGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
    ],
  },

  // Condo category (2 properties)
  {
    _id: "7",
    title: "Luxury Penthouse Suite",
    description:
      "High-end penthouse with panoramic city views. Features include a hot tub, modern kitchen, and private elevator access.",
    price: 500,
    propertyType: "Condo",
    category: "Condo",
    capacity: {
      bedrooms: 3,
      bathrooms: 2,
    },
    size: 150,
    rating: 4.96,
    trending: true,
    location: {
      city: "Los Angeles",
      country: "USA",
    },
    amenities: {
      wifi: true,
      hotTub: true,
      kitchen: true,
      parking: true,
      ac: true,
    },
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVudGhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
    ],
  },
  {
    _id: "8",
    title: "Modern Urban Condo",
    description:
      "Sleek city condo with floor-to-ceiling windows and modern furnishings. Walking distance to restaurants and entertainment.",
    price: 275,
    propertyType: "Condo",
    category: "Condo",
    capacity: {
      bedrooms: 2,
      bathrooms: 2,
    },
    size: 120,
    rating: 4.83,
    location: {
      city: "Seattle",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      gym: true,
      workspace: true,
    },
    images: [
      "https://images.unsplash.com/photo-1551361415-69c87624161d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29uZG98ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
    ],
  },

  // Cabin category (2 properties)
  {
    _id: "9",
    title: "Mountain Cabin Retreat",
    description:
      "Rustic cabin in the mountains with fireplace and stunning views. Great for hiking, skiing, and outdoor adventures.",
    price: 180,
    propertyType: "Cabin",
    category: "Cabin",
    capacity: {
      bedrooms: 2,
      bathrooms: 1,
    },
    size: 90,
    rating: 4.82,
    location: {
      city: "Denver",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      petFriendly: true,
      parking: true,
    },
    images: [
      "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2FiaW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
    ],
  },
  {
    _id: "10",
    title: "Cozy Forest Cabin",
    description:
      "Charming wood cabin surrounded by tall pines. Features a wood-burning stove, rustic decor, and private hiking trails.",
    price: 165,
    propertyType: "Cabin",
    category: "Cabin",
    capacity: {
      bedrooms: 1,
      bathrooms: 1,
    },
    size: 65,
    rating: 4.79,
    location: {
      city: "Asheville",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      petFriendly: true,
    },
    images: [
      "https://images.unsplash.com/photo-1587061949409-02df41d5e562?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FiaW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
    ],
  },

  // Beach category (2 properties)
  {
    _id: "11",
    title: "Beachside Bungalow",
    description:
      "Cozy bungalow just steps from the beach. Perfect for a romantic getaway with stunning ocean views.",
    price: 190,
    propertyType: "House",
    category: "Beach",
    capacity: {
      bedrooms: 1,
      bathrooms: 1,
    },
    size: 60,
    rating: 4.89,
    trending: true,
    location: {
      city: "San Diego",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      ac: true,
    },
    features: ["Beachfront", "Ocean View"],
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJlYWNoJTIwaG91c2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
    ],
  },
  {
    _id: "12",
    title: "Oceanfront Beach House",
    description:
      "Stunning beach house with direct ocean access and panoramic water views. Large deck for sunbathing and outdoor dining.",
    price: 320,
    propertyType: "House",
    category: "Beach",
    capacity: {
      bedrooms: 3,
      bathrooms: 2,
    },
    size: 140,
    rating: 4.91,
    location: {
      city: "Malibu",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      ac: true,
      parking: true,
    },
    features: ["Beachfront", "Ocean View"],
    images: [
      "https://images.unsplash.com/photo-1527359443443-84a48aec73d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2glMjBob3VzZXxlbnwwfHwwfHx8MA%3D&auto=format&fit=crop&w=600&q=60",
    ],
  },

  // Lakefront category (2 properties)
  {
    _id: "13",
    title: "Lakefront Cottage with Dock",
    description:
      "Peaceful cottage on the lake with private dock and beautiful water views. Perfect for fishing and water activities.",
    price: 210,
    propertyType: "House",
    category: "Lakefront",
    capacity: {
      bedrooms: 3,
      bathrooms: 2,
    },
    size: 110,
    rating: 4.88,
    location: {
      city: "Lake Tahoe",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      parking: true,
    },
    features: ["Lakefront", "Private Dock"],
    images: [
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFrZSUyMGhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
    ],
  },
  {
    _id: "14",
    title: "Modern Lake House",
    description:
      "Contemporary lake house with floor-to-ceiling windows overlooking the water. Features include a private beach and boat slip.",
    price: 280,
    propertyType: "House",
    category: "Lakefront",
    capacity: {
      bedrooms: 4,
      bathrooms: 3,
    },
    size: 190,
    rating: 4.86,
    location: {
      city: "Lake Geneva",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      parking: true,
      ac: true,
    },
    features: ["Lakefront", "Private Beach"],
    images: [
      "https://images.unsplash.com/photo-1527786356703-4b100091cd2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bGFrZSUyMGhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
    ],
  },

  // Amazing Views category (2 properties)
  {
    _id: "15",
    title: "Mountain View Retreat",
    description:
      "Stunning property with panoramic mountain views. Floor-to-ceiling windows showcase nature's beauty from every room.",
    price: 240,
    propertyType: "House",
    category: "Amazing",
    capacity: {
      bedrooms: 2,
      bathrooms: 2,
    },
    size: 120,
    rating: 4.93,
    trending: true,
    location: {
      city: "Boulder",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      parking: true,
    },
    features: ["Amazing views", "Mountain View"],
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG1vdW50YWluJTIwdmlld3xlbnwwfHwwfHx8MA%3D&auto=format&fit=crop&w=600&q=60",
    ],
  },
  {
    _id: "16",
    title: "City Skyline Penthouse",
    description:
      "Luxurious penthouse with breathtaking city skyline views. Watch the sunset transform the cityscape from your private terrace.",
    price: 380,
    propertyType: "Condo",
    category: "Amazing",
    capacity: {
      bedrooms: 2,
      bathrooms: 2,
    },
    size: 130,
    rating: 4.9,
    location: {
      city: "San Francisco",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      parking: true,
      ac: true,
    },
    features: ["Amazing views", "City View"],
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },

  // Tiny Homes category (2 properties)
  {
    _id: "17",
    title: "Compact Modern Tiny House",
    description:
      "Cleverly designed tiny house with all modern amenities. Perfect example of minimalist living without sacrificing comfort.",
    price: 95,
    propertyType: "Tiny",
    category: "Tiny",
    capacity: {
      bedrooms: 1,
      bathrooms: 1,
    },
    size: 25,
    rating: 4.84,
    location: {
      city: "Portland",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
    },
    features: ["Tiny homes", "Minimalist"],
    images: [
      "https://images.unsplash.com/photo-1668015642451-a3bb11afb441?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    _id: "18",
    title: "Rustic Tiny Cabin",
    description:
      "Charming tiny cabin with rustic details. Smart space utilization provides all necessities in a cozy, intimate setting.",
    price: 85,
    propertyType: "Tiny",
    category: "Tiny",
    capacity: {
      bedrooms: 1,
      bathrooms: 1,
    },
    size: 20,
    rating: 4.82,
    location: {
      city: "Asheville",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      petFriendly: true,
    },
    features: ["Tiny homes", "Rustic"],
    images: [
      "https://images.unsplash.com/photo-1587061949409-02df41d5e562?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHRpbnklMjBob3VzZXxlbnwwfHwwfHx8MA%3D&auto=format&fit=crop&w=600&q=60",
    ],
  },

  // Mansion category (2 properties)
  {
    _id: "19",
    title: "Luxury Countryside Estate",
    description:
      "Expansive estate in the countryside with private garden, swimming pool, and tennis court. Perfect for large groups.",
    price: 450,
    propertyType: "Mansion",
    category: "Mansion",
    capacity: {
      bedrooms: 5,
      bathrooms: 4,
    },
    size: 300,
    rating: 4.97,
    trending: true,
    location: {
      city: "Nashville",
      country: "USA",
    },
    amenities: {
      wifi: true,
      pool: true,
      kitchen: true,
      parking: true,
      gym: true,
    },
    features: ["Mansion", "Luxury"],
    images: [
      "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bHV4dXJ5JTIwZXN0YXRlfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
    ],
  },
  {
    _id: "20",
    title: "Historic Grand Mansion",
    description:
      "Magnificent historic mansion with period details and modern updates. Features include a library, ballroom, and formal gardens.",
    price: 520,
    propertyType: "Mansion",
    category: "Mansion",
    capacity: {
      bedrooms: 6,
      bathrooms: 5,
    },
    size: 350,
    rating: 4.95,
    location: {
      city: "Charleston",
      country: "USA",
    },
    amenities: {
      wifi: true,
      pool: true,
      kitchen: true,
      parking: true,
    },
    features: ["Mansion", "Historic"],
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFuc2lvbnxlbnwwfHwwfHx8MA%3D&auto=format&fit=crop&w=600&q=60",
    ],
  },

  // Countryside category (2 properties)
  {
    _id: "21",
    title: "Peaceful Country Farmhouse",
    description:
      "Charming renovated farmhouse surrounded by rolling hills and farmland. Enjoy the peace and quiet of rural living.",
    price: 175,
    propertyType: "House",
    category: "Countryside",
    capacity: {
      bedrooms: 3,
      bathrooms: 2,
    },
    size: 160,
    rating: 4.87,
    location: {
      city: "Woodstock",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      parking: true,
      petFriendly: true,
    },
    features: ["Countryside", "Farm View"],
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNvdW50cnlzaWRlJTIwaG9tZXxlbnwwfHwwfHx8MA%3D&auto=format&fit=crop&w=600&q=60",
    ],
  },
  {
    _id: "22",
    title: "Country Cottage with Garden",
    description:
      "Idyllic cottage with beautiful gardens and countryside views. Perfect for a peaceful retreat from city life.",
    price: 150,
    propertyType: "House",
    category: "Countryside",
    capacity: {
      bedrooms: 2,
      bathrooms: 1,
    },
    size: 90,
    rating: 4.83,
    location: {
      city: "Hudson Valley",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      parking: true,
    },
    features: ["Countryside", "Garden"],
    images: [
      "https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvdW50cnklMjBjb3R0YWdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
    ],
  },

  // Luxury category (2 properties)
  {
    _id: "23",
    title: "Ultra-Luxury Penthouse",
    description:
      "Opulent penthouse with premium finishes and amenities. Featuring private elevator, marble fixtures, and 24-hour concierge service.",
    price: 650,
    propertyType: "Condo",
    category: "Luxury",
    capacity: {
      bedrooms: 3,
      bathrooms: 3,
    },
    size: 220,
    rating: 4.98,
    trending: true,
    location: {
      city: "New York",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      parking: true,
      gym: true,
      hotTub: true,
    },
    features: ["Luxury", "Premium"],
    images: [
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGx1eHVyeSUyMGhvbWV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
    ],
  },
  {
    _id: "24",
    title: "Lavish Beachfront Villa",
    description:
      "Extravagant beachfront property with infinity pool, private beach access, and designer furnishings throughout.",
    price: 780,
    propertyType: "Villa",
    category: "Luxury",
    capacity: {
      bedrooms: 5,
      bathrooms: 5,
    },
    size: 380,
    rating: 4.99,
    location: {
      city: "Palm Beach",
      country: "USA",
    },
    amenities: {
      wifi: true,
      pool: true,
      kitchen: true,
      parking: true,
      ac: true,
      hotTub: true,
      gym: true,
    },
    features: ["Luxury", "Beachfront"],
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bHV4dXJ5JTIwdmlsbGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
    ],
  },

  // Castles category (2 properties)
  {
    _id: "25",
    title: "Historic Stone Castle",
    description:
      "Authentic medieval castle with modern comforts. Experience living history in this unique accommodation with turrets and ramparts.",
    price: 480,
    propertyType: "Castle",
    category: "Castles",
    capacity: {
      bedrooms: 5,
      bathrooms: 3,
    },
    size: 400,
    rating: 4.9,
    location: {
      city: "Hudson Valley",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      parking: true,
    },
    features: ["Castle", "Historic"],
    images: [
      "https://images.unsplash.com/photo-1533154683836-84ea7a0bc310?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FzdGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
    ],
  },
  {
    _id: "26",
    title: "Fairy Tale Castle Suite",
    description:
      "Stay in a real castle with fairy tale charm. This private suite features gothic architecture and period furnishings.",
    price: 350,
    propertyType: "Castle",
    category: "Castles",
    capacity: {
      bedrooms: 1,
      bathrooms: 1,
    },
    size: 120,
    rating: 4.88,
    location: {
      city: "Tarrytown",
      country: "USA",
    },
    amenities: {
      wifi: true,
      breakfast: true,
      parking: true,
    },
    features: ["Castle", "Unique"],
    images: [
      "https://images.unsplash.com/photo-1583526241256-cb18e8056705?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y2FzdGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
    ],
  },

  // Tropical category (2 properties)
  {
    _id: "27",
    title: "Tropical Island Bungalow",
    description:
      "Exotic bungalow surrounded by lush tropical gardens. Palm trees, exotic flowers, and island breezes create a paradise feel.",
    price: 230,
    propertyType: "House",
    category: "Tropical",
    capacity: {
      bedrooms: 1,
      bathrooms: 1,
    },
    size: 70,
    rating: 4.86,
    location: {
      city: "Key West",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      ac: true,
    },
    features: ["Tropical", "Garden"],
    images: [
      "https://plus.unsplash.com/premium_photo-1687960116574-782d09070294?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8VHJvcGljYWwlMjBIb3VzZXxlbnwwfHwwfHx8MA%3D%3D",
    ],
  },
  {
    _id: "28",
    title: "Tropical Paradise Villa",
    description:
      "Luxurious villa with tropical theme throughout. Featuring an outdoor shower, hammocks, and private pool surrounded by palm trees.",
    price: 320,
    propertyType: "Villa",
    category: "Tropical",
    capacity: {
      bedrooms: 3,
      bathrooms: 2,
    },
    size: 180,
    rating: 4.91,
    location: {
      city: "Maui",
      country: "USA",
    },
    amenities: {
      wifi: true,
      pool: true,
      kitchen: true,
      ac: true,
    },
    features: ["Tropical", "Paradise"],
    images: [
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHJvcGljYWwlMjB2aWxsYXxlbnwwfHwwfHx8MA%3D&auto=format&fit=crop&w=600&q=60",
    ],
  },

  // Historic category (2 properties)
  {
    _id: "29",
    title: "Historic Downtown Hotel Suite",
    description:
      "Elegant hotel suite in a historic building with classic architecture and modern amenities. Located in the historic district.",
    price: 280,
    propertyType: "Hotel",
    category: "Historic",
    capacity: {
      bedrooms: 1,
      bathrooms: 1,
    },
    size: 65,
    rating: 4.85,
    location: {
      city: "Boston",
      country: "USA",
    },
    amenities: {
      wifi: true,
      breakfast: true,
      ac: true,
      gym: true,
    },
    features: ["Historic", "Central Location"],
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG90ZWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
    ],
  },
  {
    _id: "30",
    title: "Victorian Heritage Home",
    description:
      "Beautifully preserved Victorian home with period details and antique furnishings. Experience a bygone era with modern comforts.",
    price: 260,
    propertyType: "House",
    category: "Historic",
    capacity: {
      bedrooms: 3,
      bathrooms: 2,
    },
    size: 180,
    rating: 4.89,
    location: {
      city: "San Francisco",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      parking: true,
    },
    features: ["Historic", "Victorian"],
    images: [
      "https://images.unsplash.com/photo-1519424187720-db6d0fc5a833?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aGlzdG9yaWMlMjBob21lfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
    ],
  },

  // Design category (2 properties)
  {
    _id: "31",
    title: "Architect-Designed Modern Home",
    description:
      "Award-winning architectural design with unique features and innovative use of space and light. A true design enthusiast's dream.",
    price: 310,
    propertyType: "House",
    category: "Design",
    capacity: {
      bedrooms: 2,
      bathrooms: 2,
    },
    size: 140,
    rating: 4.94,
    trending: true,
    location: {
      city: "Palm Springs",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      parking: true,
      pool: true,
    },
    features: ["Design", "Architectural"],
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bW9kZXJuJTIwaG9tZXxlbnwwfHwwfHx8MA%3D&auto=format&fit=crop&w=600&q=60",
    ],
  },
  {
    _id: "32",
    title: "Designer Loft with Art Collection",
    description:
      "Carefully curated designer loft featuring contemporary art pieces. Each detail has been thoughtfully considered for aesthetics and function.",
    price: 290,
    propertyType: "Apartment",
    category: "Design",
    capacity: {
      bedrooms: 1,
      bathrooms: 1,
    },
    size: 95,
    rating: 4.92,
    location: {
      city: "Chicago",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      ac: true,
      workspace: true,
    },
    features: ["Design", "Artistic"],
    images: [
      "https://images.unsplash.com/photo-1618219944342-824e40a13285?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZGVzaWduZXIlMjBhcGFydG1lbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
    ],
  },

  // Farm category (2 properties)
  {
    _id: "33",
    title: "Working Farm Stay",
    description:
      "Authentic farm experience with comfortable accommodations. Guests can participate in farm activities and enjoy fresh produce.",
    price: 140,
    propertyType: "Farm",
    category: "Farm",
    capacity: {
      bedrooms: 2,
      bathrooms: 1,
    },
    size: 120,
    rating: 4.87,
    location: {
      city: "Vermont",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      parking: true,
      petFriendly: true,
    },
    features: ["Farm", "Rural"],
    images: [
      "https://images.unsplash.com/photo-1500076656116-558758c991c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFybXxlbnwwfHwwfHx8MA%3D&auto=format&fit=crop&w=600&q=60",
    ],
  },
  {
    _id: "34",
    title: "Restored Farmhouse Retreat",
    description:
      "Beautifully restored historic farmhouse on working land. Features original details with modern updates for comfort.",
    price: 190,
    propertyType: "Farm",
    category: "Farm",
    capacity: {
      bedrooms: 3,
      bathrooms: 2,
    },
    size: 170,
    rating: 4.91,
    location: {
      city: "Upstate New York",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      parking: true,
      petFriendly: true,
    },
    features: ["Farm", "Historic"],
    images: [
      "https://images.unsplash.com/photo-1593604572579-d7de1e19f094?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZmFybWhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
    ],
  },

  // Treehouse category (2 properties)
  {
    _id: "35",
    title: "Luxury Treehouse Escape",
    description:
      "Elevated treehouse with luxury amenities. Experience the magic of sleeping among the trees with all modern comforts.",
    price: 230,
    propertyType: "Treehouse",
    category: "Treehouse",
    capacity: {
      bedrooms: 1,
      bathrooms: 1,
    },
    size: 55,
    rating: 4.95,
    trending: true,
    location: {
      city: "Oregon",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      hotTub: true,
    },
    features: ["Treehouse", "Unique"],
    images: [
      "https://images.unsplash.com/photo-1488462237308-ecaa28b729d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dHJlZWhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
    ],
  },
  {
    _id: "36",
    title: "Rustic Forest Treehouse",
    description:
      "Charming treehouse built around living trees. Fall asleep to the sounds of nature in this unique forest accommodation.",
    price: 170,
    propertyType: "Treehouse",
    category: "Treehouse",
    capacity: {
      bedrooms: 1,
      bathrooms: 1,
    },
    size: 40,
    rating: 4.89,
    location: {
      city: "Washington",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
    },
    features: ["Treehouse", "Forest"],
    images: [
      "https://images.unsplash.com/photo-1578645806969-e755c0d43dfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHJlZWhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
    ],
  },

  // Trending category (2 properties marked as trending but different property types)
  {
    _id: "37",
    title: "Trending Designer Loft",
    description:
      "This season's most popular rental, featuring Instagram-worthy decor and premium location close to hotspots.",
    price: 270,
    propertyType: "Apartment",
    category: "Trending",
    capacity: {
      bedrooms: 2,
      bathrooms: 1,
    },
    size: 95,
    rating: 4.96,
    trending: true,
    location: {
      city: "Brooklyn",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      ac: true,
      workspace: true,
    },
    features: ["Trending", "Designer"],
    images: [
      "https://images.unsplash.com/photo-1556912167-f556f1f39fdf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGxvZnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
    ],
  },
  {
    _id: "38",
    title: "Trending Coastal Home",
    description:
      "One of the highest-rated properties in the area, featuring breathtaking ocean views and designer interiors.",
    price: 340,
    propertyType: "House",
    category: "Trending",
    capacity: {
      bedrooms: 3,
      bathrooms: 2,
    },
    size: 180,
    rating: 4.97,
    trending: true,
    location: {
      city: "Santa Barbara",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      parking: true,
      pool: true,
    },
    features: ["Trending", "Coastal"],
    images: [
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvYXN0YWwlMjBob21lfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
    ],
  },

  // Special unique categories (Boat, Container, Dome, Windmill, Cave, Camping)
  {
    _id: "39",
    title: "Luxury Houseboat",
    description:
      "Experience life on the water in this stationary houseboat. Gentle rocking and water views create a unique stay.",
    price: 195,
    propertyType: "Boat",
    category: "Boat",
    capacity: {
      bedrooms: 2,
      bathrooms: 1,
    },
    size: 70,
    rating: 4.84,
    location: {
      city: "Seattle",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
    },
    features: ["Boat", "Waterfront"],
    images: [
      "https://images.unsplash.com/photo-1610501671344-ec9f347221b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2Vib2F0fGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
    ],
  },
  {
    _id: "40",
    title: "Modern Container Home",
    description:
      "Innovative shipping container conversion with sleek, minimalist design. Proves sustainable living can be stylish and comfortable.",
    price: 125,
    propertyType: "Container",
    category: "Container",
    capacity: {
      bedrooms: 1,
      bathrooms: 1,
    },
    size: 40,
    rating: 4.82,
    location: {
      city: "Portland",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      ac: true,
    },
    features: ["Container", "Modern"],
    images: [
      "https://images.unsplash.com/photo-1482236416769-543abffc1c94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29udGFpbmVyJTIwaG9tZXxlbnwwfHwwfHx8MA%3D&auto=format&fit=crop&w=600&q=60",
    ],
  },
  {
    _id: "41",
    title: "Geodesic Dome Retreat",
    description:
      "Unique geodesic dome home with panoramic windows. The special architecture creates an open, airy feeling with great acoustics.",
    price: 160,
    propertyType: "Dome",
    category: "Dome",
    capacity: {
      bedrooms: 1,
      bathrooms: 1,
    },
    size: 65,
    rating: 4.85,
    location: {
      city: "Joshua Tree",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
    },
    features: ["Dome", "Unique"],
    images: [
      "https://images.unsplash.com/photo-1518623380242-d992d3c57b37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9tZSUyMGhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
    ],
  },
  {
    _id: "42",
    title: "Converted Historic Windmill",
    description:
      "Stay in a beautifully converted windmill with original features and 360-degree views from the top floor bedroom.",
    price: 220,
    propertyType: "Windmill",
    category: "Windmill",
    capacity: {
      bedrooms: 2,
      bathrooms: 1,
    },
    size: 90,
    rating: 4.93,
    location: {
      city: "Cape Cod",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      parking: true,
    },
    features: ["Windmill", "Historic"],
    images: [
      "https://images.unsplash.com/photo-1576007473554-a5fa517bc754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2luZG1pbGwlMjBob3VzZXxlbnwwfHwwfHx8MA%3D&auto=format&fit=crop&w=600&q=60",
    ],
  },
  {
    _id: "43",
    title: "Modern Desert Cave House",
    description:
      "Unique cave dwelling built into a hillside with natural temperature regulation. A perfect blend of primal and modern living.",
    price: 185,
    propertyType: "Cave",
    category: "Cave",
    capacity: {
      bedrooms: 2,
      bathrooms: 1,
    },
    size: 85,
    rating: 4.88,
    location: {
      city: "Sedona",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      ac: true,
    },
    features: ["Cave", "Unique"],
    images: [
      "https://images.unsplash.com/photo-1717161282488-528e26aa307b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fE1vZGVybiUyMERlc2VydCUyMENhdmUlMjBIb3VzZXxlbnwwfHwwfHx8MA%3D%3D",
    ],
  },

  // update
  {
    _id: "44",
    title: "Luxury Glamping Tent",
    description:
      "Experience the outdoors without roughing it. This luxury tent features a real bed, electricity, and upscale amenities in a natural setting.",
    price: 145,
    propertyType: "Camping",
    category: "Camping",
    capacity: {
      bedrooms: 1,
      bathrooms: 1,
    },
    size: 40,
    rating: 4.86,
    location: {
      city: "Big Sur",
      country: "USA",
    },
    amenities: {
      wifi: true,
      parking: true,
      breakfast: true,
    },
    features: ["Camping", "Glamping"],
    images: [
      "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2xhbXBpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
    ],
  },
];

export default Listings;
