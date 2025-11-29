 // WhatsApp Cloud API Webhook Server
const express = require("express");
const app = express();

// Parse JSON request body
app.use(express.json());

// SET YOUR VERIFY TOKEN (same token you enter in Facebook Developer)
const VERIFY_TOKEN = "myverifytoken";

// ------------------------------
// GET Webhook Verification
// ------------------------------
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook verified!");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// ------------------------------
// POST Webhook Receiver
// ------------------------------
app.post("/webhook", (req, res) => {
  const timestamp = new Date().toISOString().replace("T", " ").slice(0, 19);
  console.log(`\n📩 Webhook Received: ${timestamp}\n`);
  console.log(JSON.stringify(req.body, null, 2));

  res.sendStatus(200);
});

// ------------------------------
// Start Server
// ------------------------------
app.listen(process.env.PORT || 3000, () => {
  console.log(`🚀 Server running`);
});
