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

const debugProperties = async () => {
  try {
    // Get all properties
    const properties = await Property.find({
      isActive: true,
      isApproved: true,
    });
    console.log(
      `Total active and approved properties in MongoDB: ${properties.length}`
    );

    // Find unique categories
    const categories = new Set();
    properties.forEach((property) => {
      if (property.category) {
        categories.add(property.category);
      }
    });

    console.log(`\nAvailable Categories: ${Array.from(categories).join(", ")}`);

    // Check how many properties are in each category
    const categoryCounts = {};
    properties.forEach((property) => {
      if (property.category) {
        categoryCounts[property.category] =
          (categoryCounts[property.category] || 0) + 1;
      } else {
        categoryCounts["undefined"] = (categoryCounts["undefined"] || 0) + 1;
      }
    });

    console.log("\nCategory distribution:");
    for (const category in categoryCounts) {
      console.log(`${category}: ${categoryCounts[category]} properties`);
    }

    // Check each property for critical fields that might affect frontend display
    console.log("\nChecking properties for missing fields:");
    let missingFieldsCount = 0;

    properties.forEach((property, index) => {
      const missingFields = [];

      if (!property.title) missingFields.push("title");
      if (!property.description) missingFields.push("description");
      if (!property.price) missingFields.push("price");
      if (!property.category) missingFields.push("category");
      if (!property.images || property.images.length === 0)
        missingFields.push("images");
      if (!property.location || !property.location.city)
        missingFields.push("location.city");
      if (!property.location || !property.location.country)
        missingFields.push("location.country");
      if (!property.capacity) missingFields.push("capacity");

      if (missingFields.length > 0) {
        console.log(
          `Property ${index + 1}: ${
            property.title || property._id
          } - Missing: ${missingFields.join(", ")}`
        );
        missingFieldsCount++;
      }
    });

    if (missingFieldsCount === 0) {
      console.log("All properties have required fields.");
    } else {
      console.log(`\n${missingFieldsCount} properties have missing fields.`);
    }

    // Check property type vs category mismatch (frontend might be checking propertyType but DB uses category)
    console.log("\nChecking for frontend category compatibility:");
    const frontendCategories = [
      "Apartment",
      "House",
      "Villa",
      "Condo",
      "Cabin",
      "Beachfront",
      "Countryside",
      "Luxury",
    ];

    let categoryMatchCount = 0;
    properties.forEach((property) => {
      if (frontendCategories.includes(property.category)) {
        categoryMatchCount++;
      } else {
        console.log(
          `Property "${property.title}" has category "${property.category}" which doesn't match frontend categories.`
        );
      }
    });

    console.log(
      `\n${categoryMatchCount} properties have categories compatible with frontend filters.`
    );
    console.log(
      `${
        properties.length - categoryMatchCount
      } properties have categories incompatible with frontend filters.`
    );

    mongoose.disconnect();
  } catch (error) {
    console.error("Error:", error);
    mongoose.disconnect();
  }
};

debugProperties();
