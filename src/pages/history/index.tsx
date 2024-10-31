import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/@Shared/Buttons/Button';
import DropDownMenu from '@/components/@Shared/dropDown/DropDownMenu';
import ProfileMenu from '@/components/@Shared/profileMenu/ProfileMenu';
import ConfirmModal from '@/components/@Shared/modal/ConfirmModal';
import ModalFrame from '@/components/@Shared/modal/ModalFrame';
import useUserInfo from '@/hook/useUserInfo';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchReservationList } from '@/apis/myInfo/api';
import Image from 'next/image';
import ReviewModal from '@/components/@Shared/modal/ReviewModal';
import { Toaster } from 'react-hot-toast';
import useObserverScroll from '@/hook/useObserverScroll';

export default function History() {
  const MENU_LIST = [
    '예약 신청',
    '예약 취소',
    '예약 승인',
    '예약 거절',
    '체험 완료',
  ];

  const { data, isLoading } = useUserInfo();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);
  const [reviewModalOpen, setReviewModalOpen] = useState<boolean>(false);
  const [reviewData, setReviewData] = useState<any>();
  const [reservationId, setReservationId] = useState<number>(1);
  const loadMoreRef = useRef(null);

  const {
    data: resDataList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['res'],
    queryFn: async ({ pageParam }) => {
      const res = await fetchReservationList({ cursorId: pageParam, size: 10 });
      return res;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.cursorId;
    },
    initialPageParam: undefined,
  });

  useObserverScroll({
    hasNextPage,
    loadMoreRef,
    isFetchingNextPage,
    fetchNextPage,
  });

  const handleCancelClick = (id: number) => {
    setReservationId(id);
    setConfirmModalOpen(true);
  };

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  return (
    <div className="flex mt-20">
      <ModalFrame isOpen={confirmModalOpen} setIsOpen={setConfirmModalOpen}>
        <ConfirmModal
          setIsOpen={setConfirmModalOpen}
          reservationId={reservationId}
        />
      </ModalFrame>
      <ModalFrame isOpen={reviewModalOpen} setIsOpen={setReviewModalOpen}>
        <ReviewModal setIsOpen={setReviewModalOpen} resData={reviewData} />
      </ModalFrame>
      <ProfileMenu profileImageUrl={data?.profileImageUrl} />
      <div className="w-full ml-6">
        <div className="flex justify-between items-center w-full mb-[16px]">
          <h2 className="text-[32px] font-bold">예약 내역</h2>
          <DropDownMenu size="large" filterList={MENU_LIST} />
        </div>
        <div>
          {resDataList ? (
            resDataList.pages
              .flatMap((page) => page.reservations)
              .map((res: any) => {
                let statusText;
                let statusColor;

                switch (res.status) {
                  case 'pending':
                    statusText = '예약 완료';
                    statusColor = 'text-blue-300';
                    break;
                  case 'confirmed':
                    statusText = '예약 승인';
                    statusColor = 'text-orange-200';
                    break;
                  case 'declined':
                    statusText = '예약 거절';
                    statusColor = 'text-red-200';
                    break;
                  case 'canceled':
                    statusText = '예약 취소';
                    statusColor = 'text-gray-900';
                    break;
                  case 'completed':
                    statusText = '체험 완료';
                    statusColor = 'text-gray-900';
                    break;
                  default:
                    statusText = '상태 불명';
                    statusColor = 'text-red-200';
                }
                return (
                  <div
                    key={res.id}
                    className="flex rounded-3xl overflow-hidden border-2 border-gray-100 bg-white mb-6 shadow-[0px_0px_10px_rgba(0,0,0,0.1)]"
                  >
                    <div
                      className="w-52 h-52 bg-cover bg-center bg-no-repeat flex-shrink-0 text-[0px]"
                      style={{
                        backgroundImage: `url(${
                          res.activity.bannerImageUrl ||
                          '/image/defaultImage.png'
                        })`,
                      }}
                    >
                      이미지 영역
                    </div>
                    <div className="flex flex-col justify-center gap-3 w-full p-6">
                      <span className={`text-base ${statusColor}`}>
                        {statusText}
                      </span>
                      <h3 className="text-xl font-bold">
                        {res.activity.title}
                      </h3>
                      <span className="text-lg">
                        {res.date} ・ {res.startTime} - {res.endTime}{' '}
                        {res.headCount}명
                      </span>
                      <div className="flex justify-between">
                        <span className="text-2xl">₩10000</span>
                        {statusText === '예약 완료' && (
                          <>
                            <Button
                              label="예약 취소"
                              variant="line"
                              className="w-36 h-11"
                              onClick={() => {
                                handleCancelClick(res.id);
                              }}
                            />
                          </>
                        )}
                        {statusText === '체험 완료' &&
                          res.reviewSubmitted === false && (
                            <Button
                              label="후기 작성"
                              variant="solid"
                              className="w-36 h-11"
                              onClick={() => {
                                setIsOpen(true);
                                setReviewModalOpen(true);
                                setReviewData(res);
                              }}
                            />
                          )}
                      </div>
                    </div>
                  </div>
                );
              })
          ) : (
            <div className="flex flex-col justify-center items-center gap-12 mt-28">
              <Image
                src="/image/notDataImage.png"
                width={130}
                height={177}
                alt="데이터 없는경우 이미지"
              />
              <p className="text-2xl text-gray-900">
                아직 예약한 체험이 없어요.
              </p>
            </div>
          )}
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
