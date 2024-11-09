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

interface ActivityListProps {
  selectedCategory: string | null;
  selectedSort: string | null;
}

export default function ActivityList({
  selectedCategory,
  selectedSort,
}: ActivityListProps) {
  const [activities, setActivities] = useState<Activity[]>([]); // 체험 데이터 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [itemsPerPage, setItemsPerPage] = useState(6); // 한 페이지 당 아이템 수
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태
  const [totalItems, setTotalItems] = useState<number>(0); // 총 아이템 수

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

  // 카테고리 변경 시만 새로운 데이터 요청
  useEffect(() => {
    setActivities([]); // 카테고리 변경 시 활동 리스트 초기화
    setCurrentPage(1); // 페이지 초기화
  }, [selectedCategory]);

  // 페이지나 카테고리가 변경될 때마다 fetchActivities 호출
  useEffect(() => {
    // 데이터 가져오기
    const fetchActivities = async () => {
      // 상태 초기화
      setLoading(true); // 로딩 상태 시작
      setError(null); // 에러 초기화

      try {
        const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
        const apiUrl = `${BASE_URL}activities`; // 기본 URL

        // 카테고리와 페이지에 맞는 API 요청 파라미터
        const params: any = {
          method: 'offset', // 항상 'offset' 사용
          page: currentPage, // 현재 페이지
          size: itemsPerPage, // 한 페이지당 아이템 수
        };

        // 카테고리가 선택되어 있으면 필터링
        if (selectedCategory) {
          params.category = selectedCategory;
        }

        // 정렬 옵션을 API에 전달
        if (selectedSort) {
          params.sort = selectedSort; // 가격 낮은 순 / 가격 높은 순 등의 정렬 값
        }

        // API 요청
        const response = await axios.get(apiUrl, { params });

        // 응답 데이터 확인
        console.log('API 응답:', response.data);

        // 데이터를 새로 덮어쓰지 않고 기존 데이터에 추가
        setActivities(response.data.activities);
        setTotalItems(response.data.totalCount); // 총 아이템 수 업데이트
        setLoading(false);
      } catch (err) {
        setError('데이터를 가져오는 데 실패했습니다.');
        setLoading(false);
      }
    };

    fetchActivities(); // 데이터 다시 불러오기
  }, [selectedCategory, selectedSort, currentPage, itemsPerPage]);

  // 페이지 변경 시 새 데이터를 가져오는 함수
  const handlePageChange = (page: number) => {
    if (page < 1 || page > Math.ceil(totalItems / itemsPerPage)) return; // 유효한 페이지 범위 체크
    setCurrentPage(page); // 페이지 변경
  };

  // 페이지네이션 계산
  const totalPages = totalItems > 0 ? Math.ceil(totalItems / itemsPerPage) : 0;

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl text-black text-left font-semibold mb-4">
        {selectedCategory ? `${selectedCategory}` : '🛼 모든 체험'}
      </h2>
      {/* 카드 목록 */}
      <div className="grid gap-4 px-4 sm:px-8 lg:px-0 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {activities.map((activity) => (
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
      {totalPages > 0 && (
        <div className="flex justify-center text-green-200 mt-8 space-x-1">
          {/* 이전 버튼 */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 border border-green-200 disabled:border-gray-400 disabled:text-gray-400 rounded-[15px] mobile:w-[40px] mobile:h-[40px] tablet2:w-[55px] tablet2:h-[55px] pc:w-[55px] pc:h-[55px] ${
              currentPage === 1 ? 'text-gray-400' : 'text-green-200'
            }`}
          >
            ◀
          </button>

          {/* 페이지 번호 버튼들 */}
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 border border-green-200 rounded-[15px] mobile:w-[40px] mobile:h-[40px] tablet2:w-[55px] tablet2:h-[55px] pc:w-[55px] pc:h-[55px] ${
                currentPage === i + 1 ? 'bg-black text-white' : ''
              }`}
            >
              {i + 1}
            </button>
          ))}

          {/* 다음 버튼 */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 border border-green-200 disabled:border-gray-400 disabled:text-gray-400 rounded-[15px] mobile:w-[40px] mobile:h-[40px] tablet2:w-[55px] tablet2:h-[55px] pc:w-[55px] pc:h-[55px] ${
              currentPage === totalPages ? 'text-gray-400' : 'text-green-200'
            }`}
          >
            ▶
          </button>
        </div>
      )}
    </div>
  );
}
