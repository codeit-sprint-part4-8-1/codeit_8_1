import { useState } from 'react';

interface MainCategoryProps {
  setSelectedCategory: (category: string | null) => void;
}

export default function MainCategory({
  setSelectedCategory,
}: MainCategoryProps) {
  const CATEGORY_LIST = [
    '전체',
    '문화・예술',
    '식음료',
    '스포츠',
    '투어',
    '관광',
    '웰빙',
  ];
  const [isActive, setIsActive] = useState<string>('');

  const handleCategoryClick = (category: string) => {
    if (category === '전체') {
      setSelectedCategory(null); // "전체" 클릭 시 카테고리 필터링 해제
      setIsActive(''); // 버튼 상태 초기화
    } else {
      if (isActive === category) {
        setIsActive(''); // 이미 선택된 카테고리를 다시 클릭하면 해제
        setSelectedCategory(null); // 카테고리 해제
      } else {
        setIsActive(category); // 카테고리 선택
        setSelectedCategory(category); // 선택된 카테고리 상태 전달
      }
    }
  };

  return (
    <div className="relative w-full overflow-x-auto md:overflow-visible">
      <div className="flex items-center gap-2 sm:gap-4 md:gap-6 flex-nowrap w-[520px] sm:w-[790px] md:w-full">
        {CATEGORY_LIST.map((category) => {
          return (
            <button
              key={category}
              type="button"
              className={`w-[80px] sm:w-[120px] md:w-full md:max-w-32 h-[41px] sm:h-[58px] text-base md:text-lg font-medium rounded-2xl border-2 border-green-200 hover:bg-nomadBlack hover:text-white ${
                isActive === category
                  ? 'text-white bg-nomadBlack'
                  : 'text-nomadBlack bg-white'
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
