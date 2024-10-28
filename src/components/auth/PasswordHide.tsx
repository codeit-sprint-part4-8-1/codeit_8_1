import Image from "next/image"
import { FC } from "react";

interface PasswordHideButtonProps {
  isPasswordHideOn : boolean;
  setIsPasswordHideOn : React.Dispatch<React.SetStateAction<boolean>>;
}

const PasswordHideButton = ({isPasswordHideOn, setIsPasswordHideOn} : PasswordHideButtonProps)=> {
  return(
    <button onClick={()=>setIsPasswordHideOn(prev => !prev)} type="button">
    <Image
      src={`/ico/ico_visibility_${isPasswordHideOn ?'on.svg' : 'off.svg'}`}
      width={30}
      height={30}
      alt="비밀번호 숨김 버튼"
    />
  </button>
  )
}

export default PasswordHideButton;