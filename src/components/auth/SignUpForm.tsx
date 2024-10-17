import { FC } from 'react';
import { Button } from "@/components/@Shared/Buttons/Button";
import AuthInput from './AuthInput';
import clsx from 'clsx';

const SignUpForm : FC = ()=> {
  return(
      <form
      className={
        clsx(
          'mt-6 flex flex-col justify-center align-center gap-7',
          'w-full',
        )}>
        <AuthInput label="이메일" name="email" />
        <AuthInput label="닉네임" name="nickname" />
        <AuthInput label="비밀번호" name="pw" />
        <AuthInput label="비밀번호 확인" name="pw-repeat" />
        <Button variant="solid" label="회원가입 하기" />
    </form>
  )
}

export default SignUpForm;