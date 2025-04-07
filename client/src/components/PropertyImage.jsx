import React, { useState, useEffect, useMemo } from "react";

/**
 * PropertyImage Component
 *
 * Handles different image data structures from the API
 * - Can handle image as string URL
 * - Can handle image as object with url property
 * - Provides fallback for missing images
 * - Can display image gallery with all property images
 */
const PropertyImage = ({
  image,
  images = [],
  alt = "Property",
  className = "",
  showGallery = false,
  id,
  propertyId, // New prop to identify the property
  onClick, // New prop to handle custom click events
  fallbackImage = "https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHJlYWwlMjBlc3RhdGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
}) => {
  const [imageError, setImageError] = useState(false);
  const [showImageGallery, setShowImageGallery] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // Memoize the processed images to prevent unnecessary recalculations
  const processedImages = useMemo(() => {
    let imgArray = [];

    // Add any single image first (if valid)
    if (image) {
      if (typeof image === "string" && image.trim() !== "") {
        imgArray.push(image);
      } else if (
        typeof image === "object" &&
        image.url &&
        image.url.trim() !== ""
      ) {
        imgArray.push(image);
      }
    }

    // Add all valid images from the images array
    if (images && Array.isArray(images) && images.length > 0) {
      const validImages = images.filter(
        (img) =>
          (typeof img === "string" && img.trim() !== "") ||
          (typeof img === "object" && img.url && img.url.trim() !== "")
      );

      if (validImages.length > 0) {
        imgArray = [...imgArray, ...validImages];
      }
    }

    // Ensure we have at least one image (fallback)
    if (imgArray.length === 0) {
      imgArray = [fallbackImage];
    }

    return imgArray;
  }, [image, images, fallbackImage]);

  // Use the first image as the display image
  const displayImage = processedImages.length > 0 ? processedImages[0] : null;

  // Function to determine the image URL from different data structures
  const getImageUrl = (img) => {
    // Handle image error case
    if (imageError) {
      return fallbackImage;
    }

    // Case 1: No image provided
    if (!img) {
      return fallbackImage;
    }

    // Case 2: Image is a string URL
    if (typeof img === "string") {
      // Make sure it's not an empty string
      return img.trim() !== "" ? img : fallbackImage;
    }

    // Case 3: Image is an object with url property
    if (typeof img === "object" && img.url) {
      // Make sure the URL property is not empty
      return img.url.trim() !== "" ? img.url : fallbackImage;
    }

    // Default fallback
    return fallbackImage;
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageClick = (e) => {
    // If a custom onClick handler is provided, call it first
    if (onClick) {
      onClick(e, propertyId);
    }

    // If showGallery is true, open the gallery
    if (showGallery && !isGalleryOpen) {
      openGallery();
    }
  };

  const openGallery = () => {
    // Always open the gallery when clicked, even with just one image
    setShowImageGallery(true);
    setIsGalleryOpen(true);

    // Prevent scrolling when gallery is open
    document.body.style.overflow = "hidden";
  };

  const closeGallery = () => {
    setShowImageGallery(false);
    setCurrentImageIndex(0);
    setIsGalleryOpen(false);

    // Restore scrolling when gallery is closed
    document.body.style.overflow = "auto";
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === processedImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === 0 ? processedImages.length - 1 : prev - 1
    );
  };

  // Image Gallery Modal
  const ImageGallery = () => {
    if (!showImageGallery) return null;

    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
        onClick={closeGallery}
      >
        <div className="relative w-full max-w-5xl p-4">
          {/* Navigation buttons */}
          {processedImages.length > 1 && (
            <>
              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 text-black z-10"
                onClick={prevImage}
              >
                <i className="fas fa-chevron-left text-xl"></i>
              </button>

              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 text-black z-10"
                onClick={nextImage}
              >
                <i className="fas fa-chevron-right text-xl"></i>
              </button>
            </>
          )}

          {/* Close button */}
          <button
            className="absolute top-4 right-4 bg-white bg-opacity-80 rounded-full p-2 text-black z-10"
            onClick={closeGallery}
          >
            <i className="fas fa-times text-xl"></i>
          </button>

          {/* Property information if available */}
          {propertyId && (
            <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg text-sm">
              Property ID: {propertyId}
            </div>
          )}

          {/* Image counter - only show if multiple images */}
          {processedImages.length > 1 && (
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full text-sm">
              {currentImageIndex + 1} / {processedImages.length}
            </div>
          )}

          {/* Main image */}
          <img
            src={getImageUrl(processedImages[currentImageIndex])}
            alt={`${alt} ${currentImageIndex + 1}`}
            className="w-full h-auto max-h-[80vh] object-contain mx-auto"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <img
        id={id}
        src={getImageUrl(displayImage)}
        alt={alt}
        className={`${className} ${showGallery ? "cursor-pointer" : ""}`}
        onError={handleImageError}
        onClick={handleImageClick}
        data-property-id={propertyId}
      />
      {/* Render image gallery modal when active */}
      <ImageGallery />
    </>
  );
};

export default PropertyImage;
