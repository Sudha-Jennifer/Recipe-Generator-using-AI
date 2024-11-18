const express = require("express");
const cors = require("cors");
require("dotenv/config");

const router = require("./router"); // Importing router from router.js

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Environment variable for port
const port = process.env.PORT || 3000;

// Use the routes
app.use("/api", router); // Mounting router with "/api" prefix

// Start the server
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
