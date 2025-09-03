const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');

app.use(cors());
app.use(express.json());


// 🔑 Railway DB Config using Environment Variables
const db = mysql.createConnection({
  host: 'your-railway-host',
  user: 'your-db-user',
  password: 'your-db-password',
  database: 'your-db-name'
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
app.post('/comments', (req, res) => {
  const { username, comment } = req.body;
  db.query(
    'INSERT INTO comments (username, comment) VALUES (?, ?)',
    [username, comment],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(200).json({ message: 'Comment added!' });
    }
  );
});


// Example GET API
app.get('/comments', (req, res) => {
  db.query('SELECT * FROM comments ORDER BY id DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(results);
  });
});

// Dynamic Port from Railway
const PORT = process.env.PORT || 3000;

app.listen(3000, () => {
  console.log('Server running on port 3000');
});


