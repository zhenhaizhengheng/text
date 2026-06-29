import { Response } from 'express';
import { validationResult } from 'express-validator';
import {
  getAllPosts,
  getPostsByUserId,
  getPostById,
  createPost,
  incrementLikes,
  decrementLikes,
} from '../models/Post';
import { successResponse, errorResponse } from '../utils/response';
import { AuthRequest } from '../middleware/auth';

export const listPosts = (req: AuthRequest, res: Response) => {
  const { user_id } = req.query;

  let posts;
  if (user_id) {
    const userId = parseInt(user_id as string, 10);
    if (isNaN(userId)) {
      return errorResponse(res, '无效的用户ID', 400);
    }
    posts = getPostsByUserId(userId);
  } else {
    posts = getAllPosts();
  }

  const result = posts.map((post) => ({
    ...post,
    images: post.images ? JSON.parse(post.images) : [],
  }));

  return successResponse(res, { posts: result }, '获取社区动态成功');
};

export const getPostDetail = (req: AuthRequest, res: Response) => {
  const postId = parseInt(req.params.id, 10);

  if (isNaN(postId)) {
    return errorResponse(res, '无效的动态ID', 400);
  }

  const post = getPostById(postId);
  if (!post) {
    return errorResponse(res, '动态不存在', 404);
  }

  const result = {
    ...post,
    images: post.images ? JSON.parse(post.images) : [],
  };

  return successResponse(res, { post: result }, '获取动态详情成功');
};

export const createPostController = (req: AuthRequest, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(res, '参数验证失败', 400, errors.array());
  }

  const userId = req.user?.id;
  const { content, images } = req.body;

  if (!userId) {
    return errorResponse(res, '未认证', 401);
  }

  const imagesStr = images && images.length > 0 ? JSON.stringify(images) : undefined;
  const postId = createPost(userId, content, imagesStr);

  const post = getPostById(postId);
  const result = {
    ...post,
    images: post?.images ? JSON.parse(post.images) : [],
  };

  return successResponse(res, { post: result }, '发布动态成功', 201);
};

export const likePost = (req: AuthRequest, res: Response) => {
  const postId = parseInt(req.params.id, 10);

  if (isNaN(postId)) {
    return errorResponse(res, '无效的动态ID', 400);
  }

  const post = getPostById(postId);
  if (!post) {
    return errorResponse(res, '动态不存在', 404);
  }

  incrementLikes(postId);

  const updatedPost = getPostById(postId);
  const result = {
    ...updatedPost,
    images: updatedPost?.images ? JSON.parse(updatedPost.images) : [],
  };

  return successResponse(res, { post: result }, '点赞成功');
};

export const unlikePost = (req: AuthRequest, res: Response) => {
  const postId = parseInt(req.params.id, 10);

  if (isNaN(postId)) {
    return errorResponse(res, '无效的动态ID', 400);
  }

  const post = getPostById(postId);
  if (!post) {
    return errorResponse(res, '动态不存在', 404);
  }

  decrementLikes(postId);

  const updatedPost = getPostById(postId);
  const result = {
    ...updatedPost,
    images: updatedPost?.images ? JSON.parse(updatedPost.images) : [],
  };

  return successResponse(res, { post: result }, '取消点赞成功');
};
