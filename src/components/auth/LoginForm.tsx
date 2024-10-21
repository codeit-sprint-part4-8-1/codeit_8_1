import { FC } from 'react';
import { Button } from "@/components/@Shared/Buttons/Button";
import AuthInput from './AuthInput';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';

const LoginForm: FC = () => {
  const { register, handleSubmit } = useForm();

  return (
    <form
      onSubmit={handleSubmit((data) => alert(JSON.stringify(data)))}
      className={clsx(
        'mt-6 flex flex-col justify-center gap-7',
        'w-full',
      )}>
      <AuthInput label="이메일" register={register} name="email" />
      <AuthInput label="비밀번호" register={register} name="password" />
      <Button variant="solid" label="로그인 하기" type="submit" />
    </form>
  );
}

export default LoginForm;
