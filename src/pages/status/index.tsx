// import { useMyActivitiesCheck } from '@/service/myActivities/useMyActivitiesService';
import StatusCalendar from '@/components/status/StatusCalendar';
// import Image from 'next/image';
import { useEffect, useState } from 'react';
import ReservationStatusSkeleton from '@/components/status/ReservationStatusSkeleton';
import ProfileMenu from '@/components/@Shared/profileMenu/ProfileMenu';
import useUserInfo from '@/hook/useUserInfo';
import StatusDropdown from '@/components/@Shared/dropDown/StatusDropdown';

interface Activity {
  id: number;
  title: string;
}

const useMockActivitiesCheck = () => {
  return {
    data: {
      activities: [
        { id: 1, title: '체험 1' },
        { id: 2, title: '체험 2' },
        { id: 3, title: '체험 3' },
      ],
    },
    isLoading: false,
  };
};

const ReservationStatus = () => {
  const { data: userInfo, isLoading: isUserInfoLoading } = useUserInfo();
  // const { data: list, isLoading } = useMyActivitiesCheck();
  const { data: list, isLoading: isActivitiesLoading } =
    useMockActivitiesCheck();
  const [selectedActivityId, setSelectedActivityId] = useState<number>();

  useEffect(() => {
    if (list && list.activities.length > 0) {
      setSelectedActivityId(list.activities[0].id);
    }
  }, [list]);

  const handleSelectChange = (option: Activity) => {
    setSelectedActivityId(option.id);
    // const activityId = selectedActivityId;
    // return activityId;
  };

  if (isUserInfoLoading || isActivitiesLoading)
    return <ReservationStatusSkeleton />;

  return (
    <>
      <div className="flex mt-20">
        <ProfileMenu profileImageUrl={userInfo?.profileImageUrl} />
        <div className="flex w-[792px] flex-col gap-[30px] ml-6 mb-20">
          {list && list.activities.length > 0 ? (
            <div className="flex flex-col gap-12">
              <div className="flex w-full flex-col gap-[32px]">
                <div className="flex">
                  <h1 className="text-[32px] font-bold">예약 현황</h1>
                </div>
                <StatusDropdown list={list} onSelect={handleSelectChange} />
              </div>
              {selectedActivityId && (
                <StatusCalendar activityId={selectedActivityId} />
              )}
            </div>
          ) : // ) : (
          //   <div className="flex flex-col gap-5">
          //     <h1 className="text-[32px] font-bold">예약 현황</h1>
          //     <div className="flex flex-col items-center gap-5 p-10">
          //       <Image
          //         src={없음 이미지}
          //         alt="no-reservation"
          //         width={240}
          //         height={240}
          //         priority
          //       />
          //       <p className="text-2xl font-medium text-gnGray700">
          //         아직 등록한 체험이 없어요.
          //       </p>
          //     </div>
          //   </div>
          null}
        </div>
      </div>
    </>
  );
};

export default ReservationStatus;
