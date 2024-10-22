import { FC, useState } from 'react';
import { Button } from "@/components/@Shared/Buttons/Button";
import { useForm } from 'react-hook-form';
import { axiosInstance } from '@/apis/instance/axiosInstance'; // axiosInstance import 추가
import AuthInput from './AuthInput';
import clsx from 'clsx';
import { useRouter } from 'next/router'; // useRouter import 추가
import createValidations from './Validations';
import { LoginFormData } from './AuthDtos';


const LoginForm: FC = () => {
  const { register, handleSubmit, watch, trigger, formState: { errors } } = useForm<LoginFormData>({ mode: 'onBlur' });
  const [isButtonValid, setIsButtonValid] = useState<boolean>(false);
  const router = useRouter(); // useRouter 훅 사용
  const Validations = createValidations(watch('password'));

  const handleBlur = async (name: keyof LoginFormData) => {
    const result = await trigger(name); // 특정 필드만 검사
    const allFieldsFilled = Object.values(watch()).every(value => value !== ""); // 모든 필드가 채워졌는지 체크
    setIsButtonValid(result && allFieldsFilled); // 유효성 검사 결과와 필드 채워짐 여부에 따라 버튼 상태 업데이트
  };

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await axiosInstance.post('/auth/login', data); // 로그인 API 요청
      alert('로그인 성공: ' + JSON.stringify(response.data));
      
      const {accessToken, refreshToken } = response.data;
      // 엑세스 토큰을 로컬 스토리지에 저장
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      router.push('/'); // 로그인 성공 후 홈 페이지로 이동
    } catch (error) {
      console.error('로그인 실패:', error);
      alert('로그인 실패: 잘못된 이메일이나 비밀번호입니다.'); // 에러 메시지 표시
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={clsx(
        'mt-6 flex flex-col justify-center gap-7',
        'w-full',
      )}
    >
      <AuthInput label="이메일" register={register} name="email" validation={Validations.email} onBlur={() => handleBlur('email')} errors={errors} />
      <AuthInput label="비밀번호" register={register} name="password" validation={Validations.password} onBlur={() => handleBlur('password')} errors={errors} />
      <Button variant="solid" label="로그인 하기" type="submit" disabled={!isButtonValid} />
    </form>
  );
};

export default LoginForm;
