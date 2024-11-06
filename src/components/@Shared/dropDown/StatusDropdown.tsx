import { useState, useEffect } from 'react';

interface Activity {
  id: number;
  title: string;
}

interface List {
  activities: Activity[];
}

interface StatusDropdownProps {
  list: List;
  onSelect: (optionId: number) => void;
}

const StatusDropdown: React.FC<StatusDropdownProps> = ({ list, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Activity | null>(null);

  useEffect(() => {
    if (list.activities.length > 0) {
      setSelectedOption(list.activities[0]);
      onSelect(list.activities[0].id);
    }
  }, [list, onSelect]);

  const handleOptionClick = (option: Activity) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option.id);
  };

  return (
    <div className="relative w-full">
      <label className="absolute px-1 text-sm font-normal bg-white -top-2 left-3">
        체험명
      </label>
      <div
        className="w-full border border-gray-900 rounded h-14 flex items-center justify-between px-3 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedOption ? selectedOption.title : '선택해주세요'}</span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 border border-gray-900 rounded bg-white shadow-md max-h-60 overflow-y-auto">
          {list.activities.map((activity) => (
            <li
              key={activity.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleOptionClick(activity)}
            >
              {activity.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StatusDropdown;
