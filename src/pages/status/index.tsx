import { useMyActivitiesCheck } from '@/apis/status/useMyActivitiesService';
import StatusCalendar from '@/components/status/StatusCalendar';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import ReservationStatusSkeleton from '@/components/status/ReservationStatusSkeleton';
import StatusDropdown from '@/components/@Shared/dropDown/StatusDropdown';

interface ReservationListProps {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReservationStatus = ({ setIsVisible }: ReservationListProps) => {
  const { data: list, isLoading: isActivitiesLoading } = useMyActivitiesCheck();
  const [selectedActivityId, setSelectedActivityId] = useState<number>();

  useEffect(() => {
    if (list && list.data.activities.length > 0) {
      setSelectedActivityId(list.data.activities[0].id);
    }
  }, [list]);

  const handleSelectChange = (activityIdNumber: number) => {
    setSelectedActivityId(activityIdNumber);
    const activityId = selectedActivityId;
    return activityId;
  };

  if (isActivitiesLoading) return <ReservationStatusSkeleton />;

  return (
    <>
      <div className="flex">
        <div className="flex w-full shrink-1 basis-[120%] flex-col gap-[30px] mb-20">
          {list && list.data.activities.length > 0 ? (
            <div className="flex flex-col gap-12">
              <div className="flex w-full flex-col gap-[32px]">
                <div className="flex">
                  <h1 className="text-[32px] font-bold">예약 현황</h1>
                </div>
                <StatusDropdown
                  list={list.data}
                  onSelect={handleSelectChange}
                />
              </div>
              {selectedActivityId && (
                <StatusCalendar activityId={selectedActivityId} />
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              <h1 className="text-[32px] font-bold">예약 현황</h1>
              <div className="flex flex-col items-center gap-20 p-10">
                <Image
                  src="/image/notDataImage.png"
                  alt="데이터 없음"
                  width={130}
                  height={177}
                  priority
                />
                <p className="text-2xl font-medium text-gray-900">
                  아직 등록한 체험이 없어요.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ReservationStatus;
