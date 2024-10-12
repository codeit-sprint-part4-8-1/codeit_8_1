import { useState } from 'react';
import { Menu } from '@headlessui/react';
import Image from 'next/image';
import LogoButton from './Buttons/LogoButton';

const GNB = () => {
  // 로그인 상태 관리
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* 로고 */}
        <LogoButton />
        {/* 로그인 상태에 따른 UI 조건부 렌더링 */}
        {isLoggedIn ? (
          <div className="flex items-center space-x-4">
            {/* 알림 버튼 */}
            <button className="text-gray-700 hover:text-blue-500">
              <Image
                src="/Ico_notification.svg"
                alt="종모양 아이콘(알림)"
                className="w-6 h-6"
              />
            </button>

            {/* 프로필 드롭다운 */}
            <Menu as="div" className="relative">
              <Menu.Button className="focus:outline-none">
                {/* 프로필 이미지 */}
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://via.placeholder.com/40"
                  alt="User Profile"
                />
              </Menu.Button>
              <Menu.Items className="absolute right-0 w-48 bg-white shadow-md rounded-md mt-2 z-50">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="/me"
                      className={`block px-4 py-2 text-sm ${
                        active ? 'bg-gray-100' : ''
                      }`}
                    >
                      마이페이지
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => setIsLoggedIn(false)} // 로그아웃 처리
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        active ? 'bg-gray-100' : ''
                      }`}
                    >
                      로그아웃
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>
        ) : (
          <div className="space-x-4">
            <a href="/login" className="text-gray-700 hover:text-blue-500">
              로그인
            </a>
            <a href="/signup" className="text-gray-700 hover:text-blue-500">
              회원가입
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default GNB;
