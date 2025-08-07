const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage
const moodEntries = [];

// Home route
app.get('/', (req, res) => {
  res.send('Mood Journal Backend is up and running!');
});

// POST route to save mood
app.post('/save-mood', (req, res) => {
  const { mood, date, entry } = req.body;

  if (!mood || !date || !entry) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const newEntry = { mood, date, entry };
  moodEntries.push(newEntry);

  res.status(200).json({ message: 'Mood saved successfully!', entry: newEntry });
});

app.get('/entries', (_req, res) => {
  res.status(200).json(moodEntries);
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});