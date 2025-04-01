const axios = require("axios");

// Function to test our new endpoint
async function testAllPropertiesEndpoint() {
  try {
    console.log("Testing /api/properties/all endpoint...");

    // Make a request to our new endpoint
    const response = await axios.get(
      "http://localhost:8000/api/properties/all"
    );

    // Check if we got an array of properties
    if (Array.isArray(response.data)) {
      console.log(
        `Success! Received ${response.data.length} properties from endpoint`
      );

      // Log the first property
      if (response.data.length > 0) {
        console.log("\nFirst property:");
        console.log(`Title: ${response.data[0].title}`);
        console.log(
          `Images: ${
            response.data[0].images ? response.data[0].images.length : 0
          }`
        );

        // Log image URLs for the first property
        if (response.data[0].images && response.data[0].images.length > 0) {
          console.log("\nImage URLs:");
          response.data[0].images.forEach((img, idx) => {
            const imgUrl = typeof img === "object" ? img.url : img;
            console.log(`  Image ${idx + 1}: ${imgUrl}`);
          });
        }
      }
    } else {
      console.error("Error: Response is not an array");
      console.log("Response data:", response.data);
    }
  } catch (error) {
    console.error("Error testing endpoint:", error.message);
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    }
  }
}

// Run the test
testAllPropertiesEndpoint();
