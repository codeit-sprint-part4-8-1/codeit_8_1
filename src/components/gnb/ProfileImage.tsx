import { useState, useEffect } from 'react';

const getProfileImageUrl = () => {
  const userData = localStorage.getItem('userData');
  if (userData) {
    const parsedUserData = JSON.parse(userData);
    return parsedUserData.profileImageUrl || null; // profileImageUrl이 없으면 null을 반환
  }
  return null; // userData가 없을 경우 null 반환
};

interface ProfileImageProps {
  className?: string; // className을 받도록 추가
}

export default function ProfileImage({ className }: ProfileImageProps) {
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const profileImage = getProfileImageUrl(); // 로컬 스토리지에서 이미지 URL을 가져옵니다.
    setProfileImageUrl(profileImage); // 상태에 저장
  }, []);

  return (
    <div className={className}>
      <img
        src={profileImageUrl || '/image/defaultProfile.webp'}
        alt="Profile"
        className="w-8 h-8 rounded-full"
      />
    </div>
  );
}
