import { useState, useRef } from 'react';
import DropDownMenu from '@/components/@Shared/dropDown/DropDownMenu';
import ProfileMenu from '@/components/@Shared/profileMenu/ProfileMenu';
import ConfirmModal from '@/components/@Shared/modal/ConfirmModal';
import ModalFrame from '@/components/@Shared/modal/ModalFrame';
import useUserInfo from '@/hook/useUserInfo';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchReservationList } from '@/apis/myInfo/api';
import ReviewModal from '@/components/@Shared/modal/ReviewModal';
import { Toaster } from 'react-hot-toast';
import useObserverScroll from '@/hook/useObserverScroll';
import NotData from '@/components/history/NotData';
import { reservationValidation } from '@/utils/reservationValidation';
import LoadingSpinner from '@/components/@Shared/loading/LoadingSpinner';
import ReservationCard from '@/components/history/ReservationCard';
import { match } from 'ts-pattern';
import ReservationSkeletonCard from '@/components/history/ReservationSkeletonCard';
import MoContainer from '@/components/@Shared/MoContainer';
import BackButton from '../myInfo/BackButton';

interface ReservationListProps {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ReservationList({
  setIsVisible,
}: ReservationListProps) {
  const MENU_LIST = [
    {
      id: null,
      text: '전체',
    },
    {
      id: 'pending',
      text: '예약 신청',
    },
    {
      id: 'canceled',
      text: '예약 취소',
    },
    {
      id: 'confirmed',
      text: '예약 승인',
    },
    {
      id: 'declined',
      text: '예약 거절',
    },
    {
      id: 'completed',
      text: '체험 완료',
    },
  ];

  // const { data, isLoading } = useUserInfo();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);
  const [reviewModalOpen, setReviewModalOpen] = useState<boolean>(false);
  const [reviewData, setReviewData] = useState<any>();
  const [reservationId, setReservationId] = useState<number>();
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const loadMoreRef = useRef(null);

  const {
    data: resDataList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['res', filterStatus],
    queryFn: async ({ pageParam }) => {
      const res = await fetchReservationList({
        cursorId: pageParam,
        size: 10,
        status: filterStatus,
      });
      return res;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.cursorId;
    },
    initialPageParam: undefined,
  });

  // 옵저버를 사용한 무한스크롤
  useObserverScroll({
    hasNextPage,
    loadMoreRef,
    isFetchingNextPage,
    fetchNextPage,
  });

  // 예약 취소
  const handleCancelClick = (id: number) => {
    setReservationId(id);
    setConfirmModalOpen(true);
  };

  // 후기 작성
  const handleReviewClick = (res: any) => {
    setIsOpen(true);
    setReviewModalOpen(true);
    setReviewData(res);
  };

  return (
    <div className="w-full grow-[6] shrink-1 basis-[60%]">
      <ModalFrame isOpen={confirmModalOpen} setIsOpen={setConfirmModalOpen}>
        <ConfirmModal
          setIsOpen={setConfirmModalOpen}
          reservationId={reservationId}
        />
      </ModalFrame>
      <ModalFrame isOpen={reviewModalOpen} setIsOpen={setReviewModalOpen}>
        <ReviewModal setIsOpen={setReviewModalOpen} resData={reviewData} />
      </ModalFrame>
      <div className="w-full">
        <div className="flex justify-between items-center w-full mb-[16px]">
          <div className="flex items-center gap-3">
            <BackButton setIsVisible={setIsVisible} />
            <h2 className="text-2xl sm:text-[32px] font-bold">예약 내역</h2>
          </div>
          <DropDownMenu
            size="large"
            setFilterStatus={setFilterStatus}
            filterList={MENU_LIST}
          />
        </div>
        <div>
          {match(status)
            .with('pending', () =>
              Array.from({ length: 3 }, (_, index) => (
                <ReservationSkeletonCard key={index} />
              )),
            )
            .with('error', () => <NotData status="error" />)
            .with('success', () => {
              if (resDataList) {
                return resDataList.pages
                  .flatMap((page) => page.reservations)
                  .map((res: any) => {
                    const statusValue = reservationValidation(res.status);
                    return (
                      <ReservationCard
                        key={res.id}
                        res={res}
                        statusValue={statusValue}
                        handleCancelClick={handleCancelClick}
                        handleReviewClick={handleReviewClick}
                      />
                    );
                  });
              }
              return <NotData status="not" />;
            })
            .otherwise(() => (
              <NotData status="not" />
            ))}
          {isFetchingNextPage && (
            <p className="text-center mt-4">데이터를 가져오고 있습니다.</p>
          )}
          <div ref={loadMoreRef} />
        </div>
      </div>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          success: {
            style: {
              width: '250px',
              height: '60px',
              background: 'green',
              color: 'white',
              fontSize: '16px',
              fontWeight: 'bold',
            },
          },
          error: {
            style: {
              width: '250px',
              height: '60px',
              background: 'red',
              color: 'white',
              fontSize: '16px',
              fontWeight: 'bold',
            },
          },
        }}
      />
    </div>
  );
}
