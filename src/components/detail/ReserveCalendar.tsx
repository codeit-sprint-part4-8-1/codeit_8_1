import {
  Detail,
  PostActivityIdReserve,
  Schedules,
} from '@/types/detailPage/type';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Button } from '../@Shared/Buttons/Button';
import { fetchReserveCheck, postActivityIdReserve } from '@/apis/detail/api';
import toast, { Toaster } from 'react-hot-toast';

interface ReserveCalendarPros {
  detailData: Detail;
}

export default function ReserveCalendar({ detailData }: ReserveCalendarPros) {
  const [dateValue, setDateValue] = useState<Date>(new Date()); // 오늘 날짜
  const [attendNumber, setAttendNumber] = useState<number>(1); // 참여 인원
  const [reserveDateTime, setReserveDateTime] = useState<any>([]);
  const [reserveTimeList, setReserveTimeList] = useState<any>([]);
  const [reserveId, setReserveId] = useState<any>(null);

  console.log(reserveTimeList);

  const handleDateChange = (newDate: any) => {
    setDateValue(newDate);
  };

  // 년도와 월 추출 및 API 호출 함수
  const fetchSchedulesByMonth = async ({
    schedules,
    activityId,
  }: {
    schedules: Schedules[];
    activityId: number;
  }) => {
    const yearMonthSet = new Set();

    schedules?.forEach(({ date }) => {
      const [year, month] = date.split('-'); // 'YYYY-MM-DD' 형식에서 년도와 월 추출
      yearMonthSet.add(`${year}-${month}`); // 'YYYY-MM' 형식으로 Set에 추가
    });

    const apiRequests = Array.from(yearMonthSet).map(async (yearMonth: any) => {
      const [year, month] = yearMonth.split('-').map(String);
      const data = await fetchReserveCheck({ activityId, year, month });
      return data;
    });

    const results = await Promise.all(apiRequests);

    const resultDatesTime = results.flatMap((response) => {
      if (response) {
        return response.map((schedule: any) => {
          return schedule;
        });
      }
      return [];
    });
    console.log(resultDatesTime);
    setReserveDateTime(resultDatesTime);
  };

  // 날짜에 표시하는 함수
  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view !== 'month') return null;

    const dateString = date.toLocaleDateString('en-CA');

    // 일정이 있는 날짜에 표시
    const isReserved = reserveDateTime.some(
      (item: any) => item.date === dateString,
    );

    if (isReserved) {
      return 'reserved-date'; // 예약된 날짜에 클래스 적용
    }
    return null;
  };

  useEffect(() => {
    fetchSchedulesByMonth({
      schedules: detailData?.schedules,
      activityId: detailData?.id,
    });
  }, [detailData?.schedules, detailData?.id]);

  const handlePostReserve = async ({
    activityId,
    scheduleId,
    headCount,
  }: PostActivityIdReserve) => {
    try {
      const res = await postActivityIdReserve({
        activityId,
        scheduleId,
        headCount,
      });
      if (res.status >= 200 && res.status < 300) {
        toast.success('예약이 완료되었습니다.');
      } else {
        toast.error(res.data.message);
      }
      console.log('체험 예약 완료', res);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDateClick = (date: Date) => {
    const dateString = date.toLocaleDateString('en-CA');

    const matchingDate = reserveDateTime.find(
      (item: any) => item.date === dateString,
    );

    setReserveId(null);
    setAttendNumber(1);
    if (matchingDate) {
      return setReserveTimeList(matchingDate?.times);
    }

    return setReserveTimeList([]);
  };
  return (
    <div>
      <div className="border-b-2 border-gray-300 pb-4 mb-4">
        <h2 className="text-3xl font-bold">
          ₩ {detailData?.price.toLocaleString()}{' '}
          <span className="text-xl font-normal"> / 인</span>
        </h2>
      </div>
      <h3 className="text-xl font-bold mb-4">날짜</h3>
      <div className="px-4 mb-4">
        <Calendar
          locale="en"
          onChange={handleDateChange}
          onClickDay={handleDateClick}
          calendarType="gregory"
          value={dateValue}
          tileClassName={tileClassName}
        />
      </div>
      <div className="border-b-2 border-gray-300 pb-4 mb-4">
        <h3 className="text-lg font-bold mb-3">예약 가능한 시간</h3>
        <div className="flex items-center gap-3">
          {reserveTimeList.length > 0 ? (
            reserveTimeList?.map((reserveTime: any) => {
              return (
                <button
                  key={reserveTime.id}
                  type="button"
                  className={`w-32 h-12 border-2 border-nomadBlack rounded-lg ${
                    reserveTime.id === reserveId &&
                    'bg-nomadBlack text-white hover:bg-nomadBlack'
                  } hover:bg-gray-200`}
                  onClick={() => {
                    setReserveId(reserveTime.id);
                  }}
                >
                  {reserveTime?.startTime} ~ {reserveTime?.endTime}
                </button>
              );
            })
          ) : (
            <div>예약이 가능한 날짜를 선택해주세요.</div>
          )}
        </div>
      </div>
      <div className="border-b-2 border-gray-300 pb-6 mb-4">
        <h3 className="text-lg font-bold mb-3">참여 인원수</h3>
        <div className="flex justify-between items-center gap-5 w-32 h-10 border-2 border-gray-300 rounded-lg px-3 mb-6">
          <button
            type="button"
            className="flex justify-center items-center text-xl w-5 h-5 disabled:text-gray-500"
            disabled={attendNumber === 1}
            onClick={() => {
              setAttendNumber((prev) => prev - 1);
            }}
          >
            -
          </button>
          <span>{attendNumber}</span>
          <button
            type="button"
            className="flex justify-center items-center text-xl w-5 h-5"
            onClick={() => {
              setAttendNumber((prev) => prev + 1);
            }}
          >
            +
          </button>
        </div>
        <Button
          type="button"
          label="예약하기"
          variant="solid"
          className="w-full h-[56px] text-[16px]"
          disabled={reserveId && attendNumber ? false : true}
          onClick={() => {
            handlePostReserve({
              activityId: detailData?.id,
              scheduleId: reserveId,
              headCount: attendNumber,
            });
          }}
        />
      </div>
      <div className="flex justify-between items-center gap-3">
        <h3 className="text-xl font-bold">총 합계</h3>
        <span className="text-xl font-bold">
          ₩ {(detailData?.price * attendNumber).toLocaleString()}
        </span>
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
