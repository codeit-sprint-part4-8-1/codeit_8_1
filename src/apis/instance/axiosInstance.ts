import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    // 기본적으로 Authorization 헤더를 추가하고 싶다면, 아래와 같이 빈 문자열로 초기화
    Authorization: '',
  },
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
