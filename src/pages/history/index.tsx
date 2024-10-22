import { useState, useEffect } from 'react';
import { Button } from '@/components/@Shared/Buttons/Button';
import DropDownMenu from '@/components/@Shared/dropDown/DropDownMenu';
import ProfileMenu from '@/components/@Shared/profileMenu/ProfileMenu';
import useInfiniteScroll from '@/hook/useInfiniteScroll';
import ConfirmModal from '@/components/@Shared/modal/ConfirmModal';
import ModalFrame from '@/components/@Shared/modal/ModalFrame';
import useUserInfo from '@/hook/useUserInfo';

export default function History() {
  const MENU_LIST = [
    '예약 신청',
    '예약 취소',
    '예약 승인',
    '예약 거절',
    '체험 완료',
  ];

  const { data, isLoading } = useUserInfo();
  const [items, setItems] = useState([...Array(10).keys()]); // 임시 10개의 배열
  const [hasMore, setHasMore] = useState(true); // 추가 데이터를 불러올 수 있는 상태
  const [isOpen, setIsOpen] = useState(false);

  useInfiniteScroll({
    hasMore,
    setHasMore,
    setItems,
  });

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
          {items.map((array) => {
            return (
              <div
                key={array}
                className="flex rounded-3xl overflow-hidden border-2 border-gray-100 bg-white mb-6 shadow-[0px_0px_10px_rgba(0,0,0,0.1)]"
              >
                <div
                  className="w-52 h-52 bg-cover bg-center bg-no-repeat flex-shrink-0"
                  style={{ backgroundImage: 'url(/image/mainBanner01.png)' }}
                >
                  이미지 영역
                </div>
                <div className="flex flex-col justify-center gap-3 w-full p-6">
                  <span className="text-base">예약 완료</span>
                  <h3 className="text-xl font-bold">
                    함께 배우면 즐거운 스트릿 댄스
                  </h3>
                  <span className="text-lg">
                    2023. 2. 14 ・ 11:00 - 12:30 ・ 10명
                  </span>
                  <div className="flex justify-between">
                    <span className="text-2xl">₩10,000</span>
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
