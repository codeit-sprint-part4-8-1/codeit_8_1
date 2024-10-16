import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css'; // 기본 CSS 적용

const CalendarDropdown = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleCalendar = () => setIsOpen(!isOpen);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setIsOpen(false); // 날짜 선택 후 캘린더 닫힘
  };

  return (
    <div className="relative w-64">
      <button
        onClick={toggleCalendar}
        className="w-full bg-white border border-gray-300 rounded-md px-4 py-2 text-left flex justify-between items-center"
      >
        <span className={selectedDate ? 'text-black' : 'text-gray-500'}>
          {selectedDate ? format(selectedDate, 'yy/MM/dd') : 'YY/MM/DD'}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6 text-gray-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 9l4-4 4 4M8 15l4 4 4-4"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute mt-2 z-10 bg-white border rounded-lg shadow-lg">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            inline
            renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
              <div className="flex justify-between items-center px-2 py-2">
                <button onClick={decreaseMonth} className="text-gray-700">
                  &lt;
                </button>
                <span className="text-lg font-semibold">
                  {format(date, 'MMMM yyyy')}
                </span>
                <button onClick={increaseMonth} className="text-gray-700">
                  &gt;
                </button>
              </div>
            )}
            dayClassName={(date) =>
              format(date, 'd') === format(new Date(), 'd')
                ? 'bg-green-900 text-white'
                : ''
            }
          />
        </div>
      )}
    </div>
  );
};

export default CalendarDropdown;
