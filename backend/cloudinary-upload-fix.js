const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Property = require("./models/property");
const connectDB = require("./init/database");
const cloudinary = require("cloudinary").v2;
const axios = require("axios");
const fs = require("fs");
const path = require("path");

// Load env variables
dotenv.config();

// Configure Cloudinary with explicit credentials to ensure they're loaded
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME || "dyem5b45p",
  api_key: process.env.CLOUD_API_KEY || "127561296745691",
  api_secret: process.env.CLOUD_API_SECRET || "2CR0-eWbE6OjmON-C_7ua0tiLiE",
});

// Connect to MongoDB
connectDB();

// Function to check Cloudinary configuration
const checkCloudinaryConfig = async () => {
  try {
    console.log("Checking Cloudinary configuration...");
    console.log(`Cloud Name: ${cloudinary.config().cloud_name}`);
    console.log(`API Key: ${cloudinary.config().api_key.substring(0, 5)}...`);

    // Try a ping test
    const result = await cloudinary.api.ping();
    console.log("Cloudinary connection verified:", result.status);
    return true;
  } catch (error) {
    console.error("Cloudinary configuration error:", error.message);
    return false;
  }
};

// Function to download image to temp file
const downloadImage = async (url, tempFilePath) => {
  const writer = fs.createWriteStream(tempFilePath);

  try {
    const response = await axios({
      url,
      method: "GET",
      responseType: "stream",
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
  } catch (error) {
    writer.close();
    console.error(`Error downloading image: ${error.message}`);
    throw error;
  }
};

// Upload images to Cloudinary
const uploadImagesToCloudinary = async () => {
  try {
    // Check Cloudinary config first
    const configOk = await checkCloudinaryConfig();
    if (!configOk) {
      console.error("Aborting due to Cloudinary configuration issues");
      process.exit(1);
    }

    // Get all properties
    const properties = await Property.find();
    console.log(`Found ${properties.length} properties in the database`);

    // Create temp directory if it doesn't exist
    const tempDir = path.join(__dirname, "temp_images");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }

    // Process each property
    for (const property of properties) {
      console.log(`\nProcessing property: ${property.title}`);

      const updatedImages = [];

      // Process each image in the property
      for (const image of property.images) {
        // Skip if already uploaded to Cloudinary (has a valid publicId that's not 'external_image')
        if (
          image.publicId &&
          image.publicId !== "external_image" &&
          image.publicId !== "directUrl"
        ) {
          console.log(`Image already on Cloudinary: ${image.url}`);
          updatedImages.push(image);
          continue;
        }

        try {
          // Extract a simple filename from the URL
          const urlParts = image.url.split("/");
          const filenameWithParams = urlParts[urlParts.length - 1];
          const filename = filenameWithParams.split("?")[0]; // Remove query params

          // Create temp file path
          const tempFilePath = path.join(
            tempDir,
            `temp_${Date.now()}_${filename}`
          );

          console.log(`Downloading image: ${image.url}`);
          await downloadImage(image.url, tempFilePath);

          console.log(`Uploading to Cloudinary: ${filename}`);
          const uploadResult = await cloudinary.uploader.upload(tempFilePath, {
            folder: "wanderlust",
            resource_type: "auto",
            public_id: `property_${property._id}_${Date.now()}`,
          });

          // Clean up temp file
          fs.unlinkSync(tempFilePath);

          console.log(`Successfully uploaded as: ${uploadResult.public_id}`);

          // Add updated image to array
          updatedImages.push({
            url: uploadResult.secure_url,
            publicId: uploadResult.public_id,
          });
        } catch (error) {
          console.error(
            `Error processing image ${image.url}: ${error.message}`
          );
          // Keep original image if upload fails
          updatedImages.push(image);
        }
      }

      // Update property with new images
      property.images = updatedImages;
      await property.save();
      console.log(`Updated property: ${property.title} with Cloudinary images`);
    }

    // Clean up temp directory
    if (fs.existsSync(tempDir)) {
      fs.rmdirSync(tempDir, { recursive: true });
    }

    console.log("\nAll images have been processed and uploaded to Cloudinary");
    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Run the upload function
uploadImagesToCloudinary();
