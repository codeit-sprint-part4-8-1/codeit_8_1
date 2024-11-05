import MainCategory from '../@Shared/category/MainCategory';
import DropDownMenu from '../@Shared/dropDown/DropDownMenu';

export default function CategoryAndDropDown() {
  return (
    <div className="flex flex-row justify-between mobile:w-[343px] tablet2:w-[696px] pc:w-[1200px] mobile:mb-[24px] tablet2:mb-[35px] pc:mb-[35px]">
      <MainCategory />
      <DropDownMenu
        size={'small'}
        filterList={['가격 낮은 순', '가격 높은 순']}
      />
    </div>
  );
}
