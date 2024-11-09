import { FC, useState } from 'react';
import { Button } from '@/components/@Shared/Buttons/Button';
import { useForm } from 'react-hook-form';
import AuthInput from './AuthInput';
import clsx from 'clsx';
import createValidations from './Validations';
import { LoginFormData } from './AuthDtos';
import Modal from './Modal';
import useModalClose from './modalClose';
import axios from 'axios';
import { useRoot } from '@/hook/useRoot';

const LoginForm: FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<LoginFormData>({ mode: 'onBlur' });
  const [isButtonValid, setIsButtonValid] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const [isLoginSuccess, setIsLoginSuccess] = useState<boolean>(true);
  const { useLogin } = useRoot();
  const Validations = createValidations(watch('password'));
  const modalClose = useModalClose();
  const handleBlur = async (name: keyof LoginFormData) => {
    const result = await trigger(name);
    const allFieldsFilled = Object.values(watch()).every(
      (value) => value !== '',
    );
    setIsButtonValid(result && allFieldsFilled);
  };

  const onSubmit = async (data: LoginFormData) => {
    try {
      await useLogin(data);
      setIsLoginSuccess(true);
      setModalMessage(`로그인 성공`);
      setModalOpen(true);

      window.location.href = '/'; // 메인 페이지로 이동
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('로그인 실패:', error);
        setIsLoginSuccess(false);
        setModalMessage(error.response?.data.message);
        setModalOpen(true);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={clsx('mt-6 flex flex-col justify-center gap-7', 'w-full')}
    >
      <Modal
        isOpen={modalOpen}
        message={modalMessage}
        onClose={() =>
          modalClose({ type: 'login', isSuccess: isLoginSuccess, setModalOpen })
        }
      />
      <AuthInput
        label="이메일"
        register={register}
        name="email"
        validation={Validations.email}
        onBlur={() => handleBlur('email')}
        errors={errors}
        type="email"
      />
      <AuthInput
        label="비밀번호"
        register={register}
        name="password"
        validation={Validations.password}
        onBlur={() => handleBlur('password')}
        errors={errors}
        type="password"
      />
      <Button
        variant="solid"
        label="로그인 하기"
        type="submit"
        disabled={!isButtonValid}
        className="h-[48px]"
      />
    </form>
  );
};

export default LoginForm;
