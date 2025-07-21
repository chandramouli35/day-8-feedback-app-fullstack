const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;
const path = require("path");

const app = express();
const feedbackFile = path.join(__dirname, "data", "feedback.json");

// Initialize feedback file if it doesn't exist
async function initFeedbackFile() {
  try {
    await fs.access(feedbackFile);
  } catch {
    await fs.writeFile(feedbackFile, JSON.stringify([]));
  }
}

initFeedbackFile();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.post("/api/feedback", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const feedbackData = JSON.parse(await fs.readFile(feedbackFile));
    const newFeedback = {
      id: feedbackData.length + 1,
      name,
      email,
      message,
      timestamp: new Date(),
    };
    feedbackData.push(newFeedback);
    await fs.writeFile(feedbackFile, JSON.stringify(feedbackData, null, 2));
    res.status(201).json({ message: "Feedback saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error while saving feedback" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
