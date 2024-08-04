const express = require("express");
const { OrderScheme, CreateOrderScheme } = require("./order");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

// health check route
app.get("/health", (req, res) => {
  res.send("ok");
});

// Create orders route
app.post("/orders", async (req, res) => {
  const { body } = req;

  const orderData = CreateOrderScheme.safeParse(body);

  const { success, error, data } = orderData;
  if (!success) {
    return res.status(400).json({ message: "Error creating order.", error });
  } else {
    console.log(orderData);

    res.status(201).json({ message: "Order received and queued", order: data });
  }
});

app.listen(PORT, () => {
  console.log(`BFF API listening at http://localhost:${PORT}`);
});
