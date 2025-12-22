import axiosInstance from '../config/axios';
import type { Comment } from '../types/interfaces';

export const commentAPI = {
  getComments: (postId: string) =>
    axiosInstance.get<Comment[]>(`/posts/${postId}/comments`),

  addComment: (postId: string, data: { content: string }) =>
    axiosInstance.post<Comment>(`/posts/${postId}/comments`, data),

  deleteComment: (commentId: string) =>
    axiosInstance.delete(`/comments/${commentId}`),
};