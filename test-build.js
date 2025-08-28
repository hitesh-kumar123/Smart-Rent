const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("🧪 Testing build process locally...");

try {
  // Test the build script
  console.log("📦 Running build script...");
  execSync("npm run build", { stdio: "inherit" });

  // Check if build was successful
  const buildPath = path.join(__dirname, "client/build");
  const indexPath = path.join(buildPath, "index.html");

  if (fs.existsSync(buildPath) && fs.existsSync(indexPath)) {
    console.log("✅ Build test successful!");
    console.log(`📁 Build directory: ${buildPath}`);
    console.log(`📄 index.html: ${indexPath}`);

    // List build contents
    const buildContents = fs.readdirSync(buildPath);
    console.log("📂 Build contents:", buildContents.join(", "));
  } else {
    throw new Error("Build verification failed");
  }
} catch (error) {
  console.error("❌ Build test failed:", error.message);
  process.exit(1);
}
