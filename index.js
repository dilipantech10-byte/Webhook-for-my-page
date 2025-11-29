 const express = require('express');
const app = express();

app.use(express.json());

// Your verify token (same as Meta Dashboard)
const VERIFY_TOKEN = "myverifytoken";

// Webhook verification (GET)
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log("Webhook verified successfully!");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// Receiving messages (POST)
app.post('/webhook', (req, res) => {
  console.log("Webhook received message:");
  console.log(JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

// Render will provide PORT env value
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Webhook server running on port ${PORT}`);
});
