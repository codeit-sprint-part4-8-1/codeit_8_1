import { fetchActivityIdPreview } from '@/apis/detail/api';
import LoadingSpinner from '@/components/@Shared/loading/LoadingSpinner';
import Description from '@/components/detail/Description';
import Preview from '@/components/detail/Preview';
import ReviewList from '@/components/detail/ReviewList';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export default function activityDetail() {
  const router = useRouter();
  const pageId = Number(router.query.id);

  const { data: detailData, isLoading } = useQuery({
    queryKey: ['detail', pageId],
    queryFn: async () => {
      const res = await fetchActivityIdPreview({ activityId: pageId });
      console.log(res);
      return res;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen mt-20">
      <div>
        <Preview detailData={detailData} />
      </div>
      <div className="flex justify-between gap-6 mt-20">
        <div className="basis-[60%]">
          <Description detailData={detailData} />
          <ReviewList activityId={pageId} />
        </div>
        <div className="basis-[40%] w-[384px] h-[746px] bg-gray-200">
          예약 영역
        </div>
      </div>
    </div>
  );
}
