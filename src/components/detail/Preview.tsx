import { deleteActivityId, fetchActivityIdPreview } from '@/apis/detail/api';
import { useQueries } from '@tanstack/react-query';
import Image from 'next/image';
import LoadingSpinner from '../@Shared/loading/LoadingSpinner';
import { useState } from 'react';
import { fetchUserInfo } from '@/apis/myInfo/api';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

interface PreviewProps {
  activityId: number;
}

export default function Preview({ activityId }: PreviewProps) {
  const results = useQueries({
    queries: [
      {
        queryKey: ['preview'],
        queryFn: async () => {
          const res = await fetchActivityIdPreview({ activityId });
          return res;
        },
      },
      {
        queryKey: ['detailUserInfo'],
        queryFn: async () => {
          const res = await fetchUserInfo();
          return res;
        },
      },
    ],
  });

  const previewIsLoading = results[0].isLoading;
  const userInfoIsLoading = results[1].isLoading;
  const previewQuery = results[0].data;
  const userInfoQuery = results[1].data;

  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState<boolean>(false);

  const deleteActivity = async ({ activityId }: PreviewProps) => {
    setMenuVisible(false);
    try {
      const res = await deleteActivityId({ activityId });
      toast.success('체험이 삭제 되었습니다.');
      router.push('/');
    } catch (error: any) {
      const message =
        error.response?.data?.message || '체험 삭제를 실패했습니다.';
      toast.error(message);
    }
  };

  const previewImagClass =
    'border-2 border-gray-200 bg-no-repeat bg-center bg-cover';

  if (previewIsLoading || userInfoIsLoading) {
    <LoadingSpinner />;
  }

  return (
    <div>
      <span>{previewQuery?.category}</span>
      <div className="flex items-center justify-between">
        <h2>{previewQuery?.title}</h2>
        <div className="flex justify-end relative w-[160px]">
          {userInfoQuery?.id === previewQuery?.userId && (
            <button
              type="button"
              onClick={() => {
                setMenuVisible(!menuVisible);
              }}
            >
              <Image
                src="ico/Ico_meatball.svg"
                width={40}
                height={40}
                alt="메뉴 아이콘"
              />
            </button>
          )}
          {menuVisible && (
            <ul className="absolute top-[45px] z-10 w-40 border-2 border-gray-300 rounded-lg bg-white">
              <li className="w-full h-14 border-b-2 border-gray-300 hover:bg-gray-100">
                <button type="button" className="w-full h-full">
                  수정하기
                </button>
              </li>
              <li className="w-full h-14 hover:bg-gray-100">
                <button
                  type="button"
                  className="w-full h-full"
                  onClick={() => {
                    deleteActivity({ activityId: previewQuery?.id });
                  }}
                >
                  삭제하기
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className="flex items-center mb-6">
        <Image
          src="/ico/ico_star.svg"
          width={16}
          height={16}
          className="mr-2"
          alt="별 이미지"
        />
        <span className="mr-4">
          {previewQuery?.rating} ({previewQuery?.reviewCount})
        </span>
        <Image
          src="/ico/ico_point.svg"
          width={11}
          height={16}
          className="mr-2"
          alt="주소 아이콘"
        />
        <span>{previewQuery?.address}</span>
      </div>
      <div className="grid grid-cols-4 grid-rows-[310px_310px] sm:grid-rows-[150px_150px] lg:grid-rows-[260px_260px] gap-2">
        <div
          className={`col-span-2 row-span-2 ${previewImagClass}`}
          style={{ backgroundImage: `url(${previewQuery?.bannerImageUrl})` }}
        />
        {previewQuery?.subImages.map((subImage: any, index: number) => {
          return (
            <div
              key={index + 1}
              className={`${previewImagClass}`}
              style={{
                backgroundImage: `url(${subImage.imageUrl})`,
              }}
            />
          );
        })}
      </div>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          success: {
            style: {
              width: 'auto',
              height: '60px',
              background: 'green',
              color: 'white',
              fontSize: '16px',
              fontWeight: 'bold',
            },
          },
          error: {
            style: {
              width: 'auto',
              height: '60px',
              background: 'red',
              color: 'white',
              fontSize: '16px',
              fontWeight: 'bold',
            },
          },
        }}
      />
    </div>
  );
}
