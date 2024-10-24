import Image from 'next/image';
import { Button } from '../Buttons/Button';
import { useState } from 'react';

interface ReviewModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ReviewModal({ isOpen, setIsOpen }: ReviewModalProps) {
  const STAR_LIST = Array.from({ length: 5 }, (_, index) => ({
    id: index + 1,
    defaultImage: '/ico/ico_star_off.svg',
    activeImage: '/ico/ico_star.svg',
  }));
  const [rating, setRating] = useState(0);

  const handleStarClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const buttonId = Number(e.currentTarget.id);

    setRating(rating === buttonId ? 0 : buttonId);
  };

  return (
    <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[480px] p-6 pb-10 bg-white rounded-xl z-10">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl font-bold">후기 작성</h2>
        <button
          type="button"
          onClick={() => {
            isOpen && setIsOpen(false);
          }}
        >
          <Image
            src="/ico/ico_close.svg"
            width={40}
            height={40}
            alt="닫기 아이콘"
          />
        </button>
      </div>
      <div className="flex justify-between items-center gap-6 mb-12">
        <div
          className="w-32 h-32 rounded-3xl bg-cover bg-center bg-no-repeat flex-shrink-0 text-[0px]"
          style={{ backgroundImage: 'url(/image/mainBanner01.png)' }}
        >
          이미지 영역
        </div>
        <div>
          <h3 className="text-xl font-bold mb-3">
            함께 배우면 즐거운 스트릿 댄스
          </h3>
          <span className="block text-lg mb-6">
            2023. 2. 14 ・ 11:00 - 12:30 ・ 10명
          </span>
          <span className="text-2xl font-bold">₩10,000</span>
        </div>
      </div>
      <form>
        <div className="flex justify-center items-center gap-2 h-[56px] mb-12">
          {STAR_LIST.map((star) => {
            const isActive = rating >= star.id;
            return (
              <button
                id={star.id.toString()}
                key={star.id}
                type="button"
                onClick={handleStarClick}
              >
                <Image
                  src={isActive ? star.activeImage : star.defaultImage}
                  width={56}
                  height={56}
                  alt="별 아이콘"
                />
              </button>
            );
          })}
        </div>
        <textarea
          className="w-full h-60 border-2 border-gray-900 rounded mb-6 p-4 resize-none focus-visible:outline-green-200"
          placeholder="후기를 작성해주세요"
        ></textarea>
        <Button
          label="작성하기"
          variant="solid"
          className="w-full h-[56px] text-base"
          type="submit"
        />
      </form>
    </div>
  );
}
