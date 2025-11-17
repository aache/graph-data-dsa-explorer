// unique-senders.js
const loadEvents = require("./load-events.js");

const events = loadEvents();

const uniqueSenders = new Set();
for (const ev of events) {
  if (ev.Sender) uniqueSenders.add(ev.Sender);
}

console.log(`Total unique senders: ${uniqueSenders.size}`);