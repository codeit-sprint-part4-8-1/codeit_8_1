import Image from 'next/image';
import { useEffect, useState } from 'react';
import { MyPageProfileMenu } from '@/types/myPage/type';
import DefaultProfile from '../../../public/image/defaultProfile.webp';
import IcoPen from '../../../public/ico/ico_pen.svg';
import IcoMyInfo from '../../../public/ico/ico_myInfo.svg';
import IcoHistory from '../../../public/ico/ico_history.svg';
import IcoManagement from '../../../public/ico/ico_management.svg';
import IcoStatus from '../../../public/ico/ico_status.svg';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { fetchImageUrl, fetchLoginTest, updateImage } from '@/apis/myInfo/api';

export default function ProfileMenu() {
  const MENU_CONTENT_LIST: MyPageProfileMenu[] = [
    {
      name: '내 정보', // 메뉴 이름
      link: '/myInfo', // 해당 페이지 파일명
      image: IcoMyInfo, // 메뉴 아이콘
    },
    {
      name: '예약 내역',
      link: '/history',
      image: IcoHistory,
    },
    {
      name: '내 체험 관리',
      link: '/management',
      image: IcoManagement,
    },
    {
      name: '예약 현황',
      link: '/status',
      image: IcoStatus,
    },
  ];
  const [selectedMenu, setSelectedMenu] = useState<string>('');
  const [userInfo, setUserInfo] = useState({
    nickname: '',
    profileImageUrl: '',
  });
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

  // 전달 받은 이미지 파일을 url로 변경하고 해당 url을 사용해서 내 정보의 이미지 파일 수정
  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetchImageUrl(formData);
      const profileImageUrl = response?.data.profileImageUrl;
      if (response?.data) {
        const res = await updateImage(profileImageUrl);
        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          profileImageUrl: res.profileImageUrl, // 새로운 이미지 URL로 업데이트
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 로그인 기능구현전이어서 임시로 구현
  const getLoginTest = async () => {
    try {
      const userData = await fetchLoginTest({
        userEmail: 'test96@test.com',
        userPassword: 'testtest96',
      });
      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        nickname: userData.user.nickname,
        profileImageUrl: userData.user.profileImageUrl,
      }));
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  useEffect(() => {
    getLoginTest();
    setSelectedMenu(router.pathname);
  }, []);

  return (
    <div className="flex flex-col items-center w-full max-w-96 h-[430px] p-6 border-2 border-gray-300 rounded-xl bg-white shadow-[0px_3px_10px_rgba(17,34,17,0.2)]">
      <div className="relative w-40 h-40 rounded-full mb-6 border-2 border-gray-300 bg-[#e3e5e8]">
        <Image
          src={userInfo.profileImageUrl || DefaultProfile}
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
          <Image src={IcoPen} alt="연필 아이콘" />
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
                  className={`w-full h-11 px-4 flex items-center rounded-xl text-base font-bold hover:bg-green-100 hover:text-nomadBlack ${
                    isActive ? 'text-nomadBlack bg-green-100' : 'text-gray-600'
                  } `}
                  onClick={() => handleMenuClick(menu.link)}
                >
                  <Image
                    src={menu.image}
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
