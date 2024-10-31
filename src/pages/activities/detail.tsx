import React, { useState, useEffect, useRef, useCallback } from 'react';

interface Experience {
  id: number;
  title: string;
  category: string;
  price: number;
  bannerImageUrl: string;
  rating: number;
}

interface FetchState {
  isLoading: boolean;
  error: Error | null;
  hasMore: boolean;
}

const ExperienceDetail = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [page, setPage] = useState(1);
  const [fetchState, setFetchState] = useState<FetchState>({
    isLoading: false,
    error: null,
    hasMore: true,
  });
  const observerRef = useRef<HTMLDivElement | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const mockAPIResponse = {
    cursorId: page,
    totalCount: 10,
    activities: [
      {
        id: page * 2 - 1,
        title: `체험 제목 ${page}`,
        category: '문화',
        price: 10000,
        bannerImageUrl: 'https://via.placeholder.com/204',
        rating: 4.5,
      },
      {
        id: page * 2,
        title: `체험 제목 ${page}`,
        category: '문화',
        price: 20000,
        bannerImageUrl: 'https://via.placeholder.com/204',
        rating: 4.7,
      },
    ],
  };

  const fetchExperiences = async (page: number, signal?: AbortSignal) => {
    try {
      setFetchState((prev) => ({ ...prev, isLoading: true, error: null }));

      const response = await new Promise<{ activities: Experience[] }>(
        (resolve, reject) => {
          const timeout = setTimeout(() => {
            if (signal?.aborted) {
              reject(new Error('Request aborted'));
              return;
            }
            resolve(mockAPIResponse);
          }, 1000);

          signal?.addEventListener('abort', () => {
            clearTimeout(timeout);
            reject(new Error('Request aborted'));
          });
        },
      );

      setExperiences((prev) => [...prev, ...response.activities]);
      setFetchState((prev) => ({
        ...prev,
        isLoading: false,
        hasMore: response.activities.length > 0,
      }));
    } catch (error) {
      if (error instanceof Error) {
        if (error.message !== 'Request aborted') {
          setFetchState((prev) => ({
            ...prev,
            isLoading: false,
            error: error as Error,
            hasMore: false,
          }));
        }
      }
    }
  };

  useEffect(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    if (fetchState.hasMore) {
      fetchExperiences(page, abortControllerRef.current.signal);
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [page]);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (
        target.isIntersecting &&
        !fetchState.isLoading &&
        fetchState.hasMore &&
        !fetchState.error
      ) {
        setPage((prev) => prev + 1);
      }
    },
    [fetchState.isLoading, fetchState.hasMore, fetchState.error],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [handleObserver]);

  if (fetchState.error) {
    return (
      <div className="container mx-auto p-4">
        <p className="text-red-500">
          에러가 발생했습니다: {fetchState.error.message}
        </p>
        <button
          onClick={() => {
            setFetchState((prev) => ({ ...prev, error: null }));
            setPage(1);
            setExperiences([]);
          }}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto w-[800px]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">내 체험 관리</h2>
        <button
          type="submit"
          className="w-[120px] p-2 bg-nomadBlack text-white rounded font-medium hover:opacity-90 transition-opacity"
        >
          체험 등록하기
        </button>
      </div>
      <div className="flex flex-col gap-8">
        {experiences.map((experience) => (
          <div
            key={experience.id}
            className="border border-gray-200 rounded-lg shadow-lg overflow-hidden w-full h-[204px] flex 
                     animate-fade-slide-up opacity-0"
            style={{
              animationFillMode: 'forwards',
            }}
          >
            <img
              src={experience.bannerImageUrl}
              alt="배너 이미지"
              className="w-[204px] h-[204px] object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="pl-6 flex flex-col py-5 flex-grow">
              <div className="flex items-center">
                <span className="text-gray-800 font-semibold pb-1">
                  ⭐평점 {experience.rating}
                </span>
              </div>
              <h3 className="text-xl font-semibold pb-16 transition-colors">
                {experience.title}
              </h3>
              <div className="flex items-center mt-auto">
                <span className="bg-gray-200 text-gray-800 py-1 px-2 rounded text-sm">
                  {experience.category}
                </span>
                <span className="text-gray-800 font-semibold text-xl pl-2">
                  {experience.price.toLocaleString()}원
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        ref={observerRef}
        className="h-10 mt-10 flex justify-center items-center"
      >
        {fetchState.isLoading && (
          <p className="text-lg text-gray-500">로딩 중...</p>
        )}
      </div>
    </div>
  );
};

const styles = `
@keyframes fadeSlideUp {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fade-slide-up {
  animation: fadeSlideUp 0.6s ease-out;
}
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default ExperienceDetail;
