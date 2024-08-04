const express = require("express");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use(express.json());

// health check route
app.get("/health", (req, res) => {
  res.send("ok");
});

// Create orders route
app.post("/orders", async (req, res) => {
  const orderData = req.body;

  res.status(201).json({ message: "Order received and queued", orderData });
});

app.listen(PORT, () => {
  console.log(`BFF API listening at http://localhost:${PORT}`);
});
