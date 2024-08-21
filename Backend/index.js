const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Your MySQL username
  password: '$Aditi614', // Your MySQL password
  database: 'backend'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// Endpoint to fetch data from each table
app.get('/api/devices', (req, res) => {
  db.query('SELECT * FROM Devices', (err, results) => {
    if (err) {
      console.error('Error fetching devices:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ devices: results });
  });
});

app.get('/api/messages', (req, res) => {
  db.query('SELECT * FROM Message', (err, results) => {
    if (err) {
      console.error('Error fetching messages:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ messages: results });
  });
});

app.get('/api/signals', (req, res) => {
  db.query('SELECT * FROM Signals', (err, results) => {
    if (err) {
      console.error('Error fetching signals:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ signals: results });
  });
});

app.get('/api/aggregations', (req, res) => {
  db.query('SELECT * FROM Aggregations', (err, results) => {
    if (err) {
      console.error('Error fetching aggregations:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ aggregations: results });
  });
});

// Endpoint to post data
app.post('/api/chart-data', (req, res) => {
  const { label, value } = req.body;
  if (!label || !value) {
    return res.status(400).json({ error: 'Label and value are required' });
  }

  db.query('INSERT INTO ChartData (label, value) VALUES (?, ?)', [label, value], (err, results) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(201).json({ message: 'Data inserted successfully', id: results.insertId });
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
