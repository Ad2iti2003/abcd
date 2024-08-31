const express = require('express');
const mysql = require('mysql2');
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

// Endpoint to fetch chart data


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
  db.query('SELECT * FROM Messages', (err, results) => {
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

app.get('/api/chart-data', (req, res) => {
  db.query('SELECT * FROM CHARTDATA', (err, results) => {
    if (err) {
      console.error('Error fetching aggregations:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ chartdata: results });
  });
}); 

app.get('/api/chartdata', (req, res) => {
  // Example query to get chart data; modify as needed
  db.query('SELECT * FROM CHARTDATA', (err, results) => {
    if (err) {
      console.error('Error fetching chart data:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    
    // Mock data for demonstration; replace with your actual query results
    const chartData = {
      speed: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [{
          label: 'Speed (km/h)',
          data: [10, 20, 15, 25, 30],
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
        }],
      },
      attitude: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
          {
            label: 'Roll (deg)',
            data: [5, 10, 8, 12, 14],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
          },
          {
            label: 'Pitch (deg)',
            data: [3, 7, 5, 9, 11],
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: true,
          },
        ],
      },
      acceleration: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [{
          label: 'Acceleration (m/s^2)',
          data: [2, 4, 3, 5, 6],
          borderColor: 'rgba(255, 159, 64, 1)',
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
          fill: true,
        }],
      },
    };

    res.json(chartData);
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
