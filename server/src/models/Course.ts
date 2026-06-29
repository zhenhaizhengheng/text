import db from '../config/database';

export interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  thumbnail?: string;
  category: string;
  level: string;
  duration: number;
  lessons_count: number;
  rating: number;
  students_count: number;
  price: number;
  is_free: boolean;
  created_at: string;
  updated_at: string;
}

export const createCourseTable = () => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      instructor TEXT NOT NULL,
      thumbnail TEXT,
      category TEXT NOT NULL,
      level TEXT NOT NULL DEFAULT 'beginner',
      duration INTEGER DEFAULT 0,
      lessons_count INTEGER DEFAULT 0,
      rating REAL DEFAULT 0,
      students_count INTEGER DEFAULT 0,
      price REAL DEFAULT 0,
      is_free INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
};

export const getAllCourses = (): Course[] => {
  const stmt = db.prepare('SELECT * FROM courses ORDER BY created_at DESC');
  return stmt.all() as Course[];
};

export const getCoursesByCategory = (category: string): Course[] => {
  const stmt = db.prepare('SELECT * FROM courses WHERE category = ? ORDER BY created_at DESC');
  return stmt.all(category) as Course[];
};

export const getCourseById = (id: number): Course | undefined => {
  const stmt = db.prepare('SELECT * FROM courses WHERE id = ?');
  return stmt.get(id) as Course | undefined;
};

export const searchCourses = (keyword: string): Course[] => {
  const stmt = db.prepare(`
    SELECT * FROM courses 
    WHERE title LIKE ? OR description LIKE ? OR instructor LIKE ?
    ORDER BY created_at DESC
  `);
  const searchTerm = `%${keyword}%`;
  return stmt.all(searchTerm, searchTerm, searchTerm) as Course[];
};
