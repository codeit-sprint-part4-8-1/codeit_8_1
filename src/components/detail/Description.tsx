import { fetchActivityIdPreview } from '@/apis/detail/api';
import { Detail } from '@/types/detailPage/type';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

interface DescriptionPros {
  detailData: Detail;
}

export default function Description({ detailData }: DescriptionPros) {
  return (
    <div className="py-10 border-t-2 border-b-2 border-gray-200">
      <div className="pb-8 mb-8 border-b-2 border-gray-200">
        <h2 className="text-xl font-bold mb-4">체험 설명</h2>
        <p>{detailData?.description}</p>
      </div>
      {/* 지도 영역 임시로 이미지 적용 */}
      <div>
        <Image
          src="/image/mapTestImage.png"
          width={790}
          height={450}
          alt="지도 이미지"
        />
        <span className="flex items-center gap-2 mt-3">
          <Image
            src="/ico/ico_point.svg"
            width={11}
            height={16}
            alt="주소 아이콘"
          />
          {detailData?.address}
        </span>
      </div>
    </div>
  );
}
