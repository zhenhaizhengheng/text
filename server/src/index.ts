import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import courseRoutes from './routes/courses';
import progressRoutes from './routes/progress';
import communityRoutes from './routes/community';
import { errorHandler, notFoundHandler } from './middleware/error';
import { createUserTable, findUserByUsername, createUser } from './models/User';
import { createCourseTable, getAllCourses } from './models/Course';
import { createProgressTable } from './models/Progress';
import { createPostTable, getAllPosts } from './models/Post';
import { hashPassword } from './utils/password';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const initDatabase = async () => {
  console.log('初始化数据库...');

  createUserTable();
  createCourseTable();
  createProgressTable();
  createPostTable();

  console.log('数据库表创建完成');

  await seedData();
};

const seedData = async () => {
  console.log('检查种子数据...');

  const adminUser = findUserByUsername('admin');
  if (!adminUser) {
    const passwordHash = await hashPassword('123456');
    createUser('admin', 'a****@test.com', passwordHash);
    console.log('创建管理员用户: admin / 123456');
  }

  const testUser = findUserByUsername('testuser');
  if (!testUser) {
    const passwordHash = await hashPassword('123456');
    createUser('testuser', 't***@test.com', passwordHash);
    console.log('创建测试用户: testuser / 123456');
  }

  const courses = getAllCourses();
  if (courses.length === 0) {
    const db = require('./config/database').default;
    const stmt = db.prepare(`
      INSERT INTO courses (title, description, instructor, category, level, duration, lessons_count, rating, students_count, price, is_free)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const seedCourses = [
      {
        title: 'JavaScript 从入门到精通',
        description: '全面学习 JavaScript 编程语言，从基础语法到高级特性，掌握现代 Web 开发核心技能。',
        instructor: '张老师',
        category: '前端开发',
        level: 'beginner',
        duration: 3600,
        lessons_count: 48,
        rating: 4.8,
        students_count: 1256,
        price: 0,
        is_free: 1,
      },
      {
        title: 'React 实战开发',
        description: '深入学习 React 框架，掌握组件化开发、状态管理、路由等核心技术，打造高质量前端应用。',
        instructor: '李老师',
        category: '前端开发',
        level: 'intermediate',
        duration: 5400,
        lessons_count: 36,
        rating: 4.9,
        students_count: 892,
        price: 199,
        is_free: 0,
      },
      {
        title: 'Node.js 后端开发',
        description: '学习 Node.js 服务端开发，掌握 Express 框架、数据库操作、API 设计等后端开发技能。',
        instructor: '王老师',
        category: '后端开发',
        level: 'intermediate',
        duration: 4800,
        lessons_count: 40,
        rating: 4.7,
        students_count: 678,
        price: 159,
        is_free: 0,
      },
      {
        title: 'Python 数据分析',
        description: '使用 Python 进行数据分析，学习 NumPy、Pandas、Matplotlib 等数据科学工具。',
        instructor: '陈老师',
        category: '数据科学',
        level: 'beginner',
        duration: 4200,
        lessons_count: 32,
        rating: 4.6,
        students_count: 1034,
        price: 0,
        is_free: 1,
      },
      {
        title: 'Vue.js 3.0 完全指南',
        description: '从零开始学习 Vue.js 3.0，掌握组合式 API、响应式原理、组件设计等核心概念。',
        instructor: '刘老师',
        category: '前端开发',
        level: 'beginner',
        duration: 4500,
        lessons_count: 42,
        rating: 4.8,
        students_count: 756,
        price: 129,
        is_free: 0,
      },
      {
        title: 'MySQL 数据库优化',
        description: '深入学习 MySQL 数据库，掌握 SQL 优化、索引设计、性能调优等数据库进阶技能。',
        instructor: '赵老师',
        category: '后端开发',
        level: 'advanced',
        duration: 3600,
        lessons_count: 28,
        rating: 4.5,
        students_count: 432,
        price: 299,
        is_free: 0,
      },
    ];

    for (const course of seedCourses) {
      stmt.run(
        course.title,
        course.description,
        course.instructor,
        course.category,
        course.level,
        course.duration,
        course.lessons_count,
        course.rating,
        course.students_count,
        course.price,
        course.is_free
      );
    }

    console.log(`创建了 ${seedCourses.length} 门课程`);
  }

  const posts = getAllPosts();
  if (posts.length === 0) {
    const db = require('./config/database').default;
    const stmt = db.prepare(`
      INSERT INTO posts (user_id, content, likes_count)
      VALUES (?, ?, ?)
    `);

    const seedPosts = [
      { user_id: 1, content: '欢迎来到学习社区！在这里分享你的学习心得，与大家一起进步。', likes: 42 },
      { user_id: 2, content: '今天开始学习 JavaScript 了，感觉很有趣！大家有什么好的学习方法推荐吗？', likes: 15 },
      { user_id: 1, content: 'React 的 Hooks 真的太好用了，推荐大家都去学习一下。', likes: 28 },
    ];

    for (const post of seedPosts) {
      stmt.run(post.user_id, post.content, post.likes);
    }

    console.log(`创建了 ${seedPosts.length} 条社区动态`);
  }

  console.log('种子数据初始化完成');
};

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: '服务运行正常',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/community', communityRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const startServer = async () => {
  try {
    await initDatabase();

    app.listen(PORT, () => {
      console.log(`🚀 服务器运行在 http://localhost:${PORT}`);
      console.log(`📚 API 文档: 请参考 routes 目录下的路由文件`);
      console.log(`👤 测试账号: admin / 123456 或 testuser / 123456`);
    });
  } catch (error) {
    console.error('服务器启动失败:', error);
    process.exit(1);
  }
};

startServer();

export default app;
