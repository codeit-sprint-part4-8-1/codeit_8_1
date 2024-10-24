import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: `https://sp-globalnomad-api.vercel.app/8-1`,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => {
    console.error('Error Messages: ', error);
    return Promise.reject(error);
  },
);
