import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import {
  DatesSetArg,
  DayHeaderContentArg,
  EventClickArg,
} from '@fullcalendar/core/index.js';
import { useEffect, useState } from 'react';

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

  // 더미 데이터
  const dummyEvents = [
    { title: '예약 5', start: '2024-10-09', className: 'event-pending' },
    { title: '승인 3', start: '2024-10-10', className: 'event-confirmed' },
    { title: '예약 5', start: '2024-10-11', className: 'event-pending' },
    { title: '승인 3', start: '2024-10-11', className: 'event-confirmed' },
    { title: '완료 2', start: '2024-10-12', className: 'event-completed' },
  ];

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
    const year = dateInfo.start.getFullYear();
    const month = (dateInfo.start.getMonth() + 1).toString().padStart(2, '0');
    setCurrentYear(year.toString());
    setCurrentMonth(month);
  };

  const handleDateClick = (info: DateClickArg) => {
    const clickedDay = info.date.getDate().toString().padStart(2, '0');
    const clickedDate = info.date.toISOString().split('T')[0];
    setSelectedDay(clickedDay);
    setSelectedDate(clickedDate);
  };

  const handleEventClick = (info: EventClickArg) => {
    const clickedDay = info.event.start!.getDate().toString().padStart(2, '0');
    const clickedDate = info.event.start!.toISOString().split('T')[0];
    setSelectedDay(clickedDay);
    setSelectedDate(clickedDate);
  };

  useEffect(() => {
    setEvents(dummyEvents); // 더미 이벤트
  }, []);

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
    </div>
  );
};

export default StatusCalendar;
