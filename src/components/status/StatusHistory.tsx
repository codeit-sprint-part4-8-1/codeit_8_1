import { useMyActivitiesUpdateReservationStatus } from '@/apis/status/useMyActivitiesService';
import { useState } from 'react';
import Toast from '../@Shared/toast/Toast';

interface Reservations {
  id: number;
  nickname: string;
  userId: number;
  teamId: string;
  activityId: number;
  scheduleId: number;
  status: string;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

interface HourlyStatus {
  cursorId: number;
  totalCount: number;
  reservations: Reservations[];
}

interface Status {
  status: string;
}

interface StatusHistoryProps {
  reservationStatus: string;
  selectedScheduleId: number;
  hourlyStatus: HourlyStatus;
  activityId: number;
}
const StatusHistory = ({
  reservationStatus,
  hourlyStatus,
  activityId,
}: StatusHistoryProps) => {
  const [reservationId, setReservationId] = useState<number>(0);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const { mutate: statusUpdate } = useMyActivitiesUpdateReservationStatus(
    activityId,
    reservationId,
  );

  const getToastMessage = (status: Status) => {
    if (status.status === 'confirmed') {
      return '예약을 승인했습니다.';
    } else {
      return '예약을 거절했습니다.';
    }
  };

  const handleStatusConfirm = (reservationId: number, status: Status) => {
    setReservationId(reservationId);
    statusUpdate(status, {
      onSuccess: () => {
        console.log('승인 완료');
        setToastMessage(getToastMessage(status));
        setShowToast(true);
      },
      onError: (error) => {
        console.error('승인 실패', error);
        setToastMessage('정보 수정에 실패했습니다.');
        setShowToast(true);
      },
    });
  };

  return (
    <div className="flex flex-col gap-4 overflow-auto">
      <p className="text-xl font-semibold">예약 내역</p>
      {reservationStatus === 'pending' ? (
        <div className="flex flex-col gap-3.5">
          {hourlyStatus.reservations.map((reservation) => (
            <div
              key={reservation.id}
              className="p-4 border rounded border-gray-300"
            >
              <div className="flex flex-col gap-1.5">
                <div className="flex gap-2.5">
                  <p className="text-base font-semibold text-gray-900">
                    닉네임
                  </p>
                  <p className="text-base font-medium text-black">
                    {reservation.nickname}
                  </p>
                </div>
                <div className="flex gap-2.5">
                  <p className="text-base font-semibold text-gray-900">인원</p>
                  <p className="text-base font-medium text-black">
                    {reservation.headCount}명
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-1.5">
                <button
                  className="rounded-md border border-gnLightBlack bg-nomadBlack px-5 py-2.5 text-sm font-bold text-white"
                  onClick={() =>
                    handleStatusConfirm(reservation.id, { status: 'confirmed' })
                  }
                >
                  승인하기
                </button>
                <button
                  className="rounded-md border border-nomadBlack bg-white px-5 py-2.5 text-sm font-bold text-nomadBlack"
                  onClick={() =>
                    handleStatusConfirm(reservation.id, { status: 'declined' })
                  }
                >
                  거절하기
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : reservationStatus === 'confirmed' ? (
        <div className="flex flex-col gap-3.5">
          {hourlyStatus.reservations.map((reservation) => (
            <div
              key={reservation.id}
              className="p-4 border rounded border-gray-300"
            >
              <div className="flex flex-col gap-1.5">
                <div className="flex gap-2.5">
                  <p className="text-base font-semibold text-gray-900">
                    닉네임
                  </p>
                  <p className="text-base font-medium text-black">
                    {reservation.nickname}
                  </p>
                </div>
                <div className="flex gap-2.5">
                  <p className="text-base font-semibold text-gray-900">인원</p>
                  <p className="text-base font-medium text-black">
                    {reservation.headCount}명
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-1.5">
                <button className="rounded-[26.5px] bg-orange-100 px-4 py-2.5 text-sm font-bold text-orange-200">
                  예약 승인
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3.5">
          {hourlyStatus.reservations.map((reservation) => (
            <div
              key={reservation.id}
              className="p-4 border rounded border-gray-300"
            >
              <div className="flex flex-col gap-1.5">
                <div className="flex gap-2.5">
                  <p className="text-base font-semibold text-gray-900">
                    닉네임
                  </p>
                  <p className="text-base font-medium text-black">
                    {reservation.nickname}
                  </p>
                </div>
                <div className="flex gap-2.5">
                  <p className="text-base font-semibold text-gray-900">인원</p>
                  <p className="text-base font-medium text-black">
                    {reservation.headCount}명
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-1.5">
                <button className="rounded-[26.5px] bg-red-300 px-4 py-2.5 text-sm font-bold text-red-200">
                  예약 거절
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {showToast && (
        <Toast onShow={() => setShowToast(false)}>{toastMessage}</Toast>
      )}
    </div>
  );
};

export default StatusHistory;
