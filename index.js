// index.js
const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT NOW() AS `current_time`");
    res.send(`Connected! Server time is: ${rows[0].current_time}`);
  } catch (err) {
    console.error("DB Connection Error:", err);
    res.status(500).send("Database connection failed");
  }
});

app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from backend API!" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
