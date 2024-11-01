import { ReactNode, useState } from "react";
import clsx from "clsx";
import AuthLogo from "./AuthLogo";
import AuthBottom from "./AuthBottom";


interface AuthContainerProps {
  children: ReactNode;
}

const AuthContainer = ({ children }: AuthContainerProps) => {

  return (
    <div className="flex w-full justify-center">
      <div
      className={
        clsx(
          'flex flex-col justify-center items-center',
          'w-full mt-[110px] mb-[85px]',
          'md:w-[640px] md:mt-[118px] md:mb-[70px]',
          'xl:mt-[118px] xl:mb-[54px]'
      )}
      >
      <AuthLogo />
        {children}
      <AuthBottom />
      </div>
    </div>
  );
};

export default AuthContainer; 
