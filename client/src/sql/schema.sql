CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE creations (
  id UUID PRIMARY KEY,
  user_id TEXT REFERENCES users(id),
  title TEXT,
  content TEXT,
  publish BOOLEAN DEFAULT false,
  likes TEXT[] DEFAULT '{}',
  like_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE activity_logs (
  id SERIAL PRIMARY KEY,
  user_id TEXT,
  action TEXT,
  target_id UUID,
  created_at TIMESTAMP DEFAULT NOW()
);
