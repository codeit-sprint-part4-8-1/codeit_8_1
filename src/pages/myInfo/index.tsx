import ProfileMenu from '@/components/@Shared/profileMenu/ProfileMenu';
import MyInfoForm from '@/components/myInfo/MyInfoForm';
import { ErrorBoundary } from 'react-error-boundary';
import useUserInfo from '@/hook/useUserInfo';
import LoadingSpinner from '@/components/@Shared/loading/LoadingSpinner';

export default function MyInfo() {
  const { data, isLoading } = useUserInfo();

  if (isLoading) {
    return <LoadingSpinner />;
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
