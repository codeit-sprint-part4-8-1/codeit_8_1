import { useEffect } from 'react';

interface useInfiniteScrollProps {
  hasMore: boolean;
  setHasMore: React.Dispatch<React.SetStateAction<boolean>>;
  setItems: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function useInfiniteScroll({
  hasMore,
  setHasMore,
  setItems,
}: useInfiniteScrollProps) {
  // 디바운스 함수 - 불필요한 스크롤 이벤트 호출 방지
  const debounce = (func: any, delay: number) => {
    let timeoutId: any;
    return (...args: any[]) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  };

  const handleScroll = () => {
    const scrollTop = window.scrollY; // 현재 스크롤 위치
    const scrollHeight = document.documentElement.scrollHeight; // 전체 문서 높이
    const clientHeight = window.innerHeight; // 현재 화면에 보여지는 영역의 높이

    // 현재 스크롤 위치가 컨텐츠의 마지막에 가까운지 확인
    if (scrollHeight - clientHeight - scrollTop < 150 && hasMore) {
      loadMoreItems();
    }
  };

  // 스크롤 이벤트 발생 후 500ms동안 스크롤을 하지 않으면 handleScroll함수 호출
  const debouncedHandleScroll = debounce(handleScroll, 300);

  // 데이터 추가 로드 함수
  const loadMoreItems = () => {
    setTimeout(() => {
      setItems((prev: any) => {
        const newItems = [
          ...prev,
          ...Array.from({ length: 10 }, (_, i) => i + prev.length), // 기존 배열에서 10개의 배열 추가 하여 다음 10개의 데이터를 보여준다
        ];
        if (newItems.length >= 30) {
          // 데이터가 50개 이상이면 더 이상 배열을 추가하지 않는다
          setHasMore(false); // false가 되기 떄문에 loading 텍스트도 미노출
        }
        return newItems;
      });
    }, 500); // 500ms 지연 후 데이터 로드
  };

  useEffect(() => {
    window.addEventListener('scroll', debouncedHandleScroll);
    return () => window.removeEventListener('scroll', debouncedHandleScroll);
  }, [hasMore]);
}
