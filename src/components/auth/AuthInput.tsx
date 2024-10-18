import { FC } from "react";

interface AuthInputProps {
  label : string;
  name : string;
}

const AuthInput : FC<AuthInputProps> = ({label, name})=> {
  return(
    <label htmlFor={name}
    className="flex flex-col">
      {label}
      <input 
        id={name}
        name={name}
        placeholder={`${label}를 입력해주세요.`}
        className="h-[58px] bg-white text-gray-900 text-16-400 rounded-[6px] border border-gray-900"
      />
    </label>
  )
}

export default AuthInput;