import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Activity {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  rating: number;
  reviews: number;
}

const ActivityDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchActivity = async () => {
        try {
          setLoading(true);
          const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
          const apiUrl = `${BASE_URL}activities/${id}`;

          // API 요청
          const response = await axios.get(apiUrl);
          setActivity(response.data); // 받아온 데이터로 상태 업데이트
          setLoading(false);
        } catch (err) {
          setError('체험 상세 정보를 가져오는 데 실패했습니다.');
          setLoading(false);
        }
      };

      fetchActivity();
    }
  }, [id]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!activity) {
    return <div>체험을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">
        {activity.title} - 체험 상세 페이지
      </h1>
      <img
        src={activity.imageUrl}
        alt={activity.title}
        className="mt-4 w-96 h-64 object-cover"
      />
      <p className="mt-4">가격: {activity.price} 원</p>
      <p className="mt-2">평점: {activity.rating} / 5</p>
      <p className="mt-2">리뷰: {activity.reviews}개</p>
    </div>
  );
};

export default ActivityDetail;
