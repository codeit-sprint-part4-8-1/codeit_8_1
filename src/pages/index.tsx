import DropDownMenu from '@/components/@Shared/dropDown/DropDownMenu';

export default function Home() {
  return (
    <div className="bg-nomadBlack">
      홈{' '}
      <DropDownMenu
        size={'large'}
        filterList={[
          '전체',
          '예약 신청',
          '예약 취소',
          '예약 승인',
          '예약 거절',
          '체험 완료',
        ]}
      />
    </div>
  );
}
