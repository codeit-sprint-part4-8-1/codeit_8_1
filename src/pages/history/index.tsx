import { useState, useEffect } from 'react';
import { Button } from '@/components/@Shared/Buttons/Button';
import DropDownMenu from '@/components/@Shared/dropDown/DropDownMenu';
import ProfileMenu from '@/components/@Shared/profileMenu/ProfileMenu';
import useInfiniteScroll from '@/hook/useInfiniteScroll';
import ConfirmModal from '@/components/@Shared/modal/ConfirmModal';
import ModalFrame from '@/components/@Shared/modal/ModalFrame';
import useUserInfo from '@/hook/useUserInfo';
import { useQuery } from '@tanstack/react-query';
import { fetchReservationList } from '@/apis/myInfo/api';

export default function History() {
  const MENU_LIST = [
    '예약 신청',
    '예약 취소',
    '예약 승인',
    '예약 거절',
    '체험 완료',
  ];

  const { data, isLoading } = useUserInfo();
  const [items, setItems] = useState([]); // 임시 10개의 배열
  const [hasMore, setHasMore] = useState(true); // 추가 데이터를 불러올 수 있는 상태
  const [isOpen, setIsOpen] = useState(false);
  const {
    data: resDataList,
    isLoading: resIsLoading,
    isError,
  } = useQuery({
    queryKey: ['res'],
    queryFn: async () => {
      const res = await fetchReservationList();
      // setItems(res.reservations);
      return res.reservations;
    },
  });

  // useInfiniteScroll({
  //   hasMore,
  //   setHasMore,
  //   setItems,
  // });

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  return (
    <div className="flex mt-20">
      <ModalFrame isOpen={isOpen}>
        <ConfirmModal isOpen={isOpen} setIsOpen={setIsOpen} />
      </ModalFrame>
      <ProfileMenu profileImageUrl={data?.profileImageUrl} />
      <div className="w-full ml-6">
        <div className="flex justify-between items-center w-full mb-[16px]">
          <h2 className="text-[32px] font-bold">예약 내역</h2>
          <DropDownMenu size="large" filterList={MENU_LIST} />
        </div>
        <div>
          {!resIsLoading &&
            resDataList.map((res: any) => {
              return (
                <div
                  key={res.id}
                  className="flex rounded-3xl overflow-hidden border-2 border-gray-100 bg-white mb-6 shadow-[0px_0px_10px_rgba(0,0,0,0.1)]"
                >
                  <div
                    className="w-52 h-52 bg-cover bg-center bg-no-repeat flex-shrink-0 text-[0px]"
                    style={{
                      backgroundImage: `url(${res.activity.bannerImageUrl})`,
                    }}
                  >
                    이미지 영역
                  </div>
                  <div className="flex flex-col justify-center gap-3 w-full p-6">
                    <span className="text-base">예약 완료</span>
                    <h3 className="text-xl font-bold">{res.activity.title}</h3>
                    <span className="text-lg">
                      {res.date} ・ {res.startTime} - {res.endTime} ・{' '}
                      {res.headCount}명
                    </span>
                    <div className="flex justify-between">
                      <span className="text-2xl">₩10000</span>
                      <Button
                        label="예약 취소"
                        variant="line"
                        className="w-36 h-11"
                        onClick={() => {
                          isOpen || setIsOpen(true);
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          {hasMore && (
            <p className="text-center mt-4">데이터를 가져오고 있습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}
