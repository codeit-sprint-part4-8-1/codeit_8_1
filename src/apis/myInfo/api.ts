import { axiosInstance } from '../instance/axiosInstance';

interface fetchLoginTestParams {
  userEmail: string;
  userPassword: string;
}

// 로그인 기능구현전이어서 임시로 구현
export const fetchLoginTest = async ({
  userEmail = 'test96@test.com',
  userPassword = 'testtest96',
}: fetchLoginTestParams) => {
  try {
    const response = await axiosInstance.post('auth/login', {
      email: userEmail,
      password: userPassword,
    });
    localStorage.setItem('userInfo', JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchImageUrl = async (formData: any) => {
  try {
    const response = await axiosInstance.post('/users/me/image', formData);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const updateImage = async (profileImageUrl: string) => {
  try {
    const response = await axiosInstance.patch('/users/me', {
      profileImageUrl,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
