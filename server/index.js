const express = require('express');
const fs = require('fs');
const path = require('path');
const { nanoid } = require('nanoid');

const app = express();
app.use(express.json());
// very small CORS middleware for local development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

const DB_PATH = path.join(__dirname, 'posts.json');
const USERS_PATH = path.join(__dirname, 'users.json');
const SESSIONS_PATH = path.join(__dirname, 'sessions.json');

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

function readUsers() {
  try {
    if (!fs.existsSync(USERS_PATH)) return [];
    const raw = fs.readFileSync(USERS_PATH, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (e) {
    console.error('readUsers error', e);
    return [];
  }
}

function writeUsers(users) {
  fs.writeFileSync(USERS_PATH, JSON.stringify(users, null, 2), 'utf8');
}

function readSessions() {
  try {
    if (!fs.existsSync(SESSIONS_PATH)) return {};
    const raw = fs.readFileSync(SESSIONS_PATH, 'utf8');
    return JSON.parse(raw || '{}');
  } catch (e) {
    console.error('readSessions error', e);
    return {};
  }
}

function writeSessions(sessions) {
  fs.writeFileSync(SESSIONS_PATH, JSON.stringify(sessions, null, 2), 'utf8');
}

app.get('/posts', (req, res) => {
  const posts = readDB();
  // ensure posts have expected fields and return latest first
  const normalized = posts.map((p) => ({
    id: p.id,
    author: p.author || 'Anonymous',
    content: p.content || '',
    createdAt: p.createdAt || new Date().toISOString(),
    image: p.image || null, // optional data URL or remote URL
    comments: p.comments || [],
    likedBy: p.likedBy || [],
  }));
  res.json(normalized.reverse()); // latest first
});

app.post('/posts', (req, res) => {
  // require authentication to post
  const authHeader = (req.get('authorization') || '').trim();
  let authorFromToken = null;
  if (authHeader.startsWith('Bearer ')) {
    const token = authHeader.slice(7);
    const sessions = readSessions();
    if (sessions[token]) authorFromToken = sessions[token];
  }

  const { author = 'Anonymous', content, image } = req.body;
  if (!authorFromToken) {
    return res.status(401).json({ error: 'authentication required to create posts' });
  }
  if (!content || content.trim() === '') {
    return res.status(400).json({ error: 'content is required' });
  }
  const posts = readDB();
  const post = {
    id: nanoid(),
    author: authorFromToken,
    content,
    image: image || null,
    comments: [],
    likedBy: [],
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

// Register user (simple, stores username+password in users.json) - NOT for production
app.post('/auth/register', (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ error: 'username and password required' });
  const users = readUsers();
  if (users.find((u) => u.username === username)) return res.status(400).json({ error: 'username taken' });
  const user = { id: nanoid(), username, password };
  users.push(user);
  writeUsers(users);
  // create session token and return it so client can auto-login
  const token = nanoid();
  const sessions = readSessions();
  sessions[token] = username;
  writeSessions(sessions);
  res.status(201).json({ id: user.id, username: user.username, token });
});

// Login: returns a simple token stored in sessions.json
app.post('/auth/login', (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ error: 'username and password required' });
  const users = readUsers();
  const user = users.find((u) => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ error: 'invalid credentials' });
  const token = nanoid();
  const sessions = readSessions();
  sessions[token] = username;
  writeSessions(sessions);
  res.json({ token, username });
});

// add a comment to a post
app.post('/posts/:id/comments', (req, res) => {
  const id = req.params.id;
  const { author = 'Anonymous', content } = req.body;
  if (!content || content.trim() === '') return res.status(400).json({ error: 'content is required' });
  const posts = readDB();
  const idx = posts.findIndex((p) => p.id === id);
  if (idx === -1) return res.status(404).json({ error: 'post not found' });
  const comment = { id: nanoid(), author, content, createdAt: new Date().toISOString() };
  posts[idx].comments = posts[idx].comments || [];
  posts[idx].comments.push(comment);
  writeDB(posts);
  res.status(201).json(comment);
});

// toggle like for a post (by author). If no author provided, we increment/decrement anonymously.
app.post('/posts/:id/likes', (req, res) => {
  const id = req.params.id;
  const { author } = req.body || {};
  const posts = readDB();
  const idx = posts.findIndex((p) => p.id === id);
  if (idx === -1) return res.status(404).json({ error: 'post not found' });
  posts[idx].likedBy = posts[idx].likedBy || [];
  if (author) {
    const found = posts[idx].likedBy.indexOf(author);
    if (found === -1) {
      posts[idx].likedBy.push(author);
    } else {
      posts[idx].likedBy.splice(found, 1);
    }
  } else {
    // anonymous like: toggle a special marker using timestamp to allow repeated toggles
    posts[idx].anonymousLikes = (posts[idx].anonymousLikes || 0) + 1;
  }
  writeDB(posts);
  res.json({ likes: (posts[idx].likedBy ? posts[idx].likedBy.length : 0) + (posts[idx].anonymousLikes || 0) });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
