import Image from "next/image"

interface PasswordHideButtonProps {
  isPasswordHideOn : boolean;
  setIsPasswordHideOn : React.Dispatch<React.SetStateAction<boolean>>;
}

const PasswordHideButton = ({isPasswordHideOn, setIsPasswordHideOn} : PasswordHideButtonProps)=> {
  return(
    <button 
    onClick={()=>setIsPasswordHideOn(prev => !prev)}
     type="button"
     className="absolute right-3 top-[25%]">
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