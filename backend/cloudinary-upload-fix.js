const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Property = require("./models/property");
const connectDB = require("./init/database");
const cloudinary = require("cloudinary").v2;
const axios = require("axios");
const fs = require("fs");
const path = require("path");

// Load env variables from .env
dotenv.config();

// Configure Cloudinary using only .env variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Connect to MongoDB
connectDB();

// Function to check Cloudinary configuration
const checkCloudinaryConfig = async () => {
  try {
    console.log("Checking Cloudinary configuration...");
    console.log(`Cloud Name: ${cloudinary.config().cloud_name}`);
    console.log(`API Key: ${cloudinary.config().api_key.substring(0, 5)}...`);

    // Ping test
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
    // Verify Cloudinary config
    const configOk = await checkCloudinaryConfig();
    if (!configOk) {
      console.error("Aborting due to Cloudinary configuration issues");
      process.exit(1);
    }

    // Get all properties
    const properties = await Property.find();
    console.log(`Found ${properties.length} properties in the database`);

    // Create temp directory
    const tempDir = path.join(__dirname, "temp_images");
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

    // Process each property
    for (const property of properties) {
      console.log(`\nProcessing property: ${property.title}`);
      const updatedImages = [];

      for (const image of property.images) {
        // Skip images already on Cloudinary
        if (image.publicId && image.publicId !== "external_image" && image.publicId !== "directUrl") {
          console.log(`Image already on Cloudinary: ${image.url}`);
          updatedImages.push(image);
          continue;
        }

        try {
          // Get filename from URL
          const filenameWithParams = image.url.split("/").pop();
          const filename = filenameWithParams.split("?")[0];

          // Temp file path
          const tempFilePath = path.join(tempDir, `temp_${Date.now()}_${filename}`);

          console.log(`Downloading image: ${image.url}`);
          await downloadImage(image.url, tempFilePath);

          console.log(`Uploading to Cloudinary: ${filename}`);
          const uploadResult = await cloudinary.uploader.upload(tempFilePath, {
            folder: "wanderlust",
            resource_type: "auto",
            public_id: `property_${property._id}_${Date.now()}`,
          });

          fs.unlinkSync(tempFilePath);

          console.log(`Successfully uploaded as: ${uploadResult.public_id}`);

          updatedImages.push({
            url: uploadResult.secure_url,
            publicId: uploadResult.public_id,
          });
        } catch (error) {
          console.error(`Error processing image ${image.url}: ${error.message}`);
          updatedImages.push(image); // Keep original if upload fails
        }
      }

      // Update property images
      property.images = updatedImages;
      await property.save();
      console.log(`Updated property: ${property.title} with Cloudinary images`);
    }

    // Clean up temp directory
    if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true, force: true });

    console.log("\nAll images processed and uploaded to Cloudinary");
    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Run upload
uploadImagesToCloudinary();
