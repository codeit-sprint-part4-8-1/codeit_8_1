import Image from 'next/image';

interface NotData {
  status: string;
}

export default function NotData({ status }: NotData) {
  return (
    <div className="flex flex-col justify-center items-center gap-12 mt-28">
      <Image
        src="/image/notDataImage.png"
        width={130}
        height={177}
        alt="데이터 없는경우 이미지"
      />
      <p className="text-2xl text-gray-900">
        {status === 'not'
          ? '아직 예약한 체험이 없어요.'
          : '데이터를 불러어는데 실패했습니다.'}
      </p>
    </div>
  );
}
