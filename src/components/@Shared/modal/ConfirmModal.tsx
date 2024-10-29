import Image from 'next/image';
import { Button } from '../Buttons/Button';

interface ConfirmModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ConfirmModal({ isOpen, setIsOpen }: ConfirmModalProps) {
  return (
    <div className="flex flex-col justify-center items-center fixed p-6 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[300px] h-[180px] bg-white rounded-xl z-10">
      <div>
        <Image
          src="/ico/ico_check.svg"
          width={24}
          height={24}
          alt="체크 아이콘"
        />
      </div>
      <p className="mt-4 mb-8">예약을 취소하시겠어요?</p>
      <div className="flex justify-center items-center gap-2">
        <Button
          label="아니오"
          variant="line"
          className="w-20 h-10"
          onClick={() => {
            isOpen && setIsOpen(false);
          }}
        />
        <Button label="취소하기" variant="solid" className="w-20 h-10" />
      </div>
    </div>
  );
}
