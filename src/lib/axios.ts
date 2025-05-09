import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const isAuthPage = path.startsWith('/login') || path.startsWith('/onboarding/information');
      const token = localStorage.getItem('accessToken');

      if (!isAuthPage) {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;
