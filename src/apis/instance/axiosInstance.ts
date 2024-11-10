import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    Authorization: '',
  },
});

const refreshInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    try {
      if (error?.response?.status === 401) {
        const token = localStorage.getItem('refreshToken');
        if (!token) {
          window.location.href = '/login';
          return Promise.reject(error);
        }
        error.config.headers.Authorization = `Bearer ${token}`;
        const response = await refreshInstance.post('auth/tokens', null, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { accessToken, refreshToken } = response.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        error.config.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance.request(error.config);
      }
    } catch (refreshError) {
      window.location.href = '/login';
      return Promise.reject(refreshError);
    }
    return Promise.reject(error);
  },
);
