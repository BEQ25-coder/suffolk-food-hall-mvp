const baseUrl = process.env.BASE_URL || "http://localhost:3000";

async function run() {
  const invalidPayload = {
    serviceId: "lunch",
    partySize: "0",
    preferredTime: "9:00am",
    customerName: "",
    customerEmail: "bad-email",
    customerPhone: "1",
    notes: "",
  };
  const invalidRes = await fetch(`${baseUrl}/api/booking-request`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(invalidPayload),
  });
  const invalidJson = await invalidRes.json();
  if (invalidRes.status !== 400 || invalidJson.success !== false) {
    throw new Error(`Expected validation failure, got ${invalidRes.status} ${JSON.stringify(invalidJson)}`);
  }

  const validPayload = {
    serviceId: "lunch",
    partySize: "4",
    preferredTime: "12:00pm",
    customerName: "Jane Smith",
    customerEmail: "jane@example.com",
    customerPhone: "07700900123",
    notes: "Window seat if possible",
  };
  const validRes = await fetch(`${baseUrl}/api/booking-request`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(validPayload),
  });
  const validJson = await validRes.json();
  if (validRes.status !== 201 || validJson.success !== true || !validJson.data?.id) {
    throw new Error(`Expected success, got ${validRes.status} ${JSON.stringify(validJson)}`);
  }

  console.log("Booking request API test passed.");
  console.log(JSON.stringify({ invalid: invalidJson, valid: validJson }, null, 2));
}

run().catch((error) => {
  console.error("Booking request API test failed:", error);
  process.exit(1);
});
