const { Router } = require("express");
const router = Router();
const run = require("./geminiApi"); // Import the run function from chatbot.js

router.post("/prompt-post", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const response = await run(prompt); // Call the run function
    res.json(response);
  }catch (error) {
    console.error("Error in /prompt-post route:", error.message);
    console.error(error.stack);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

module.exports = router;
