import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Banner from '@/components/main/Banner';
import SearchBar from '@/components/@Shared/searchBar/SearchBar';
import ActivityList from '@/components/mainPage/ActivityList';

export default function SearchPage() {
  const router = useRouter();
  const { keyword } = router.query; // URL에서 검색어(keyword) 쿼리 파라미터 가져오기

  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [totalItems, setTotalItems] = useState<number>(0);

  // URL 쿼리에서 검색어를 가져오고, 이를 상태에 반영
  useEffect(() => {
    if (typeof keyword === 'string') {
      setSearchKeyword(keyword); // 쿼리에서 검색어가 문자열로 전달되면 이를 상태로 설정
    }
  }, [keyword]);

  return (
    <div className="relative w-full">
      {/* 배너 */}
      <div className="relative z-10">
        <Banner />
      </div>

      {/* 검색창 */}
      <div className="absolute top-[180px] sm:top-[490px] left-1/2 transform -translate-x-1/2 z-20">
        <SearchBar
          setSearchKeyword={(keyword) => setSearchKeyword(keyword)}
          setTotalItems={setTotalItems}
        />
      </div>

      <div className="mobile:w-[388px] tablet2:w-[800px] pc:w-[1200px] flex flex-col mx-auto">
        {/* 검색 결과 문구 */}
        <div className="relative mobile:mt-[93px] tablet2:mt-[142px] pc:mt-[158px] z-30 text-2xl text-black font-bold">
          {searchKeyword ? `"${searchKeyword}"` : '검색어를 입력해 주세요.'}
          (으)로 검색한 결과입니다.
        </div>

        {/* 총 검색 결과 */}
        <div className="relative text-xl text-gray-700 mb-8">
          {totalItems > 0 && `${totalItems}개의 결과`}
        </div>

        {/* 검색 결과 카드 목록 */}
        <div className="relative flex justify-center mobile:mb-[83px] tablet2:mb-[153px] pc:mb-[222px]">
          <ActivityList
            searchKeyword={searchKeyword}
            selectedCategory={null}
            selectedSort={null}
            setTotalItems={setTotalItems}
          />
        </div>
      </div>
    </div>
  );
}
