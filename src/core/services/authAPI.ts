import axiosInstance from '../config/axios';
import type { AuthResponse, User } from '../types/interfaces';

export const authAPI = {
  register: (data: { username: string; email: string; password: string }) =>
    axiosInstance.post<AuthResponse>('/auth/register', data),

  login: (data: { email: string; password: string }) =>
    axiosInstance.post<AuthResponse>('/auth/login', data),

  logout: () => axiosInstance.post('/auth/logout'),

  refresh: (refreshToken: string) =>
    axiosInstance.post<{ accessToken: string }>('/auth/refresh', {
      refreshToken,
    }),

  getProfile: () => axiosInstance.get<User>('/users/profile'),

  updateProfile: (data: Partial<User> | FormData, config?: any) =>
    axiosInstance.put<User>('/users/profile', data, config),
};