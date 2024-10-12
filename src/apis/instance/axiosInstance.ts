import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('userInfo');

    if (token) {
      const userInfo = JSON.parse(token);
      const userInfoAccessToken = userInfo.accessToken;
      config.headers.Authorization = `Bearer ${userInfoAccessToken}`;
    }

    return config;
  },
  (error) => {
    console.error('Error Messages: ', error);
    return Promise.reject(error);
  },
);
