import { axiosInstance } from '@/apis/instance/axiosInstance';
import {
  LoginFormData as LoginRequestData,
  UserData,
} from '@/components/auth/AuthDtos';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useRouter } from 'next/router';

interface rootTypes {
  userData: UserData | undefined;
  refreshUser: () => void;
  useLogin: (data: LoginRequestData) => void;
  setUserData: Dispatch<SetStateAction<UserData | undefined>>;
}
const rootContext = createContext<rootTypes>({
  userData: undefined,
  refreshUser: () => {},
  useLogin: () => {},
  setUserData: () => {},
});

export const RootProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<UserData | undefined>(undefined);

  // 페이지 로드 시 localStorage에서 userData와 accessToken 확인하여 상태 업데이트
  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const useLogin = async (data: LoginRequestData) => {
    // 로그인 api 보내기.
    try {
      const rs = await axiosInstance.post('auth/login', data);
      const { user, refreshToken, accessToken } = rs.data;
      setUserData(user);
      // 데이터 받아서 user 에 데이터 넣기
      localStorage.setItem('userData', JSON.stringify(user)); // userData 저장
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      // 엑세스토큰, 리프레시토큰 로컬스토리지에 넣기
    } catch (error) {
      return Promise.reject(error);
      // 에러 그대로 반환하기
    }
  };

  const refreshUser = async () => {
    try {
      const rs = await axiosInstance.get('user/me');
      const data = rs.data;
      setUserData(data);
      localStorage.setItem('userData', JSON.stringify(data)); // userData 업데이트
    } catch (error) {
      console.log(error);
    }
    // axios get /user/me 로 내정보 fetch 후 const rs에 넣음
    // userData 에 덮어쓰기
    // 에러 있을 시 error console에 띄움
  };
  return (
    <rootContext.Provider
      value={{ userData, setUserData, useLogin, refreshUser }}
    >
      {children}
    </rootContext.Provider>
  );
};

export const useRoot = () => {
  const context = useContext(rootContext);
  if (context === undefined) {
    throw new Error('RootContext 는 RootProvider 안에서만 사용할 수 있습니다.');
  }

  return context;
};

export const useLogout = () => {
  // 로그아웃 처리
  const { setUserData } = useRoot();
  const router = useRouter();
  const handleLogout = () => {
    setUserData(undefined); // userData 상태 초기화
    localStorage.removeItem('userData'); // userData 로컬스토리지에서 제거
    localStorage.removeItem('accessToken'); // accessToken 로컬스토리지에서 제거
    localStorage.removeItem('refreshToken'); // refreshToken 로컬스토리지에서 제거
    router.push('/login');
  };
  return handleLogout;
};
