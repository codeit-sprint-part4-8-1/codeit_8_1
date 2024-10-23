import { motion } from 'framer-motion';
import { useState } from 'react';

interface DropDownMenuProps {
  size: string;
  filterList: string[];
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
 * @param {Array<string>} param0.filterList - 필터 항목의 배열
 * @returns {JSX.Element} 드롭다운 메뉴 컴포넌트
 */

export default function DropDownMenu({ size, filterList }: DropDownMenuProps) {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [filterText, setFilterText] = useState<string>('필터');

  return (
    <div className="relative bg-white">
      <button
        type="button"
        className={`flex justify-between items-center h-[53px] border-2 px-5 border-green-200 rounded-2xl bg-white`}
        style={{ width: `${size === 'small' ? '127px' : '160px'}` }}
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
        <ul
          className="flex flex-col border-2 border-gray-300 rounded-md overflow-hidden"
          style={{ width: `${size === 'small' ? '127px' : '160px'}` }}
        >
          {filterList.map((filter, index) => {
            const lastList = index === filterList.length - 1;
            return (
              <li
                key={filter}
                className={`flex justify-center items-center w-full bg-white hover:bg-gray-200 cursor-pointer  ${
                  lastList || 'border-b-2 border-gray-300'
                }`}
                style={{ height: `${size === 'small' ? '53px' : '60px'}` }}
                onClick={() => {
                  setFilterText(filter);
                  setIsActive(false);
                }}
              >
                {filter}
              </li>
            );
          })}
        </ul>
      </motion.div>
    </div>
  );
}
