import { FC, InputHTMLAttributes } from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";

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
        className="h-[58px] bg-white text-gray-900 text-16-400 rounded-[6px] border border-gray-900"
      />
      {errors?.[name]?.message && <span>{String(errors?.[name]?.message)}</span>}
    </label>
  );
}

export default AuthInput;
