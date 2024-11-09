import { fetchActivityIdPreview } from '@/apis/detail/api';
import LoadingSpinner from '@/components/@Shared/loading/LoadingSpinner';
import Description from '@/components/detail/Description';
import Preview from '@/components/detail/Preview';
import ReserveCalendar from '@/components/detail/ReserveCalendar';
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
      return res;
    },
    enabled: !!pageId,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen mt-20 mb-28">
      <div>
        <Preview detailData={detailData} />
      </div>
      <div className="flex justify-between gap-6 mt-20">
        <div className="basis-[60%]">
          <Description detailData={detailData} />
          <ReviewList activityId={pageId} />
        </div>
        <div className="basis-[40%] w-[384px] min-h-[746px] p-6 border-2 border-gray-300 rounded-2xl bg-white">
          <ReserveCalendar detailData={detailData} />
        </div>
      </div>
    </div>
  );
}
