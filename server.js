
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

let users = {
  "user1": { plan: "free", usage: 0 }
};

const LIMITS = {
  free: 3,
  pro: 100
};

app.get("/", (req, res) => {
  res.send("SaaS AI App Running 🚀");
});

app.post("/generate", async (req, res) => {
  const { userId } = req.body;

  const user = users[userId];
  if (!user) return res.status(404).send("User not found");

  if (user.usage >= LIMITS[user.plan]) {
    return res.status(403).json({ error: "Limit exceeded" });
  }

  user.usage++;

  if (process.env.TEST_MODE === "true") {
    return res.json({
      video: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4"
    });
  }

  res.json({ video: "REAL_VIDEO_LINK" });
});

app.post("/upgrade", (req, res) => {
  const { userId } = req.body;
  users[userId].plan = "pro";
  res.send("Upgraded");
});

app.listen(process.env.PORT || 3000);
