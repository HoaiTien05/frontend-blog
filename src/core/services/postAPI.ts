import axiosInstance from '../config/axios';
import type { Post, PaginatedResponse } from '../types/interfaces';

export const postAPI = {
  getPosts: (params?: { page?: number; q?: string; limit?: number }) =>
    axiosInstance.get<PaginatedResponse<Post>>('/posts', { params }),

  getPostBySlug: (slug: string) =>
    axiosInstance.get<Post>(`/posts/${slug}`),

  getPostById: (id: string) =>
  axiosInstance.get<Post>(`/posts/id/${id}`),


  createPost: (data: Partial<Post>) =>
    axiosInstance.post<Post>('/posts', data),

  updatePost: (id: string, data: Partial<Post>) =>
    axiosInstance.put<Post>(`/posts/${id}`, data),

  deletePost: (id: string) =>
    axiosInstance.delete(`/posts/${id}`),
};