import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { activities } from '../../components/mainPage/ActivityListData';

const ActivityDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    if (id) {
      const numericId = parseInt(id as string, 10); // 문자열을 숫자로 변환
      const foundActivity = activities.find(
        (activity) => activity.id === numericId,
      ); // 숫자로 비교
      setActivity(foundActivity);
    }
  }, [id]);

  if (!id) return <div>로딩 중...</div>;
  if (!activity) return <div>체험을 찾을 수 없습니다.</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">
        {activity.title} - 체험 상세 페이지
      </h1>
      <p className="mt-4">여기에 체험에 대한 상세 정보를 추가하세요.</p>
    </div>
  );
};

export default ActivityDetail;
