const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("🚀 Starting build process...");

try {
  // Check if client directory exists
  const clientPath = path.join(__dirname, "client");
  if (!fs.existsSync(clientPath)) {
    throw new Error("Client directory not found");
  }

  console.log("📦 Installing client dependencies...");
  execSync("npm install", { cwd: clientPath, stdio: "inherit" });

  console.log("🔨 Building React app...");
  execSync("npm run build", { cwd: clientPath, stdio: "inherit" });

  // Verify build was successful
  const buildPath = path.join(clientPath, "build");
  const indexPath = path.join(buildPath, "index.html");

  if (!fs.existsSync(buildPath)) {
    throw new Error("Build directory was not created");
  }

  if (!fs.existsSync(indexPath)) {
    throw new Error("index.html was not found in build directory");
  }

  console.log("✅ Build completed successfully!");
  console.log(`📁 Build directory: ${buildPath}`);
  console.log(`📄 index.html: ${indexPath}`);
} catch (error) {
  console.error("❌ Build failed:", error.message);
  process.exit(1);
}
