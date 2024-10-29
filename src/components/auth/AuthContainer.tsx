import { ReactNode } from "react";
import clsx from "clsx";

interface AuthContainerProps {
  children: ReactNode;
}

const AuthContainer = ({ children }: AuthContainerProps) => {
  return (
    <div
    className={
      clsx(
        'flex flex-col justify-center items-center',
        'w-full mt-[110px] mb-[85px]',
        'md:w-[640px] md:mt-[118px] md:mb-[70px]',
        'xl:mt-[118px] xl:mb-[54px]'
    )}
    >
      {children}
    </div>
  );
};

export default AuthContainer; 
