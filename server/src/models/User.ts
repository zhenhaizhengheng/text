import db from '../config/database';

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  avatar?: string;
  bio?: string;
  created_at: string;
  updated_at: string;
}

export interface SafeUser extends Omit<User, 'password'> {}

export const createUserTable = () => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      avatar TEXT,
      bio TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
};

export const createUser = (username: string, email: string, passwordHash: string): number => {
  const stmt = db.prepare(`
    INSERT INTO users (username, email, password)
    VALUES (?, ?, ?)
  `);
  const result = stmt.run(username, email, passwordHash);
  return result.lastInsertRowid as number;
};

export const findUserByEmail = (email: string): User | undefined => {
  const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
  return stmt.get(email) as User | undefined;
};

export const findUserByUsername = (username: string): User | undefined => {
  const stmt = db.prepare('SELECT * FROM users WHERE username = ?');
  return stmt.get(username) as User | undefined;
};

export const findUserById = (id: number): User | undefined => {
  const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
  return stmt.get(id) as User | undefined;
};

export const toSafeUser = (user: User): SafeUser => {
  const { password, ...safeUser } = user;
  return safeUser;
};
