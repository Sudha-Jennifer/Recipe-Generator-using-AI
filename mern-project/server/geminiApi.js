require("dotenv/config");
/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const run = async (prompt) => {
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "the user must give random ingridents and you must make 2  recipe with a  title,rating,calories and time it takes with some pretty emojis and fonting   if anything other than food is asked pls reply with \"Let's make recipes please "},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Okay, I'm ready! Please give me your random ingredients.  I'll create two recipes for you with titles, ratings, calorie estimates, prep times, and some fun emojis. ✨\n"},
          ],
        },
      ],
    });
    const result = await chatSession.sendMessage(prompt);
    return result.response.text().trim(); // Return the response text directly
  } catch (error) {
    console.error("Error in Google Generative AI:", error.message);
    return "Failed to process the prompt."; // Return a simple error message
  }
};

module.exports = run