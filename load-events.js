// load-events.js
const fs = require("fs");
const path = require("path");

// Default CSV path: same folder as this file
const DEFAULT_CSV_PATH = path.join(__dirname, "friend_requests.csv");

/**
 * Load events from the CSV file and return as an array of objects.
 *
 * Each object will have keys exactly matching the CSV header:
 * e.g. "Date", "Sender", "SenderCity", ... , "Status"
 */
function loadEvents(csvPath = DEFAULT_CSV_PATH) {
  // Read the whole file synchronously so data is ready immediately
  const raw = fs.readFileSync(csvPath, "utf8");

  // Split into lines & remove empty ones
  const lines = raw.split(/\r?\n/).filter(Boolean);

  if (lines.length <= 1) {
    console.error("CSV seems empty or has only a header.");
    return [];
  }

  // Parse header
  const header = lines[0].split(",").map(h => h.trim());

  const events = [];

  // Parse each line into an object
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const cols = line.split(",");
    if (cols.length < header.length) {
      // malformed or incomplete line, skip
      continue;
    }

    const event = {};

    for (let j = 0; j < header.length; j++) {
      event[header[j]] = (cols[j] ?? "").trim();
    }

    events.push(event);
  }

  return events;
}

module.exports = loadEvents;