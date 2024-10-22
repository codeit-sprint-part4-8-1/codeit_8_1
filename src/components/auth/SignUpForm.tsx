import { FC, useState } from 'react';
import { Button } from "@/components/@Shared/Buttons/Button";
import { useForm } from 'react-hook-form';
import { signUpFormData } from './AuthDtos';
import AuthInput from './AuthInput';
import clsx from 'clsx';
import createValidations from './Validations';

const SignUpForm: FC = () => {
  const { register, handleSubmit, watch , trigger, formState: { errors } } = useForm<signUpFormData>({ mode: 'onBlur' });
  const [isButtonValid, setIsButtonValid] = useState<boolean>(false);

  const Validations = createValidations(watch('password'));

  // 폼 전체 유효성 검사 및 버튼 상태 업데이트
  const handleBlur = async () => {
    const result = await trigger();  // blur 시에만 유효성 검사
    setIsButtonValid(result);        // 검사 결과에 따라 버튼 활성화 여부 결정
  };

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        await new Promise(r => setTimeout(r, 1000));
        alert(JSON.stringify(data));
      })}
      className={clsx(
        'mt-6 flex flex-col justify-center align-center gap-7',
        'w-full',
      )}
    >
      <AuthInput label="이메일" register={register} name="email" validation={Validations.email} errors={errors} onBlur={handleBlur} />
      <AuthInput label="닉네임" register={register} name="nickname" validation={Validations.nickname} errors={errors} onBlur={handleBlur} />
      <AuthInput label="비밀번호" register={register} name="password" validation={Validations.password} errors={errors} onBlur={handleBlur} />
      <AuthInput label="비밀번호 확인" register={register} name="password-repeat" validation={Validations.passwordRepeat} errors={errors} onBlur={handleBlur} />
      <Button variant="solid" label="회원가입 하기" type="submit" disabled={!isButtonValid} />
    </form>
  );
};

export default SignUpForm;
