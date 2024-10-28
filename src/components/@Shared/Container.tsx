import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  fullWidth?: boolean; // 전체 너비를 사용할지 여부를 결정하는 prop
}

export default function Container({
  children,
  fullWidth = false,
}: ContainerProps) {
  return (
    <div
      className={fullWidth ? 'w-full' : 'w-full max-w-screen-xl mx-auto px-4'}
    >
      {children}
    </div>
  );
}
