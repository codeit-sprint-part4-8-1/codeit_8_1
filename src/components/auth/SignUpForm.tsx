import { FC, useState } from 'react';
import { Button } from "@/components/@Shared/Buttons/Button";
import { useForm } from 'react-hook-form';
import { signUpFormData, signUpFormDataWithRepeat } from './AuthDtos';
import AuthInput from './AuthInput';
import clsx from 'clsx';
import createValidations from './Validations';
import { axiosInstance } from '@/apis/instance/axiosInstance';
import { useRouter } from 'next/router'; // useRouter import 추가
import Modal from './modal';
const SignUpForm: FC = () => {
  const { register, handleSubmit, watch, trigger, formState: { errors } } = useForm<signUpFormData>({ mode: 'onBlur' });
  const [isButtonValid, setIsButtonValid] = useState<boolean>(false);
  const [modalOpen, setModalOpen ] = useState<boolean>(false);
  const router = useRouter(); // useRouter 훅 사용

  const Validations = createValidations(watch('password'));

  const handleBlur = async (name: keyof Partial<signUpFormDataWithRepeat>) => {
    const result = await trigger(name as any); // 특정 필드만 검사
    const allFieldsFilled = Object.values(watch()).every(value => value !== ""); // 모든 필드가 채워졌는지 체크
    setIsButtonValid(result && allFieldsFilled); // 유효성 검사 결과와 필드 채워짐 여부에 따라 버튼 상태 업데이트
  };

  const onSubmit = async (data: signUpFormData) => {
    try {
      const response = await axiosInstance.post('/users', data); // 회원가입 API 요청
      alert('회원가입 성공: ' + JSON.stringify(response.data));
      router.push('/login'); // 회원가입 성공 후 로그인 페이지로 이동
    } catch (error) {
      console.error('회원가입 실패:', error);
      alert('회원가입 실패');
    }
  }

  return (
    <>
    <button onClick={()=> {setModalOpen(true)}}>모달 생성</button>
    <Modal isOpen={modalOpen} onClose={()=>setModalOpen(false)} title='테스트 모달' />
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={clsx(
        'mt-6 flex flex-col justify-center align-center gap-7',
        'w-full',
      )}
    >
      <AuthInput label="이메일" register={register} name="email" validation={Validations.email} errors={errors} onBlur={() => handleBlur('email')} />
      <AuthInput label="닉네임" register={register} name="nickname" validation={Validations.nickname} errors={errors} onBlur={() => handleBlur('nickname')} />
      <AuthInput label="비밀번호" register={register} name="password" validation={Validations.password} errors={errors} onBlur={() => handleBlur('password')} />
      <AuthInput label="비밀번호 확인" register={register} name="password-repeat" validation={Validations.passwordRepeat} errors={errors} onBlur={() => handleBlur('password-repeat')} />
      <Button variant="solid" label="회원가입 하기" type="submit" disabled={!isButtonValid} className="h-[48px]" />
    </form>
    </>
  );
};

export default SignUpForm;
