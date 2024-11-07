import {
  useMyActivitiesRegistrationSchedule,
  useMyActivitiesReservationCheck,
} from '@/apis/status/useMyActivitiesService';
import CloseBtn from '../../../public/ico/ico_close.svg';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import StatusHistory from './StatusHistory';
import StatusModalLayout from './StatusModalLayout';

interface StatusModalProps {
  activityId: number;
  selectedDay: string;
  selectedDate: string;
  isOpenModal: boolean;
  onClose: () => void;
}

const StatusModal = ({
  activityId,
  selectedDate,
  isOpenModal,
  onClose,
}: StatusModalProps) => {
  const [reservationStatus, setReservationStatus] = useState<string>('pending');
  const [selectedScheduleId, setSelectedScheduleId] = useState<number>(0);

  const { data: dailyStatus, refetch: refetchDailyStatus } =
    useMyActivitiesRegistrationSchedule(selectedDate, activityId);

  const { data: hourlyStatus, refetch: refetchHourlyStatus } =
    useMyActivitiesReservationCheck(
      selectedScheduleId,
      reservationStatus,
      activityId,
    );

  const handleReservationStatus = (status: string) => {
    setReservationStatus(status);
  };

  const handleScheduleChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const scheduleId = Number(event.target.value);
    setSelectedScheduleId(scheduleId);
  };

  const formatSelectedDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}년 ${month}월 ${day}일`;
  };

  useEffect(() => {
    if (selectedDate) {
      refetchDailyStatus();
    }
  }, [selectedDate, refetchDailyStatus]);

  useEffect(() => {
    if (dailyStatus && dailyStatus.data.length > 0) {
      setSelectedScheduleId(dailyStatus.data[0].scheduleId);
    }
  }, [dailyStatus]);

  useEffect(() => {
    if (selectedScheduleId && reservationStatus) {
      refetchHourlyStatus();
    }
  }, [selectedScheduleId, reservationStatus, refetchHourlyStatus]);

  const selectedSchedule = dailyStatus?.data.find(
    (item) => item.scheduleId === selectedScheduleId,
  );

  const pendingCount = selectedSchedule?.count.pending || 0;
  const confirmedCount = selectedSchedule?.count.confirmed || 0;
  const declinedCount = selectedSchedule?.count.declined || 0;

  if (!dailyStatus) return null;
  if (!hourlyStatus) return null;

  return (
    <>
      <StatusModalLayout isOpenModal={isOpenModal} onClose={onClose}>
        <div className="flex h-[697px] w-[429px] flex-col gap-7 rounded-3xl border border-gray-300 bg-white p-6 mobile:w-[342px]">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold">예약 정보</h1>
            <button onClick={onClose}>
              <Image
                src={CloseBtn}
                alt="CloseBtn"
                width={40}
                height={40}
                priority
              />
            </button>
          </div>
          <div className="flex border-b border-gray-300">
            <div
              className={`flex gap-1 px-2.5 pb-4 text-xl font-semibold ${
                reservationStatus === 'pending'
                  ? 'border-b-4 border-green-200'
                  : ''
              }`}
              onClick={() => handleReservationStatus('pending')}
            >
              <p>예약</p>
              <p>{pendingCount}</p>
            </div>
            <div
              className={`flex gap-1 px-2.5 pb-4 text-xl font-semibold ${
                reservationStatus === 'confirmed'
                  ? 'border-b-4 border-green-200'
                  : ''
              }`}
              onClick={() => handleReservationStatus('confirmed')}
            >
              <p>승인</p>
              <p>{confirmedCount}</p>
            </div>
            <div
              className={`flex gap-1 px-2.5 pb-4 text-xl font-semibold ${
                reservationStatus === 'declined'
                  ? 'border-b-4 border-green-200'
                  : ''
              }`}
              onClick={() => handleReservationStatus('declined')}
            >
              <p>거절</p>
              <p>{declinedCount}</p>
            </div>
          </div>
          <div className="flex flex-col gap-3.5">
            <p className="text-xl font-semibold">예약 날짜</p>
            <div className="flex flex-col gap-2.5">
              <div className="text-xl font-normal">
                {formatSelectedDate(selectedDate)}
              </div>
              <select
                className="p-4 text-base font-normal border rounded border-gray-900"
                onChange={handleScheduleChange}
              >
                {dailyStatus?.data.map((item) => (
                  <option key={item.scheduleId} value={item.scheduleId}>
                    {item.startTime} ~ {item.endTime}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <StatusHistory
            reservationStatus={reservationStatus}
            selectedScheduleId={selectedScheduleId}
            hourlyStatus={hourlyStatus?.data}
            activityId={activityId}
          />
        </div>
      </StatusModalLayout>
    </>
  );
};

export default StatusModal;
