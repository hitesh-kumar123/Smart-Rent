require("dotenv").config();
const mongoose = require("mongoose");
const Property = require("./models/property");

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected: " + mongoose.connection.host))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Verify Cloudinary images
const verifyCloudinaryImages = async () => {
  try {
    // Get all properties
    const properties = await Property.find();
    console.log(`Found ${properties.length} properties in the database`);

    let cloudinaryCount = 0;
    let externalCount = 0;
    let errorCount = 0;

    // Process each property
    for (const property of properties) {
      console.log(`\nProperty: ${property.title}`);
      console.log(`Images: ${property.images.length}`);

      // Inspect each image in the property
      for (const image of property.images) {
        if (image.publicId && image.publicId.includes("wanderlust/")) {
          console.log(`✅ Cloudinary image: ${image.publicId}`);
          cloudinaryCount++;
        } else if (image.publicId === "external_image") {
          console.log(`⚠️ External image: ${image.url}`);
          externalCount++;
        } else {
          console.log(`❌ Unknown image type: ${image.url}`);
          errorCount++;
        }
      }
    }

    console.log("\n--- Summary ---");
    console.log(`Total properties: ${properties.length}`);
    console.log(`Cloudinary images: ${cloudinaryCount}`);
    console.log(`External images: ${externalCount}`);
    console.log(`Unknown/error images: ${errorCount}`);

    mongoose.disconnect();
  } catch (error) {
    console.error("Error:", error);
    mongoose.disconnect();
    process.exit(1);
  }
};

verifyCloudinaryImages();
