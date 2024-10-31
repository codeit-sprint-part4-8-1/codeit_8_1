import Banner from '@/components/main/Banner';
import SearchBar from '@/components/@Shared/searchBar/SearchBar';

export default function Home() {
  return (
    <div className="relative w-full h-full">
      {/* <div className="h-240 md:h-550 bg-gray-800 flex items-center justify-center">
        <ul>
          <li>
            이미지 영역
            <h2>함께 배우면 즐거운 스트릿 댄스</h2>
            <span>1월의 인기체험 BEST 🔥</span>
          </li>
        </ul>
      </div> */}
      <div className="absolute top-0 left-0 z-10 w-full h-full">
        <Banner />
      </div>
      <div className="absolute top-[180px] sm:top-[490px] left-1/2 transform -translate-x-1/2 z-20">
        <SearchBar />
      </div>
      <div className="text-center py-8">
        <p>메인 페이지 내용</p>
      </div>
    </div>
  );
}
