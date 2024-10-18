import { FC } from 'react';
import { Button } from "@/components/@Shared/Buttons/Button";
import AuthInput from './AuthInput';
import clsx from 'clsx';

const LoginForm : FC = ()=> {
  return(
      <form
      className={
        clsx(
          'mt-6 flex flex-col justify-center align-center gap-7',
          'w-full',
        )}>
        <AuthInput label="이메일" name="email" />
        <AuthInput label="비밀번호" name="pw" />
        <Button variant="solid" label="로그인 하기" />
    </form>
  )
}

export default LoginForm;