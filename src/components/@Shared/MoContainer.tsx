import { ReactNode } from 'react';

interface MoContainer {
  children: ReactNode;
  isVisible: boolean;
}

export default function MoContainer({ children, isVisible }: MoContainer) {
  return (
    <div className={`${isVisible ? 'block' : 'hidden'} w-full`}>{children}</div>
  );
}
