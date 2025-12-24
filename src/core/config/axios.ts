import axios from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers = config.headers || {};
      (config.headers as any).Authorization = `Bearer ${token}`;
    }

    // Temporary debug: show whether a token is present and headers being sent
    try {
      // Avoid logging the actual token value for safety
      console.debug('[axios] request', {
        method: config.method,
        url: config.url,
        tokenPresent: !!token,
        headers: config.headers,
      });
    } catch (e) {
      // ignore logging errors
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!originalRequest) return Promise.reject(error);

    // If 401 and not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          // Redirect to login
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        //   window.location.href = '/login';

          // Debug log
          console.error('[axios] 401 received and no refresh token, originalRequest:', {
            url: originalRequest.url,
            method: originalRequest.method,
            headers: originalRequest.headers,
          });

          return Promise.reject(error);
        }

        // Attempt to refresh token
        const response = await axios.post(`${BASE_URL}/auth/refresh`, {
          refreshToken,
        });

        const newAccessToken = response.data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);

        // Retry original request
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        // window.location.href = '/login';
        console.error('[axios] token refresh failed', refreshError);
        return Promise.reject(refreshError);
      }
    }

    // Debug other errors
    console.error('[axios] response error', {
      status: error.response?.status,
      url: originalRequest.url,
      method: originalRequest.method,
      headers: originalRequest.headers,
      data: error.response?.data,
    });

    return Promise.reject(error);
  }
);

export default axiosInstance;