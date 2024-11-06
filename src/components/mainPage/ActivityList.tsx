import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ActivityCard } from './ActivityCard';

interface Activity {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  rating: number;
  reviews: number;
}

export default function ActivityList() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6); // 기본값을 모바일에 맞게 설정
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalItems, setTotalItems] = useState<number>(0);

  // 화면 크기에 따라 표시할 카드 수를 결정
  const updateItemsPerPage = () => {
    if (window.matchMedia('(max-width: 767px)').matches) {
      // 모바일
      setItemsPerPage(6); // 2x3
    } else if (window.matchMedia('(max-width: 1280px)').matches) {
      // 태블릿
      setItemsPerPage(9); // 3x3
    } else {
      // PC
      setItemsPerPage(8); // 4x2
    }
  };

  // 화면 크기 변경 이벤트
  useEffect(() => {
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  // API에서 데이터 가져오기
  useEffect(() => {
    const fetchActivities = async () => {
      const cursorId =
        activities.length > 0 ? activities[activities.length - 1].id : 0; // 첫 요청 시 0, 이후에는 마지막 activity의 ID를 사용

      try {
        const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
        const apiUrl = `${BASE_URL}activities`; // 기본 URL

        const params = {
          method: 'offset', // 항상 'offset' 사용
          cursorId: cursorId, // 첫 요청 시 0, 이후에는 실제 cursorId 값
          page: currentPage, // 현재 페이지
          size: itemsPerPage, // 한 페이지당 아이템 수
        };

        // API 요청
        const response = await axios.get(apiUrl, { params });

        // 응답 데이터 확인
        console.log('API 응답:', response.data);

        // 새로운 데이터를 기존 배열에 추가
        setActivities((prevActivities) => [
          ...prevActivities,
          ...response.data.activities,
        ]);
        setTotalItems(response.data.total); // 총 항목 수 설정
        setLoading(false);
      } catch (err) {
        setError('데이터를 가져오는 데 실패했습니다.');
        console.error('API 요청 오류:', err);
        setLoading(false);
      }
    };

    fetchActivities();
  }, [currentPage, itemsPerPage]);

  // 페이지네이션 계산
  const totalPages = totalItems > 0 ? Math.ceil(totalItems / itemsPerPage) : 0;

  const currentItems = activities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return; // 유효한 페이지 범위 체크
    setCurrentPage(page);
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl text-black text-left font-semibold mb-4">
        🛼 모든 체험
      </h2>
      {/* 카드 목록 */}
      <div className="grid gap-4 px-4 sm:px-8 lg:px-0 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {currentItems.map((activity) => (
          <ActivityCard
            key={activity.id}
            id={activity.id}
            image={activity.imageUrl}
            title={activity.title}
            rating={activity.rating}
            reviews={activity.reviews}
            price={activity.price}
          />
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center text-black mt-8 space-x-1">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded-l-lg"
        >
          이전
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`px-3 py-1 border ${
              currentPage === i + 1 ? 'bg-blue-500 text-white' : ''
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded-r-lg"
        >
          다음
        </button>
      </div>
    </div>
  );
}
