import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { reissueAccessToken } from '@/lib/api/auth';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const isAuthPage = path.startsWith('/login') || path.startsWith('/onboarding/information');
      const token = localStorage.getItem('accessToken');

      if (!isAuthPage && token && !config.url?.includes('/auth/token')) {
        config.headers.set('Authorization', `Bearer ${token}`);
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// 응답 인터셉터: 401 발생 시 AccessToken 재발급
let isRefreshing = false;
let failedQueue: {
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
}[] = [];

const processQueue = (error: unknown, token: string | null = null): void => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (!axios.isAxiosError(error)) return Promise.reject(error);

    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    const is401 = error.response?.status === 401;
    const isAccessTokenExpired = error.response?.data?.code === 'ACCESS_TOKEN_EXPIRED';
    const isNotTokenEndpoint = !originalRequest.url?.includes('/auth/token');

    if (is401 && isAccessTokenExpired && !originalRequest._retry && isNotTokenEndpoint) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: unknown) => {
              if (typeof originalRequest.headers?.set === 'function') {
                originalRequest.headers.set('Authorization', `Bearer ${token}`);
              }
              resolve(axiosInstance(originalRequest));
            },
            reject,
          });
        });
      }

      isRefreshing = true;

      try {
        const { data } = await reissueAccessToken();
        const newToken = data.accessToken;

        localStorage.setItem('accessToken', newToken);
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        processQueue(null, newToken);

        if (typeof originalRequest.headers?.set === 'function') {
          originalRequest.headers.set('Authorization', `Bearer ${newToken}`);
        }

        return axiosInstance(originalRequest);
      } catch (err: unknown) {
        processQueue(err, null);

        if (axios.isAxiosError(err) && err.response?.data?.code === 'REFRESH_TOKEN_INVALID') {
          localStorage.removeItem('accessToken');
          window.location.href = '/login';
          return;
        }
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
