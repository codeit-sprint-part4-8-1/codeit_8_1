import { useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';

const categories = ['문화 예술', '식음료', '스포츠', '투어', '관광'];

interface DropdownProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const selectCategory = (category: string) => {
    onCategoryChange(category);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <button
        onClick={toggleDropdown}
        className="w-full bg-white border border-gray-300 rounded-md px-4 py-3 text-left flex justify-between items-center"
      >
        <span className={selectedCategory ? 'text-black' : 'text-gray-500'}>
          {selectedCategory || '카테고리'}
        </span>
        <HiChevronDown className="text-gray-400" />
      </button>

      {isOpen && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg p-2">
          {categories.map((category) => (
            <li
              key={category}
              onClick={() => selectCategory(category)}
              className={`cursor-pointer px-4 py-2 flex items-center rounded-md ${
                selectedCategory === category
                  ? 'bg-nomadBlack text-white'
                  : 'hover:bg-gray-200'
              }`}
            >
              {selectedCategory === category && <span className="mr-2">✔</span>}
              {category}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
