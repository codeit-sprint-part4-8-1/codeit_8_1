import { ReactNode, useEffect, useState } from 'react';

interface ModalFrameProps {
  children: ReactNode;
  isOpen: boolean;
}

export default function ModalFrame({ children, isOpen }: ModalFrameProps) {
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

  if (!isVisible) return null;

  return (
    <div
      className={`relative z-10 ${
        isOpen ? 'animate-modalFadeIn' : 'animate-modalFadeOut'
      }`}
    >
      <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.7)]" />
      {children}
    </div>
  );
}
