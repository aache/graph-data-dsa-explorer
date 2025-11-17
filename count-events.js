const fs = require("fs");
const path = require("path");

// Path to the CSV file (same folder)
const filePath = path.join(__dirname, "friend_requests.csv");

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading CSV file:", err);
    process.exit(1);
  }

  const lines = data.split(/\r?\n/);

  if (lines.length <= 1) {
    console.error("CSV seems empty or has only a header.");
    process.exit(1);
  }
  console.log(`Total number of events (lines) in CSV: ${lines.length - 1}`);
});