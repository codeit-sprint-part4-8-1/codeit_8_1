import { useState, useEffect } from 'react';

// 로컬 스토리지에서 닉네임을 가져오는 함수
const getNickname = () => {
  if (typeof window !== 'undefined') {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      return parsedUserData.nickname || '익명'; // nickname이 없으면 '익명'을 반환
    }
    return '익명'; // userData가 없을 경우 '익명' 반환
  }
};

export const useNickname = () => {
  const [nickname, setNickname] = useState<string>('익명');

  // 로컬 스토리지에서 닉네임을 가져오는 useEffect
  useEffect(() => {
    const fetchedNickname = getNickname(); // 로컬 스토리지에서 닉네임을 가져옵니다.
    setNickname(fetchedNickname); // 상태에 저장
  }, []);

  return nickname;
};
