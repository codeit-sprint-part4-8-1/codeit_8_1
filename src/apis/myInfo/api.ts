import { axiosInstance } from '../instance/axiosInstance';

interface fetchLoginTestParams {
  userEmail: string;
  userPassword: string;
}

// 로그인 기능구현전이어서 임시로 구현
export const fetchLoginTest = async ({
  userEmail = 'youm96@naver.com',
  userPassword = '12341234',
}: fetchLoginTestParams) => {
  try {
    const response = await axiosInstance.post('auth/login', {
      email: userEmail,
      password: userPassword,
    });
    localStorage.setItem('accessToken', JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 유저 정보 가져오기
export const fetchUserInfo = async () => {
  try {
    const response = await axiosInstance.get('/users/me/');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 업데이트한 이미지를 url로 변환
export const fetchImageUrl = async (formData: any) => {
  try {
    const response = await axiosInstance.post('/users/me/image', formData);
    return response;
  } catch (error) {
    console.error(error);
  }
};

// url로 변환된 이미지를 업데이트
export const updateImage = async (profileImageUrl: string) => {
  try {
    const response = await axiosInstance.patch('/users/me', {
      profileImageUrl,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 유저 정보 수정
export const updateUserInfo = async (
  nickname: string,
  newPassword?: string,
) => {
  try {
    const response = await axiosInstance.patch('/users/me', {
      nickname,
      newPassword,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
