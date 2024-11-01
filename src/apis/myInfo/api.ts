import { axiosInstance } from '../instance/axiosInstance';
import { Review } from '@/types/myPage/type';

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

// 나의 예약 리스트
export const fetchReservationList = async ({
  cursorId,
  size,
  status,
}: {
  cursorId?: number;
  size: number;
  status?: string | null;
}) => {
  try {
    const response = await axiosInstance.get('/my-reservations', {
      params: {
        cursorId: cursorId ?? null,
        size,
        status,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 예약 취소
export const cancelReservation = async (id: number) => {
  try {
    const response = await axiosInstance.patch(`/my-reservations/${id}`, {
      status: 'canceled',
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 후기 작성
export const postReview = async ({ id, rating, content }: Review) => {
  try {
    const response = await axiosInstance.post(
      `/my-reservations/${id}/reviews`,
      {
        rating,
        content,
      },
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};
