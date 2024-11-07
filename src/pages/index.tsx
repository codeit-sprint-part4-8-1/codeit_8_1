import { useState } from 'react';
import Banner from '@/components/main/Banner';
import SearchBar from '@/components/@Shared/searchBar/SearchBar';
import HotActivityList from '@/components/mainPage/HotActivityList';
import CategoryAndDropDown from '@/components/mainPage/Category&DropDown';
import ActivityList from '@/components/mainPage/ActivityList';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="relative w-full">
      {/* <div className="h-240 md:h-550 bg-gray-800 flex items-center justify-center">
        <ul>
          <li>
            이미지 영역
            <h2>함께 배우면 즐거운 스트릿 댄스</h2>
            <span>1월의 인기체험 BEST 🔥</span>
          </li>
        </ul>
      </div> */}
      <div className="relative z-10">
        <Banner />
      </div>
      <div className="absolute top-[180px] sm:top-[490px] left-1/2 transform -translate-x-1/2 z-20">
        <SearchBar />
      </div>
      <div className="relative mobile:mt-[100px] tablet2:mt-[142px] pc:mt-[158px] z-30 flex justify-center">
        <HotActivityList />
      </div>
      <div className="relative mobile:mt-[40px] tablet2:mt-[60px] pc:mt-[60px] z-30 flex justify-center">
        {/* 카테고리 선택 컴포넌트에 선택된 카테고리 상태 전달 */}
        <CategoryAndDropDown setSelectedCategory={setSelectedCategory} />
      </div>
      <div className="relative flex justify-center mobile:mb-[83px] tablet2:mb-[153px] pc:mb-[222px]">
        {/* 선택된 카테고리에 맞춰 필터링된 체험 목록을 전달 */}
        <ActivityList selectedCategory={selectedCategory} />
      </div>
    </div>
  );
}
