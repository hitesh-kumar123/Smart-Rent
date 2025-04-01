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

const checkDuplicates = async () => {
  try {
    // Get all properties
    const properties = await Property.find();
    console.log(`Total properties in MongoDB: ${properties.length}`);

    // Check for duplicates by title
    const titleCounts = {};
    let duplicateCount = 0;

    properties.forEach((property) => {
      if (titleCounts[property.title]) {
        titleCounts[property.title]++;
        duplicateCount++;
      } else {
        titleCounts[property.title] = 1;
      }
    });

    console.log(`\nTotal unique titles: ${Object.keys(titleCounts).length}`);
    console.log(`Total duplicate titles: ${duplicateCount}`);

    // Display titles with counts greater than 1
    console.log("\nDuplicate Titles:");
    for (const title in titleCounts) {
      if (titleCounts[title] > 1) {
        console.log(`"${title}": ${titleCounts[title]} occurrences`);
      }
    }

    // Find unique categories
    const categories = new Set();
    properties.forEach((property) => {
      if (property.category) {
        categories.add(property.category);
      }
    });

    console.log(`\nAvailable Categories: ${Array.from(categories).join(", ")}`);

    mongoose.disconnect();
  } catch (error) {
    console.error("Error:", error);
    mongoose.disconnect();
  }
};

checkDuplicates();
