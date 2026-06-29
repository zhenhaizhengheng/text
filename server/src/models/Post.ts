import db from '../config/database';

export interface Post {
  id: number;
  user_id: number;
  content: string;
  images?: string;
  likes_count: number;
  comments_count: number;
  created_at: string;
  updated_at: string;
}

export interface PostWithUser extends Post {
  username: string;
  avatar?: string;
}

export const createPostTable = () => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      content TEXT NOT NULL,
      images TEXT,
      likes_count INTEGER DEFAULT 0,
      comments_count INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);
};

export const getAllPosts = (): PostWithUser[] => {
  const stmt = db.prepare(`
    SELECT p.*, u.username, u.avatar 
    FROM posts p
    JOIN users u ON p.user_id = u.id
    ORDER BY p.created_at DESC
  `);
  return stmt.all() as PostWithUser[];
};

export const getPostsByUserId = (userId: number): PostWithUser[] => {
  const stmt = db.prepare(`
    SELECT p.*, u.username, u.avatar 
    FROM posts p
    JOIN users u ON p.user_id = u.id
    WHERE p.user_id = ?
    ORDER BY p.created_at DESC
  `);
  return stmt.all(userId) as PostWithUser[];
};

export const getPostById = (id: number): PostWithUser | undefined => {
  const stmt = db.prepare(`
    SELECT p.*, u.username, u.avatar 
    FROM posts p
    JOIN users u ON p.user_id = u.id
    WHERE p.id = ?
  `);
  return stmt.get(id) as PostWithUser | undefined;
};

export const createPost = (userId: number, content: string, images?: string): number => {
  const stmt = db.prepare(`
    INSERT INTO posts (user_id, content, images)
    VALUES (?, ?, ?)
  `);
  const result = stmt.run(userId, content, images || null);
  return result.lastInsertRowid as number;
};

export const incrementLikes = (postId: number): void => {
  const stmt = db.prepare('UPDATE posts SET likes_count = likes_count + 1 WHERE id = ?');
  stmt.run(postId);
};

export const decrementLikes = (postId: number): void => {
  const stmt = db.prepare('UPDATE posts SET likes_count = likes_count - 1 WHERE id = ? AND likes_count > 0');
  stmt.run(postId);
};
