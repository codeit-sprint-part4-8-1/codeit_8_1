import React, { useState, useEffect } from 'react';
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

interface AvailableTime {
  date: string;
  startTime: string;
  endTime: string;
}

const handleDelete = async (experienceId: number) => {
  if (!window.confirm('정말로 이 체험을 삭제하시겠습니까?')) {
    return;
  }

  try {
    await axios.delete(
      `https://sp-globalnomad-api.vercel.app/8-1/my-activities/${experienceId}`,
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzOSwidGVhbUlkIjoiOC0xIiwiaWF0IjoxNzMwNzg0Mzk3LCJleHAiOjE3MzA3ODYxOTcsImlzcyI6InNwLWdsb2JhbG5vbWFkIn0.qrHpa59w1Ly3dOhcAp8K8D3dp-a_y-XGlZouLfItfPU`,
        },
      },
    );

    refetch();
  } catch (error) {
    console.error('체험 삭제 실패:', error);
  }
};

const ExperienceForm = () => {
  const [availableTimes, setAvailableTimes] = useState<AvailableTime[]>([
    { date: '', startTime: '', endTime: '' },
  ]);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [address, setAddress] = useState('');
  const [bannerImages, setBannerImages] = useState<File[]>([]);
  const [introImages, setIntroImages] = useState<File[]>([]);

  // Intersection Observer 설정
  const { ref, inView } = useInView();

  // 경험 목록을 가져오는 함수
  const fetchExperiencePage = async ({ pageParam = 0 }) => {
    const response = await axios.get<APIResponse>(
      `https://sp-globalnomad-api.vercel.app/8-1/my-activities?cursor=${pageParam}`,
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzOSwidGVhbUlkIjoiOC0xIiwiaWF0IjoxNzMwNzg0Mzk3LCJleHAiOjE3MzA3ODYxOTcsImlzcyI6InNwLWdsb2JhbG5vbWFkIn0.qrHpa59w1Ly3dOhcAp8K8D3dp-a_y-XGlZouLfItfPU`,
        },
      },
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

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  const uploadImage = async (image: File) => {
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post(
        'https://sp-globalnomad-api.vercel.app/8-1/activities/image',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzOSwidGVhbUlkIjoiOC0xIiwiaWF0IjoxNzMwNzg0Mzk3LCJleHAiOjE3MzA3ODYxOTcsImlzcyI6InNwLWdsb2JhbG5vbWFkIn0.qrHpa59w1Ly3dOhcAp8K8D3dp-a_y-XGlZouLfItfPU`,
          },
        },
      );

      if (!response.data.activityImageUrl) {
        console.error('이미지 URL이 응답에 없음:', response.data);
        return null;
      }
      return response.data.activityImageUrl;
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let bannerImageUrl = '';
      if (bannerImages.length > 0) {
        const uploadedBannerUrl = await uploadImage(bannerImages[0]);
        if (!uploadedBannerUrl) {
          console.error('배너 이미지 업로드 실패');
          return;
        }
        bannerImageUrl = uploadedBannerUrl;
      }

      const subImageUrls = await Promise.all(
        introImages.map((image) => uploadImage(image)),
      );

      const validSubImageUrls = subImageUrls.filter((url) => url != null);

      const formData = {
        title,
        category,
        description,
        address,
        price: Number(price),
        schedules: availableTimes.map(({ date, startTime, endTime }) => ({
          date,
          startTime,
          endTime,
        })),
        bannerImageUrl,
        subImageUrls: validSubImageUrls,
      };

      await axios.post(
        'https://sp-globalnomad-api.vercel.app/8-1/activities',
        formData,
        {
          headers: {
            Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzOSwidGVhbUlkIjoiOC0xIiwiaWF0IjoxNzMwNzg0Mzk3LCJleHAiOjE3MzA3ODYxOTcsImlzcyI6InNwLWdsb2JhbG5vbWFkIn0.qrHpa59w1Ly3dOhcAp8K8D3dp-a_y-XGlZouLfItfPU`,
          },
        },
      );

      refetch();
    } catch (error) {
      console.error('경험 등록 실패:', error);
    }
  };

  return (
    <div className="container mx-auto w-[800px] p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">내 체험 관리</h2>
        <button
          type="button"
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
                  <div
                    className="flex items-end cursor-pointer text-red-600 focus:text-red-600"
                    onClick={() => handleDelete(experience.id)}
                  >
                    <div />
                    <span>삭제하기</span>
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

export default ExperienceForm;
