import { FC } from 'react';
import { Button } from "@/components/@Shared/Buttons/Button";
import AuthInput from './AuthInput';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';


interface signUpFormData {
  email:string;
  nickname: string;
  password: string;
}

const SignUpForm: FC = () => {
  const { register, handleSubmit, watch, formState: { isSubmitting,errors} } = useForm<signUpFormData>({mode: 'onBlur'});
  const passwordValue = watch('password');

  const Validations = {
    
    email : {
      required: "이메일은 필수 입력입니다.",
      pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "이메일 형식에 맞지 않습니다."
      }
    },
    
    password : {
      required: "비밀번호는 필수 입력입니다.",
      minLength: {
      value: 8,
      message: "비밀번호는 8자 이상 입력해주세요."
      }
    },

    nickname : {
      required: "닉네임은 필수 입력입니다.",
      maxLength: {
      value: 10,
      message: "닉네임은 10자 이하로 입력해주세요."
      }
    },

    passwordRepeat : {
      required: "비밀번호를 한 번 더 입력해주세요.",
      validate : (value : string ) => value === passwordValue || "비밀번호가 일치하지 않습니다.",
    }

  }

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        await new Promise(r => setTimeout(r, 1000))
        alert(JSON.stringify(data));
      })}
      className={clsx(
        'mt-6 flex flex-col justify-center align-center gap-7',
        'w-full',
      )}>
      <AuthInput label="이메일" register={register} name="email" validation={Validations.email} errors={errors} />
      <AuthInput label="닉네임" register={register} name="nickname" validation={Validations.nickname} errors={errors}/>
      <AuthInput label="비밀번호" register={register} name="password" validation={Validations.password} errors={errors} />
      <AuthInput label="비밀번호 확인" register={register} name="password-repeat" validation={Validations.passwordRepeat} errors={errors} />
      <Button variant="solid" label="회원가입 하기" type="submit"  />
    </form>
  );
}

export default SignUpForm;
