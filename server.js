const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// 🔑 Railway DB Config using Environment Variables
const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  port: process.env.MYSQLPORT,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE
});

// DB connect
db.connect(err => {
  if (err) {
    console.error("❌ DB connection failed: " + err.stack);
    return;
  }
  console.log("✅ Connected to Railway MySQL!");
});

// Example POST API
app.post("/addText", (req, res) => {
  const { text } = req.body;
  db.query("INSERT INTO texts (text) VALUES (?)", [text], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ success: true, id: result.insertId });
  });
});

// Example GET API
app.get("/getText", (req, res) => {
  db.query("SELECT * FROM texts", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Dynamic Port from Railway
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
