import { useState } from 'react';
import MainCategory from '../@Shared/category/MainCategory';
import DropDownMenu from '../@Shared/dropDown/DropDownMenu';

interface CategoryAndDropDownProps {
  setSelectedCategory: (category: string | null) => void; // 카테고리 상태를 부모 컴포넌트에 전달
  setSelectedSort: (sort: string | null) => void; // 정렬 상태를 부모 컴포넌트에 전달
}

export default function CategoryAndDropDown({
  setSelectedCategory,
  setSelectedSort,
}: CategoryAndDropDownProps) {
  const MENU_LIST = [
    {
      id: 'price_asc',
      text: '가격 낮은 순',
    },
    {
      id: 'price_desc',
      text: '가격 높은 순',
    },
  ];

  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  return (
    <div className="flex flex-row justify-between mobile:w-[343px] tablet2:w-[696px] pc:w-[1200px] mobile:mb-[24px] tablet2:mb-[35px] pc:mb-[35px]">
      <MainCategory setSelectedCategory={setSelectedCategory} />
      <DropDownMenu
        size={'small'}
        filterList={MENU_LIST}
        setFilterStatus={setFilterStatus}
        setSelectedSort={setSelectedSort}
        defaultText={'가격'}
      />
    </div>
  );
}
