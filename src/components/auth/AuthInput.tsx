import { FC, InputHTMLAttributes, useState } from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import clsx from "clsx";
import PasswordHideButton from "./PasswordHide";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  register: UseFormRegister<any>;
  name: string;
  validation? : object;
  errors? : FieldErrors<any>;
  type : 'text' | 'password' | 'email';
}

const AuthInput: FC<AuthInputProps> = ({ type = 'text', label, register, name, validation, errors, ...props }) => {
  const [ isPasswordHideOn, setIsPasswordHideOn ] = useState<boolean>(true);
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={name}>
        {label}
      </label>
    <div className="relative w-full">
    <input
        {...register(name, validation)}
        placeholder={`${label}를 입력해주세요.`}
        {...props}
        className={
          clsx(
            'w-full h-[58px] bg-white text-gray-900 text-16-400 rounded-[6px] border border-gray-900',
            {'border-red-200': errors?.[name]},
          )
        }
        id={name}
        type={type === 'password' ? 
          (isPasswordHideOn === true ? 'password' : 'text') :
        type}
    />
    {type === 'password' ? <PasswordHideButton isPasswordHideOn={isPasswordHideOn} setIsPasswordHideOn={setIsPasswordHideOn} /> : null }
    </div>
    {errors?.[name]?.message && <span
      className="text-12-400 text-red-200"
    >{String(errors?.[name]?.message)}</span>}
</div>
  );
}

export default AuthInput;
