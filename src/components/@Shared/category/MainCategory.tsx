import { useState } from 'react';

export default function MainCategory() {
  const CATEGORY_LIST = [
    '문화・예술',
    '식음료',
    '스포츠',
    '투어',
    '관광',
    '웰빙',
  ];
  const [isActive, setIsActive] = useState<string>('');

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
              onClick={() => {
                if (isActive === category) {
                  setIsActive('');
                } else {
                  setIsActive(category);
                }
              }}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
