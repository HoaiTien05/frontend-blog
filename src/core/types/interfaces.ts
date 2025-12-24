// API response interfaces
export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  createdAt: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  authorId: string;
  author?: User;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  content: string;
  postId: string;
  authorId: string;
  author?: User;
  createdAt: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface PaginatedResponse<T> {
  data: {
    meta?: { totalItems: number; totalPages: number; currentPage: number; itemsPerPage: number };
    posts: T[]};
  total: number;
  page: number;
  limit: number;
}