/**
 * Utility for handling Cloudinary uploads directly from the browser
 */

const CLOUDINARY_UPLOAD_PRESET = "ml_default";
const CLOUDINARY_CLOUD_NAME = "dyem5b45p";

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

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to upload image");
    }

    return await response.json();
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
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
    const totalFiles = files.length;
    const uploads = [];

    for (let i = 0; i < totalFiles; i++) {
      const result = await uploadToCloudinary(files[i]);
      uploads.push(result);

      if (progressCallback) {
        progressCallback(Math.round(((i + 1) / totalFiles) * 100));
      }
    }

    return uploads;
  } catch (error) {
    console.error("Error uploading multiple files to Cloudinary:", error);
    throw error;
  }
};
