import { useRouter } from 'next/router';

interface ModalCloseProps {
  type: 'login' | 'signUp';
  isSuccess: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const useModalClose = () => {
  const router = useRouter();

  const modalClose = ({ type, isSuccess, setModalOpen }: ModalCloseProps) => {
    setModalOpen(false);
    if (isSuccess) {
      if (type === 'login') router.push('/');
      if (type === 'signUp') router.push('/login');
    }
  };

  return modalClose;
};

export default useModalClose;