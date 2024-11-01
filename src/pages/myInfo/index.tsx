import ProfileMenu from '@/components/@Shared/profileMenu/ProfileMenu';
import MyInfoForm from '@/components/myInfo/MyInfoForm';
import { ErrorBoundary } from 'react-error-boundary';
import useUserInfo from '@/hook/useUserInfo';

export default function MyInfo() {
  const { data, isLoading } = useUserInfo();

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
