const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// In-memory key-value store
let kvStore = {};

app.use(bodyParser.json());

// GET /get/<key> to return the value of the key
app.get('/get/:key', (req, res) => {
  const key = req.params.key;
  const value = kvStore[key];
  if (value) {
    res.json({ [key]: value });
  } else {
    res.status(404).send('Key not found');
  }
});

// POST /set to set the key-value pair
app.post('/set', (req, res) => {
  const { key, value } = req.body;
  kvStore[key] = value;
  res.send('Key-Value pair added successfully');
});

// GET /search to search for keys with prefix or suffix
app.get('/search', (req, res) => {
  const { prefix, suffix } = req.query;
  const result = Object.keys(kvStore).filter(key => 
    (prefix && key.startsWith(prefix)) || (suffix && key.endsWith(suffix))
  ).reduce((acc, key) => {
    acc[key] = kvStore[key];
    return acc;
  }, {});

  res.json(result);
});

app.listen(port, () => {
  console.log(`KV Store app listening at http://localhost:${port}`);
});
