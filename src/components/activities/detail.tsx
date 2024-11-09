import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { HiDotsVertical } from 'react-icons/hi';

interface ExperienceManagementProps {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Experience {
  id: number;
  title: string;
  category: string;
  description: string;
  price: number;
  rating?: number;
  bannerImageUrl?: string;
}

interface APIResponse {
  activities: Experience[];
  nextCursor?: number;
}

const API_BASE_URL = 'https://sp-globalnomad-api.vercel.app/8-1';
const INITIAL_PAGE_SIZE = 4;
const SUBSEQUENT_PAGE_SIZE = 2;

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const ExperienceManagement = ({ setIsVisible }: ExperienceManagementProps) => {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);

  const handleEdit = async (experienceId: number) => {
    try {
      const response = await api.get(`/activities/${experienceId}`);
      localStorage.setItem('selectedExperience', JSON.stringify(response.data));
      router.push(`/activities/edit/${experienceId}`);
    } catch (error) {
      console.error('체험 정보 불러오기 실패:', error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        router.push('/login');
      }
    }
  };

  const handleDelete = async (experienceId: number) => {
    if (!window.confirm('정말로 이 체험을 삭제하시겠습니까?')) {
      return;
    }

    try {
      await api.delete(`/my-activities/${experienceId}`);
      refetch();
    } catch (error) {
      console.error('체험 삭제 실패:', error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        router.push('/login');
      }
    }
  };

  const { ref, inView } = useInView({
    threshold: 0.5,
    delay: 100,
  });

  const fetchExperiencePage = async ({ pageParam = 0 }) => {
    const pageSize = pageParam === 0 ? INITIAL_PAGE_SIZE : SUBSEQUENT_PAGE_SIZE;
    const response = await api.get<APIResponse>(
      `/my-activities?cursor=${pageParam}&limit=${pageSize}`,
    );
    return response.data;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['experiences'],
    queryFn: fetchExperiencePage,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0,
  });

  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  React.useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  // Add fade-in animation
  const getAnimationDelay = (pageIndex: number, indexInPage: number) => {
    if (pageIndex === 0) {
      return indexInPage * 0.1; // First page (4 items)
    }
    // Subsequent pages (2 items per page)
    return (pageIndex * SUBSEQUENT_PAGE_SIZE + indexInPage) * 0.1;
  };

  return (
    <div className="container mx-auto w-[800px] p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">내 체험 관리</h2>
        <button
          type="button"
          onClick={() => router.push('/activities/activities')}
          className="w-[120px] p-2 bg-black text-white rounded font-medium hover:opacity-90 transition-opacity"
        >
          체험 등록하기
        </button>
      </div>

      <div className="flex flex-col gap-8">
        {data?.pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {page.activities.map((experience, index) => (
              <div
                key={`${experience.id}-${index}`}
                className="border border-gray-200 rounded-lg shadow-lg overflow-hidden w-full h-[204px] flex 
                         transition-all duration-300 ease-in-out opacity-0"
                style={{
                  animation: `fadeIn 0.5s ease-out ${getAnimationDelay(
                    pageIndex,
                    index,
                  )}s forwards`,
                }}
              >
                <div className="w-[204px] h-[204px] overflow-hidden">
                  <img
                    src={
                      experience.bannerImageUrl || '/api/placeholder/204/204'
                    }
                    alt={experience.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/api/placeholder/204/204';
                    }}
                  />
                </div>

                <div className="pl-6 flex flex-col py-5 flex-grow relative">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-800 font-semibold pb-1">
                      ⭐ 평점 {experience.rating?.toFixed(1) || 'N/A'}
                    </span>
                    <div
                      className="relative"
                      onClick={() =>
                        setDropdownOpen(
                          dropdownOpen === experience.id ? null : experience.id,
                        )
                      }
                    >
                      <HiDotsVertical className="cursor-pointer text-gray-600 hover:text-gray-800" />
                      {dropdownOpen === experience.id && (
                        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-lg z-10">
                          <button
                            onClick={() => handleEdit(experience.id)}
                            className="block w-full text-left px-4 py-2 text-blue-600 hover:bg-gray-100"
                          >
                            수정하기
                          </button>
                          <button
                            onClick={() => handleDelete(experience.id)}
                            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                          >
                            삭제하기
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold pb-16 transition-colors hover:text-blue-600">
                    {experience.title}
                  </h3>
                  <div className="flex items-center mt-auto">
                    <span className="bg-gray-200 text-gray-800 py-1 px-2 rounded text-sm">
                      {experience.category}
                    </span>
                    <span className="text-gray-800 font-semibold text-xl pl-2">
                      {experience.price?.toLocaleString() || '0'}원
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>

      <div ref={ref} className="h-20 mt-4 flex justify-center items-center">
        {isLoading ? (
          <div className="text-lg text-gray-500">로딩 중...</div>
        ) : isFetchingNextPage ? (
          <div className="text-gray-500">더 불러오는 중...</div>
        ) : hasNextPage ? (
          <div className="text-gray-500">스크롤하여 더 보기</div>
        ) : (
          <div className="text-gray-500">모든 데이터를 불러왔습니다</div>
        )}
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ExperienceManagement;
