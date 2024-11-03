
import { axiosInstance } from '@/apis/instance/axiosInstance';
import Banner from '@/components/main/Banner';

export default function Home() {
  return (
    <div>
      {/* <div className="h-240 md:h-550 bg-gray-800 flex items-center justify-center">
        <ul>
          <li>
            이미지 영역
            <h2>함께 배우면 즐거운 스트릿 댄스</h2>
            <span>1월의 인기체험 BEST 🔥</span>
          </li>
        </ul>
      </div> */}
      <Banner />
      <div className="text-center py-8">
        <p>메인 페이지 내용</p>
      </div>
    </div>
  );
}
