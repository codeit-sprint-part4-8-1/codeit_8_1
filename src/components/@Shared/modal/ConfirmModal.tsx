import Image from 'next/image';
import { Button } from '../Buttons/Button';
import { useQueryClient } from '@tanstack/react-query';
import { cancelReservation } from '@/apis/myInfo/api';
import toast from 'react-hot-toast';
interface ConfirmModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  reservationId: number | undefined;
}

export default function ConfirmModal({
  setIsOpen,
  reservationId,
}: ConfirmModalProps) {
  const queryClient = useQueryClient();

  const handleCancelReservation = async (reservationId: number) => {
    try {
      await cancelReservation(reservationId);
      queryClient.invalidateQueries({ queryKey: ['res'] });
      setIsOpen(false);
      toast.success('예약이 취소되었습니다.');
    } catch (error) {
      setIsOpen(false);
      console.error('예약취소 실패', error);
      toast.error('예약이 취소를 실패했습니다.');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center fixed p-6 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[95%] sm:w-full max-w-[300px] h-[180px] bg-white rounded-xl z-50">
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
            setIsOpen(false);
          }}
        />
        <Button
          label="취소하기"
          variant="solid"
          className="w-20 h-10"
          onClick={() => {
            if (reservationId) {
              handleCancelReservation(reservationId);
            }
          }}
        />
      </div>
    </div>
  );
}
