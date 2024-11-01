import { useEffect } from 'react';

interface useInfiniteScrollProps {
  hasNextPage: boolean | undefined;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
}

export default function useInfiniteScroll({
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
}: useInfiniteScrollProps) {
  // 쓰로틀링 함수 - 불필요한 스크롤 이벤트 호출 방지(함수를 실행후 일정 시간 지난후 실행을 반복 일정 시간동안은 실행을 무시한다.)
  const throttle = (callback: any, limit: number) => {
    let isThrottle: boolean;

    return () => {
      if (!isThrottle) {
        callback(); // callback 함수 실행
        isThrottle = true; // 실행후 바로 실행 안되도록 적용

        setTimeout(() => {
          isThrottle = false; // limit로 지정한 시간 뒤에 실행 되도록 적용
        }, limit);
      }
    };
  };

  const handleScroll = () => {
    const scrollTop = window.scrollY; // 현재 스크롤 위치
    const scrollHeight = document.documentElement.scrollHeight; // 전체 문서 높이
    const clientHeight = window.innerHeight; // 현재 화면에 보여지는 영역의 높이

    const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;

    // 현재 스크롤 위치가 컨텐츠의 마지막에 가까운지 확인
    if (scrollPercentage > 0.8 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  // 스크롤 이벤트 발생 후 500ms동안 스크롤을 하지 않으면 handleScroll함수 호출
  const throttledHandleScroll = throttle(handleScroll, 300);

  useEffect(() => {
    window.addEventListener('scroll', throttledHandleScroll);
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);
}
