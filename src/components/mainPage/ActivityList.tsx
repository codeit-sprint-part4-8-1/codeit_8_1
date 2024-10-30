import React, { useEffect, useState } from 'react';
import ActivityCard from './ActivityCard';
import { activities } from './ActivityListData';

interface Activity {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  rating: number;
  reviews: number;
}

export default function ActivityList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6); // 기본값을 모바일에 맞게 설정

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

  useEffect(() => {
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  // 페이지네이션 관련 계산
  const totalItems = activities.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = activities.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto py-8">
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
