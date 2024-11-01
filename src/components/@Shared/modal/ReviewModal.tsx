import Image from 'next/image';
import { Button } from '../Buttons/Button';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Review } from '@/types/myPage/type';
import { postReview } from '@/apis/myInfo/api';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

interface ReviewModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  resData?: any;
}

export default function ReviewModal({ setIsOpen, resData }: ReviewModalProps) {
  const queryClient = useQueryClient();
  const STAR_LIST = Array.from({ length: 5 }, (_, index) => ({
    id: index + 1,
    defaultImage: '/ico/ico_star_off.svg',
    activeImage: '/ico/ico_star.svg',
  }));
  const [rating, setRating] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      content: '',
    },
  });

  const reviewValidation = (data: { content: string }) => {
    if (rating === 0) {
      toast.error('별점을 등록해주세요.');
      return true;
    }
    if (!data.content) {
      toast.error('후기를 작성해주세요.');
      return true;
    }
    return false;
  };

  const onSubmit = async (data: { content: string }) => {
    if (reviewValidation(data)) {
      toast.error('후기를 등록을 실패했습니다.');
      return;
    }

    try {
      await postReview({
        id: resData.id,
        rating,
        content: data.content,
      });
      queryClient.invalidateQueries({ queryKey: ['res'] });
      setIsOpen(false);
      toast.success('후기가 등록되었습니다.');
    } catch (error) {
      console.error('후기 등록 실패', error);
      toast.error('후기 등록에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleStarClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const buttonId = Number(e.currentTarget.id);

    // setRating(rating === buttonId ? 0 : buttonId); // 이미 체크되어있는 별점과 같은 별점을 클릭하면 모든 별점 해제
    setRating(buttonId);
  };

  return (
    <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[480px] p-6 pb-10 bg-white rounded-xl z-10">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl font-bold">후기 작성</h2>
        <button
          type="button"
          onClick={() => {
            setIsOpen(false);
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
          style={{ backgroundImage: `url(${resData.activity.bannerImageUrl})` }}
        >
          이미지 영역
        </div>
        <div>
          <h3 className="text-xl font-bold mb-3">{resData.activity.title}</h3>
          <span className="block text-lg mb-6">
            {resData.date} ・ {resData.startTime} - {resData.endTime} ・
            {resData.headCount}명
          </span>
          <span className="text-2xl font-bold">₩10,000</span>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          {...register('content', {
            required: '후기를 작성해주세요',
            validate: (value) => {
              const valueTrim = value.trim();
              return valueTrim.length > 0 || '후기를 작성해주세요';
            },
          })}
          className="w-full h-60 border-2 border-gray-900 rounded mb-6 p-4 resize-none focus-visible:outline-green-200"
          placeholder="후기를 작성해주세요"
        ></textarea>
        {errors.content && <p>{errors.content.message}</p>}
        <Button
          label="작성하기"
          variant="solid"
          className="w-full h-[56px] text-base disabled:bg-gray-500"
          type="submit"
          disabled={!isValid || rating === 0}
        />
      </form>
    </div>
  );
}
