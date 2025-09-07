import React, { useState, useMemo } from "react";
import { Home } from "lucide-react"; // install lucide-react if not already

const PropertyImage = ({
  image,
  images = [],
  alt = "Property",
  className = "",
  showGallery = false,
  id,
  propertyId,
  onClick,
}) => {
  const [imageError, setImageError] = useState(false);
  const [showImageGallery, setShowImageGallery] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // Collect valid images
  const processedImages = useMemo(() => {
    let imgArray = [];

    if (image && typeof image === "string" && image.trim() !== "") {
      imgArray.push(image);
    } else if (image && typeof image === "object" && image.url?.trim() !== "") {
      imgArray.push(image.url);
    }

    if (images && Array.isArray(images) && images.length > 0) {
      const validImages = images
        .map((img) =>
          typeof img === "string" && img.trim() !== ""
            ? img
            : img?.url?.trim() !== ""
              ? img.url
              : null
        )
        .filter(Boolean);

      if (validImages.length > 0) {
        imgArray = [...imgArray, ...validImages];
      }
    }

    return imgArray;
  }, [image, images]);

  const displayImage =
    !imageError && processedImages.length > 0 ? processedImages[0] : null;

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageClick = (e) => {
    if (onClick) {
      onClick(e, propertyId);
    }
    if (showGallery && !isGalleryOpen) {
      openGallery();
    }
  };

  const openGallery = () => {
    setShowImageGallery(true);
    setIsGalleryOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeGallery = () => {
    setShowImageGallery(false);
    setCurrentImageIndex(0);
    setIsGalleryOpen(false);
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

  const ImageGallery = () => {
    if (!showImageGallery) return null;

    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
        onClick={closeGallery}
      >
        <div className="relative w-full max-w-5xl p-4">
          {processedImages.length > 1 && (
            <>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 text-black z-10"
                onClick={prevImage}
              >
                <i className="fas fa-chevron-left text-xl"></i>
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 text-black z-10"
                onClick={nextImage}
              >
                <i className="fas fa-chevron-right text-xl"></i>
              </button>
            </>
          )}

          <button
            className="absolute top-4 right-4 bg-white bg-opacity-80 rounded-full p-2 text-black z-10"
            onClick={closeGallery}
          >
            <i className="fas fa-times text-xl"></i>
          </button>

          {propertyId && (
            <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg text-sm">
              Property ID: {propertyId}
            </div>
          )}

          {processedImages.length > 1 && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full text-sm">
              {currentImageIndex + 1} / {processedImages.length}
            </div>
          )}

          <img
            src={processedImages[currentImageIndex]}
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
      {displayImage ? (
        <img
          id={id}
          src={displayImage}
          alt={alt}
          className={`${className} ${showGallery ? "cursor-pointer" : ""}`}
          onError={handleImageError}
          onClick={handleImageClick}
          data-property-id={propertyId}
        />
      ) : (
        <div
          id={id}
          className={`flex items-center justify-center bg-gray-800 rounded-lg ${className} ${
            showGallery ? "cursor-pointer" : ""
          }`}
          style={{ aspectRatio: "16/9" }}
          onClick={handleImageClick}
          data-property-id={propertyId}
        >
          <Home className="w-12 h-12 text-white" />
        </div>
      )}

      <ImageGallery />
    </>
  );
};

export default PropertyImage;
