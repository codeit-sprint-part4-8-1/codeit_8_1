import { useState } from 'react';
import MainCategory from '../@Shared/category/MainCategory';
import DropDownMenu from '../@Shared/dropDown/DropDownMenu';

interface CategoryAndDropDownProps {
  setSelectedCategory: (category: string | null) => void;
}

export default function CategoryAndDropDown({
  setSelectedCategory,
}: CategoryAndDropDownProps) {
  const MENU_LIST = [
    {
      id: null,
      text: '가격 낮은 순',
    },
    {
      id: null,
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
      />
    </div>
  );
}
