import { useRouter } from 'next/router';
import React, { useState, ChangeEvent, MouseEvent } from 'react';

interface SearchBarProps {
  setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
  setTotalItems: React.Dispatch<React.SetStateAction<number>>;
}

const SearchBar: React.FC<SearchBarProps> = ({
  setSearchKeyword,
  setTotalItems,
}) => {
  const [searchWord, setSearchWord] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (searchWord === '') {
      setIsFocused(false);
    }
  };

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSearchKeyword(searchWord); // 검색어 업데이트
    if (searchWord === '') router.push('/');
    else router.push(`/search?keyword=${searchWord}`);
  };

  return (
    <div className="relative bg-transparent">
      <form className="flex flex-col gap-8 rounded-2xl bg-white px-6 py-8 shadow-lg mobile:px-2 mobile:py-4 tablet2:px-4 tablet2:py-6 pc:px-6 pc:py-8">
        <label className="text-xl font-bold text-black">
          무엇을 체험하고 싶으신가요?
        </label>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              className="peer placeholder-transparent h-14 rounded-md border border-solid border-green-100 px-10 py-2 focus:border-gray-900 focus:outline-none mobile:w-full tablet2:w-[30rem] pc:w-[62.5rem]"
              type="search"
              value={searchWord}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              // 해당 placeholder 대신 아래 <label> 텍스트를 사용
              placeholder="내가 원하는 체험은"
            />
            <label
              // input에 텍스트가 있을 경우 laber 텍스트를 밀어올림
              className={`absolute left-11 transition-all ${
                isFocused || searchWord
                  ? 'top-[-0.75rem] text-gray-700 bg-white px-2'
                  : 'top-4 text-gray-700'
              }`}
            >
              내가 원하는 체험은
            </label>
            <img
              className="absolute top-1"
              src="/ico/ico_search.svg"
              alt="search-icon"
            />
          </div>
          <button
            className="h-14 w-[136px] rounded-md bg-nomadBlack py-2 font-bold text-white whitespace-nowrap mobile:w-[96px] mobile:px-2 tablet2:w-[100px] tablet2:px-4 pc:w-[136px] pc:px-8"
            type="submit"
            onClick={handleClick}
          >
            검색하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
