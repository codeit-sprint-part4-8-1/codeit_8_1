import Image from 'next/image';

export default function NotData() {
  return (
    <div className="flex flex-col justify-center items-center gap-12 mt-28">
      <Image
        src="/image/notDataImage.png"
        width={130}
        height={177}
        alt="데이터 없는경우 이미지"
      />
      <p className="text-2xl text-gray-900">아직 예약한 체험이 없어요.</p>
    </div>
  );
}
