import { useEffect } from 'react';

interface useObserverScrollProps {
  hasNextPage: boolean;
  loadMoreRef: any;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

export default function useObserverScroll({
  hasNextPage,
  loadMoreRef,
  isFetchingNextPage,
  fetchNextPage,
}: useObserverScrollProps) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 },
    );

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);

    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);
}
