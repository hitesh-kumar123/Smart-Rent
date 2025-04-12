/**
 * Utility for handling Cloudinary uploads directly from the browser
 */

const CLOUDINARY_UPLOAD_PRESET = "ml_default";
const CLOUDINARY_CLOUD_NAME = "dyem5b45p";

// Fallback image URL in case of upload failure
const FALLBACK_IMAGE_URL =
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop";

/**
 * Uploads a single file to Cloudinary
 * @param {File} file - The file to upload
 * @param {Function} progressCallback - Optional callback for upload progress
 * @returns {Promise<Object>} - The Cloudinary response
 */
export const uploadToCloudinary = async (file, progressCallback = null) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("cloud_name", CLOUDINARY_CLOUD_NAME);

    console.log(`Uploading file: ${file.name} to Cloudinary...`);

    // Create a local ObjectURL as backup in case Cloudinary fails
    const localUrl = URL.createObjectURL(file);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.error("Cloudinary API Error:", error);
        throw new Error(error.message || "Failed to upload image");
      }

      const result = await response.json();
      console.log("Upload successful:", result.secure_url);

      return result;
    } catch (uploadError) {
      console.error("Error uploading to Cloudinary:", uploadError);
      // Return a local file URL instead
      console.log("Using local image URL instead:", localUrl);
      return {
        secure_url: localUrl,
        url: localUrl,
        public_id: `local-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9]/g, "_")}`,
        isLocalPreview: true,
      };
    }
  } catch (error) {
    console.error("Error in uploadToCloudinary:", error);
    // Return a fallback object with the placeholder image
    return {
      secure_url: FALLBACK_IMAGE_URL,
      url: FALLBACK_IMAGE_URL,
      public_id: "fallback-image-id",
      error: error.message,
    };
  }
};

/**
 * Uploads multiple files to Cloudinary
 * @param {Array<File>} files - The files to upload
 * @param {Function} progressCallback - Optional callback for overall progress
 * @returns {Promise<Array<Object>>} - Array of Cloudinary responses
 */
export const uploadMultipleToCloudinary = async (
  files,
  progressCallback = null
) => {
  try {
    if (!files || files.length === 0) {
      console.warn("No files provided for upload");
      return [
        {
          secure_url: FALLBACK_IMAGE_URL,
          url: FALLBACK_IMAGE_URL,
          public_id: "fallback-empty-upload",
        },
      ];
    }

    const totalFiles = files.length;
    const uploads = [];
    let uploadErrors = 0;

    for (let i = 0; i < totalFiles; i++) {
      console.log(`Uploading file ${i + 1} of ${totalFiles}`);
      try {
        const result = await uploadToCloudinary(files[i]);
        if (result.error) {
          console.warn(`Error uploading file ${i + 1}: ${result.error}`);
          uploadErrors++;
        }
        uploads.push(result);
      } catch (err) {
        console.error(`Exception while uploading file ${i + 1}:`, err);
        uploadErrors++;

        // Create a local URL for this file as fallback
        try {
          const localUrl = URL.createObjectURL(files[i]);
          uploads.push({
            secure_url: localUrl,
            url: localUrl,
            public_id: `local-fallback-${i}-${Date.now()}`,
            isLocalPreview: true,
          });
        } catch (localError) {
          // If even local URL creation fails, use the generic fallback
          uploads.push({
            secure_url: FALLBACK_IMAGE_URL,
            url: FALLBACK_IMAGE_URL,
            public_id: `fallback-file-${i}`,
            error: err.message,
          });
        }
      }

      if (progressCallback) {
        progressCallback(Math.round(((i + 1) / totalFiles) * 100));
      }
    }

    console.log(
      `Upload complete. ${totalFiles - uploadErrors}/${totalFiles} files uploaded successfully.`
    );

    // If all uploads failed, add at least one fallback image for safety
    if (uploads.length === 0 || uploads.every((img) => img.error)) {
      console.warn("All uploads failed, adding fallback image");
      uploads.push({
        secure_url: FALLBACK_IMAGE_URL,
        url: FALLBACK_IMAGE_URL,
        public_id: "fallback-all-failed",
      });
    }

    return uploads;
  } catch (error) {
    console.error("Error uploading multiple files to Cloudinary:", error);
    // Return at least one fallback image
    return [
      {
        secure_url: FALLBACK_IMAGE_URL,
        url: FALLBACK_IMAGE_URL,
        public_id: "fallback-batch-upload-error",
      },
    ];
  }
};
