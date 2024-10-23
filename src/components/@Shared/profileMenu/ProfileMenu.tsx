import Image from 'next/image';
import { useEffect, useState } from 'react';
import { MyPageProfileMenu } from '@/types/myPage/type';
import DefaultProfile from '../../../../public/image/defaultProfile.webp';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useProfileImage from '../../../hook/useProfileImage';

interface ProfileMenuProps {
  profileImageUrl?: string | undefined;
}

export default function ProfileMenu({ profileImageUrl }: ProfileMenuProps) {
  const MENU_CONTENT_LIST: MyPageProfileMenu[] = [
    {
      name: '내 정보', // 메뉴 이름
      link: '/myInfo', // 해당 페이지 파일명
      defaultImage: '/ico/ico_myInfo.svg', // 기본 메뉴 아이콘
      activeImage: '/ico/ico_myInfoActive.svg', // 선택된 메뉴 아이콘
    },
    {
      name: '예약 내역',
      link: '/history',
      defaultImage: '/ico/ico_history.svg',
      activeImage: '/ico/ico_historyActive.svg',
    },
    {
      name: '내 체험 관리',
      link: '/management',
      defaultImage: '/ico/ico_management.svg',
      activeImage: '/ico/ico_managementActive.svg',
    },
    {
      name: '예약 현황',
      link: '/status',
      defaultImage: '/ico/ico_status.svg',
      activeImage: '/ico/ico_statusActive.svg',
    },
  ];
  const [selectedMenu, setSelectedMenu] = useState<string>('');
  const { userProfileImage, uploadImage } = useProfileImage(profileImageUrl);
  const router = useRouter();

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
  };

  // 이미지 파일이 변경되면 변경된 이미지 파일을 uploadImage함수로 전달
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files?.[0];
    if (imageFile) {
      uploadImage(imageFile);
    }
  };

  useEffect(() => {
    setSelectedMenu(router.pathname);
  }, []);

  return (
    <div className="flex flex-col items-center w-full max-w-96 h-[430px] p-6 border-2 border-gray-300 rounded-xl bg-white shadow-[0px_3px_10px_rgba(17,34,17,0.2)]">
      <div className="relative w-40 h-40 rounded-full mb-6 border-2 border-gray-300 bg-[#e3e5e8]">
        <Image
          src={userProfileImage || DefaultProfile}
          width={160}
          height={160}
          className="rounded-full w-full h-full"
          alt="프로필 이미지"
        />
        <input
          id="fileImage"
          type="file"
          className="w-0 h-0"
          onChange={handleFileChange}
        />
        <label
          htmlFor="fileImage"
          className="flex justify-center items-center absolute bottom-0 right-0 w-11 h-11 rounded-full bg-[#0B3B2D] cursor-pointer"
        >
          <Image
            src="/ico/ico_pen.svg"
            width={25}
            height={25}
            alt="연필 아이콘"
          />
        </label>
      </div>
      <div className="w-full">
        <ul>
          {MENU_CONTENT_LIST.map((menu) => {
            // 현재 url경로 pathname과 클릭한 메뉴의 pathname가 일치하면 버튼 활성화
            const isActive = selectedMenu === menu.link;
            return (
              <li key={menu.link}>
                <Link
                  href={menu.link}
                  className={`w-full h-11 px-4 flex items-center rounded-xl text-base font-bold transition-all ${
                    isActive
                      ? 'text-nomadBlack bg-green-100 hover:bg-green-100 hover:text-nomadBlack'
                      : 'text-gray-600 hover:bg-gray-200'
                  } `}
                  onClick={() => handleMenuClick(menu.link)}
                >
                  <Image
                    src={isActive ? menu.activeImage : menu.defaultImage}
                    width={24}
                    height={24}
                    className="mr-4"
                    alt="메뉴 아이콘"
                  />
                  {menu.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
