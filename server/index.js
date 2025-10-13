const express = require('express');
const fs = require('fs');
const path = require('path');
const { nanoid } = require('nanoid');

const app = express();
app.use(express.json());

const DB_PATH = path.join(__dirname, 'posts.json');

function readDB() {
  try {
    if (!fs.existsSync(DB_PATH)) return [];
    const raw = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (e) {
    console.error('readDB error', e);
    return [];
  }
}

function writeDB(posts) {
  fs.writeFileSync(DB_PATH, JSON.stringify(posts, null, 2), 'utf8');
}

app.get('/posts', (req, res) => {
  const posts = readDB();
  res.json(posts.reverse()); // latest first
});

app.post('/posts', (req, res) => {
  const { author = 'Anonymous', content } = req.body;
  if (!content || content.trim() === '') {
    return res.status(400).json({ error: 'content is required' });
  }
  const posts = readDB();
  const post = {
    id: nanoid(),
    author,
    content,
    createdAt: new Date().toISOString(),
  };
  posts.push(post);
  writeDB(posts);
  res.status(201).json(post);
});

app.delete('/posts/:id', (req, res) => {
  const id = req.params.id;
  let posts = readDB();
  const before = posts.length;
  posts = posts.filter((p) => p.id !== id);
  if (posts.length === before) return res.status(404).json({ error: 'not found' });
  writeDB(posts);
  res.json({ success: true });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
