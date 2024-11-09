import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

interface FilterList {
  id: string | null;
  text: string;
}

interface DropDownMenuProps {
  size?: string;
  filterList: FilterList[];
  setFilterStatus: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedSort: (sort: string | null) => void;
  defaultText?: string;
}

/**
 * DropDownMenu 컴포넌트
 *
 * - size가 'small'이면 메인페이지 필터,
 * - 'small'이 아니면 예약 내역 필터입니다.
 * - filterList에 필터 내용을 배열로 전달하면 해당 배열로 필터 리스트를 생성합니다.
 * 예시 - <DropDownMenu size={'large'} filterList={['전체','예약 신청''예약 취소','예약 승인','예약 거절','체험 완료',]}/>
 *
 * @param {Object} param0 - 컴포넌트에 전달되는 props
 * @param {'small' | 'large'} param0.size - 필터의 크기
 * @param {Array<string>} param1.filterList - 필터 항목의 배열
 * @param {React.Dispatch<React.SetStateAction<string | null>>} param2.setFilterStatus - 필터 값
 * @returns {JSX.Element} 드롭다운 메뉴 컴포넌트
 */

export default function DropDownMenu({
  filterList,
  setFilterStatus,
  setSelectedSort,
  defaultText = '전체', // 기본 텍스트 '전체'
}: DropDownMenuProps) {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [filterText, setFilterText] = useState<string>(defaultText); // 기본 텍스트 설정

  // filterList의 첫 번째 항목이 있을 경우 filterText를 해당 항목으로 업데이트
  useEffect(() => {
    if (filterList.length > 0 && filterText === defaultText) {
      setFilterText(defaultText); // defaultText가 기본값이면 그대로 두기
    }
  }, [filterList, defaultText, filterText]);

  return (
    <div className="relative bg-white z-10">
      <button
        type="button"
        className={
          'flex justify-between items-center w-[120px] sm:w-[140px] h-10 sm:h-[53px] text-[14px] sm:text-[16px] border-2 px-3 sm:px-5 border-green-200 rounded-2xl bg-white'
        }
        onClick={() => {
          setIsActive(!isActive);
        }}
      >
        {filterText}
        <span
          className={`text-2xl transition-all ${
            isActive && 'rotate-[-180deg]'
          }`}
        >
          ▾
        </span>
      </button>
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: isActive ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute overflow-hidden mt-2"
      >
        <ul className="flex flex-col w-[120px] sm:w-[140px] border-2 border-gray-300 rounded-md overflow-hidden">
          {filterList.map((filter, index) => {
            const lastList = index === filterList.length - 1; // 마지막 index만 border 제외하기 위함
            return (
              <li
                key={filter.id}
                className={`flex justify-center items-center w-full h-[45px] sm:h-[53px] text-sm sm:text-[16px] bg-white hover:bg-gray-200 cursor-pointer  ${
                  lastList || 'border-b-2 border-gray-300'
                }`}
                onClick={() => {
                  setFilterText(filter.text);
                  setIsActive(false);
                  setFilterStatus(filter.id); // 필터 상태 업데이트
                  setSelectedSort(filter.id); // 정렬 상태 업데이트
                }}
              >
                {filter.text}
              </li>
            );
          })}
        </ul>
      </motion.div>
    </div>
  );
}
