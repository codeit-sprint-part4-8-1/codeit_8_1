import React from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

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

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const ExperienceManagement = () => {
  const router = useRouter();

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

  const { ref, inView } = useInView();

  const fetchExperiencePage = async ({ pageParam = 0 }) => {
    const response = await api.get<APIResponse>(
      `/my-activities?cursor=${pageParam}`,
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

  // 로그인 상태 확인
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

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
                         transition-all duration-300 ease-in-out opacity-100 hover:shadow-xl"
                style={{
                  animation: `slideIn 0.5s ease-out ${index * 0.1}s forwards`,
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

                <div className="pl-6 flex flex-col py-5 flex-grow">
                  <div className="flex items-center">
                    <span className="text-gray-800 font-semibold pb-1">
                      ⭐ 평점 {experience.rating?.toFixed(1) || 'N/A'}
                    </span>
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
                  <div className="flex items-center gap-4 mt-2">
                    <button
                      onClick={() => handleEdit(experience.id)}
                      className="text-blue-600 hover:text-blue-800 focus:text-blue-800"
                    >
                      수정하기
                    </button>
                    <button
                      onClick={() => handleDelete(experience.id)}
                      className="text-red-600 hover:text-red-800 focus:text-red-800"
                    >
                      삭제하기
                    </button>
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
    </div>
  );
};

export default ExperienceManagement;
