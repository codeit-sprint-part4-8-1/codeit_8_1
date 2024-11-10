import ProfileMenu from '@/components/@Shared/profileMenu/ProfileMenu';
import MyInfoForm from '@/components/myInfo/MyInfoForm';
import { ErrorBoundary } from 'react-error-boundary';
import useUserInfo from '@/hook/useUserInfo';
import LoadingSpinner from '@/components/@Shared/loading/LoadingSpinner';
import MoContainer from '@/components/@Shared/MoContainer';
import { useEffect, useState } from 'react';
import ReservationList from '@/components/history/ReservationList';
import { match } from 'ts-pattern';
import ReservationStatus from '../status';
import ExperienceManagement from '@/components/activities/detail';
import { useRouter } from 'next/router';

const MyInfoContent = () => {
  const { data, isLoading } = useUserInfo();
  const [menuValue, setMenuValue] = useState<string>('내 정보');
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const menuName = localStorage.getItem('menu');
    setMenuValue(menuName || '내 정보');
    const windowResize = () => {
      if (window.innerWidth > 767) {
        setIsVisible(true);
      }
    };

    windowResize();

    window.addEventListener('resize', windowResize);

    return () => {
      window.removeEventListener('resize', windowResize);
    };
  }, []);

  const handleMenuClick = (value: string) => {
    localStorage.removeItem('menu');
    setMenuValue(value);
    if (window.innerWidth <= 767) {
      setIsVisible(true);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex justify-center w-full gap-6 mt-10 sm:mt-20 mb-10 sm:mb-20">
      <ProfileMenu
        profileImageUrl={data?.profileImageUrl}
        menuValue={menuValue}
        onHandleMenuClick={handleMenuClick}
        isVisible={isVisible}
      />

      {match(menuValue)
        .with('내 정보', () => (
          <MoContainer isVisible={isVisible}>
            <MyInfoForm
              nickname={data?.nickname}
              email={data?.email}
              setIsVisible={setIsVisible}
            />
          </MoContainer>
        ))
        .with('예약 내역', () => (
          <MoContainer isVisible={isVisible}>
            <ReservationList setIsVisible={setIsVisible} />
          </MoContainer>
        ))
        .with('내 체험 관리', () => (
          <MoContainer isVisible={isVisible}>
            <ExperienceManagement setIsVisible={setIsVisible} />
          </MoContainer>
        ))
        .with('예약 현황', () => (
          <MoContainer isVisible={isVisible}>
            <ReservationStatus setIsVisible={setIsVisible} />
          </MoContainer>
        ))
        .otherwise(() => (
          <MoContainer isVisible={isVisible}>
            <MyInfoForm
              nickname={data?.nickname}
              email={data?.email}
              setIsVisible={setIsVisible}
            />
          </MoContainer>
        ))}
    </div>
  );
};

export default function MyInfo() {
  return (
    <ErrorBoundary fallback={<div>에러가 발생했습니다.</div>}>
      <MyInfoContent />
    </ErrorBoundary>
  );
}
