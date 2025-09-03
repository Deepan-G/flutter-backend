const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// 🔑 Railway DB Config
const db = mysql.createConnection({
  host: "mysql.railway.internal",
  port: 3306,
  user: "root",
  password: "ZJdiISweXqxuhPdAfcALnlaUYiijgwQA",
  database: "railway"
});

// DB connect
db.connect(err => {
  if (err) {
    console.error("DB connection failed: " + err.stack);
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

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
