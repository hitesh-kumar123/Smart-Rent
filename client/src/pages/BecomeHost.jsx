import React, { useState, useEffect, startTransition, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import StaticMap from "../components/StaticMap";
import { uploadMultipleToCloudinary } from "../utils/cloudinaryService";
import { useAppSettings } from "../contexts/AppSettingsContext";

const BecomeHost = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    propertyType: "",
    propertyCategory: "",
    location: {
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
    },
    amenities: [],
    photos: [],
    title: "",
    description: "",
    price: "",
    guests: 1,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [cloudinaryImages, setCloudinaryImages] = useState([]);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Get currency and formatting functions from AppSettingsContext
  const {
    formatPrice,
    currency,
    isLoadingRates,
    changeLanguage,
    changeCurrency,
    supportedLanguages,
    language,
  } = useAppSettings();

  // Available currencies
  const currencies = [
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "EUR", symbol: "€", name: "Euro" },
    { code: "GBP", symbol: "£", name: "British Pound" },
    { code: "JPY", symbol: "¥", name: "Japanese Yen" },
    { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
    { code: "AUD", symbol: "A$", name: "Australian Dollar" },
    { code: "INR", symbol: "₹", name: "Indian Rupee" },
  ];

  // Handler for changing language
  const handleLanguageChange = (langCode, langName) => {
    changeLanguage(langCode, langName);
  };

  // Handler for changing currency
  const handleCurrencyChange = (currencyCode) => {
    changeCurrency(currencyCode);
  };

  const totalSteps = 5;

  const propertyTypes = [
    { id: "house", label: "House", icon: "🏠" },
    { id: "apartment", label: "Apartment", icon: "🏢" },
    { id: "guesthouse", label: "Guesthouse", icon: "🏡" },
    { id: "hotel", label: "Hotel", icon: "🏨" },
    { id: "cabin", label: "Cabin", icon: "🌲" },
    { id: "villa", label: "Villa", icon: "🏛️" },
  ];

  const propertyCategories = [
    { id: "beach", label: "Beach", icon: "🏖️" },
    { id: "mountain", label: "Mountain", icon: "⛰️" },
    { id: "city", label: "City", icon: "🏙️" },
    { id: "countryside", label: "Countryside", icon: "🌄" },
    { id: "lake", label: "Lake", icon: "🌊" },
    { id: "desert", label: "Desert", icon: "🏜️" },
  ];

  const amenities = [
    { id: "wifi", label: "Wifi", icon: "📶" },
    { id: "kitchen", label: "Kitchen", icon: "🍳" },
    { id: "washer", label: "Washer", icon: "🧺" },
    { id: "dryer", label: "Dryer", icon: "👕" },
    { id: "ac", label: "Air conditioning", icon: "❄️" },
    { id: "heating", label: "Heating", icon: "🔥" },
    { id: "tv", label: "TV", icon: "📺" },
    { id: "parking", label: "Free parking", icon: "🚗" },
    { id: "pool", label: "Pool", icon: "🏊" },
    { id: "hottub", label: "Hot tub", icon: "♨️" },
    { id: "gym", label: "Gym", icon: "💪" },
    { id: "pets", label: "Pets allowed", icon: "🐕" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleNumberChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: Math.max(1, parseInt(value) || 1),
    });
  };

  const handleAmenityToggle = (amenityId) => {
    if (formData.amenities.includes(amenityId)) {
      setFormData({
        ...formData,
        amenities: formData.amenities.filter((id) => id !== amenityId),
      });
    } else {
      setFormData({
        ...formData,
        amenities: [...formData.amenities, amenityId],
      });
    }
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      startTransition(() => {
        setCurrentStep(currentStep + 1);
        window.scrollTo(0, 0);
      });
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      startTransition(() => {
        setCurrentStep(currentStep - 1);
        window.scrollTo(0, 0);
      });
    }
  };

  const handlePropertyTypeSelect = (typeId) => {
    startTransition(() => {
      setFormData({ ...formData, propertyType: typeId });
    });
  };

  const handlePropertyCategorySelect = (categoryId) => {
    startTransition(() => {
      setFormData({ ...formData, propertyCategory: categoryId });
    });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

    // Check if adding these files would exceed the 20 photo limit
    if (formData.photos.length + files.length > 20) {
      alert("You can only upload up to 20 photos in total");
      return;
    }

    // Filter out non-image files
    const validFiles = files.filter((file) => allowedTypes.includes(file.type));

    if (validFiles.length !== files.length) {
      alert("Only JPEG and PNG images are allowed");
    }

    // Create preview URLs for valid files
    const newPhotos = validFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
    }));

    setFormData({
      ...formData,
      photos: [...formData.photos, ...newPhotos],
    });
  };

  const handleRemovePhoto = (index) => {
    const updatedPhotos = [...formData.photos];

    // Revoke object URL to prevent memory leaks
    URL.revokeObjectURL(updatedPhotos[index].preview);

    updatedPhotos.splice(index, 1);
    setFormData({
      ...formData,
      photos: updatedPhotos,
    });
  };

  const handleBrowseFiles = () => {
    fileInputRef.current.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      const event = { target: { files: droppedFiles } };
      handleFileUpload(event);
    }
  };

  // Upload all photos to Cloudinary
  const uploadPhotos = async () => {
    if (formData.photos.length === 0) {
      console.warn("No photos to upload");
      return [];
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const files = formData.photos.map((photo) => photo.file);
      console.log(`Starting upload of ${files.length} photos to Cloudinary...`);

      // For safety, create local image objects if Cloudinary upload fails
      const localImageObjects = formData.photos.map((photo, index) => ({
        url: photo.preview, // Use the preview URL as a fallback
        secure_url: photo.preview,
        public_id: `local-image-${index}`,
        isLocalPreview: true,
      }));

      // Try to upload to Cloudinary
      let uploadedImages = [];
      try {
        uploadedImages = await uploadMultipleToCloudinary(files, (progress) => {
          setUploadProgress(progress);
        });
        console.log(
          `Successfully uploaded ${uploadedImages.length} images to Cloudinary`
        );
      } catch (uploadError) {
        console.error("Error uploading to Cloudinary:", uploadError);
        console.warn("Using local image previews instead");
        // Use local images as fallback
        uploadedImages = localImageObjects;
      }

      // Validate the uploaded images to make sure they have URLs
      const validImages = uploadedImages.map((image, index) => {
        // If the image doesn't have a secure_url, use the local preview
        if (!image.secure_url) {
          console.warn(
            `Image ${index} missing secure_url, using local preview`
          );
          return (
            localImageObjects[index] || {
              secure_url:
                "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop",
              public_id: `fallback-image-${index}`,
            }
          );
        }
        return image;
      });

      // Store the Cloudinary responses
      setCloudinaryImages(validImages);
      setIsUploading(false);

      console.log("Final images to be used:", validImages);
      return validImages;
    } catch (error) {
      console.error("Error in uploadPhotos function:", error);
      setIsUploading(false);

      // Return fallback image to ensure at least one image is available
      return [
        {
          secure_url:
            "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop",
          public_id: "error-fallback-image",
        },
      ];
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload images to Cloudinary first
    try {
      setIsUploading(true);
      console.log("Starting image upload process...");

      let uploadedImages = [];

      // Check if there are photos to upload
      if (formData.photos && formData.photos.length > 0) {
        // Upload images to Cloudinary
        uploadedImages = await uploadPhotos();
        console.log("Image upload complete:", uploadedImages);
      } else {
        console.warn("No photos selected, using fallback image");
      }

      // Ensure we have at least one valid image
      if (!uploadedImages || uploadedImages.length === 0) {
        console.warn("Using fallback image as no valid images were uploaded");
        // Add fallback image if no images were uploaded
        uploadedImages = [
          {
            secure_url:
              "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop",
            url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop",
            public_id: "fallback-image",
          },
        ];
      }

      // Map images to the format expected by the property data
      // Important: ensure both url and secure_url are available
      const propertyImages = uploadedImages.map((image) => {
        // Make sure every image has both url and secure_url properties
        const imageUrl = image.secure_url || image.url || "";

        return {
          url: imageUrl,
          secure_url: imageUrl,
          publicId: image.public_id || `image-id-${Date.now()}`,
          isLocalImage: image.isLocalPreview || false,
        };
      });

      console.log("Final property images:", propertyImages);

      // Prepare property data
      const propertyData = {
        id: Date.now(), // Generate a unique ID for the property
        title: formData.title || "New Property Listing",
        description:
          formData.description || "Property description not provided",
        category: formData.propertyCategory || formData.propertyType || "Other", // Use category or fallback to type
        price: parseFloat(formData.price) || 0,
        location: {
          address: formData.location.address || "",
          city: formData.location.city || "",
          state: formData.location.state || "",
          country: formData.location.country || "United States",
          zipCode: formData.location.zipCode || "",
          coordinates: [0, 0], // These would be set by geocoding in production
        },
        images: propertyImages,
        amenities: formData.amenities.reduce((obj, amenity) => {
          obj[amenity] = true;
          return obj;
        }, {}),
        capacity: {
          guests: formData.guests || 1,
          bedrooms: formData.bedrooms || 1,
          beds: formData.beds || 1,
          bathrooms: formData.bathrooms || 1,
        },
        status: "active", // Set as active by default
        rating: null,
        reviewCount: 0,
        bookedDates: [],
      };

      console.log("Property data to submit:", propertyData);

      // Store the new listing in localStorage
      const existingListings = JSON.parse(
        localStorage.getItem("hostListings") || "[]"
      );
      const updatedListings = [...existingListings, propertyData];

      // We need to specially handle the localStorage storage to ensure URLs are preserved
      try {
        localStorage.setItem("hostListings", JSON.stringify(updatedListings));
        console.log("Successfully saved listing to localStorage");
      } catch (storageError) {
        console.error("Error saving to localStorage:", storageError);
        // If JSON.stringify fails because of circular references in image objects,
        // try a more direct approach
        const simplifiedListings = updatedListings.map((listing) => {
          // Create a simplified version of images that will serialize correctly
          const simplifiedImages = listing.images.map((img) => ({
            url: img.url || img.secure_url,
            publicId: img.publicId || img.public_id || "image-id",
          }));

          return {
            ...listing,
            images: simplifiedImages,
          };
        });

        localStorage.setItem(
          "hostListings",
          JSON.stringify(simplifiedListings)
        );
      }

      setIsUploading(false);

      // Show success message
      alert("Your listing has been created successfully!");
      console.log("Submitted property data:", propertyData);

      // Redirect to host listings
      navigate("/host/listings");
    } catch (error) {
      console.error("Error creating property:", error);
      setIsUploading(false);
      alert("There was an issue creating your property. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-neutral-200">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-neutral-800">
                  Become a Host
                </h1>
                <div className="text-sm font-medium text-neutral-500">
                  Step {currentStep} of {totalSteps}
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-4 h-2 bg-neutral-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-500 transition-all duration-300"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Form content */}
            <div className="p-6">
              {/* Step 1: Property Type */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-xl font-semibold text-neutral-900 mb-6">
                    What type of property are you listing?
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-3">
                        Select a property type
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {propertyTypes.map((type) => (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => handlePropertyTypeSelect(type.id)}
                            className={`flex flex-col items-center justify-center p-4 border rounded-lg text-center hover:border-primary-500 transition-all ${
                              formData.propertyType === type.id
                                ? "border-primary-500 bg-primary-50 text-primary-700"
                                : "border-neutral-200 text-neutral-700"
                            }`}
                          >
                            <span className="text-2xl mb-2">{type.icon}</span>
                            <span className="text-sm font-medium">
                              {type.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-3">
                        What category best describes your property?
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {propertyCategories.map((category) => (
                          <button
                            key={category.id}
                            type="button"
                            onClick={() =>
                              handlePropertyCategorySelect(category.id)
                            }
                            className={`flex flex-col items-center justify-center p-4 border rounded-lg text-center hover:border-primary-500 transition-all ${
                              formData.propertyCategory === category.id
                                ? "border-primary-500 bg-primary-50 text-primary-700"
                                : "border-neutral-200 text-neutral-700"
                            }`}
                          >
                            <span className="text-2xl mb-2">
                              {category.icon}
                            </span>
                            <span className="text-sm font-medium">
                              {category.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Location */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-xl font-semibold text-neutral-900 mb-6">
                    Where is your property located?
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-neutral-700 mb-1"
                      >
                        Street address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="location.address"
                        value={formData.location.address}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        placeholder="123 Main St"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium text-neutral-700 mb-1"
                        >
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="location.city"
                          value={formData.location.city}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          placeholder="San Francisco"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="state"
                          className="block text-sm font-medium text-neutral-700 mb-1"
                        >
                          State
                        </label>
                        <input
                          type="text"
                          id="state"
                          name="location.state"
                          value={formData.location.state}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          placeholder="CA"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="zipCode"
                          className="block text-sm font-medium text-neutral-700 mb-1"
                        >
                          ZIP code
                        </label>
                        <input
                          type="text"
                          id="zipCode"
                          name="location.zipCode"
                          value={formData.location.zipCode}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          placeholder="94105"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium text-neutral-700 mb-1"
                        >
                          Country
                        </label>
                        <select
                          id="country"
                          name="location.country"
                          value={formData.location.country}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        >
                          <option value="United States">United States</option>
                          <option value="Canada">Canada</option>
                          <option value="Mexico">Mexico</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Australia">Australia</option>
                          <option value="India">India</option>
                        </select>
                      </div>
                    </div>

                    <div className="mt-6">
                      <p className="text-sm text-neutral-500 mb-2">
                        Your address is only shared with guests after they've
                        made a confirmed booking.
                      </p>
                      <div className="h-56 bg-neutral-100 rounded-md overflow-hidden">
                        <StaticMap
                          address={formData.location.address}
                          city={formData.location.city}
                          state={formData.location.state}
                          country={formData.location.country}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Property Details */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-xl font-semibold text-neutral-900 mb-6">
                    Tell us more about your place
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-3">
                        How many guests can your place accommodate?
                      </label>
                      <div className="flex items-center">
                        <button
                          type="button"
                          onClick={() =>
                            handleNumberChange("guests", formData.guests - 1)
                          }
                          className="flex-shrink-0 h-10 w-10 border border-neutral-300 rounded-full flex items-center justify-center text-neutral-700 hover:bg-neutral-100"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          name="guests"
                          value={formData.guests}
                          onChange={(e) =>
                            handleNumberChange("guests", e.target.value)
                          }
                          className="mx-4 w-16 text-center border-none focus:outline-none focus:ring-0 text-lg font-medium"
                          min="1"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            handleNumberChange("guests", formData.guests + 1)
                          }
                          className="flex-shrink-0 h-10 w-10 border border-neutral-300 rounded-full flex items-center justify-center text-neutral-700 hover:bg-neutral-100"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-3">
                          Bedrooms
                        </label>
                        <div className="flex items-center">
                          <button
                            type="button"
                            onClick={() =>
                              handleNumberChange(
                                "bedrooms",
                                formData.bedrooms - 1
                              )
                            }
                            className="flex-shrink-0 h-10 w-10 border border-neutral-300 rounded-full flex items-center justify-center text-neutral-700 hover:bg-neutral-100"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            name="bedrooms"
                            value={formData.bedrooms}
                            onChange={(e) =>
                              handleNumberChange("bedrooms", e.target.value)
                            }
                            className="mx-4 w-12 text-center border-none focus:outline-none focus:ring-0 text-lg font-medium"
                            min="1"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              handleNumberChange(
                                "bedrooms",
                                formData.bedrooms + 1
                              )
                            }
                            className="flex-shrink-0 h-10 w-10 border border-neutral-300 rounded-full flex items-center justify-center text-neutral-700 hover:bg-neutral-100"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-3">
                          Beds
                        </label>
                        <div className="flex items-center">
                          <button
                            type="button"
                            onClick={() =>
                              handleNumberChange("beds", formData.beds - 1)
                            }
                            className="flex-shrink-0 h-10 w-10 border border-neutral-300 rounded-full flex items-center justify-center text-neutral-700 hover:bg-neutral-100"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            name="beds"
                            value={formData.beds}
                            onChange={(e) =>
                              handleNumberChange("beds", e.target.value)
                            }
                            className="mx-4 w-12 text-center border-none focus:outline-none focus:ring-0 text-lg font-medium"
                            min="1"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              handleNumberChange("beds", formData.beds + 1)
                            }
                            className="flex-shrink-0 h-10 w-10 border border-neutral-300 rounded-full flex items-center justify-center text-neutral-700 hover:bg-neutral-100"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-3">
                          Bathrooms
                        </label>
                        <div className="flex items-center">
                          <button
                            type="button"
                            onClick={() =>
                              handleNumberChange(
                                "bathrooms",
                                formData.bathrooms - 1
                              )
                            }
                            className="flex-shrink-0 h-10 w-10 border border-neutral-300 rounded-full flex items-center justify-center text-neutral-700 hover:bg-neutral-100"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            name="bathrooms"
                            value={formData.bathrooms}
                            onChange={(e) =>
                              handleNumberChange("bathrooms", e.target.value)
                            }
                            className="mx-4 w-12 text-center border-none focus:outline-none focus:ring-0 text-lg font-medium"
                            min="1"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              handleNumberChange(
                                "bathrooms",
                                formData.bathrooms + 1
                              )
                            }
                            className="flex-shrink-0 h-10 w-10 border border-neutral-300 rounded-full flex items-center justify-center text-neutral-700 hover:bg-neutral-100"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-3">
                        What amenities do you offer?
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {amenities.map((amenity) => (
                          <button
                            key={amenity.id}
                            type="button"
                            onClick={() => handleAmenityToggle(amenity.id)}
                            className={`flex items-center p-3 border rounded-lg hover:border-primary-500 transition-all ${
                              formData.amenities.includes(amenity.id)
                                ? "border-primary-500 bg-primary-50 text-primary-700"
                                : "border-neutral-200 text-neutral-700"
                            }`}
                          >
                            <span className="text-xl mr-2">{amenity.icon}</span>
                            <span className="text-sm font-medium">
                              {amenity.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Photos and Description */}
              {currentStep === 4 && (
                <div>
                  <h2 className="text-xl font-semibold text-neutral-900 mb-6">
                    Add photos and description
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-3">
                        Add photos of your place
                      </label>
                      <div
                        className="border-2 border-dashed border-neutral-300 rounded-lg p-8 text-center"
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                      >
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
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <p className="mt-2 text-sm text-neutral-600">
                          Drag and drop photos here or{" "}
                          <button
                            type="button"
                            onClick={handleBrowseFiles}
                            className="text-primary-600 font-medium hover:text-primary-500"
                          >
                            browse files
                          </button>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/jpeg, image/png"
                            multiple
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                        </p>
                        <p className="mt-1 text-xs text-neutral-500">
                          Up to 20 photos. JPEG, PNG format only.
                        </p>
                      </div>

                      {/* Display uploaded photos */}
                      {formData.photos.length > 0 && (
                        <div className="mt-6">
                          <h3 className="text-sm font-medium text-neutral-700 mb-3">
                            Uploaded Photos ({formData.photos.length}/20)
                          </h3>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {formData.photos.map((photo, index) => (
                              <div key={index} className="relative group">
                                <img
                                  src={photo.preview}
                                  alt={`Property photo ${index + 1}`}
                                  className="h-32 w-full object-cover rounded-md"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                                  <button
                                    type="button"
                                    onClick={() => handleRemovePhoto(index)}
                                    className="bg-white p-1.5 rounded-full text-red-500 hover:text-red-600"
                                  >
                                    <svg
                                      className="h-5 w-5"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                      />
                                    </svg>
                                  </button>
                                </div>
                                <p className="text-xs truncate mt-1">
                                  {photo.name}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Upload progress */}
                      {isUploading && (
                        <div className="mt-4">
                          <div className="flex items-center">
                            <div className="w-full bg-neutral-200 rounded-full h-2.5">
                              <div
                                className="bg-primary-500 h-2.5 rounded-full"
                                style={{ width: `${uploadProgress}%` }}
                              ></div>
                            </div>
                            <span className="ml-2 text-sm text-neutral-600">
                              {uploadProgress}%
                            </span>
                          </div>
                          <p className="text-sm text-neutral-500 mt-1">
                            Uploading photos to cloud storage...
                          </p>
                        </div>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-neutral-700 mb-1"
                      >
                        Title your listing
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        placeholder="e.g. Cozy Apartment in Downtown"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium text-neutral-700 mb-1"
                      >
                        Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        rows="4"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Tell potential guests what makes your place special..."
                      ></textarea>
                      <p className="mt-2 text-xs text-neutral-500">
                        Minimum 100 characters. Highlight what makes your place
                        unique.
                      </p>
                    </div>

                    {/* Language and Currency Settings */}
                    <div className="bg-neutral-50 p-5 rounded-lg border border-neutral-200">
                      <h3 className="text-md font-medium text-neutral-900 mb-4">
                        Language and Currency Settings
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Language Settings */}
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Listing Language
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {supportedLanguages.slice(0, 4).map((lang) => (
                              <button
                                key={lang.code}
                                type="button"
                                onClick={() =>
                                  handleLanguageChange(lang.code, lang.name)
                                }
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
                          <p className="mt-2 text-xs text-neutral-500">
                            Language your listing details will be translated to
                            for international guests.
                          </p>
                        </div>

                        {/* Currency Settings */}
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Listing Currency
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {currencies.slice(0, 4).map((curr) => (
                              <button
                                key={curr.code}
                                type="button"
                                onClick={() => handleCurrencyChange(curr.code)}
                                className={`flex items-center px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                                  currency === curr.code
                                    ? "bg-primary-50 text-primary-600 font-medium border border-primary-200"
                                    : "text-neutral-700 hover:bg-neutral-50 border border-neutral-200 hover:border-neutral-300"
                                }`}
                              >
                                <span className="mr-1 font-medium">
                                  {curr.symbol}
                                </span>
                                <span>{curr.code}</span>
                              </button>
                            ))}
                          </div>
                          <p className="mt-2 text-xs text-neutral-500">
                            Currency you'll receive payments in. This affects
                            how your pricing is displayed.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Pricing */}
              {currentStep === 5 && (
                <div>
                  <h2 className="text-xl font-semibold text-neutral-900 mb-6">
                    Set your price
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="price"
                        className="block text-sm font-medium text-neutral-700 mb-1"
                      >
                        Nightly price
                      </label>
                      <div className="relative mt-1 rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-neutral-500 sm:text-sm">
                            {formatPrice(1).charAt(0)}
                          </span>
                        </div>
                        <input
                          type="text"
                          name="price"
                          id="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-7 pr-12 sm:text-sm border-neutral-300 rounded-md"
                          placeholder="0.00"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <span className="text-neutral-500 sm:text-sm">
                            {currency}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-neutral-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-neutral-900 mb-3">
                        Price preview
                      </h3>
                      {isLoadingRates ? (
                        <div className="flex justify-center py-4">
                          <i className="fas fa-spinner fa-spin text-primary-500 mr-2"></i>
                          <span className="text-neutral-700">
                            Loading price preview...
                          </span>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-neutral-600">
                              Base price
                            </span>
                            <span className="text-sm font-medium text-neutral-900">
                              {formatPrice(formData.price || 0)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-neutral-600">
                              Smart Rent service fee (3%)
                            </span>
                            <span className="text-sm font-medium text-neutral-900">
                              {formatPrice(
                                formData.price
                                  ? parseFloat(formData.price) * 0.03
                                  : 0
                              )}
                            </span>
                          </div>
                          <div className="flex items-center justify-between pt-2 border-t border-neutral-200 mt-2">
                            <span className="text-sm font-medium text-neutral-900">
                              You'll receive
                            </span>
                            <span className="text-sm font-medium text-neutral-900">
                              {formatPrice(
                                formData.price
                                  ? parseFloat(formData.price) * 0.97
                                  : 0
                              )}
                            </span>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="bg-primary-50 p-4 rounded-lg border border-primary-100">
                      <h3 className="text-sm font-medium text-primary-800 mb-2">
                        Pricing tips
                      </h3>
                      <p className="text-sm text-primary-700">
                        Properties similar to yours in this area usually range
                        from {formatPrice(75)} to {formatPrice(125)} per night.
                        Setting a competitive price can help you get more
                        bookings, especially when you're just starting out.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer with navigation buttons */}
            <div className="p-6 border-t border-neutral-200 flex justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePreviousStep}
                  className="inline-flex items-center px-4 py-2 border border-neutral-300 rounded-md shadow-sm text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none"
                >
                  Back
                </button>
              ) : (
                <Link
                  to="/host/listings"
                  className="inline-flex items-center px-4 py-2 border border-neutral-300 rounded-md shadow-sm text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none"
                >
                  Cancel
                </Link>
              )}

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none"
                >
                  Publish listing
                </button>
              )}
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-500">
              By becoming a host, you agree to our{" "}
              <a href="#" className="text-primary-600 hover:text-primary-500">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-primary-600 hover:text-primary-500">
                Host Policies
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeHost;
