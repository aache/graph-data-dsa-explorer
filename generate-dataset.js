const fs = require("fs");
const { faker } = require("@faker-js/faker");

// 1. Create 2000 unique users
const names = faker.helpers.uniqueArray(() => faker.person.fullName(), 2000);

// Build user profiles (consistent attributes)
const userProfiles = {};

names.forEach((name) => {
  const joinDate = faker.date.between({
    from: "2015-01-01",
    to: "2023-01-01",
  });

  userProfiles[name] = {
    city: faker.location.city(),
    state: faker.location.state(),
    country: faker.location.country(),
    gender: faker.person.sex(),
    device: faker.helpers.arrayElement(["Mobile", "Desktop", "Tablet"]),
    verified: faker.datatype.boolean(),
    joinDate,
  };
});

// 2. Setup CSV header
let rows = [];
rows.push(
  "Date,Sender,SenderCity,SenderState,SenderCountry,SenderGender,SenderVerified,SenderJoinDate,Receiver,ReceiverCity,ReceiverState,ReceiverCountry,ReceiverGender,ReceiverVerified,ReceiverJoinDate,DeviceType,Status"
);

const statuses = ["sent", "accepted", "denied"];

// 3. Generate 20,000 events
for (let i = 0; i < 20000; i++) {
  const sender = faker.helpers.arrayElement(names);
  let receiver = faker.helpers.arrayElement(names);
  while (receiver === sender) {
    receiver = faker.helpers.arrayElement(names);
  }

  const status = faker.helpers.arrayElement(statuses);
  const eventDate = faker.date.between({
    from: "2020-01-01",
    to: new Date(),
  });

  const s = userProfiles[sender];
  const r = userProfiles[receiver];

  rows.push(
    [
      eventDate.toISOString(),
      sender,
      s.city,
      s.state,
      s.country,
      s.gender,
      s.verified,
      s.joinDate.toISOString(),

      receiver,
      r.city,
      r.state,
      r.country,
      r.gender,
      r.verified,
      r.joinDate.toISOString(),

      s.device,
      status,
    ].join(",")
  );
}

// 4. Write CSV
fs.writeFile("friend_requests.csv", rows.join("\n"), "utf8", (err) => {
  if (err) console.error(err);
  else console.log("CSV generated with consistent user profiles!");
});