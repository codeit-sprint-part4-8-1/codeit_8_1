import { FC, InputHTMLAttributes } from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import clsx from "clsx";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  register: UseFormRegister<any>;
  name: string;
  validation? : object;
  errors? : FieldErrors<any>;
}

const AuthInput: FC<AuthInputProps> = ({ label, register, name, validation, errors, ...props }) => {
  return (
    <label className="flex flex-col">
      {label}
      <input
        {...register(name, validation)}
        placeholder={`${label}를 입력해주세요.`}
        {...props}
        className={
          clsx(
            'h-[58px] bg-white text-gray-900 text-16-400 rounded-[6px] border border-gray-900',
            {'border-red-200': errors?.[name]},
          )
        }
      />
      {errors?.[name]?.message && <span
      className="text-12-400 text-red-200"
      >{String(errors?.[name]?.message)}</span>}
    </label>
  );
}

export default AuthInput;
