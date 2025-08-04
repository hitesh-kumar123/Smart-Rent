// Script to remove temporary image files from the root directory
const fs = require("fs");
const path = require("path");

// Get all files in the current directory
const files = fs.readdirSync(__dirname);

// Pattern to match temporary files
const tempFilePattern = /^temp_\d+_/;

let removedCount = 0;

// Process each file
files.forEach((file) => {
  // Check if the file matches the temporary file pattern
  if (tempFilePattern.test(file)) {
    const fullPath = path.join(__dirname, file);

    try {
      // Delete the file
      fs.unlinkSync(fullPath);
      console.log(`Deleted: ${file}`);
      removedCount++;
    } catch (error) {
      console.error(`Error deleting ${file}: ${error.message}`);
    }
  }
});

console.log(`\nCleanup complete: ${removedCount} temporary files removed.`);

// Also check for the temp_images directory
const tempDirPath = path.join(__dirname, "temp_images");
if (fs.existsSync(tempDirPath)) {
  try {
    // Try to remove the directory (will only work if empty)
    fs.rmdirSync(tempDirPath);
    console.log("Removed temp_images directory");
  } catch (error) {
    console.log("Could not remove temp_images directory, it may not be empty");

    // Try to clean files inside the directory
    try {
      const tempDirFiles = fs.readdirSync(tempDirPath);
      let tempDirRemovedCount = 0;

      tempDirFiles.forEach((file) => {
        const tempFilePath = path.join(tempDirPath, file);
        fs.unlinkSync(tempFilePath);
        console.log(`Deleted temp file: ${file}`);
        tempDirRemovedCount++;
      });

      console.log(
        `\nRemoved ${tempDirRemovedCount} files from temp_images directory`
      );

      // Try to remove the directory again now that it's empty
      fs.rmdirSync(tempDirPath);
      console.log("Removed temp_images directory after cleaning");
    } catch (dirError) {
      console.error(
        `Error cleaning temp_images directory: ${dirError.message}`
      );
    }
  }
}
