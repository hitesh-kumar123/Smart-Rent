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

const viewProperties = async () => {
  try {
    // Get all properties
    const properties = await Property.find();
    console.log(`Total properties in MongoDB: ${properties.length}`);

    // Display basic info for each property
    properties.forEach((property, index) => {
      console.log(`\n${index + 1}. ${property.title}`);
      console.log(`   ID: ${property._id}`);
      console.log(`   Price: $${property.price}/night`);
      console.log(
        `   Location: ${property.location.city}, ${property.location.country}`
      );
      console.log(
        `   Images: ${property.images.length} (${property.images[0].publicId})`
      );
    });

    mongoose.disconnect();
  } catch (error) {
    console.error("Error:", error);
    mongoose.disconnect();
  }
};

viewProperties();
