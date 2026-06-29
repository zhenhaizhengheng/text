import db from '../config/database';

export interface Progress {
  id: number;
  user_id: number;
  course_id: number;
  progress_percent: number;
  last_lesson: number;
  completed_lessons: string;
  last_accessed_at: string;
  created_at: string;
  updated_at: string;
}

export const createProgressTable = () => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      course_id INTEGER NOT NULL,
      progress_percent REAL DEFAULT 0,
      last_lesson INTEGER DEFAULT 0,
      completed_lessons TEXT DEFAULT '[]',
      last_accessed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, course_id),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
    )
  `);
};

export const getProgressByUserId = (userId: number): Progress[] => {
  const stmt = db.prepare('SELECT * FROM progress WHERE user_id = ? ORDER BY last_accessed_at DESC');
  return stmt.all(userId) as Progress[];
};

export const getProgressByUserAndCourse = (userId: number, courseId: number): Progress | undefined => {
  const stmt = db.prepare('SELECT * FROM progress WHERE user_id = ? AND course_id = ?');
  return stmt.get(userId, courseId) as Progress | undefined;
};

export const createProgress = (userId: number, courseId: number): number => {
  const stmt = db.prepare(`
    INSERT INTO progress (user_id, course_id)
    VALUES (?, ?)
  `);
  const result = stmt.run(userId, courseId);
  return result.lastInsertRowid as number;
};

export const updateProgress = (
  userId: number,
  courseId: number,
  progressPercent: number,
  lastLesson: number,
  completedLessons: string
): void => {
  const stmt = db.prepare(`
    UPDATE progress 
    SET progress_percent = ?, last_lesson = ?, completed_lessons = ?, 
        last_accessed_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
    WHERE user_id = ? AND course_id = ?
  `);
  stmt.run(progressPercent, lastLesson, completedLessons, userId, courseId);
};

export const getEnrolledCoursesCount = (userId: number): number => {
  const stmt = db.prepare('SELECT COUNT(*) as count FROM progress WHERE user_id = ?');
  const result = stmt.get(userId) as { count: number };
  return result.count;
};
