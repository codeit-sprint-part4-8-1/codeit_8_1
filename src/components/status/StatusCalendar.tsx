import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import {
  DatesSetArg,
  DayHeaderContentArg,
  EventClickArg,
} from '@fullcalendar/core/index.js';
import { useEffect, useState } from 'react';
import { useMyActivitiesRegistrationDashboard } from '@/apis/status/useMyActivitiesService';
import StatusModal from './StatusModal';
import { useModal } from './../../hook/useModal';
import StatusCalendarSkeleton from './StatusCalendarSkeleton';

interface Reservation {
  completed: number;
  confirmed: number;
  pending: number;
}

interface EventData {
  date: string;
  reservations: Reservation;
}

interface StatusCalendarProps {
  activityId: number;
}

const StatusCalendar = ({ activityId }: StatusCalendarProps) => {
  const [currentYear, setCurrentYear] = useState<string>(
    new Date().getFullYear().toString(),
  );
  const [currentMonth, setCurrentMonth] = useState<string>(
    (new Date().getMonth() + 1).toString().padStart(2, '0'),
  );
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [events, setEvents] = useState<{ title: string; start: string }[]>([]);

  const {
    data: monthlyStatus,
    refetch,
    isLoading,
  } = useMyActivitiesRegistrationDashboard(
    currentYear,
    currentMonth,
    activityId,
  );
  const { isOpenModal, handleModalClose, handleModalOpen } = useModal();

  const transformEvents = (data: EventData[]) => {
    const events: { title: string; start: string; className: string }[] = [];
    data.forEach((item) => {
      if (item.reservations.pending > 0) {
        events.push({
          title: `예약: ${item.reservations.pending}`,
          start: item.date,
          className: 'event-pending',
        });
      }
      if (item.reservations.confirmed > 0) {
        events.push({
          title: `승인: ${item.reservations.confirmed}`,
          start: item.date,
          className: 'event-confirmed',
        });
      }
      if (item.reservations.completed > 0) {
        events.push({
          title: `완료: ${item.reservations.completed}`,
          start: item.date,
          className: 'event-completed',
        });
      }
    });
    return events;
  };

  const renderDayHeaderContent = (args: DayHeaderContentArg) => {
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    return days[args.date.getDay()];
  };

  const renderDayCellContent = (dayCell: {
    dayNumberText: string;
    date: Date;
  }) => {
    const cellDate = dayCell.date.toISOString().split('T')[0];
    const hasEvents = events.some((event) => event.start === cellDate);

    return (
      <div className={`${hasEvents ? 'cursor-pointer' : 'disabled'}`}>
        {dayCell.dayNumberText.replace('일', '')}
      </div>
    );
  };

  const handleDatesSet = (dateInfo: DatesSetArg) => {
    const yearOfFirstDay = dateInfo.start.getFullYear();
    const yearOfLastDay = dateInfo.end.getFullYear();
    const monthOfFirstDay = dateInfo.start.getMonth() + 1;
    const monthOfLastDay = dateInfo.end.getMonth() + 1;

    let year;
    let month;
    if (dateInfo.start.getDate() >= 23) {
      month = dateInfo.start.getMonth() + 2;
      if (month > 12) {
        month = 1;
      }
    } else {
      month = dateInfo.start.getMonth() + 1;
    }
    if (yearOfFirstDay !== yearOfLastDay) {
      if (monthOfFirstDay <= 12 && monthOfLastDay === 1) {
        year = yearOfFirstDay;
      } else {
        year = yearOfLastDay;
      }
    } else {
      year = yearOfFirstDay;
    }

    setCurrentMonth(month.toString().padStart(2, '0'));
    setCurrentYear(year.toString());
  };

  const handleDateClick = (info: DateClickArg) => {
    const clickedDay = info.date.getDate().toString().padStart(2, '0');
    const clickedDate = info.date.toISOString().split('T')[0];
    setSelectedDay(clickedDay);
    setSelectedDate(clickedDate);

    const cellDate = clickedDate;
    const hasEvents = events.some((event) => event.start === cellDate);

    if (hasEvents) {
      handleModalOpen();
    } else {
      setSelectedDay('');
      setSelectedDate('');
    }
  };

  const handleEventClick = (info: EventClickArg) => {
    const clickedDay = info.event.start!.getDate().toString().padStart(2, '0');
    const clickedDate = info.event.start!.toISOString().split('T')[0];
    setSelectedDay(clickedDay);
    setSelectedDate(clickedDate);

    handleModalOpen();
  };

  const handleCloseStatusModal = () => {
    setSelectedDay('');
    setSelectedDate('');
    handleModalClose();
  };

  useEffect(() => {
    if (activityId !== null) {
      refetch();
    }
  }, [activityId, refetch]);

  useEffect(() => {
    if (monthlyStatus) {
      const newEvents = transformEvents(monthlyStatus.data);
      setEvents(newEvents);
    }
  }, [monthlyStatus]);

  useEffect(() => {
    if (currentYear && currentMonth) {
      refetch();
    }
  }, [currentYear, currentMonth, refetch]);

  if (isLoading) return <StatusCalendarSkeleton />;

  return (
    <div className="relative tablet:h-[813px] mobile:h-[813px]">
      <FullCalendar
        locale={'kr'}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventContent={(eventInfo) => (
          <div
            className={`${
              eventInfo.event.classNames.includes('event-pending')
                ? 'w-full bg-blue-200 text-white'
                : eventInfo.event.classNames.includes('event-confirmed')
                ? 'w-full bg-orange-100 text-orange-200'
                : 'w-full bg-gray-300 text-gray-800'
            } rounded px-1 py-[3px] mt-auto`}
          >
            {eventInfo.event.title}
          </div>
        )}
        timeZone="KST"
        fixedWeekCount={false}
        headerToolbar={{
          left: 'prev',
          center: 'title',
          right: 'next',
        }}
        height={813}
        dayHeaderContent={renderDayHeaderContent}
        dayCellContent={renderDayCellContent}
        datesSet={handleDatesSet}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
      />
      {isOpenModal && (
        <StatusModal
          activityId={activityId}
          selectedDay={selectedDay}
          selectedDate={selectedDate}
          isOpenModal={isOpenModal}
          onClose={handleCloseStatusModal}
        />
      )}
    </div>
  );
};

export default StatusCalendar;
