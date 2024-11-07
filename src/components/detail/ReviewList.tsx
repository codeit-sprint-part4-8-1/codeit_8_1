import { fetchActivityIdReview } from '@/apis/detail/api';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import LoadingSpinner from '../@Shared/loading/LoadingSpinner';
import { useState } from 'react';
import { match } from 'ts-pattern';

interface ReviewListProps {
  activityId: number;
}

export default function ReviewList({ activityId }: ReviewListProps) {
  const PAGE_SIZE = 3; // 한 페이지에 보여지는 후기 개수

  const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지 번호

  const { data, isLoading } = useQuery({
    queryKey: ['reviewList', currentPage],
    queryFn: async () => {
      const res = await fetchActivityIdReview({
        activityId: activityId,
        page: currentPage,
        size: PAGE_SIZE,
      });
      console.log(res);
      return res;
    },
  });

  const resultRating = Math.floor(data?.averageRating * 10) / 10; // 소수점 첫째자리까지만 보이도록
  const totalPages = Math.ceil(data?.totalCount / PAGE_SIZE); // 총 페이지 개수

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!totalPages) {
    return (
      <div className="text-center mt-6">
        <h3 className="text-2xl font-bold text-gray-700">
          작성된 후기가 없습니다.
        </h3>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <h2 className="text-lg font-bold mb-6">후기</h2>
      <div className="flex items-center gap-4 mb-6">
        <h3 className="text-5xl font-bold">{resultRating}</h3>
        <div>
          <span className="block text-lg mb-2">매우 만족</span>
          <span className="flex items-center gap-2">
            <Image
              src="/ico/ico_star.svg"
              width={16}
              height={16}
              alt="별 이미지"
            />
            {data.totalCount}개 후기
          </span>
        </div>
      </div>
      <div className="mb-16">
        {data.reviews.map((review: any, index: number) => {
          const date = new Date(review.createdAt);
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          const reviewDate = `${year}. ${month}. ${day}`;
          return (
            <div
              key={review.id}
              className={`flex gap-4 ${
                index === data.reviews.length - 1 ||
                'border-b-2 border-gray-200 pb-6 mb-6'
              }`}
            >
              <div className="flex justify-center items-center">
                <Image
                  src={review.user.profileImageUrl}
                  width={45}
                  height={45}
                  className="rounded-full min-w-[45px] min-h-[45px]"
                  alt="프로필 이미지"
                />
              </div>
              <div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[16px] font-bold">
                      {review.user.nickname}
                    </span>
                    <span>|</span>
                    <span className="text-gray-600 font-normal">
                      {reviewDate}
                    </span>
                  </div>
                  <p>{review.content}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => {
            setCurrentPage((prev) => prev - 1);
          }}
          className="w-[55px] h-[55px] rounded-[15px] bg-white border-2 border-green-200 text-green-200 disabled:text-gray-700 disabled:border-gray-300 disabled:hover:bg-white hover:bg-green-100"
          disabled={currentPage === 1}
        >
          ◀︎
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`w-[55px] h-[55px] text-lg rounded-[15px] border-2 border-green-200 hover:bg-green-100 ${
              currentPage === index + 1
                ? 'bg-green-200 text-white hover:bg-green-200'
                : 'bg-white'
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          type="button"
          onClick={() => {
            setCurrentPage((prev) => prev + 1);
          }}
          className="w-[55px] h-[55px] rounded-[15px] bg-white border-2 border-green-200 text-green-200 disabled:text-gray-700 disabled:border-gray-300 disabled:hover:bg-white hover:bg-green-100"
          disabled={totalPages <= currentPage}
        >
          ▶︎
        </button>
      </div>
    </div>
  );
}
