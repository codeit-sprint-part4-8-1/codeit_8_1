import { ReactNode, useEffect, useState } from 'react';

interface ModalFrameProps {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ModalFrame({
  children,
  isOpen,
  setIsOpen,
}: ModalFrameProps) {
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // 배경 클릭 시 모달 닫기
    if (e.currentTarget === e.target) {
      setIsOpen(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className={`relative z-10 ${
        isOpen ? 'animate-modalFadeIn' : 'animate-modalFadeOut'
      }`}
    >
      <div
        className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.7)]"
        onClick={handleBackgroundClick}
      />
      {children}
    </div>
  );
}
