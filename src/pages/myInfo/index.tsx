import { fetchLoginTest, fetchUserInfo } from '@/apis/myInfo/api';
import ProfileMenu from '@/components/@Shared/profileMenu/ProfileMenu';
import MyInfoForm from '@/components/myInfo/MyInfoForm';
import { UserInfo } from '@/types/myPage/type';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense, useEffect } from 'react';

export default function MyInfo() {
  const { data, isLoading } = useQuery<UserInfo>({
    queryKey: ['userInfo'],
    queryFn: async () => {
      const userInfo = await fetchUserInfo();
      if (!userInfo) {
        throw new Error('유저 정보를 찾지 못했습니다.'); // 에러 처리
      }
      return userInfo;
    },
  });

  // 로그인 기능구현전이어서 임시로 구현
  const getLoginTest = async () => {
    try {
      const userData = await fetchLoginTest({
        userEmail: 'youm96@naver.com',
        userPassword: '12341234',
      });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  useEffect(() => {
    getLoginTest();
  }, []);

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  return (
    <ErrorBoundary fallback={<div>에러</div>}>
      <div className="flex justify-center w-full gap-6 mt-20 mb-20">
        <ProfileMenu profileImageUrl={data?.profileImageUrl} />
        <MyInfoForm nickname={data?.nickname} email={data?.email} />
      </div>
    </ErrorBoundary>
  );
}
