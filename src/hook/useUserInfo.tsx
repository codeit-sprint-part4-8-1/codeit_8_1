import { fetchUserInfo } from '@/apis/myInfo/api';
import { UserInfo } from '@/types/myPage/type';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

export default function useUserInfo() {
  return useQuery<UserInfo>({
    queryKey: ['userInfo'],
    queryFn: async () => {
      const userInfo = await fetchUserInfo();
      if (!userInfo) {
        throw new Error('유저 정보를 찾지 못했습니다.'); // 에러 처리
      }
      return userInfo;
    },
  });
}
