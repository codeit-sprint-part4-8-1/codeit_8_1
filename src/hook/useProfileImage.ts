import { fetchImageUrl, updateImage } from '@/apis/myInfo/api';
import { useState } from 'react';

export default function useProfileImage(initialUrl: string | undefined) {
  const [userProfileImage, setUserProfileImage] = useState<string | undefined>(
    initialUrl,
  );

  // 전달 받은 이미지 파일을 url로 변경하고 해당 url을 사용해서 내 정보의 이미지 파일 수정
  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetchImageUrl(formData);
      const profileImageUrl = response?.data.profileImageUrl;
      if (response?.data) {
        const res = await updateImage(profileImageUrl);
        setUserProfileImage(res.profileImageUrl);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { userProfileImage, setUserProfileImage, uploadImage };
}
